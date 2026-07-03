---
title: "커널(Kernel) 개발 환경 구축하기"
date: "2014-01-26T12:06:52+09:00"
category: "Android/Kernel"
tags: []
description: "안드로이드를 위한 커널 개발 환경 구축하기"
draft: false
original_url: "https://itmir.tistory.com/449"
---

**안드로이드를 위한 커널 개발 환경 구축하기**

이 글은 우분투(Ubuntu)를 기준으로 작성됩니다.

우분투가 설치된 상황을 가정한 상태에서 쓰여졌습니다.

루트권한(#)을 얻은상태에서 진행할경우, sudo를 제외한뒤 사용하세요.

명령어의 맨앞 "$"는 입력하지 않습니다.

죄송합니다. 이 글은 너무 오래 된 방법이므로 진행하지 말아주시고

다른 최신 버전에 맞는 글(또는 README파일)을 참고하여

커널 개발 환경을 구축해 주시기 바랍니다.

1. 필수 패키지 설치하기

커널 환경을 위해 필수 패키지를 설치해야 합니다.

$ sudo apt-get install git-core gnupg flex bison gperf libsdl1.2-dev libesd0-dev build-essential zip curl libncurses5-dev zlib1g-dev valgrind

호환성 문제가 발생할 경우 설치가 되지 않는 패키지를 제외한 후 설치하세요.

또는 A패키지는 B로 대신할 수 있습니다 같은 문구가 나올경우 대신해서 설치하세요.

2. 자바(Java)설치하기

두번째로 자바를 설치해야 합니다.

$ sudo add-apt-repository ppa:webupd8team/java

$ sudo apt-get update

$ sudo apt-get install oracle-java6-installer

파란배경으로 자바 라이센스 동의가 나타날경우,

Tab(탭)버튼을 눌러 OK를 눌러주세요.

3. 툴체인 설치하기

툴체인에 대해서는 [[Kernel] - Android Toolchain (툴체인) 모음](/archive/itmir/2013/349) 포스팅을 확인해 주세요.

툴체인은 아래에서 받을수 있습니다.

원하는 커널에 맞는 툴체인을 사용해야 합니다.

확인할수 있는 방법은 커널을 다운받은다음 README.txt를 열어보시면 무슨 툴체인을 사용해야 하는지 알려줍니다.

아래 다운로드 링크중 하얀 박스는 arm에 최적화된 linaro툴체인이며, 다른 박스들은 구글이 제공하는 arm-eabi툴체인입니다.

어떤 툴체인을 사용하는지에 따라 흐름이 달라지니 잘 선택해 주세요.

(1) 기본적으로 오류를 가장 적게 내며 Readme가 하라는 대로 하고 싶다. - arm-eabi 툴체인

(2) arm계열에 더 최적화되어 좀더 빠른 성능과 linaro를 썼다는 자부심(?)을 느끼고 싶다. - linaro 툴체인

리나로 툴체인에 더 알고 싶다면 : [[Kernel] - 리나로(linaro) 툴체인으로 빌드하기](/archive/itmir/2014/439)

android-toolchain-eabi-4.7-2013.06-x86


arm-eabi-4.4.0


arm-eabi-4.4.3


arm-eabi-4.6


참고 : arm-eabi-4.7, 4.8

https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.6/

https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.7/

https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.8/

다운받으신 다음 HOME폴더에 압축을 풀어주세요.

그다음 폴더 명을 툴체인 이름에 맞게 바꿔주세요.

linaro-toolchain

arm-eabi-4.4.0

arm-eabi-4.4.3

arm-eabi-4.6

바꿔주신다음 아래 명령어를 쳐서 한번에 권한을 줍시다.

chmod 777 -R (폴더경로)

예를들어 홈 폴더에 툴체인이 있다면 각각

chmod 777 -R ~/linaro-toolchain

chmod 777 -R ~/arm-eabi-4.4.0

chmod 777 -R ~/arm-eabi-4.4.3

chmod 777 -R ~/arm-eabi-4.6

이제 아래 명령어를 치면 텍스트 에디트가 나옵니다.

gedit ~/.bashrc

맨 아래에 추가해 주시면 됩니다.

export JAVA\_HOME=/usr/lib/jvm/java-1.6.0-sun

export ANDROID\_JAVA\_HOME=$JAVA\_HOME

export CROSS\_COMPILE=$HOME/(툴체인 폴더명)/bin/arm-eabi-

export PATH=$PATH:$HOME/(툴체인 폴더명)/bin/

export ARCH=arm

툴체인 폴더명은 다들 아시죠?

4. 유용한 커널 관련 팁

config관련 명령

make menuconfig

컴파일 결과물 청소하기

make mrproper

make cleaner

make clean

참조 : /archive/itmir/2013/51

/archive/itmir/2013/220

/archive/itmir/2013/349

/archive/itmir/2014/439