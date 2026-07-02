---
title: "커널(menuconfig)에 대한 각종 설정 / 팁"
date: "2013-01-27T15:51:26+09:00"
category: "Android/Kernel"
tags: []
description: "이 글은 메가소마님 블로그에 포스팅된 내용을 제가 다시한번 정리하고 추가 한것임을 밝힙니다"
draft: false
original_url: "https://itmir.tistory.com/36"
---

이 글은 메가소마님 블로그에 포스팅된 내용을 제가 다시한번 정리하고 추가 한것임을 밝힙니다

원본 출처는 메가소마님 블로그 (<http://blog.naver.com/squake/20166635140>)에 있습니다

커널 컴파일 하면서 심심해서 쓰는 글입니다 ㅇㅅㅇ

대부분의 내용은 make.sh를 이용하는 것으로 이것은 <http://blog.naver.com/squake/20162490596> 에서 얻으실수 있습니다

make.sh는 자신의 기종에 맞게 수정하셔야 합니다

**1. 이 커널은 이제 제겁니다! 표시 만들기**

처음 커널 만들면서 구현하려고 노력했던 건대요

커널에 대한 자신의 꼬리표(?)를 집어 넣는 방법입니다

의외로 간단 합니다

./make,sh menuconfig진입해서 General setup으로 들어간뒤 Local Version부분에서 엔터 하시고 입력하시면 됩니다

커널 정보에 나타나게 됩니다

**2.Tiny RCU 사용방법**

Tiny RCU가 뭘까요?....

<http://icarus21.tistory.com/27>

영어 크리;;

사용 활성화 방법은

General setup/RCU Subsytem/RCU Implementation/UP-only small-memory-footprint RCU

이렇게 설정하시면 된다고 합니다

자세한 효과는 잘 모르겠네요 ...

**3. 모듈만 빌드하기**

모듈만 빌드할 필요가 있는지는 잘 모르겠네요...

./make.sh하면 나오던대...

모듈만 따로 빌드하려면 ./make.sh modules

이렇게 하시면 된다고 하셨습니다

**4. 커널 마이너 패치**

kernel.org등의 사이트 에서 리눅스 커널 소스를 받은뒤

자신의 커널소스와 버전업할 커널소스를 풀어두고 터미널에서

diff -urpN linux-2.6.35.7 linux-2.6.35.8 > kernel.patch

이렇게 하시면 두 버전의 차이가 자세하게 기록되어 있는 kernel.patch파일이 나오게 되는대요

이걸 patch -p1 < kernel.patch 이렇게 커널 소스에서 터미널로 치시면 패치가 적용됩니다

**5. Log size조정으로 64kb 메모리 확보하기**

General setup/ Kernel log buffer size가 기본으로 17으로 되어 있습니다

이건 128kb을 사용하는대요 16으로 바꿔주게 된다면 64kb를 사용하므로써 램이 64kb남게 됩니다

(뭐 이렇게 까지 할....)

**6. I/O 스케줄러 변경**

Sio와 같은 io스케줄러를 변경하려면 아래와 같이 찾아 가면 됩니다

Enable the block layer/IO Schedulers

그럼 커널에 추가할 스케줄러와 기본 스케줄러를 선택할수 있습니다

참고로 io스케줄러의 커널소스 위치는 커널소스/block 에 위치합니다

**7. 부팅클럭 조절하기**

부팅때 최대 클럭을 설정할수 있습니다

System Type/[ ]Set Min/Max CPU frequencies를 활성화 하게 되면 아래 나타나게 됩니다

커널에서 기본 지원되는 커널만 사용가능한다고 합니다

만약 800Mhz라면 800000으로 기입하면 됩니다 단위는 khz같은대 정확하진 않습니다

**8. SLOB 활성화 하기**

SLOB란 무엇일까요?

메가소마님 말씀을 인용하면

메모리 관리자, SLOB가 소형 임베디드 시스템에 더 최적화 되서 적은양의 메모리로 동작하는 것으로 알고있습니다.

한마디로 더 최적화 되어 있다는것 같습니다

General setup/Choose SLAB allocator/SLOB

선택해 주시면 됩니다
