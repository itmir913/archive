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

툴체인에 대해서는 [[Kernel] - Android Toolchain (툴체인) 모음](http://itmir.tistory.com/349) 포스팅을 확인해 주세요.

툴체인은 아래에서 받을수 있습니다.

원하는 커널에 맞는 툴체인을 사용해야 합니다.

확인할수 있는 방법은 커널을 다운받은다음 README.txt를 열어보시면 무슨 툴체인을 사용해야 하는지 알려줍니다.

아래 다운로드 링크중 하얀 박스는 arm에 최적화된 linaro툴체인이며, 다른 박스들은 구글이 제공하는 arm-eabi툴체인입니다.

어떤 툴체인을 사용하는지에 따라 흐름이 달라지니 잘 선택해 주세요.

(1) 기본적으로 오류를 가장 적게 내며 Readme가 하라는 대로 하고 싶다. - arm-eabi 툴체인

(2) arm계열에 더 최적화되어 좀더 빠른 성능과 linaro를 썼다는 자부심(?)을 느끼고 싶다. - linaro 툴체인

리나로 툴체인에 더 알고 싶다면 : [[Kernel] - 리나로(linaro) 툴체인으로 빌드하기](http://itmir.tistory.com/439)

android-toolchain-eabi-4.7-2013.06-x86

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z01](http://itmir.tistory.com/attachment/cfile7.uf@26053546523E53F932F41D.z01)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z02](http://itmir.tistory.com/attachment/cfile1.uf@2102DE46523E5401331129.z02)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z03](http://itmir.tistory.com/attachment/cfile21.uf@27717446523E540504F373.z03)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z04](http://itmir.tistory.com/attachment/cfile26.uf@270A8546523E5409307456.z04)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z05](http://itmir.tistory.com/attachment/cfile28.uf@270A4646523E540C30F92B.z05)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z06](http://itmir.tistory.com/attachment/cfile2.uf@2775CE46523E54110262EC.z06)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z07](http://itmir.tistory.com/attachment/cfile27.uf@230FD246523E54142F9B3A.z07)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.z08](http://itmir.tistory.com/attachment/cfile28.uf@220A0646523E541B2EF29C.z08)

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) android-toolchain-eabi-4.7-2013.06-x86.tar.zip](http://itmir.tistory.com/attachment/cfile30.uf@270DE446523E541E2F3799.zip)

arm-eabi-4.4.0

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.0.z01](http://itmir.tistory.com/attachment/cfile27.uf@246C3B46523E543C062230.z01)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.0.z02](http://itmir.tistory.com/attachment/cfile1.uf@237F2046523E544037427B.z02)

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) arm-eabi-4.4.0.zip](http://itmir.tistory.com/attachment/cfile9.uf@2579BD46523E5442017AA1.zip)

arm-eabi-4.4.3

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.3.z01](http://itmir.tistory.com/attachment/cfile25.uf@253B5C41523E54562F7148.z01)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.3.z02](http://itmir.tistory.com/attachment/cfile1.uf@21265141523E545A050A27.z02)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.3.z03](http://itmir.tistory.com/attachment/cfile4.uf@21343741523E545E3270BD.z03)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.3.z04](http://itmir.tistory.com/attachment/cfile26.uf@212D5B41523E5462029BEE.z04)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.3.z05](http://itmir.tistory.com/attachment/cfile27.uf@2745DF41523E54662AAFA4.z05)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.3.z06](http://itmir.tistory.com/attachment/cfile7.uf@273B3C41523E54692F1DCB.z06)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.4.3.z07](http://itmir.tistory.com/attachment/cfile21.uf@26343541523E546D325E81.z07)

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) arm-eabi-4.4.3.zip](http://itmir.tistory.com/attachment/cfile25.uf@2540A241523E54702DD658.zip)

arm-eabi-4.6

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.6.tar.z01](http://itmir.tistory.com/attachment/cfile6.uf@24381D41523E547E32F2AD.z01)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.6.tar.z02](http://itmir.tistory.com/attachment/cfile5.uf@27304E41523E54843443A2.z02)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.6.tar.z03](http://itmir.tistory.com/attachment/cfile26.uf@2145A141523E54882AA74B.z03)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.6.tar.z04](http://itmir.tistory.com/attachment/cfile29.uf@2638A441523E548B2E3602.z04)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.6.tar.z05](http://itmir.tistory.com/attachment/cfile24.uf@233B5C41523E548F30DB83.z05)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.6.tar.z06](http://itmir.tistory.com/attachment/cfile5.uf@2139E141523E549831DE82.z06)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) arm-eabi-4.6.tar.z07](http://itmir.tistory.com/attachment/cfile26.uf@26423241523E549B2DDCD5.z07)

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) arm-eabi-4.6.tar.zip](http://itmir.tistory.com/attachment/cfile5.uf@21584141523E549E258033.zip)

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

참조 : http://itmir.tistory.com/51

http://itmir.tistory.com/220

http://itmir.tistory.com/349

http://itmir.tistory.com/439
