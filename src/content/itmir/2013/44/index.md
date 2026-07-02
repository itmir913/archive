---
title: "윈도우의 망가진 부트로더를 되살려 보자"
date: "2013-01-27T16:08:54+09:00"
category: "Computer & PC/Windows"
tags: []
description: "우분투를 깔 때 리눅스 부트로더 GRUB가 윈도우의 부트로더를 덮어씌우게 됩니다."
draft: false
original_url: "https://itmir.tistory.com/44"
---

우분투를 깔 때 리눅스 부트로더 GRUB가 윈도우의 부트로더를 덮어씌우게 됩니다.

어떤 이유로 우분투를 지워야 할때 저는 먼저 부트로더를 윈도우로 바꾸고 리눅스 파티션을 제거해 버리는데요.

OS를 다시깔면 너무 시간이 오래 걸리기 때문에

여기서는 윈도우7 설치CD를 이용해 복구하는법을 알려드리겠습니다.

윈도우 7 씨디로 부팅하고나서 처음 설치하는 화면이 나올 때

shift + f10

을 눌러주시면

cmd 창이 열립니다.

이때

bootrec /fixboot

bootrec /fixmbr

를 입력해 주시면 부트로더 복구가 완료됩니다.
