---
title: "SQLite 스키마 버전 관리와 마이그레이션 패턴"
date: "2026-04-20T22:32:33+09:00"
description: "PRAGMA user_version, 단계별 트랜잭션, foreign_keys IIFE 복구, TooNew 감지, 복호화 → 마이그레이션 순서"
draft: false
---

## 왜 버전 관리가 필요한가

SQLite 스키마를 한 번 배포하고 나면 바꾸기 어렵다. 이미 사용자 로컬에 깔린 DB 파일에 새 컬럼을 추가하려면 `ALTER TABLE`이 필요하고, 그것이 안전하게 적용됐는지 검증해야 한다.

School Record App은 초기부터 이 문제를 의식했다. 첫 번째 커밋 이후 얼마 지나지 않아 "데이터베이스 버전관리 및 마이그레이션 대비 코드 작성"이라는 커밋이 올라왔다. 기능이 하나도 없는 상태에서 마이그레이션 뼈대를 먼저 만들었다.

## PRAGMA user_version

SQLite에는 별도 테이블 없이 스키마 버전을 저장하는 내장 메커니즘이 있다.

```sql
-- 읽기
PRAGMA user_version;

-- 쓰기 (트랜잭션 내부에서 사용 가능)
PRAGMA user_version = 1;
```

`user_version`은 DB 파일 헤더에 저장되는 32비트 정수다. 별도 테이블이 필요 없고, 파일을 열자마자 읽을 수 있다. Rust에서는 `pragma_update(None, "user_version", v)`로 쓰고, `query_row("PRAGMA user_version", [], |r| r.get(0))`로 읽는다.

앱 코드에는 `SCHEMA_VERSION` 상수를 하나 두고, "현재 앱이 지원하는 최신 스키마 버전"을 나타낸다. DB의 `user_version`이 이 값보다 낮으면 마이그레이션이 필요한 상태다.

## MIGRATIONS 배열

버전 이행 경로를 배열로 관리한다. 인덱스 `i`의 항목이 "버전 `i` → 버전 `i+1`"로 올리는 SQL이다.

```rust
pub const SCHEMA_VERSION: u32 = 1;

const MIGRATIONS: &[&str] = &[
    "", // v0 → v1
];
```

v0 → v1이 빈 문자열인 이유가 있다. 최초 스키마 생성 SQL이 전부 `IF NOT EXISTS`로 작성되어 있기 때문이다. "버전 도입 이전 DB"(user_version = 0인 기존 파일)는 이미 모든 테이블이 있으므로, v1으로 승격하는 SQL이 별도로 필요 없다.

나중에 컬럼을 추가하거나 테이블을 변경하려면 `SCHEMA_VERSION`을 2로 올리고, `MIGRATIONS[1]`에 `ALTER TABLE ...` SQL을 넣는다. 기존 사용자 DB는 v0이나 v1에서 순차적으로 v2까지 올라온다.

## 단계별 트랜잭션과 foreign_key_check

마이그레이션은 한 번에 끝까지 실행하지 않는다. 각 버전 이행을 개별 트랜잭션으로 감싼다.

```rust
pub fn migrate(conn: &mut Connection, from: u32) -> Result<()> {
    conn.execute_batch("PRAGMA foreign_keys = OFF;")?;

    let result: Result<()> = (|| {
        for v in from..SCHEMA_VERSION {
            let sql = MIGRATIONS.get(v as usize)...;

            let tx = conn.transaction()?;  // 트랜잭션 시작
            if !sql.is_empty() {
                tx.execute_batch(sql)?;
            }
            tx.pragma_update(None, "user_version", v + 1)?;

            // 커밋 전 외래키 무결성 검증
            let mut stmt = tx.prepare("PRAGMA foreign_key_check;")?;
            if stmt.exists([])? {
                return Err(...); // 위반 발견 → ROLLBACK
            }

            tx.commit()?;
        }
        Ok(())
    })();

    // 성공·실패 모두 복구
    let fk_result = conn.execute_batch("PRAGMA foreign_keys = ON;");
    result.and(fk_result)
}
```

`tx.commit()`이 호출되기 전에 `tx`가 스코프를 벗어나면 rusqlite가 자동으로 `ROLLBACK`을 실행한다. 즉, 중간에 에러가 나도 해당 단계 전체가 되돌아간다.

각 단계를 커밋하기 전에 `PRAGMA foreign_key_check`를 실행한다. 위반 행이 하나라도 있으면 에러를 반환해 자동 롤백시킨다. 외래키 무결성은 DB 레벨에서 보장해야 한다 — 애플리케이션 코드만 믿어서는 안 된다.

## foreign_keys의 까다로운 제약

`PRAGMA foreign_keys`는 **열린 트랜잭션이 없을 때만 변경할 수 있다**. 이것이 SQLite 공식 문서가 권고하는 사항이다.

마이그레이션 중에는 외래키를 끄고 싶지만(`OFF`), 그러려면 트랜잭션 바깥에서 설정해야 한다. 그리고 마이그레이션이 끝나면 반드시 `ON`으로 복구해야 한다.

