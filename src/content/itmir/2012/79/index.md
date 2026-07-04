---
title: "2012-08-24-2012-08-25 interactive와 interactivex추가 lagfree제거"
date: "2012-08-25T13:42:32+09:00"
category: "Android/Kernel"
tags: []
description: "어제는 interactive을 추가했고"
draft: false
original_url: "https://itmir.tistory.com/79"
---

어제는 interactive을 추가했고

방금 interactivex을 추가했습니다

그런대 interactive추가한 상태에서 커널 패닉(?)이라는 것이 발생하더군요

왜 그런지 모르겠습니다만 제 커널에서만 발생하니 아마 뭔가 문제가 있는듯 합니다

그래서 원인을 찾기위해 lagfree를 제거하였습니다

원래 오류가 있었...;;?

사용 명령어

./make.sh

lagfree는 menuconfig에서 선택 제거 하였습니다

소스를 완전 지운것은 아닙니다

그리고 github를 사용해 보고 싶은대 방법을 잘 모르겠습니다;;

알려주세요~
