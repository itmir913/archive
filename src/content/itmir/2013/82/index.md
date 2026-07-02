---
title: "2012-08-25 github에서 복사한 lulzactive소스로 컴파일"
date: "2013-01-28T13:44:52+09:00"
category: "Android/Kernel"
tags: []
description: "아까 화면꺼짐 먹통의 원인이 lulzactive이었습니다"
draft: false
original_url: "https://itmir.tistory.com/82"
---

아까 화면꺼짐 먹통의 원인이 lulzactive이었습니다

이 문제의 원인이 소스 문제라 생각하고 소스를 찾아본 결과

<https://github.com/tegrak/lulz-kernel_gt-i9100/blob/684133e05cc64f5b26e146e652051808bbfbb74e/kernel/drivers/cpufreq/cpufreq_lulzactive.c>

이곳에 있던 소스 긁어 왔습니다 ㅋㅋ

m31님이 올려준 소스랑 크기 차이가 좀 나더라고요

아무튼 넣고 돌려봤는대 뭔 한줄 오류가 뜸니다

그런대 컴파일은 되더라고요?!!

무시하고 넣어보니 잘됩니다 ㅋㅋ

이전처럼 화면 프리징도 안생기고요 ㅇㅅㅇ

그럼 오늘은 그만 마치겠습니다

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) 2012-08-25 github에서 얻은 lulzactive소스 컴파일.zip](/attachment/cfile4.uf@2001F23D5106023E0BC0EF.zip)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) cpufreq\_lulzactive.c](/attachment/cfile10.uf@237AA63D510602411ABF95.c)
