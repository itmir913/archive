---
title: "CM7을 빌드했습니다만 fastboot모드에서 진행하지 않습니다"
date: "2013-01-18T14:39:00+09:00"
category: "Android/Build"
tags: []
description: "오늘 cm7을 4시간 만에 모두 빌드 완료했습니다."
draft: false
original_url: "https://itmir.tistory.com/19"
---

오늘 cm7을 4시간 만에 모두 빌드 완료했습니다.

그런대 fastboot모드에서 멈춰있고 진행하지 않습니다.

fastboot모드 확인은 컴퓨터에 연결해본 결과 adb devices에선 안잡히던것이 fastboot devices에서 잡혀 알게되었습니다.

adb가 안되니 방법이 없을듯 했으나 cwm으로 들어가

<http://cafe.naver.com/develoid/122078>

이 게시글 대로 해보니 다음과 같은 로그가 나왔습니다.

평소 리커버리에서 나오는 로그가 아닌것으로 봐 logcat으로 생각됩니다.

뭐가 필요하다는 뜻같기도 한데, 무슨뜻인지 아시는분 꼭좀 알려주시면 감사하겠습니다.

--------- beginning of /dev/log/main

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000000 t1=0x00000000

I/ARMAssembler(   75): generated scanline\_\_00000077:03545404\_00000000\_00000000 [ 29 ipp] (43 ins) at [0x2ad3c1e8:0x2ad3c294] in 214999 ns

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000000 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000a08 t1=0x00000000

I/ARMAssembler(   75): generated scanline\_\_00000077:03545404\_00000A08\_00000000 [ 30 ipp] (52 ins) at [0x2ad3c298:0x2ad3c368] in 161666 ns

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000000 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000000 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000a08 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000000 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000000 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000a08 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000000 t1=0x00000000

I/pixelflinger(   75): Needs: n=0x03545404 p=0x00000077 t0=0x00000a08 t1=0x00000000
