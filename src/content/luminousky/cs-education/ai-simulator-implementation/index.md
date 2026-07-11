---
title: "인공지능 시뮬레이터 직접 구현 — 한국어 자료 부재와 사이트 폐쇄"
date: "2026-07-12T00:00:00+09:00"
description: "인공지능기초 수업에서 쓸 한국어 시뮬레이터가 없어서 직접 만들었다 — 16개 구현"
draft: false
---

## 배경

인공지능기초 수업에서 알고리즘 동작을 시각적으로 보여줄 시뮬레이터가 필요했다. 탐색 알고리즘이 어떻게 경로를 찾는지, k-NN이 어떤 기준으로 분류하는지, 강화학습 에이전트가 어떻게 학습하는지는 설명만으로는 부족하다.

기존에 있는 자료를 찾아봤다.

**한국어 시뮬레이터가 거의 없다.** 있더라도 파편화되어 있고, 영어권 자료는 수업에 바로 쓰기 어렵다. 몇 년 전 발견한 시뮬레이터 사이트가 어느 순간 운영 중단된 경험도 있었다. 외부 사이트에 의존하면 언제 사라질지 알 수 없다.

직접 만드는 편이 낫다는 결론을 내렸다.

## 구현 범위

`_Visual_Assets/simulator/ai/` 에 현재 16개의 시뮬레이터가 있다.

**탐색 (Search)**
- BFS / DFS (`search-bfs-dfs.html`)
- 휴리스틱 탐색 (`search-heuristic.html`)
- 8-퍼즐 (`search-8-puzzle.html`)
- N-Queen (`search-n-queen.html`)
- Wumpus World (`wumpus-world.html`)

**지도학습 (Supervised)**
- 선형 회귀 (`supervised-linear-regression.html`)
- 다항 회귀 (`supervised-polynomial-regression.html`)
- 로지스틱 회귀 (`supervised-logistic-regression.html`)
- k-NN (`supervised-k-nn.html`)
- 결정 트리 (`supervised-decision-tree.html`)
- SVM (`supervised-svm.html`)

**비지도학습 (Unsupervised)**
- k-Means (`unsupervised-k-means.html`)

**강화학습 (Reinforcement)**
- GridWorld (`reinforcement-gridworld.html`)
- Multi-Armed Bandit (`reinforcement-multi-armed-bandit.html`)

**딥러닝 / 컴퓨터비전**
- 딥러닝 (`deep-learning.html`)
- 컴퓨터비전 — ml5.js 기반 (`computer-vision-ml5.html`)

## 기술 선택

모든 시뮬레이터는 외부 서버 없이 브라우저 단독으로 동작하는 단일 HTML 파일이다. CDN이 끊기거나 사이트가 사라지는 문제를 직접 경험했기 때문에, 의존성을 최소화했다. 강의노트와 마찬가지로 GitHub Pages로 제공한다.
