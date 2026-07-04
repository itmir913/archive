---
title: "입시자료 통합검색 — Google Drive Boolean 검색 시스템"
date: "2026-04-01T00:00:00+09:00"
description: "외부 서버 없이 Google Apps Script만으로 구축한 입시 PDF 키워드 검색 웹앱, 그리고 Docker 독립 서버 버전"
draft: false
---

## 배경

학교에는 입시 관련 PDF가 수백 개 쌓인다. 대학별 모집요강, 전형 안내, 면접 자료 등이 Google Drive 공유 폴더에 올라오는데, 특정 키워드로 어떤 파일이 있는지 빠르게 찾을 방법이 없었다. Google Drive 검색은 파일명만 보거나 전체 텍스트 검색이 부정확했다.

요구사항:
- 외부 서버·회원가입 없이 Google Workspace for Education만으로 구축
- 학교 교사라면 누구나 링크 하나로 접근

두 가지 버전을 만들었다. GAS(Google Apps Script) 버전은 서버 없이 구동되고, Docker(Node.js+Express+SQLite) 버전은 OAuth2 기반 독립 서버다.

## 핵심 기능: Boolean 검색 파서

단순 키워드 검색이 아닌 `AND / OR / NOT` 연산자를 지원한다.

```
논술 AND 면접          → 두 키워드 모두 포함한 파일
(인문계 OR 자연계) AND 서울대
논술 NOT 면접         → 논술은 있지만 면접은 없는 파일
```

### 파서 구현

`tokenize()` → `BooleanParser.parse()` → `evaluate()` 3단계 파이프라인으로 처리한다.

**tokenize**: `|||` 구분자 방식. `AND/OR/NOT`과 괄호 앞뒤에 `|||`를 삽입해서 split한다. 공백 포함 키워드(`서울 대학교`)를 하나의 토큰으로 보존하는 것이 핵심이다.

**BooleanParser**: ES5 생성자+prototype 방식. 우선순위는 `NOT > AND > OR`. 닫는 괄호가 없어도 자동 보완한다.

**evaluate**: 집합 연산. AND는 단락평가(왼쪽 empty면 Drive API 호출 생략), NOT은 `getAllFileIds() - evaluate(operand)` 차집합이다.

## 캐시 구조

GAS의 CacheService는 키당 100KB 제한이 있어 직접 청크 분할을 구현했다.

- **메타데이터 캐시**: 30,000자 단위로 분할. 키: `meta_chunk_0`, `meta_chunk_1`, ...
- **키워드 캐시**: 동일 청크 방식. 키: `kw_{keyword}_0`, `kw_{keyword}_1`, ...

한글은 JS UTF-16 기준 1자 = 1 코드 유닛이므로 30,000자 분할이 안전하다.

## 트리거 스케줄 (GAS)

| 시각 | 함수 |
|------|------|
| 02:00 | `rebuildMetadataIndex` — BFS로 Drive 전체 재색인 |
| 02:30 / 07:30 / 12:30 / 17:30 | `warmCache` — 상위 100개 키워드 사전 캐싱 |
| 03:00 | `purgeStaleKeywords` — 3일 미검색 키워드 삭제 |

## 12차 검증까지의 여정

초기 구현 후 12차례 검증 세션을 거쳤다. 주요 수정 내역:

- **NOT 연산자 버그**: `getAllFileIds()` 차집합으로 수정
- **Drive API 인젝션**: 작은따옴표, 큰따옴표 이스케이프 추가
- **청크 사이즈**: 한글 멀티바이트를 고려해 90,000자 → 30,000자로 감소
- **경쟁 조건**: `rebuildMetadataIndex`와 정기 트리거 간 `LockService.tryLock(0)` 추가
- **XSS 패턴**: `onclick="window.open('${url}')"` → `data-url` 속성 방식으로 교체

마지막 검증에서 `testBooleanParser` 64개, `testDriveIntegration` 8개 전원 통과.
