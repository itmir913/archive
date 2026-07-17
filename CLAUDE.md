# ITMir Archive — CLAUDE.md

luminousky 브랜드의 디지털 보존 프로젝트. ITMir(itmir.tistory.com)는 **Chapter 1** (2013–2021).

## 레포지토리 정보

- **GitHub**: https://github.com/itmir913/archive
- **배포**: luminousky.com/archive (Astro + GitHub Pages, 배포 완료)
- **Releases 태그**: `itmir-attachments`
- **URL 패턴**: `https://github.com/itmir913/archive/releases/download/itmir-attachments/{filename}`

## 디렉토리 구조

```
itmir-archive/
  src/
    content/
      itmir/                        ← Chapter 1 포스트 (657개)
        {year}/{post_num}/
          index.md                  ← frontmatter + 본문 + ## 첨부파일 섹션
          images/                   ← 이미지 (PNG→JPG 압축됨, fullsize 원본 우선)
          files/                    ← 소스코드 (.java .sh .py .patch 등)
      luminousky/                   ← Chapter 2 포스트
        {project-slug}/{num}/
          index.md
        template/index.md           ← 글쓰기 템플릿 (draft: true)
    data/
      luminousky-projects.ts        ← project-slug → 표시 이름 매핑 (여기만 관리)
      timeline-curated.ts           ← 타임라인 수동 큐레이션 데이터
    layouts/BaseLayout.astro        ← 공통 레이아웃 (OG태그, 다크모드 토글, nav)
    pages/
      index.astro                   ← /archive/ 홈
      itmir/index.astro             ← /archive/itmir/ 포스트 목록 + Pagefind 전문검색
      itmir/[year]/[post_num]/      ← /archive/itmir/{year}/{num}/ 개별 포스트
      timeline/index.astro          ← /archive/timeline/ 타임라인
      luminousky/index.astro        ← /archive/luminousky/ 포스트 목록 (프로젝트 필터)
      luminousky/[project]/[num]/   ← /archive/luminousky/{project}/{num}/ 개별 포스트
    styles/global.css
    utils/
      pagefind.ts                   ← Pagefind 지연 초기화 공통 모듈
  scripts/
    check-releases.ps1              ← Releases ↔ content 참조 일치 점검 (pwsh)
  .gitattributes
```

## Chapter 1 (ITMir) 편집 안내

### frontmatter 스키마

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

### 편집 원칙

Chapter 1은 보존 아카이브다. 과거 글을 "개선"하지 않는다.

**허용되는 수정:**
- Markdown 정리 (깨진 문법 복구)
- 이미지·링크 복구 (broken → GitHub Releases URL로 교체)
- 메타데이터 정리 (`title`, `category`, `description`, `tags`)

**금지되는 수정:**
- 본문 맞춤법·문체 수정
- 내용 추가·삭제
- 당시 표현을 현재 기준으로 교정

## 마크다운 본문 작성 시 주의사항

- **숫자 범위에 물결표(`~`) 단독 사용 금지** — Astro 기본 마크다운 렌더러(remark-gfm)는 `~단어~`처럼 홑물결표로 감싼 구간도 취소선으로 해석한다(`singleTilde` 옵션이 기본 활성화). `10:00~10:30`, `1~2년차`처럼 범위를 나타낼 때 물결표를 쓰면, 본문 내 다른 위치의 물결표와 우연히 짝을 이루면서 그 사이 텍스트 전체가 취소선으로 렌더링될 수 있다.
- 숫자·시간 범위는 하이픈(`-`)으로 표기한다: `10:00-10:30`, `1-2년차`, `60-80명`.
- 새 포스트를 작성하거나 기존 포스트를 편집한 뒤에는 `~`가 실수로 남지 않았는지 확인한다.

## GitHub Releases 파일명 규칙

