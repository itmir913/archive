---
title: "ADB logcat이 잡히지 않을때"
date: "2013-01-27T17:29:48+09:00"
category: "SmartPhone/Android"
tags: []
description: "adb 로그켓이 잡히지 않을때 정말 힘들죠?..."
draft: false
original_url: "https://itmir.tistory.com/66"
---

adb 로그켓이 잡히지 않을때 정말 힘들죠?...

그때 첨부파일을 받으신다음 내용물을 adb가 있는 폴더에 넣어주세요.

그다음 리커버리에 진입해 줍시다 CWM이나 TWRP등 리커버리에 진입해 주세요.

컴퓨터와 연결해 주신다음

adbenable.bat파일을 실행시켜 주시면 됩니다.

이 파일은 persist.sys.usb.config파일을 /data/property에 넣어주는대요.

이게 어떤 작용을 하는지는 잘 모르겠습니다..

그다음 adb logcat을 실행하시면 됩니다.

cmd에서 adb logcat하시기 귀찮으시면 그냥 압축풀으신다음 리커버리로 진입해서 Script.bat실행하시면 위 작업을 한번에 해줍니다.

로그는 log.txt에 뽑혀 나오게 됩니다. ㅎㅎ

저는 로그 하나 뽑았습니다.

cm7을 만들었는대 fastboot모드에만 떠있습ㄴ디ㅏ...

그에 대한 게시글을 작성하고 질문글 남겨야 할듯 합니다..

출처

<http://cafe.naver.com/develoid/122078>

<http://cafe.naver.com/take22/268322>

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) adb logcat.zip](/attachment/cfile22.uf@27398B3E5104E5382DC0A0.zip)
