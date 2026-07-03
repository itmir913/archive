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

## 현재 상태 (2026-07-03)

- **아카이브 변환 완료**: 665개 포스트, 이미지 fullsize 원본으로 정리 완료
- **GitHub Releases 업로드 완료**: 197개 파일, 271 MB
- **Git**: GPG 서명, main 브랜치
- **미완성**: Astro 사이트 미구축
- **포스트 인덱스**: `itmir-index.json` 삭제 — Astro `getCollection('itmir')`로 대체

## 다음 작업 — Astro 사이트 구축

1. Astro 프로젝트 초기화 (이 레포 or 별도 site 레포)
2. Content Collection Zod 스키마 정의 (frontmatter 기준)
3. 라우팅: `/archive/itmir/[year]/[post_num]`
4. GitHub Pages 배포 → luminousky.com/archive

## 원본 파이프라인 소스

`itmir-1-1/` 폴더(별도 zip 백업)에 변환 스크립트 보관:
`convert.py` → `compress_images.py` → `add_attachments.py` → `validate.py`

## 알려진 사항

- post 152, 250, 669: validate.py "빈 본문" false positive — 정상 포스트
- post 343 ("지식채널E 오프닝 동영상"), post 351 ("스카우트"): 삭제됨
- `src/content/itmir/` 경로는 Astro content collection 규격에 맞춘 것
