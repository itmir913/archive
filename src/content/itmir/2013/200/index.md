---
title: "베가레이서2 루팅 카운터 관련"
date: "2013-05-01T18:24:07+09:00"
category: "SmartPhone/Android"
tags: []
description: "부트로더에 기록되는 루팅 카운터의 증가를 막는 패치를 하였습니다"
draft: false
original_url: "https://itmir.tistory.com/200"
---

부트로더에 기록되는 루팅 카운터의 증가를 막는 패치를 하였습니다

pantech\_server를 수정하여 rawdata를 건들지 못하게 막아 루팅이 되어도 부트로더에 기록되지 못합니다 ㅋㅋ

첨부파일을 받아서 /system/bin에다가 755퍼미션으로 넣어 주시면 됩니다

ps. 루팅 카운터가 이미 올라가 있는경우에 이 카운터를 초기화 하는 파일은 아니며 카운터의 증가만 막아줍니다

그리고 리커버리를 올려봤는대 젤리빈에서는 부트로더가 부팅을 막아버리는지 검은 화면만 뜨는군요

[pantech\_server](https://github.com/itmir913/archive/releases/download/itmir-attachments/pantech_server)

참조 : <http://cafe.naver.com/skydevelopers/150571>

---

## 첨부파일

- [pantech_server](https://github.com/itmir913/archive/releases/download/itmir-attachments/pantech_server) `66 KB`