**반드시 ASCII-safe** (한글·공백·`[]`·`&`·`()`·`!` 금지):
- 공백 → `-`
- 한글 포함 파일 → `{post번호}-{설명}.{ext}` 형태
- 예: `133-boot-silence.zip`, `401-QR-20131205-161803.wav`

Releases ↔ content 참조 일치 점검은 `pwsh scripts/check-releases.ps1` 실행 (gh CLI 필요).

## 현재 상태 (2026-07-05)

- **아카이브 변환 완료**: 657개 포스트, 이미지 fullsize 원본으로 정리 완료
- **GitHub Releases 업로드 완료**: 196개 파일 (275 MB)
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

## Chapter 2 (luminousky) 글쓰기 안내

### frontmatter 스키마

```yaml
---
title: "제목"
date: "2026-07-05T12:00:00+09:00"
description: "한 줄 요약"
draft: true
---
```

`project` 필드는 **사용하지 않는다.** 프로젝트 표시 이름은 `src/data/luminousky-projects.ts`에서 `{project-slug} → 표시 이름` 형태로 중앙 관리한다. 새 프로젝트 추가 시 이 파일에 한 줄만 추가하면 된다.

### 새 포스트 작성 방법

1. `src/content/luminousky/template/index.md`를 복사
2. 경로: `src/content/luminousky/{project-slug}/{num}/index.md`
   - `{project-slug}`: ASCII-safe 프로젝트 디렉토리명 (예: `school-record-app`)
   - `{num}`: 해당 프로젝트 내 순번 (1부터 시작)
3. frontmatter의 `title`, `date` 수정, `draft: true`로 설정 후 본문 작성 (`project` 필드는 추가하지 않는다)
   - **새 프로젝트 slug라면** `src/data/luminousky-projects.ts`에 `'slug': '표시 이름'` 한 줄 추가
4. **이미지 첨부**: 같은 폴더에 `images/` 디렉토리 생성 → `![설명](./images/파일명.jpg)` 형태로 참조
5. **파일 첨부**: GitHub Releases에 업로드 → URL 패턴 `https://github.com/itmir913/archive/releases/download/itmir-attachments/{filename}`

## 원본 파이프라인 소스

`itmir-1-1/` 폴더(별도 zip 백업)에 변환 스크립트 보관:
`convert.py` → `compress_images.py` → `add_attachments.py` → `validate.py`

## Claude Code 행동 규칙

### 금지 사항

- **preview 도구 일체 사용 금지** — 토큰 소모 과다. `preview_screenshot`, `preview_snapshot`, `preview_inspect`, `preview_eval`, `preview_network` 등 모두 금지. 서버 에러 확인이 필요하면 `preview_logs` (서버 사이드 로그) 만 허용. 코드 편집 결과는 코드를 읽어서 판단하고, 시각적 검증을 위해 브라우저를 열지 않는다.
- **push 금지** — `git push`는 사용자가 명시적으로 요청할 때만 실행한다. 커밋 후 자동으로 push하지 않는다.

### Tailwind CSS 규칙

- **최소 글씨 크기: `text-base` (1rem / 16px)**
- `text-xs`, `text-sm` 사용 금지
- `text-[0.8rem]` 등 `text-base` 미만 임의 크기 사용 금지
- 글씨 크기는 Tailwind 기본 스케일 사용: `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl` …
- 더 큰 크기에서 스케일에 딱 맞는 값이 없을 때만 `text-[...]` 임의 값 허용

### Git 규칙

- 커밋 메시지에 AI 관련 문구 일체 금지: `Co-Authored-By:`, `Generated with`, `🤖` 등 모든 형태
- 커밋은 요청 시 자동 실행한다
- **push는 사용자가 명시적으로 요청할 때만 실행한다**

## 알려진 사항

- post 152, 250, 669: validate.py "빈 본문" false positive — 정상 포스트
- post 343 ("지식채널E 오프닝 동영상"), post 351 ("스카우트"): 삭제됨
- `src/content/itmir/` 경로는 Astro content collection 규격에 맞춘 것
