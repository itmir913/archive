---
title: "CodeClan LMS — 학내망 전용 LMS + 온라인 저지 시스템 설계"
date: "2026-05-01T00:00:00+09:00"
description: "교사 PC 1대가 서버 역할을 하고 학생들은 브라우저로 접속하는 고등학교 정보 교과용 LMS"
draft: false
---

## 배경

고등학교 정보 교과에서 프로그래밍 수업을 할 때 겪는 문제가 있다. 학생들이 제출한 코드를 어떻게 채점하고 관리할 것인가. 외부 온라인 저지 시스템을 쓰면 학내망 제한이나 가입 절차가 문제가 된다. 에디터에서 직접 복붙을 받으면 비효율적이다.

해결책: 교사 PC 1대가 Tauri 앱 + Axum 서버를 실행하고, 학생들은 같은 Wi-Fi의 브라우저로 접속한다. 외부 인터넷 없이 학내망만으로 완결되는 구조다.

## 기술 스택

| 레이어 | 기술 | 선택 이유 |
|--------|------|----------|
| 데스크탑 앱 | Tauri 2.0 | 트레이 상주, 닫기→숨김, Windows 단일 배포 |
| 백엔드 | Rust + Axum | Axum 0.0.0.0:8080으로 학내망 접근 허용 |
| DB | SQLite WAL | 단일 파일, max_connections=1 단일 writer 큐 |
| 프론트엔드 | Vue 3 + Vite + TypeScript + Pinia | Rust 바이너리에 임베드 |
| 스타일 | Tailwind CSS v4 | @tailwindcss/vite |
| 국제화 | vue-i18n | 한국어 하드코딩 금지, `$t('key')` 필수 |
| 채점 엔진 | DMOJ wbox | 포터블 Python/GCC/Java |

SQLite WAL 모드 + `max_connections=1`으로 단일 writer 직렬화를 강제해서 동시 채점 요청에서도 DB 충돌이 없도록 한다.

## 도메인 모델

```
classes (수업: 과목+분반 조합)
  └─ teacher_id
  └─ students (학생 명단)
  └─ lessons (차시)
  └─ assessments (수행평가)
       └─ sessions (CREATED → LOBBY → RUNNING → CLOSED)
            └─ submissions
            └─ submission_drafts

problems (문항, 전역 공유, type 1~5)
attendance_records (출석 스냅샷)
auth_tokens (교사 쿠키 세션, 12시간)
```

수행평가 세션은 4단계 상태를 가진다. LOBBY는 학생들이 대기하는 단계로, 교사가 RUNNING으로 전환하면 타이머가 시작된다.

## 채점 엔진 설계

DMOJ의 `wbox`를 포터블 실행 환경으로 번들링한다. Python, GCC(C/C++), Java를 별도 설치 없이 쓸 수 있다. 채점 엔진은 별도 `judge/` crate로 분리한다.

Phase 1: `tokio` 타임아웃으로 TLE 처리.  
Phase 2: Windows Job Object로 메모리/CPU 사용량 제한.

## 구현 현황

목업 10개(`docs/mockups/01~10_*.html`)가 완성된 상태에서 `dev` 브랜치 단계별 구현 중이다. 목업을 먼저 완성하고 백엔드/프론트를 구현하는 순서를 지킨다.

`master` 브랜치에는 Phase 0~9 구현체가 있고, `dev` 브랜치에서 전면 재설계 중이다. 핵심 변경은 `divisions` 기반 → `classes` 기반으로의 도메인 모델 재정립이다.

완료된 단계:
- 0~1단계: Tauri+Axum 뼈대, 초기 설정 화면
- 2단계: 교사/학생 인증 (argon2, 쿠키 세션)
- 3단계: 교사 홈, 어드민 뷰, 학생 홈, 설정
- 4단계: 수업 상세(ClassDetailView), 학생 관리
- 5단계: 문제 은행 (3유형: short_answer/multiple_choice/code_submit)
