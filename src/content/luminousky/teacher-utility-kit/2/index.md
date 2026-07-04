---
title: "ITMir 아카이브 — 보존 철학과 Astro 기반 아키텍처"
date: "2026-04-01T00:00:00+09:00"
description: "2013~2021년 ITMir 블로그 657개 포스트를 정적 사이트로 영구 보존하기까지"
draft: false
---

## 왜 만들었나

`itmir.tistory.com`은 2013년부터 2021년까지 운영한 블로그다. 티스토리가 언제 서비스를 종료하거나 포맷을 바꿔도 이상하지 않은 시점이 됐고, 이미 이미지 일부가 깨진 상태였다. 포스트 657개를 내가 통제할 수 있는 형태로 옮겨두지 않으면 사라질 수 있다.

단순히 HTML을 긁어오는 방식으로는 부족했다. 내용을 검색하고, 타임라인으로 보고, 미래에도 읽을 수 있어야 했다. 그래서 Markdown 기반 정적 사이트로 변환·보존하기로 했다.

## 변환 파이프라인

티스토리 백업 XML에서 정적 사이트까지 4단계로 처리했다:

```
convert.py           → XML → Markdown 변환 (657개 index.md)
compress_images.py   → PNG → JPG 압축, fullsize 원본 우선
add_attachments.py   → 첨부파일 목록 ## 첨부파일 섹션으로 삽입
validate.py          → 빈 본문, 깨진 이미지 링크 검증
```

이미지와 첨부파일은 GitHub Releases(`itmir-attachments` 태그)에 올려 URL로 참조한다. `.db` 파일이나 클라우드 스토리지 대신 Releases를 선택한 이���는 git 레포와 같은 곳에 영구 보관되고 용량 제한이 넉넉하기 때문이다.

## 기술 스택

### Astro

정적 사이트 생성기�� Astro를 선택했다. Content Collections 기능으로 `src/content/itmir/{year}/{num}/index.md` 구조를 타입 안전하게 다룰 수 있고, 빌드 결과물이 순수 HTML이라 GitHub Pages에 그대로 올린다.

### Tailwind CSS v4

UI 스타일링에 Tailwind v4를 사용했다. 다크 모드는 `class` 방식으로 토글하고, 최소 글씨 크기는 `text-base`(16px)를 원칙으로 했다.

### Pagefind

전문 검색 인덱스를 빌드 후 생성한다. CDN 없이 정적 파일만으로 검색이 동작하므로 오프라인에서도 완전히 작동한다. `pagefind --site dist/archive` 명령이 GitHub Actions 워크플로에 포함되어 있다.

## 사이트 구조

```
/archive/                    홈
/archive/itmir/              Chapter 1 포스트 목록 + 전문검색
/archive/itmir/{year}/{num}/ 개별 포스트
/archive/timeline/           수동 큐레이션 타임라인
/archive/luminousky/         Chapter 2 — 프로젝트 기록 (이 글)
```

Chapter 1(ITMir)은 보존 아카이브이므로 본문 맞춤법·내용 수정을 금지한��. 깨진 링크 복구와 Markdown 문법 수정만 허용한다. Chapter 2(luminousky)는 현재 진행 중인 프로젝트들의 설계 기록이다.

## 배포

`main` 브랜치 push → GitHub Actions `deploy.yml` 실행 → `npm ci && npm run build` → `pagefind` 인덱스 생성 → `gh-pages` 브랜치 배포 → `luminousky.com/archive` 반영. `dist/`는 `.gitignore`에 포함되며 소스만 관리한다.
