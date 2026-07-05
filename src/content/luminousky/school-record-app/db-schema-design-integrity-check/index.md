---
title: "DB 스키마 설계와 릴리즈 전 정합성 점검"
date: "2026-04-26T00:00:00+09:00"
description: "CHECK 제약 추가, UTC 통일, 쿼리 최적화 — 배포 후 마이그레이션을 피하기 위한 사전 점검 기록"
draft: false
---

## 배포 전에 스키마를 완성해야 하는 이유

SQLite 스키마는 한 번 배포하면 바꾸기 어렵다. 컬럼을 추가하거나 제약을 변경하려면 마이그레이션 코드를 작성해야 하고, 이미 설치된 사용자 DB에 안전하게 적용되는지 검증해야 한다.

v0.2.8 정식 릴리즈 전에 스키마를 처음부터 다시 점검하기로 했다. 목표는 **`SCHEMA_VERSION=1` 고정 상태에서 배포하고, 이후에는 마이그레이션 경로만 열어두는 것**이었다.

## 점검에서 발견한 문제들

### 1. CHECK 제약 누락

학생 번호(grade, class_num, number)는 음수가 될 수 없고, 바이트 제한(byte_limit)은 0보다 커야 하며, 치환 규칙 우선순위(priority)도 음수가 없어야 한다. 그런데 코드에서만 검증하고 DB 제약은 없었다.

```sql
-- 추가한 CHECK 제약
Student: CHECK (grade >= 1 AND class_num >= 1 AND number >= 1)
Area.byte_limit: CHECK (byte_limit > 0)
ReplaceRule.priority: CHECK (priority >= 0)
```

`INSERT OR IGNORE` 경로에서는 CHECK 위반이 조용히 무시된다. 이는 의도된 동작이다 — "이미 동일한 규칙이 있다"고 처리되는 경로이기 때문이다.

### 2. datetime UTC 불일치

`ReplaceRule`과 `SynonymGroup`의 `created_at`/`updated_at`이 `datetime('now','localtime')`으로 저장되고 있었다. 반면 프론트엔드의 `formatDate(str)` 함수는 `str + 'Z'`로 UTC 파싱을 전제했다.

결과적으로 로컬 시간대가 UTC+9인 환경에서 타임스탬프가 9시간 틀리게 표시됐다.

모든 DB 저장을 `datetime('now')`(UTC)로 통일하고, UI 표시는 `toLocaleString('ko-KR')`로 로컬 변환하는 것으로 원칙을 정했다. 파일명 타임스탬프처럼 사용자에게 직접 보이는 값만 예외적으로 `chrono::Local::now()`를 사용한다.

### 3. 인덱스 누락

`get_snapshots_impl`이 `ORDER BY created_at DESC`를 사용하는데 해당 컬럼에 인덱스가 없었다.

```sql
CREATE INDEX IF NOT EXISTS idx_snapshot_created_at ON Snapshot (created_at);
```

스냅샷 수가 많아질수록 풀스캔이 문제가 될 수 있어 추가했다.

### 4. JOIN 쿼리 최적화

`get_all_records_for_inspect_impl`에서 `AreaActivity`가 driving table이 아니었다. PK `(area_id, activity_id)`를 활용할 수 있도록 JOIN 순서를 수정하고, 불필요한 `COALESCE(a.name, '')`를 `a.name`으로 단순화했다.

### 5. APP_CONFIGS 테이블 추가

앱 설정을 저장할 테이블이 없었다. 이후 암호화 salt와 verify token 저장에 필요하므로 미리 추가했다.

```sql
CREATE TABLE IF NOT EXISTS APP_CONFIGS (
    config_key   TEXT PRIMARY KEY,
    config_value TEXT NOT NULL
);
```

`updated_at` 없이 key-value만 두었다. 앱 설정은 현재 값만 필요하고 이력 추적이 불필요하기 때문이다.

## 최종 결과

이 점검 세션에서 테스트 28개를 추가해 총 161개가 됐다. 이후 암호화 PR에서 71개가 더 추가돼 232개가 됐다.

스키마 점검은 단순히 버그를 찾는 작업이 아니었다. **"배포 이후에는 바꾸기 어렵다"는 제약 조건 하에서 설계를 완성하는 작업**이었다. CHECK 제약처럼 "코드에서만 검증하면 되지 않나?"라고 넘어갈 수 있는 것들을 DB 수준에서 명시하는 것이 장기적으로 안전하다.
