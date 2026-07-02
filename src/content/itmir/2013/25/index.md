---
title: "CM7 WIFI Fix가 안됩니다.."
date: "2013-01-27T14:50:45+09:00"
category: "Android/Build"
tags: []
description: "제가 Cm7을 미라크a라는 기기에 포팅을 시도하였습니다"
draft: false
original_url: "https://itmir.tistory.com/25"
---

제가 Cm7을 미라크a라는 기기에 포팅을 시도하였습니다

그래서 지금 부팅까지 성공한 상태입니다

역시 WIFI가 안되기에 Wifi를 픽스하려 합니다만 아무리 해도 오류가 뜨기에 질문드립니다

먼저 부팅성공이후 제가 cm7소스에 추가한 내용입니다

**boardconfig**

BOARD\_USES\_QCOM\_HARDWARE := true

BOARD\_USES\_QCOM\_LIBS := true

BOARD\_USES\_QCOM\_LIBRPC := true

BOARD\_HAVE\_BLUETOOTH := true

#BOARD\_HAVE\_BLUETOOTH\_BCM := true

WIFI\_DRIVER\_MODULE\_NAME := bcm4329

WIFI\_DRIVER\_MODULE\_PATH := /system/lib/modules/wlan.ko

BOARD\_WPA\_SUPPLICANT\_DRIVER := WEXT

BOARD\_WLAN\_DEVICE := bcm4329

WIFI\_DRIVER\_MODULE\_ARG := "firmware\_path=/system/etc/wl/bcm43291.bin nvram\_path=/system/etc/wl/nvram.txt"

WIFI\_DRIVER\_FW\_STA\_PATH := "/system/etc/wl/bcm43291.bin"

WIFI\_DRIVER\_FW\_AP\_PATH := "/system/etc/wl/bcm43291\_apsta.bin"

WIFI\_DRIVER\_FW\_P2P\_PATH := "/system/etc/wl/bcm43291\_p2p.bin"

**device\_ef32k.mk**

PRODUCT\_COPY\_FILES += \

device/pantech/ef32k/add/bin/pppd:system/bin/pppd \

device/pantech/ef32k/add/bin/qrngd:system/bin/qrngd \

device/pantech/ef32k/add/bin/qrngtest:system/bin/qrngtest

**system.prop**

wifi.interface=wlan0

ro.product.boardnswver=7x27 V1.46

ro.product.baseband\_ver=S0832146

ro.product.baseband\_ver\_hidden=S0832146a

ro.product.checksum=

ro.carrier=KT-KOR

**ef32k-vendor-blobs.mk**

# Modules

PRODUCT\_COPY\_FILES += \

vendor/pantech/ef32k/proprietary/lib/modules/libra.ko:system/lib/modules/libra.ko \

vendor/pantech/ef32k/proprietary/lib/modules/librasdioif.ko:system/lib/modules/librasdioif.ko \

vendor/pantech/ef32k/proprietary/lib/modules/wlan.ko:system/lib/modules/wlan.ko

# Wifi

PRODUCT\_COPY\_FILES += \

vendor/pantech/ef32k/proprietary/etc/wl/nvram.txt:system/etc/wl/nvram.txt \

vendor/pantech/ef32k/proprietary/etc/wl/bcm4329\_apsta.bin:system/etc/wl/bcm4329\_apsta.bin \

vendor/pantech/ef32k/proprietary/etc/wl/bcm4329.bin:system/etc/wl/bcm4329.bin \

vendor/pantech/ef32k/proprietary/etc/wl/bcm4329\_mfg.bin:system/etc/wl/bcm4329\_mfg.bin \

vendor/pantech/ef32k/proprietary/etc/wl/bcm43291.bin:system/etc/wl/bcm43291.bin \

vendor/pantech/ef32k/proprietary/etc/wl/bcm43291\_apsta.bin:system/etc/wl/bcm43291\_apsta.bin \

vendor/pantech/ef32k/proprietary/etc/wl/bcm43291\_mfg.bin:system/etc/wl/bcm43291\_mfg.bin \

vendor/pantech/ef32k/proprietary/etc/wl/bcm43291\_p2p.bin:system/etc/wl/bcm43291\_p2p.bin \

vendor/pantech/ef32k/proprietary/etc/wifi/wpa\_supplicant.conf:system/etc/wifi/wpa\_supplicant.conf \

vendor/pantech/ef32k/proprietary/etc/dhcpcd/dhcpcd.conf:system/etc/dhcpcd/dhcpcd.conf

다음과 같은 문구를 굵게 표시된 파일에 추가했습니다

