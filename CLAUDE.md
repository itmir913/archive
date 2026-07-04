# ITMir Archive — CLAUDE.md

luminousky 브랜드의 디지털 보존 프로젝트. ITMir(itmir.tistory.com)는 **Chapter 1** (2013–2021).

## 레포지토리 정보

- **GitHub**: https://github.com/itmir913/archive
- **배포 예정**: luminousky.com/archive (Astro + GitHub Pages)
- **Releases 태그**: `itmir-attachments`
- **URL 패턴**: `https://github.com/itmir913/archive/releases/download/itmir-attachments/{filename}`

## 디렉토리 구조

```
itmir-archive/
  src/
    content/
      itmir/          ← Chapter 1 포스트 (665개)
        {year}/{post_num}/
          index.md    ← frontmatter + 본문 + ## 첨부파일 섹션
          images/     ← 이미지 (PNG→JPG 압축됨, fullsize 원본 우선)
          files/      ← 소스코드 (.java .sh .py .patch 등)
      luminousky/     ← Chapter 2 예약 (아직 비어있음)
        {YYYY}/{YYYY-MM-DD-slug}/index.md
  metadata/
    itmir-releases-manifest.json  ← Releases 파일 매니페스트 (272개)
  .gitattributes
```

## frontmatter 스키마

```yaml
---
title: "제목"
date: "2013-08-09T12:12:09+09:00"
category: "Application"
tags: []
description: "한 줄 요약"
draft: false
original_url: "https://itmir.tistory.com/300"
---
```

## GitHub Releases 파일명 규칙

**반드시 ASCII-safe** (한글·공백·`[]`·`&`·`()`·`!` 금지):
- 공백 → `-`
- 한글 포함 파일 → `{post번호}-{설명}.{ext}` 형태
- 예: `133-boot-silence.zip`, `401-QR-20131205-161803.wav`

## 현재 상태 (2026-07-04)

- **아카이브 변환 완료**: 657개 포스트, 이미지 fullsize 원본으로 정리 완료
- **GitHub Releases 업로드 완료**: 197개 파일, 271 MB
- **Astro 사이트 구축 완료 + 배포 완료**: luminousky.com/archive, push시 자동 반영
- **Git**: GPG 서명, main 브랜치

## 빌드 및 배포 구조

**main 브랜치에는 소스코드만 있다. `dist/`는 `.gitignore`에 포함되어 커밋되지 않는다.**

```
main 브랜치         →  GitHub Actions (.github/workflows/deploy.yml)
  소스코드만            npm ci
  dist/ 없음           npm run build
                          └─ astro build        → dist/archive/ 생성
                          └─ pagefind --site dist/archive
                                                → dist/archive/pagefind/ 생성 (전문검색 인덱스)
                       publish_dir: ./dist  →  gh-pages 브랜치
                                               luminousky.com/archive/
```

- `npm run build`를 로컬에서 실행해도 되지만, 생성된 `dist/`는 커밋하지 않는다
- pagefind 전문검색 인덱스는 빌드 시 자동 생성됨 — 별도 관리 불필요
- 개발 서버(`npm run dev`)에서는 pagefind 인덱스가 없으므로 전문검색 비활성 상태

## Astro 사이트 구조

```
src/
  layouts/BaseLayout.astro     ← 공통 레이아웃 (OG태그, 다크모드 토글, nav)
  pages/
    index.astro                ← /archive/ 홈
    itmir/index.astro          ← /archive/itmir/ 포스트 목록 + Pagefind 전문검색
    itmir/[year]/[post_num]/   ← /archive/itmir/{year}/{num}/ 개별 포스트
    timeline/index.astro       ← /archive/timeline/ 타임라인
  data/timeline-curated.ts     ← 타임라인 수동 큐레이션 데이터
  content/
    itmir/{year}/{num}/index.md
    luminousky/template/index.md  ← Chapter 2 글쓰기 템플릿 (draft: true)
```

## Chapter 2 글쓰기 안내

새 포스트 작성 방법:
1. `src/content/luminousky/template/index.md`를 복사
2. 경로: `src/content/luminousky/{YYYY}/{YYYY-MM-DD-slug}/index.md`
3. frontmatter의 `title`, `date`, `draft: false` 수정 후 본문 작성
4. **이미지 첨부**: 같은 폴더에 `images/` 디렉토리 생성 → 이미지 파일 저장 → `![설명](./images/파일명.jpg)` 형태로 참조
5. **파일 첨부**: GitHub Releases에 업로드 → URL 패턴 `https://github.com/itmir913/archive/releases/download/itmir-attachments/{filename}`

> **주의**: `luminousky` 컬렉션은 아직 `src/content/config.ts`에 정의되지 않았다. Chapter 2를 실제로 발행하려면 Zod 스키마와 라우팅 페이지를 추가해야 한다.

## 원본 파이프라인 소스

`itmir-1-1/` 폴더(별도 zip 백업)에 변환 스크립트 보관:
`convert.py` → `compress_images.py` → `add_attachments.py` → `validate.py`

## Tailwind CSS 규칙

- **최소 글씨 크기: `text-base` (1rem / 16px)**
- `text-xs`, `text-sm` 사용 금지
- `text-[0.8rem]` 등 `text-base` 미만 임의 크기 사용 금지
- 글씨 크기는 Tailwind 기본 스케일 사용: `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl` …
- 더 큰 크기에서 스케일에 딱 맞는 값이 없을 때만 `text-[...]` 임의 값 허용

## Git 규칙

- 커밋 메시지에 `Co-Authored-By:` 등 AI 공동 작성자 표기 금지

## 알려진 사항

- post 152, 250, 669: validate.py "빈 본문" false positive — 정상 포스트
- post 343 ("지식채널E 오프닝 동영상"), post 351 ("스카우트"): 삭제됨
- `src/content/itmir/` 경로는 Astro content collection 규격에 맞춘 것
