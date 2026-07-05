---
title: "Vue 프론트엔드 리팩토링 — 반복 패턴 제거와 공통 컴포넌트 추출"
date: "2026-04-26T12:00:00+09:00"
description: "1,580줄 ImportSection, 7개 모달의 중복 CSS — BaseModal과 WizardLayout 추출로 정리한 과정"
draft: false
---

## 발견: 이 프로젝트는 Tailwind를 template에서 쓰지 않는다

24개 Vue 파일을 전수 분석했을 때 가장 먼저 눈에 띈 것은, Tailwind 클래스가 template에 거의 없다는 점이었다. 모든 스타일이 `<style scoped>`에 들어가 있었다.

결과적으로 동일한 패턴이 파일마다 복붙됐다:

| 패턴 | 중복 파일 수 |
|------|------------|
| 모달 프레임 (overlay·container·header·close·footer) | 7개 |
| 버튼 3종 (primary·secondary·danger) | 10개 |
| 에러·성공 메시지 박스 | 6개 |
| Wizard 레이아웃 (step indicator·본문·이전/다음) | 3개 |

`ImportSection.vue`는 CSS만 1,580줄이었다.

## 리팩토링 단계

### 1단계: 전역 클래스 추출

`src/style.css`에 13개 전역 클래스를 정의했다. Tailwind의 `@layer components`는 사용하지 않았다 — `@layer` 안의 규칙은 unlayered CSS보다 항상 낮은 우선순위를 가져서, 같은 선택자라도 scoped CSS에 덮이는 문제가 생기기 때문이다.

```css
/* unlayered — 우선순위 문제 없음 */
.btn-primary { ... }
.modal-overlay { ... }
.state-box { ... }
```

### 2단계: BaseModal 컴포넌트

```vue
<BaseModal title="학생 추가" :max-width="640" @close="close">
  <template #default> ... </template>
  <template #footer> ... </template>
</BaseModal>
```

Props: `title`(필수), `maxWidth`(기본 640px), `maxHeight`(기본 85vh), `label`(헤더 2줄용).  
`<Teleport to="body">`와 `<Transition name="modal">`을 내장해, 적용 4개 파일에서 overlay·container·hdr·close·ftr div와 관련 scoped CSS를 모두 제거했다.

### 3단계: WizardLayout 컴포넌트

Import(6단계), Export(3단계), Checklist(3단계), Inspect(3단계), Replace(3단계) — 5개 섹션이 동일한 Wizard 골격을 각자 구현하고 있었다. step indicator, 본문 스크롤, 이전/다음 버튼, 단계 이동 시 스크롤 top 복귀가 전부 파일마다 반복됐다.

```vue
<WizardLayout
  :step-count="6"
  :current-step="currentStep"
  :can-go-next="canGoNext"
  :show-footer="!importResult"
  @prev="goPrev"
  @next="goNext"
>
  <!-- 각 단계별 내용 -->
</WizardLayout>
```

`watch(currentStep → scrollTo top)` 로직도 컴포넌트 내부로 흡수했다. 5개 파일 합산으로 약 400줄 CSS + 45줄 script가 줄었다.

### 4단계: CSS 변수 정비

`--clr-bg-base`, `--clr-blue`, `--clr-text-main` 등 11개 CSS 변수를 `:root`에 추가하고, 전역 클래스 내의 하드코딩 색상을 변수로 교체했다. 이것이 나중에 다크/라이트 테마 전환 작업의 기반이 된다.

## 돌아보며

이 리팩토링에서 얻은 핵심 교훈은 두 가지다.

첫째, **패턴을 발견하기 전에는 추상화하지 말라**. 처음부터 BaseModal을 설계하려 했다면 과잉 설계가 됐을 것이다. 7개 파일에서 동일한 HTML 구조를 확인한 다음에야 추출이 의미가 생겼다.

둘째, **CSS 우선순위 규칙을 먼저 이해하라**. `@layer components`가 직관적으로 맞아 보이지만, unlayered CSS보다 항상 낮은 우선순위를 갖는다는 점을 모르면 scoped CSS와 충돌하는 버그를 만난다.