IIFE(`(|| { ... })()`) 패턴을 쓰는 이유가 여기 있다. 클로저 안에서 에러가 나면 `?`로 조기 종료되지만, 클로저 실행이 끝난 뒤에는 반드시 `foreign_keys = ON` 복구 코드가 실행된다. 에러 경로에서 `foreign_keys = OFF` 상태로 conn이 남는 버그를 방지한다.

실제로 이 복구를 빠뜨렸던 버그가 있었다 — 마이그레이션 실패 시 conn이 `foreign_keys = OFF` 상태로 남아 이후 모든 INSERT가 외래키 검사를 건너뛰었다.

## TooNew: 미래에서 온 DB

DB 버전이 앱 버전보다 **높으면** 마이그레이션이 불가능하다. 이 경우는 에러로 처리한다.

```rust
pub enum OpenError {
    Db(rusqlite::Error),
    TooNew { db_version: u32, app_version: u32 },
}
```

에러 메시지도 명확하게: "이 파일은 더 최신 버전의 앱에서 생성되었습니다. 앱을 업데이트해주세요." 사용자가 더 새로운 앱으로 파일을 저장하고, 이전 앱에서 다시 열려는 상황이다. 조용히 무시하거나 손상된 상태로 열면 안 된다.

## open과 migrate의 분리

`open_existing`은 버전 확인만 한다. 실제 마이그레이션은 별도 커맨드(`migrate_schema`)로 분리되어 있고, UI에서 명시적으로 호출한다.

이 분리에는 이유가 있다. 파일을 열 때 자동으로 마이그레이션을 실행하면:

- 사용자가 모르는 사이에 스키마가 바뀐다
- 마이그레이션 전에 백업을 만들 기회가 없다
- 실패 시 파일이 망가진 채로 남을 수 있다

분리하면 "마이그레이션이 필요합니다" 다이얼로그를 띄우고, 사용자 동의 후 백업을 만든 뒤 마이그레이션을 실행하는 흐름을 구성할 수 있다.

## 복호화 → 마이그레이션 순서

암호화 기능을 추가한 뒤 심각한 순서 버그가 있었다. 암호화가 활성화된 DB를 열 때 코드 흐름이:

```
파일 열기 → 마이그레이션 → 복호화
```

였다. 마이그레이션 SQL이 `nonce_b64:ciphertext_b64` 형태의 암호화 텍스트를 평문처럼 처리하는 문제였다. 만약 마이그레이션이 텍스트 컬럼을 조작하는 종류였다면 데이터가 손상됐을 것이다.

올바른 순서는:

```
파일 열기 → 복호화 → 마이그레이션
```

데이터에 접근하기 전에 항상 복호화가 먼저여야 한다. 이 버그는 실제로 커밋 `bd8af7c`에서 수정됐다.

비슷한 맥락으로, 백업을 복호화 전에 만들면 암호화된 파일이 백업된다. 이것이 의도인지 아닌지에 따라 달라지지만, **데이터 파이프라인의 각 단계가 이전 단계의 결과물을 전제로 한다는 원칙**을 의식해야 한다.

## SQLite 트리거의 함정

초기 구현에 `trg_record_history` 트리거가 있었다. 레코드가 업데이트될 때 자동으로 히스토리를 기록하는 트리거였다.

이 트리거를 결국 제거했다. 이유는 **신규 DB와 업그레이드 DB 사이에 동작이 달랐기** 때문이다.

- 신규 DB: 트리거가 `CREATE TABLE`과 함께 처음부터 존재
- 업그레이드 DB: v0 → v1 마이그레이션은 빈 문자열 → 트리거가 없음

마이그레이션 SQL에 트리거 생성 코드를 추가하면 업그레이드 DB에도 트리거를 심을 수 있다. 하지만 "신규 DB의 트리거 행동"과 "레거시 DB에서 마이그레이션으로 추가된 트리거 행동"이 완전히 같다고 보장하기 어렵다. 애플리케이션 코드에서 히스토리를 명시적으로 기록하는 방식이 예측 가능성 면에서 더 낫다.

## 정리

| 결정 | 이유 |
|------|------|
| `PRAGMA user_version` | 별도 테이블 불필요, DB 헤더에 즉시 접근 |
| 단계별 트랜잭션 | 중간 실패 시 해당 단계만 롤백, DB 일관성 유지 |
| `foreign_key_check` | 각 단계 커밋 전 외래키 무결성 검증 |
| IIFE로 `foreign_keys` 복구 | 에러 경로에서도 반드시 `ON` 복구 보장 |
| TooNew 에러 | 미래 DB를 조용히 열지 않음 |
| open/migrate 분리 | 백업 기회 확보, 사용자 동의 흐름 |
| 복호화 → 마이그레이션 | 암호화 텍스트에 마이그레이션 SQL 적용 방지 |
| 트리거 제거 | 신규/업그레이드 DB 간 동작 일관성 확보 |
