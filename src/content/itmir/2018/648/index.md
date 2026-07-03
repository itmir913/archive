---
title: "MealLibrary 오류를 수정했습니다."
date: "2018-02-12T23:58:35+09:00"
category: "Application"
tags: []
description: "https로 수정됨에 따라 파싱이 되지 않는 오류를 수정했습니다."
draft: false
original_url: "https://itmir.tistory.com/648"
---

https로 수정됨에 따라 파싱이 되지 않는 오류를 수정했습니다.

자세한 내용은 나중에 이 글에 덧붙여서 추가하고, 지금은 오류 수정 사실만 먼저 빨리 알려드립니다.

단순히 주소를 https로 수정했다고 모든 학교의 나이스 급식 파싱이 정상적으로 진행되지 않더라고요.

https의 보안과 관련된 코드를 추가해서 이 오류를 해결했습니다.

또한, 칼로리 항목이 유동적으로 변해서 값을 가져오지 못하는 현상을 발견했고, 이 현상을 유연하게 대처하기 위한 코드를 추가했습니다.

<https://github.com/itmir913/wondanghighschool>

app/src/main/java/toast/library/meal/MealLibrary.java

링크 클릭하셔서 MealLibaray.java를 사용하시면 됩니다.

Version 8, Update 2018-02-12

제 태블릿 PC의 작업 환경이 너무 느리고 나빠서 그래픽카드님의 컴퓨터와 팀뷰어로 원격 접속했습니다.

팀뷰어로 원격 작업을 통해 원인을 빠르게 파악했고, 이에 대처하는 코드 수정을 할 수 있었습니다.
