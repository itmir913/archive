---
title: "커롬 올리면 나의 통신사 와이파이를 쓰는 방법은 없나?"
date: "2012-12-22T16:24:54+09:00"
category: "SmartPhone/Android"
tags: []
description: "현재는 막혔다고 합니다 통신사에서 이방법으로 접속하는것을 막아버린것 같네요.."
draft: false
original_url: "https://itmir.tistory.com/54"
---

**현재는 막혔다고 합니다 통신사에서 이방법으로 접속하는것을 막아버린것 같네요..**

우리들은 매일 CM과 MIUI등의 커스텀롬, 줄여 커롬을 올립니다

이 커롬이 아주 안정화가 잘되어 있다고 해도 딱 한가지 흠...

바로 통신사의 와이파이를 쓸수 없는대요

이것을 해결하기 위해 몇가지만 추가해 주시면 됩니다!

바로

system/etc/wifi/wpa\_supplicant.conf

이 파일을 수정하면 되는것!

> #SKT T WiFi Zone
>
> network={
>
>     ssid="T wifi zone\_secure"
>
>     key\_mgmt=WPA-EAP IEEE8021X
>
>     eap=AKA
>
>     priority=2
>
> }
>
> network={
>
>     ssid="T wifi zone"
>
>     key\_mgmt=NONE
>
>     priority=1
>
> }
>
> #KT Olleh WiFi Zone
>
> network={
>
>     ssid="ollehWiFi"
>
>     key\_mgmt=WPA-EAP IEEE8021X
>
>     eap=AKA
>
>     priority=1
>
> }

이 구문을 넣고 재부팅하게 되시면 기본 프로파일에 들어와 있을겁니다 ㅎㅎ

출처: <http://siryua.sloud.kr/163967719>

저 구문은 첨부파일에 올려져 있습니다
