---
title: "error: undefined reference to 오류 해결방법 - 경험담"
date: "2013-04-03T19:12:10+09:00"
category: "Android/Build"
tags: []
description: "/home/whdghks913/cm-10.1/system/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6/bin/../lib/gcc/arm-linux-androideabi/4.6.x-google/../../../../ar…"
draft: false
original_url: "https://itmir.tistory.com/186"
---

/home/whdghks913/cm-10.1/system/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6/bin/../lib/gcc/arm-linux-androideabi/4.6.x-google/../../../../arm-linux-androideabi/bin/ld: /home/whdghks913/cm-10.1/system/out/target/product/ef46l/obj/EXECUTABLES/hostapd_intermediates/src/drivers/driver_nl80211.o: in function nl80211_set_p2p_powersave:external/wpa_supplicant_8/hostapd/src/drivers/driver_nl80211.c:9062: error: undefined reference to 'wpa_driver_set_p2p_ps'

/home/whdghks913/cm-10.1/system/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6/bin/../lib/gcc/arm-linux-androideabi/4.6.x-google/../../../../arm-linux-androideabi/bin/ld: /home/whdghks913/cm-10.1/system/out/target/product/ef46l/obj/EXECUTABLES/hostapd_intermediates/src/drivers/driver_nl80211.o: in function wpa_driver_nl80211_ops:driver_nl80211.c(.data.rel.ro.wpa_driver_nl80211_ops+0x104): error: undefined reference to 'wpa_driver_set_ap_wps_p2p_ie'

/home/whdghks913/cm-10.1/system/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6/bin/../lib/gcc/arm-linux-androideabi/4.6.x-google/../../../../arm-linux-androideabi/bin/ld: /home/whdghks913/cm-10.1/system/out/target/product/ef46l/obj/EXECUTABLES/hostapd_intermediates/src/drivers/driver_nl80211.o: in function wpa_driver_nl80211_ops:driver_nl80211.c(.data.rel.ro.wpa_driver_nl80211_ops+0x140): error: undefined reference to 'wpa_driver_get_p2p_noa'

/home/whdghks913/cm-10.1/system/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6/bin/../lib/gcc/arm-linux-androideabi/4.6.x-google/../../../../arm-linux-androideabi/bin/ld: /home/whdghks913/cm-10.1/system/out/target/product/ef46l/obj/EXECUTABLES/hostapd_intermediates/src/drivers/driver_nl80211.o: in function wpa_driver_nl80211_ops:driver_nl80211.c(.data.rel.ro.wpa_driver_nl80211_ops+0x144): error: undefined reference to 'wpa_driver_set_p2p_noa'

/home/whdghks913/cm-10.1/system/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6/bin/../lib/gcc/arm-linux-androideabi/4.6.x-google/../../../../arm-linux-androideabi/bin/ld: /home/whdghks913/cm-10.1/system/out/target/product/ef46l/obj/EXECUTABLES/hostapd_intermediates/src/drivers/driver_nl80211.o: in function wpa_driver_nl80211_ops:driver_nl80211.c(.data.rel.ro.wpa_driver_nl80211_ops+0x1a0): error: undefined reference to 'wpa_driver_nl80211_driver_cmd'

collect2: ld returned 1 exit status

make: *** [/home/whdghks913/cm-10.1/system/out/target/product/ef46l/obj/EXECUTABLES/hostapd_intermediates/LINKED/hostapd] 오류 1

이런 오류가 뜨며 빌드가 진행 되지 않았습니다.

<http://ac100.wikispaces.com/Wpa_supplicant>

이 사이트에서 제시하고 있는

> CONFIG_DRIVER_NL80211 := true
>
> BOARD_WPA_SUPPLICANT_PRIVATE_LIB := lib_driver_cmd_bcmdhd
>
> BOARD_HOSTAPD_PRIVATE_LIB := lib_driver_cmd_bcmdhd

이 문구를 BoardConfig.mk에 추가한다음 빌드해 보면,

NOTICE-TARGET-STATIC_LIBRARIES-lib_driver_cmd_bcmdhd을 만들 규칙이 없다고 나타납니다.

그러므로 저는 hostapd를 빌드하는 소스의 위치, 즉 external/wpa_supplicant_8/hostapd 위치에 있는 android.config을 열어보면,

CONFIG_DRIVER_NL80211=y가 주석처리 되어 있는데, 이 부분의 주석을 제거해 주면 오류가 나타나지 않고 빌드가 됩니다

+ 내용 추가 2013-04-03-오후-7-23

BoardConfig.mk에 추가를 안해도 되는것 같군요..;

오류가 생긴다면 일단 android.config만 수정해 보고 그래도 오류가 나타난다면 구문을 추가해 보세요.

+ 내용추가 2013-04-06-오휴-6-54

진행 하다보면 lib를 찾을수 없다고 나오는데, 그러면

mmm hardware/broadcom/wlan/bcmdhd/wpa_supplicant_8_lib

또는

mmm hardware/qcom/wlan/qcwcn/wpa_supplicant_8_lib

으로 없다고 뜨는 부분만 mmm(부분빌드 명령어)으로 빌드해 주시면 됩니다.

그리고 또 빌드해 보면 역시 NOTICE-TARGET-STATIC_LIBRARIES-lib_driver_cmd_bcmdhd를 만들수 없다고 나타나는데요.

아까 BoardConfig.mk에 추가했던 구문을 지워버리니 오류가 안뜨는군요.

저 구문의 필요성을 모르겠습니다.

CONFIG_DRIVER_NL80211 := true만 있어도 될것같긴 한대 아무튼 NOTICE 오류가 뜨면 보드컨픽에 추가했던거 지워주시고 빌드하세요.
