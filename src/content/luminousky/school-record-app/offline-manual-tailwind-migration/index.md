---
title: "오프라인 매뉴얼 구현과 Tailwind 전면 마이그레이션"
date: "2026-06-16T00:00:00+09:00"
description: "CDN 없는 오프라인 매뉴얼, 그리고 scoped CSS → Tailwind 유틸리티 전환으로 다크/라이트 테마를 구현한 과정"
draft: false
---

## 오프라인 매뉴얼

### 요구사항

학교 PC 환경에서는 인터넷 접속이 제한되는 경우가 있다. 매뉴얼을 외부 URL로 제공하면 열리지 않을 수 있다. CDN 폰트·아이콘을 사용하는 HTML을 배포하면 오프라인에서 레이아웃이 깨진다.

두 가지 추가 요구사항이 있었다:
- **PDF 인쇄(Ctrl+P) 지원** — 교사가 종이 매뉴얼로 출력할 수 있어야 한다
- **앱 내 별도 창으로 열기** — 외부 브라우저 없이 앱에서 직접 열어야 한다

Tauri의 `WebviewWindow`가 Chromium 기반이므로 Ctrl+P가 기본 지원된다. `WebviewWindow('manual', { url: '/manual/index.html' })`로 별도 창을 띄우는 방식을 선택했다.

### Vite MPA 구성

매뉴얼 HTML을 Vite의 두 번째 entry point로 등록했다:

```js
// vite.config.js
build: {
  rollupOptions: {
    input: {
      main: resolve("index.html"),
      manual: resolve("manual/index.html"),
    },
  },
},
```

섹션 파일들(`public/manual/sections/*.html`)은 Vite가 처리하지 않으므로 Tailwind의 `@source` 지시어로 스캔 경로를 명시했다. Pretendard 폰트는 `npm` 패키지로 설치해 직접 번들링했다 — `public/fonts/` 복사 방식은 버전 추적이 어렵기 때문이다.

---

## Tailwind 전면 마이그레이션

### 배경: CSS 변수 → Tailwind 유틸리티

4월의 CSS 리팩토링에서 `--clr-bg-base` 같은 CSS 변수를 도입했다. 이것으로 색상 관리는 됐지만, 다크/라이트 테마 전환을 지원하려면 모든 하드코딩 hex와 rgba를 변수 기반으로 바꿔야 했다. 그렇다면 여기서 한 발 더 나아가 scoped CSS 전체를 Tailwind 유틸리티로 대체하기로 했다.

### CSS 변수 → Tailwind 브릿지 설계

17개 런타임 CSS 변수를 `@theme inline`으로 Tailwind에 연결했다:

```css
/* style.css */
:root {
  --c-base: #080b14;
  --c-surface: #0e1220;
  --c-blue: #3b5bdb;
  --c-ink: #e2e8f0;
  /* ... */
}
[data-theme="light"] {
  --c-base: #f8fafc;
  /* ... */
}
```

`bg-surface`, `text-ink-2`, `border-line`, `bg-blue/15` 같은 유틸리티 클래스를 Tailwind가 생성하도록 했다. 라이트 테마는 `document.documentElement.dataset.theme = 'light'`로 토글하면 CSS 변수가 오버라이드된다.

### 작업 과정에서 발견한 함정들

**`@theme inline` 이름 충돌**: `--color-base`를 등록하면 Tailwind가 `.text-base { color: dark }`를 생성한다. Tailwind 기본 유틸리티인 `text-base`(font-size: 1rem)를 덮어쓰는 문제다. `--color-base`를 `@theme inline`에서 제거하고 `.bg-base`를 직접 CSS로 정의해서 해결했다.

**arbitrary hex 스캔 누락**: `text-[#93b8d8]`처럼 arbitrary hex는 Tailwind v4 JIT에서 빌드 결과물에 포함되지 않는 경우가 있다. 반드시 브릿지 클래스(`text-ink-3`)로 대체해야 한다.

**`bg-base` opacity 변형 불가**: `bg-base`를 `@theme inline`이 아닌 직접 CSS로 정의했기 때문에 `bg-base/40`이 동작하지 않는다. 이 경우 `bg-[color-mix(in_oklab,var(--c-base)_40%,transparent)]`를 사용해야 한다.

**parent-child 선택자 대체**: `.sidebar--collapsed .nav-item` 같은 부모-자식 선택자는 자식 요소의 reactive ternary `:class`로 대체했다 (`collapsed` prop ternary → `left-[21px]`/`left-[3px]`).

### 결과

24개 Vue 파일 전체를 마이그레이션했다. scoped CSS가 완전히 제거된 파일이 대부분이고, 나머지 파일도 pseudo-element(`::after`, `::placeholder`)나 복잡한 동적 선택자처럼 Tailwind로 표현할 수 없는 1~4줄만 남겼다.

---

## 돌아보며

이 두 작업은 시기적으로 인접했고, 같은 교훈을 준다: **배포 환경의 제약을 먼저 파악하라**. 인터넷 없는 학교 PC, Tailwind 이름 충돌, Vite의 `public/` 폴더 처리 방식 — 각각 개발 환경에서는 드러나지 않고 실제 배포 조건에서 나타나는 문제들이었다.
