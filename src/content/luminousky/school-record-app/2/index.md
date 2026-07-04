---
title: "Rust 백엔드 모듈 분리와 단위 테스트 전략"
date: "2026-04-25T00:00:00+09:00"
description: "2,156줄 main.rs를 도메인 모듈로 쪼개고, _impl 패턴으로 133개 단위 테스트를 확보한 과정"
draft: false
---

## 문제: 2,156줄짜리 main.rs

초기에는 Tauri 관례대로 모든 커맨드를 `main.rs` 하나에 몰아넣었다. 기능을 빠르게 붙이다 보니 파일이 2,156줄까지 불어났다. 특정 커맨드를 찾으려면 파일 전체를 훑어야 했고, 테스트를 작성하려면 Tauri 커맨드 래퍼까지 함께 테스트해야 했다.

근본 문제는 **비즈니스 로직과 Tauri 커맨드 래퍼가 뒤섞여 있다는 것**이었다. Tauri 커맨드(`#[tauri::command]`)는 State를 받고 결과를 `Result<T, String>`으로 반환하는 얇은 레이어여야 하는데, 실제 로직까지 담고 있었다.

## 해결: `_impl` 패턴으로 분리

각 커맨드에서 핵심 로직을 `*_impl` 함수로 추출했다. `_impl` 함수는 `Connection`을 직접 받는 순수 함수로, Tauri State나 async 컨텍스트 없이 `cargo test`에서 곧바로 호출할 수 있다.

```rust
// Tauri 커맨드 — 얇은 래퍼
#[tauri::command]
pub async fn get_areas(state: State<'_, DbState>) -> Result<Vec<Area>, String> {
    let conn = state.0.lock().await;
    get_areas_impl(&conn).map_err(|e| e.to_string())
}

// _impl — 테스트 가능한 순수 함수
pub fn get_areas_impl(conn: &Connection) -> Result<Vec<Area>, rusqlite::Error> {
    // ... SQL 쿼리
}
```

## 최종 모듈 구조

```
src-tauri/src/
├── main.rs          — main() + 모듈 선언만 (~55줄)
├── db.rs            — DB 초기화, 마이그레이션
├── state.rs         — DbState, CryptoState 등 공유 상태
├── types.rs         — Serialize/Deserialize 구조체 21개
├── engine.rs        — 치환 엔진 순수 함수 (hash_content, apply_rules 등)
├── commands/
│   ├── mod.rs
│   ├── project.rs   area.rs   activity.rs   student.rs
│   ├── record.rs    snapshot.rs   replace.rs   synonym.rs
│   └── file.rs
└── tests/
    ├── mod.rs               — setup_test_db, 공통 헬퍼
    ├── engine_tests.rs      27개
    ├── db_tests.rs          4개
    ├── area_tests.rs        10개
    ├── activity_tests.rs    11개
    ├── student_tests.rs     17개
    ├── record_tests.rs      23개
    ├── snapshot_tests.rs    10개
    ├── replace_tests.rs     18개
    └── synonym_tests.rs     19개  ← 도메인 하나당 파일 하나
```

## 테스트 전략

각 도메인 파일마다 테스트 파일을 하나씩 만들었다. `tests/mod.rs`의 `setup_test_db()`가 인메모리 SQLite를 세팅하고, `insert_student` / `insert_area` 등 헬퍼가 공통 픽스처를 제공한다.

테스트 항목의 우선순위:

1. **CRUD 정상 경로** — 생성·조회·수정·삭제
2. **제약 위반** — UNIQUE, FK, CHECK 제약이 예상대로 동작하는지
3. **엣지 케이스** — 빈 content 제외, `INSERT OR IGNORE` 동작, CASCADE 삭제

`cargo test -- --test-threads=1`로 직렬 실행이 필요하다. SQLite 파일 기반 테스트가 병렬 실행 시 충돌하기 때문이다. 인메모리 DB를 사용했음에도 `rusqlite::Connection`이 `Send`를 구현하지 않아 발생하는 제약이다.

## 결과

모듈 분리 후 `main.rs`는 55줄로 줄었고, 각 도메인 파일은 150~300줄 수준이 됐다. 단위 테스트 133개가 전부 통과했고, 이후 스키마 점검 세션에서 28개를 추가해 161개가 됐다.

리팩토링 이후 신규 커맨드 추가 시 자연스럽게 `_impl` 패턴을 따르게 됐다. 코드보다 **관례(convention)** 를 먼저 잡는 것이 중요하다는 걸 다시 확인했다.
