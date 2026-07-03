---
title: "사용자 어플 (User App)을 시스탬 어플 (System App)으로 변환하기"
date: "2013-11-24T23:02:00+09:00"
category: "SmartPhone/Android"
tags: []
description: "Deodex/Odex 개념 설명과 함께 사용자 어플을 시스템 어플로 변환하는 방법을 소개합니다."
draft: false
original_url: "https://itmir.tistory.com/385"
---

**Deodex → Odex**

먼저 이 글은 웃음 투자님의 글을 바탕으로 만들어진 글임을 밝힘니다

원본글은 : <http://softdx.kr/60171824456> 입니다

사용자 어플을 시스탬 어플로 만들려고 하신적 많으시죠?

그런대 나의 롬이 odex롬입니다...

귀찮은 작업을 하게 되는대요

어떤 작업을 하는지 한번 탐구해 보겠습니다

adb shell su

./dexopt-wrapper (어플 이름).apk a.odex $BOOTCLASSPATH

busybox dd if=/system/app/(어플 이름).odex of=a.odex bs=1 count=20 skip=52 seek=52 conv=notrunc

mv a.odex (어플 이름).odex

이러한 작업이 필요합니다

그런대 이 방법은 이상하게도 실패 하시는 분들이 너무 많습니다

그래서 이 게시글에서는 간단하지만 잘 알려지지 않은 방법을 소개 하려 합니다

사진이 없는점 양해 부탁드립니다

1. deodex어플을 준비한다

2. 어플을 설치하면 생기는 달빅캐쉬를 가져온다

/data/dalvik-cache로 이동하여 알맞은 달빅캐쉬를 가져옵니다

예)data@app@(패키지이름).apk@classes.dex

3. 가져온 달빅캐쉬 파일을 odex확장자로 변경한다

4. 원본 어플을 열어 classes.dex파일을 제거합니다

5. classes.dex가 제거된 apk와 odex파일을 system/app에 집어 넣습니다

끝~

여기서 뭔가 발견하셨습니까?

바로 달빅캐쉬가 odex파일이라는 사실입니다

/data/dalvik-cache에 캐쉬의 형태로 존재하는 파일이 바로 안드로이드 시스탬 OS에서 odex화한 파일이라는 것입니다

즉 패키지를 설치하면서 안드로이드 OS는 자동으로 달빅캐쉬를 생성하면서 odex를 만드는거죠

이것을 이용하면 deodex에서 odex화 하는것이 정말 간단합니다

이렇게 해서 사용자 어플을 시스탬 어플로 변경하는 방법을 알아보았습니다
