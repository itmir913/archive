---
title: "luminousky.com 도메인 운영 기준"
date: "2026-07-08T00:00:00+09:00"
description: "정적(GitHub Pages)과 동적(Docker) 서비스를 서브도메인 기준으로 분리한다"
draft: false
---

luminousky.com 도메인은 두 계층으로 분리해 운영한다.

## 기준

- `luminousky.com/*` — GitHub Pages 정적 호스팅. 랜딩 페이지, 아카이브, 프로젝트 페이지 등 공개 콘텐츠.
- `*.luminousky.com` — Docker 기반 동적 서버. 서비스형 도구 (예: `oj.luminousky.com`).

루트 도메인 경로는 정적, 서브도메인은 동적이라는 단순한 원칙이다.

## 결정 경위

### 구조적 필연

설계보다 연결이 먼저였다.

`luminousky.com` 루트 도메인을 GitHub Pages용 `github.io` 레포지토리와 연결한 것이 출발점이다. GitHub Pages는 레포지토리 하나를 루트 도메인에 연결하면 그 하위 경로 전체(`luminousky.com/*`)가 해당 레포지토리의 정적 배포로 서비스된다. 루트 도메인 자체가 GitHub Pages에 묶인 순간, `luminousky.com/*`는 자연스럽게 정적 호스팅 영역이 되었다.

동적 서비스가 필요해졌을 때, 루트 경로는 이미 GitHub Pages가 점유하고 있었다. 선택지는 서브도메인뿐이었고, Docker 기반 서버를 `*.luminousky.com`에 연결하는 것으로 정리되었다.

### 서비스 분리 원칙

정적(GitHub Pages)과 동적(Docker)은 배포 방식, 관리 주체, 인프라가 근본적으로 다르다. 이 차이를 URL 구조에도 그대로 반영하기로 했다. 루트 경로는 항상 정적, 서브도메인은 항상 동적 — 운영 방식이 다른 두 영역을 URL 단에서도 명확히 가른다.

### URL 구조 확정으로 혼동 방지

URL만 보면 서비스 성격을 즉시 알 수 있어야 한다.

- `luminousky.com/archive` → GitHub Pages에서 서비스되는 정적 콘텐츠
- `oj.luminousky.com` → Docker 서버에서 실행되는 동적 서비스

이 규칙 하나로 어떤 URL이 생겨도 성격이 자명해진다. 새 동적 서비스는 `*.luminousky.com`으로 자연스럽게 확장되며, 경로 기반(`luminousky.com/newservice`)으로 추가할 경우 발생할 수 있는 GitHub Pages 레포지토리 구조와의 충돌도 원천 차단된다.

### 명문화 시점

2026-07-03, Luminousky Archive 프로젝트 Charter를 정리하면서 Constraints 항목으로 직접 명문화했다. 별도 논의나 외부 제안 없이, 당시 운영 방식을 원칙으로 정리한 것이 최초 기록이다.
