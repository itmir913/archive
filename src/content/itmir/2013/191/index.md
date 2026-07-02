---
title: "VegaRacer2 cm10.1 [TEST] 수정 boot.img"
date: "2013-04-14T13:26:33+09:00"
category: "Android/Build"
tags: []
description: "램디스크 파일은 수정하지 않았고 mkbootimg의 명령어(--ramdiskaddr같은거)를 조금 수정해 봤습니다"
draft: false
original_url: "https://itmir.tistory.com/191"
---

램디스크 파일은 수정하지 않았고 mkbootimg의 명령어(--ramdiskaddr같은거)를 조금 수정해 봤습니다

역시 부팅은 안되고요

전에는 무한 Vega로고였지만 지금은

[Vega로고] - [검은색 화면] - [시간의 경과] - [또다시 Vega로고] - [검은색 화면] ....

이런식으로 되는군요

한마디로 말하자면 로고가 무한으로 뜹니다

로고 뜨기, 검은화면, 로고 뜨기

이런식으로요 ㅋㅋ

역시 이번에도 adb와 fastboot모두 잡히지 않았습니다

혹시 베레2의 mkbootimg 정확한 명령어 알고 계신분 계시다면 도와주시면 감사드리겠습니다..

베레2도 베레1처럼 base값을 바꿔야 부팅되는건 아니겠죠???

[boot.img](./file/boot.img)

---

## 첨부파일

- [boot.img](https://github.com/itmir913/archive/releases/download/itmir-attachments/191-boot.img) `5.0 MB`
