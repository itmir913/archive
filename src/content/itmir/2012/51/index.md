---
title: "커널 컴파일을 위한 기본 설정 구축하기"
date: "2012-12-21T16:22:05+09:00"
category: "Android/Kernel"
tags: []
description: "이 강좌는 사람님의 강좌를 바탕으로 제작되었습니다"
draft: false
original_url: "https://itmir.tistory.com/51"
---

이 강좌는 사람님의 강좌를 바탕으로 제작되었습니다

원본글은 <http://cafe.naver.com/tdadevelop/3581> 입니다

환경 구축 스크립트도 만들어 두었습니다

포스팅중

위 링크를 참고하세요~

1. 우분투 설치

일단 커널을 컴파일 하려면 우분투가 필요하겠죠?ㅋㅋ

ISO로 멀티부팅으로 하셔도 되고 가상머신도 됩니다

우분투만 마련해 주세요

2. 필수 패키지 설치

sudo apt-get install git-core gnupg flex bison gperf libsdl1.2-dev libesd0-dev build-essential zip curl

libncurses5-dev zlib1g-dev valgrind

이래되도 한줄입니다 ㄷ

전부 입력해 주세요

이제 자바를 설치해야 합니다

sudo add-apt-repository "deb <http://kr.archive.ubuntu.com/ubuntu/> hardy multiverse"

sudo add-apt-repository "deb

<http://kr.archive.ubuntu.com/ubuntu/> hardy-updates multiverse"

이렇게 입력해 주시면 됩니다

두 명령어는 우분투에 자바를 어디어 받을지 각인시켜 줍니다

그다음

sudo apt-get update

sudo apt-get install sun-java6-jdk

이 둘을 입력하여 자바를 설치해 줍니다

라이센스 동의가 나올탠대요 탭키-확인-Yes를 눌러주시면 완료됩니다

3. 툴체인 설치

<http://www.mediafire.com/file/msmnxt8n6xj6ayf/arm-eabi-4.4.0.zip>

위 링크에 들어가 arm-eabi-4.4.0을 받아 줍니다

이것을 최상단 폴더(/home/계정명/)에 넣에 주시면 됩니다

그뒤

cd ~/arm-eabi-4.4.0/bin

chmod +x ./*

cd ~/arm-eabi-4.4.0/arm-eabi/bin

chmod +x ./*

cd ~/arm-eabi-4.4.0/libexec/gcc/arm-eabi/4.4.0

chmod +x ./*

cd ~/arm-eabi-4.4.0/libexec/gcc/arm-eabi/4.4.0/install-tools

chmod +x ./*

모두다 쳐주세요 ㄷ

마지막으로

gedit ~/.bashrc

를 입력하시면 편집기가 뜰탠대요 맨밑에

export JAVA_HOME=/usr/lib/jvm/java-1.6.0-sun

export ANDROID_JAVA_HOME=$JAVA_HOME

export CROSS_COMPILE=$HOME/arm-eabi-4.4.0/bin/arm-eabi-

export PATH=$PATH:$HOME/arm-eabi-4.4.0/bin/

export ARCH=arm

를 추가해 주시면 됩니다

PS. 아샌 이상 커널 컴파일시에는 툴체인 버전이 4.4.3이 필요합니다

방법은 4.4.0과 같으며 4.4.3으로 바꿔주시면 됩니다

이제 커널 컴파일을 위한 환경이 구축되었습니다 ㅎ

명령어는 txt파일로 올려두었습니다

[커널 작업환경.txt](./files/커널 작업환경.txt)

[2013/01/27 - [강좌/팁/Kernel/Build 강좌] - 커널 컴파일을 위한 기본 환경 구축 스크립트](/archive/itmir/2013/52)

---

## 첨부파일

- [커널 작업환경.txt](./files/커널 작업환경.txt)