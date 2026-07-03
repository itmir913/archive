---
title: "hPa님의 베가N5 CM 통신 오류 해결방법"
date: "2012-12-21T16:13:47+09:00"
category: "Android/Build"
tags: []
description: "hPa님께서 알려주신 통신 오류 해결방법을 정리해 보았습니다"
draft: false
original_url: "https://itmir.tistory.com/49"
---

hPa님께서 알려주신 통신 오류 해결방법을 정리해 보았습니다

원본 게시글은 http://cafe.naver.com/skydevelopers/171224 입니다

KT 기기 기준으로

최초 부팅 때는 아주 잠시 통신이 잡혔다가 안테나 다시 사라짐

IMEI가 00000000000

자신의 전화번호는 표시됨

'긴급 통화만'이 표시됨

위 증상이 일어날경우 원인은 확실합니다

원인은 skytestserver에 있습니다.

skytestserver가 실행되고 있어야 통신이 제대로 되거든요 ' ';

Fix 방법은 다음과 같습니다.

/system/bin/skytestserver

/system/lib/libsky_aprlib.so

/system/lib/libmtc.so

추가

> init.qcom.rc에
>
> service skytestserver /system/bin/skytestserver
>
>     class main
>
>     socket skytest stream 666
>
>     user root

추가 (위치는 service qcom-post-boot /system/bin/sh /system/etc/init.qcom.post_boot.sh 요 놈 바로 위에가 적당할 겁니다.)

마지막으로 skytestserver가 libhardware_legacy.so에 다음 두 함수를 원하므로 Dummy로 추가합니다.

CM9 소스의 hardware/libhardware_legacy/wifi.c에 마지막 줄에

> int wifi_load_mfg_driver()
>
> {
>
>     return 0;
>
> }
>
> int wifi_unload_mfg_driver()
>
> {
>
>     return 0;
>
> }

추가 및 libhardware_legacy.so 빌드