또한 copy file의 경우 각 위치에 맞게 파일도 추가하였습니다

그다음 빌드를 했더니

부팅이 되지 않으며 다음과 같은 로그켓을 남기고 있습니다

D/dalvikvm( 124): DexOpt: --- BEGIN 'core.jar' (bootstrap=1) ---

D/dalvikvm( 168): Ignoring duplicate verify attempt on Ljava/lang/Object;

D/dalvikvm( 168): Ignoring duplicate verify attempt on Ljava/lang/Class;

D/dalvikvm( 168): DexOpt: load 232ms, verify+opt 2228ms

D/AndroidRuntime( 227):

D/AndroidRuntime( 227): >>>>>> AndroidRuntime START com.android.internal.os.ZygoteInit <<<<<<

I/AndroidRuntime( 227): Heap size: -Xmx48m

D/AndroidRuntime( 227): CheckJNI is OFF

D/dalvikvm( 227): Unable to process classpath element '/system/framework/framework.jar'

E/JNIHelp ( 227): Native registration unable to find class 'android/debug/JNITest'

E/AndroidRuntime( 227): Unable to register all android natives

I/Netd ( 230): Netd 1.0 starting

어떤분의 말씀으로 libmedia\_jni.so를 전에 빌드한 so로 교체를 한뒤

로그켓을 봐서 libcameraservice.so, libcamera.so, libOlaEngine.so이 세개의 파일을 순정에서 가져와서 집어넣었더니 부팅이 되었습니다

위와 같은 작업을 하여 wifi가 픽스되었을것이라 생각하였습니다

터미널에서 lsmod를 칠경우 wlan이 한줄로 나타나고 있습니다

그런대 와이파이를 키면 오류가 뜨며 로그켓에는 다음과 같이 오류가 나타납니다

E/WifiService( 180): Failed to load Wi-Fi driver.

D/SettingsAppWidgetProvider( 345): Widget is from a previous version... Let's update

D/SettingsAppWidgetProvider( 345): No instances yet... Wait for at least one instance to exist before adding global settings

로그를 보면 Failed to load Wi-Fi driver. 즉 wifi 드라이버를 불러오지 못하여 발생하는 문제라 생각됩니다

저보다 먼저 cm7을 포팅하신 사람님과 호호님의 말씀으로는 libhardware\_legacy.so의 문제라 생각된다 하셨습니다

이 파일을 헥스 에디터로 열어보니 넣지도 않은 tiap\_drv.ko를 읽는 부분이 있었습니다

그래서 그 부분을 지우고 저장한다음 기기에 집어넣었습니다 그러나 부팅이 되지 않습니다

로그켓을 보면

--------- beginning of /dev/log/main

I/cm ( 82): Welcome to Android 2.3.7 / CyanogenMod-7-20130122-UNOFFICIAL-ef32k

I/cm ( 83): \_

I/cm ( 84): \_\_ \_\_ \_ \_\_\_ \_ \_ \_\_ \_\_\_ \_\_ \_ \_ \_ \_ \_\_ \_\_))

I/cm ( 85): ((\_ \(/'((\_( ((\( ((\_)((\_( (('((\( ((`1( ((\_)((\_(

I/cm ( 86): )) \_))

I/cm ( 87):

I/run-parts( 77): mount: mounting /data/local/download on /cache/download failed: No such file or directory

I/DEBUG ( 121): debuggerd: Jan 22 2013 16:58:05

--------- beginning of /dev/log/system

I/Vold ( 119): Vold 2.1 (the revenge) firing up

E/ ( 126): [sky]sky\_localdb reader start!!

D/Vold ( 119): Volume sdcard state changing -1 (Initializing) -> 0 (No-Media)

D/Vold ( 119): Volume sdcard state changing 0 (No-Media) -> 2 (Pending)

D/Vold ( 119): Volume sdcard state changing 2 (Pending) -> 1 (Idle-Unmounted)

W/Vold ( 119): Ignoring unknown switch 'usb\_mass\_storage'

W/Vold ( 119): Ignoring unknown switch 'MSM72K\_UDC'

D/Vold ( 119): USB connected

D/Vold ( 119): Share method ums now available

으로 그렇게 의심스러운 부분은 없는것 같습니다..

여기서 /data/local/download on /cache/download failed: No such file or directory는 정상 부팅시에도 있었던 구문이기 때문입니다

수정하지 않은 libhardware\_legacy.so을 첨부하겠습니다

제가 포팅을 야매로 배운덕에 넓은 지식을 가지고 있지 않습니다..

어떤 방법으로 wifi를 fix할수 있을지 여러분의 의견을 듣고 싶습니다..
