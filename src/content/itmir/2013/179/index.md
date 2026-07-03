---
title: "안드로이드 어플을 Zipalign 해보자"
date: "2013-03-22T19:00:43+09:00"
category: "SmartPhone/Android"
tags: []
description: "이번에는 안드로이드 어플을 zipalign 해보겠습니다"
draft: false
original_url: "https://itmir.tistory.com/179"
---

안녕하세요~

이번에는 안드로이드 어플을 zipalign 해보겠습니다

init.d가 필요합니다 참고해 주세요

살펴보기전 잠깐!

zipalign란 무엇일까요?

우리의 안드로이드 스마트폰이 읽는 비트(bit)가 있습니다

또한 어플도 읽는 비트(bit)가 있지요

zipalign는 스마트폰이 읽는 비트와 어플이 읽는 비트를 같게 설정해 주며 그로 인해 어플의 로딩속도와 딜레이, 램(ram) (각주: 이 램은 512Ram, 1024Ram등의 스마트폰 램을 의미하며 램의 차지 용량이 낮아지는 효과의 뜻은 어플이 구동되며 램에 올려지는 메모리의 크기가 낮아진다는 뜻입니다)의 차지 용량이 낮아지는 효과를 볼 수 있습니다

어플의 용량이 클경우 더욱더 효과가 나타나게 되지요 ㅎ

이제 개념도 알아 봤으니 그 방법도 알아보겠습니다

[zipalign.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/zipalign.zip)

먼저 압축 파일을 받아 압축을 풀어주세요

내용물을 보면 01zipalign_apks와 zipalign파일이 있습니다

모두 확장자는 없는 파일이지요

파일 설명을 하자면 01zipalign_apks는 /system/etc/init.d에 들어가는 파일이며

zipalign파일은 /system/bin폴더에 들어가는 바이너리파일입니다

init.d란?

잠시 init.d에 대한 설명을 해보도록 할까요?

init.d(인트 디, 이닛디)란 스마트폰이 부팅될때 busybox를 이용하여 그안 내용물을 실행시키는 일종의 트윅입니다

지금은 zipalign에 대해 배우고 있으므로 init.d는 다음에 살펴보도록 하겠습니다

01zipalign_apks를 /system/etc/init.d에,

zipalign을 /system/bin에 넣어주세요

참고 자료 : [2013/02/15 - [강좌/팁/왕초보 추천 강좌] - After Rooting [1편] - 무음 카메라/동영상 만들기](http://whdghks913.oa.to/133)를 보시면 어떻게 넣을 수 있는지에 대한 사진자료가 있습니다

이제 재부팅을 하시면 됩니다

01zipalign_apks파일이 init.d에 들어가 정상적으로 실행되었다면 부팅시간이 길어질겁니다 ㅎㅎ

이렇게 해서 zipalign에 대한 방법을 찾아보았습니다

XDA문서 : <http://forum.xda-developers.com/showthread.php?t=594615>

안드로이드 개발자용 문서 : <http://developer.android.com/tools/help/zipalign.html>

---

## 첨부파일

- [zipalign.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/zipalign.zip) `11 KB`
