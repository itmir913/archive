---
title: "ramdisk_offset 만들기"
date: "2013-07-21T00:57:09+09:00"
category: "Android/Build"
tags: []
description: "cm10까지는 ramdisk_offset이라는것을 작성하지 않아도 그냥 빌드가 되었지만 cm10.1로 오면서 많은 변화가 나타났습니다"
draft: false
original_url: "https://itmir.tistory.com/271"
---

cm10까지는 ramdisk_offset이라는것을 작성하지 않아도 그냥 빌드가 되었지만 cm10.1로 오면서 많은 변화가 나타났습니다

이것이 왜 필요한지는 모르겟습니다.. 아마 mkbootimg 바이너리 파일의 소스가 변경된듯 합니다

제 기억으로는 ramdisk_offset이 있는 소스가 낡은 소스로 알고 있는대 아닐지도 모르지만 왜 cm-10.1에서는 이 소스로 mkbootimg를 만들어 사용하는지 원...

아무튼 빌드하다 보면 아래와 같은 오류가 나타나며 빌드가 안됩니다

```
Target boot image: /home/whdghks913/cm_lucid/system/out/target/product/ef46l/boot.img

usage: mkbootimg

       --kernel <filename>

       --ramdisk <filename>

       [ --second <2ndbootloader-filename> ]

       [ --cmdline <kernel-commandline> ]

       [ --board <boardname> ]

       [ --base <address> ]

       [ --pagesize <pagesize> ]

       [ --ramdisk_offset <address> ]

       -o|--output <filename>

make: *** [/home/whdghks913/cm_lucid/system/out/target/product/ef46l/boot.img] 오류 1
```

어이가 없죠... 갑자기 mkbootimg의 usage가 나오다니..

이건 ramdisk_offset을 지정하지 않았기 때문에 발생합니다

BoardConfig.mk을 수정해야만 합니다

BOARD_FORCE_RAMDISK_ADDRESS

이 구문을 찾아주세요

이건 램디스크 주소(Ramdisk address)를 저장하는 값입니다

그러나 이 구문은 cm10까지만 쓰일수 있고 cm10.1부터는 이 구문을 사용할수 없습니다

다만 아래 구문을 사용하라는 메모가 나타납니다

BOARD_MKBOOTIMG_ARGS

그러나 위 구문을 사용한다 해도 RAMDISK_ADDRESS에 맞는 값을 그냥 넣으면 맨 위에 있는 usags가 나타납니다 -_- 어쩌라는 건지 원...

이 구문에는 ramdisk_offset이 들어가야만 합니다

지금부터 이 값을 구하는 방법을 알려드리겠습니다

정리된게 없더라고요 이 곳에서 정확한 답을 찾아가셨으면 합니다 ㅎㅎ

**Ramdisk_offset = Ramdisk address - kernel base**

입니다;;

즉 우리가 cm10.1에서 부터 필요한 offset값은 기존 address값에서 base값을 빼주면 되는거였습니다;;

그러나 그냥 빼주면 안됩니다

각 값은 16진수 이나 뺄셈을 하기 위해 10진수로 변환한뒤 다시 16진수로 변환해야 합니다

그럼 계산 순서를 말씀드리겠습니다

1. ramdisk address값을 10진수로 변환한다

2. kernel base값을 10진수로 변환한다

3. address값에서 base값을 뺀다, 즉 address - base

에를 들면 address가 10이고(그럴일은 절대 없겠지만 예시 입니다) base값이 4라면 address - base = 6 이 되는 겁니다

4. 뺀 값을 다시 16진수로 변환한다

5. 4번에서 16진수로 변환한 값이 최종 ramdisk_offset의 값이다!!

자, 좀 복잡하기도 합니다..

마켓에 진수 변환이 가능한 어플도 있고 편법으로 윈도우7에 내장되어 있는 기본 계산기로도 진수 변환은 가능하나 자세한 언급은 생략하겠습니다

이제 최종 ramdisk_offset의 값을 필요로 하는 BOARD_MKBOOTIMG_ARGS에 넣어줘야 하는대요

이것도 그냥

BOARD_MKBOOTIMG_ARGS := 나온 값

이렇게 넣어줘 버리면 안됩니다

BOARD_MKBOOTIMG_ARGS := --ramdisk_offset 나온값

이렇게 해서 넣어주세요

예를 들면

BOARD_MKBOOTIMG_ARGS := --ramdisk_offset 0x02400001

이렇게 지정해 주시면 됩니다 ㅎㅎ

이렇게 해서 귀찮은 ramdisk_offset을 구하는 방법에 대해 알아보았습니다~

도움이 되셨다면 추천 부탁드리고 널리 퍼트려 주세요~

참고

Sleepy님의 4.1.2 디바이스 소스로 4.2.1 빌드하기
