---
title: "학교생활기록부 일괄 점검 프로그램 — 개요와 아키텍처"
date: "2026-06-01T00:00:00+09:00"
description: "교사가 생기부 PDF·Excel을 업로드하면 금칙어·점검 키워드를 자동 탐색·강조하는 Tauri 2 데스크탑 앱"
draft: false
---

## 배경

학교생활기록부 작성 후 금칙어·부적절 표현이 포함되어 있는지 전수 점검하는 작업은 수작업으로 하기 어렵다. PDF와 Excel 두 포맷을 모두 지원하고, 발견된 키워드를 시각적으로 강조한 결과물을 내보내는 데스크탑 앱(`WordFinderApp`)을 만들었다.

## Python + PyQt6에서 Tauri로

첫 구현은 Python + PyQt6 + PyInstaller(`--onedir --windowed`)였다. 그런데 학교 PC에서 실행하면 **"DLL 차단되어 실행할 수 없습니다"** 오류가 발생했다. Windows AppLocker가 Python 런타임과 Qt DLL 조합을 차단한 것이다.

Tauri로 포팅하면서 이 문제가 해결됐다. Rust 네이티브 컴파일 결과물은 Python 런타임도, Qt DLL도 없는 단일 `.exe`다. AppLocker가 차단하던 대상 자체가 없어진다.

기술 선택이 기존 luminousky 스택과도 자연스럽게 맞았다 — Rust 백엔드는 이미 다른 프로젝트에서 쓰고 있었고, Vue.js도 마찬가지였다.

## 기술 스택

| 레이어 | 기술 | 선택 이유 |
|--------|------|----------|
| 프론트엔드 | Vue 3 (Composition API) + Pinia + Tailwind CSS v4 | SPA, 단방향 상태 흐름 |
| 데스크탑 | Tauri 2 | Rust 기반 경량 데스크탑 래퍼, 단일 exe |
| PDF 처리 | pdfjs-dist (Web Worker) | 브라우저 호환 PDF 파싱, 비동기 처리 |
| Excel 처리 | SheetJS/xlsx (Web Worker) | .xlsx 셀 단위 파싱 |
| 아이콘 | @lucide/vue | |
| 폰트 | Pretendard | |

## 핵심 아키텍처 원칙

**단방향 IPC**: 컴포넌트는 `invoke()`를 직접 호출하지 않는다. 모든 Tauri IPC 호출은 `src/stores/app.js`(Pinia store action)에서만 한다. 컴포넌트는 store action을 dispatch할 뿐이다.

**Web Worker 격리**: PDF 파싱(pdfjs)과 Excel 파싱(SheetJS)은 무거운 연산이다. `src/workers/processor.worker.js`에서 처리해 UI 스레드 블로킹을 방지한다.

**파일 I/O는 Rust**: 파일 읽기/쓰기는 `src-tauri/src/lib.rs`의 Rust command가 담당한다.

## 컴포넌트 구조

```
src/
  stores/app.js              ← 전체 상태 + 모든 actions
  workers/
    processor.worker.js      ← PDF/Excel 처리 (Web Worker)
  components/
    TitleBar.vue
    CsvSection.vue           ← 키워드 CSV 설정
    ActionBar.vue            ← 처리 시작 버튼
    tabs/
      GuideTab.vue
      FileTab.vue            ← 파일 업로드
      LogTab.vue             ← 처리 로그
      DownloadTab.vue        ← 결과 다운로드
  App.vue                    ← 레이아웃만 담당
```

## 주요 기능

**키워드 CSV**: 점검할 단어 목록을 CSV로 관리한다. 3단계 fallback: 사용자가 선택한 CSV → 실행 파일 옆 `default.csv` → 앱 내장 목록(macOS용).

**Excel 처리**: 셀 단위 독립 매칭(행 join 방식 제거). 발견여부가 `TRUE`인 행은 노란색으로 강조된다. 재처리 시 기존 발견여부·발견된 단어 컬럼을 제거 후 재생성한다.

**PDF 처리**: pdfjs-dist로 텍스트 추출 후 키워드 매칭. 매칭 성공 시점에만 북마크를 생성한다.

**연속 공백 검사**: Excel 전용(PDF는 pdfjs 추출 특성상 지원 불가).

**발견된 단어 표시**: 실제 매칭된 텍스트가 아닌 원본 키워드로 표시한다 — 오탈자 변형 텍스트보다 교사가 의도한 키워드를 바로 알아보기 편하다.

## 설계 결정: Fail-Fast

`unwrap_or(0)` 같은 silent fallback을 금지한다. 점검 결과에서 오탐(false negative)이 발생하는 것이 앱 오류보다 훨씬 나쁜 결과다. 예상치 못한 상태에서는 즉시 에러를 노출한다.

## CSV Fallback 설계

```
1. 사용자 수동 선택 CSV
2. 실행 파일과 같은 디렉토리의 default.csv
3. 앱 바이너리에 내장된 기본 목록 (macOS 배포용)
```

`default.csv`가 없어도 앱이 동작하도록 하되, 사용자 정의 목록을 우선 적용한다.
