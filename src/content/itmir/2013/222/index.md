---
title: "3) CyanogenMod Config.mk 구문"
date: "2013-05-26T14:10:13+09:00"
category: "Android/Build"
tags: []
description: "이번 시간에는 우리가 BoardConfig.mk, device.mk등에 선언되는 구문에 대해 살펴보고자 합니다"
draft: false
original_url: "https://itmir.tistory.com/222"
---

이번 시간에는 우리가 BoardConfig.mk, device.mk등에 선언되는 구문에 대해 살펴보고자 합니다

이 강좌에서는 많은 구문이 나오지만 필요성은 그때 그때마다 다르고, 소스의 버전마다도 다릅니다

그러므로 자신이 필요한 구문을 찾아 익히시는 연습이 필요합니다

**1. BoardConfig.mk**

BoardConfig.mk는 소스의 가장 핵심이라고 할수 있는 부분입니다

소스를 보면 Android.mk라는 파일이 있는대 우리가 안드로이드 풀 소스를 빌드하게 되면 이 Android.mk를 참조해서 빌드합니다

그리고 Android.mk는 BoardConfig.mk에 선언되어 있는 구문을

ifdef (선언 내용) 이라는 구문으로 이 값의 true와 false여부를 판단해 어떤 파일을 빌드에 사용할 것인지를 결정하게 됩니다

BoardConfig.mk는 다음 위치에 있습니다

(풀 소스 위치)/device/(제조사)/(코드네임)

그냥 봐서는 이해가 되지 않을수 있기에 예제를 들어 설명하도록 하겠습니다 [(예제 바로가기)](https://github.com/itmir913/android_device_pantech_ef46l/blob/cm-10.1/BoardConfig.mk)

이제부터 BoardConfig.mk에 들어가는 내용에 대해 일부를(한 글에서 전체를 설명하기 매우 어렵습니다) 살펴보겠습니다

```makefile
-include device/pantech/msm8960-common/BoardConfigCommon.mk
`````

이 부분은 앞부분의 include만 봐도 알수 있드시 device/pantech/msm8960-common/BoardConfigCommon.mk라는 파일의 내용을 include하라는 명령어 입니다

```makefile
TARGET\_PROVIDES\_INIT\_RC := true
`````

init.rc를 cyanogenmod빌드시 생성되게 하지 않고 직접 만든 init.rc를 사용하겠다는 선언입니다

```makefile
TARGET\_SPECIFIC\_HEADER\_PATH := device/pantech/ef46l/include
`````

이 부분은 include할 파일들을 지정해 주는 구문인대요 특별하게 필요한 .c파일들을 사용할때 사용됩니다

```makefile
BOARD\_KERNEL\_BASE := 0x80200000
BOARD\_KERNEL\_PAGE\_SIZE := 2048
BOARD\_KERNEL\_CMDLINE := console=ttyHSL0,115200,n8 androidboot.hardware=qcom androidboot.carrier=SKT-KOR user\_debug=31 msm\_rtb.filter=0x3F ehci-hcd.park=3 maxcpus=2 loglevel=0
#BOARD\_FORCE\_RAMDISK\_ADDRESS := 0x82400000
BOARD\_MKBOOTIMG\_ARGS :=
`````

위 초록 박스에 있는 선언들은 부트이미지와 관련된 선언입니다

부트이미지를 만들때 필요한 BASE값, Page_Size값, CMDLine값을 지정해 주고

아래부분에는 ramdiskaddr을 지정해 주는 부분입니다

여기서 중요한건 cm10까지만 해도 BOARD_FORCE_RAMDISK_ADDRESS으로 사용되었습니다만

cm10.1부터는 BOARD_MKBOOTIMG_ARGS을 사용해야 합니다

BOARD_MKBOOTIMG_ARGS의 값부분에는 ramdisk_offset이 들어가야 하는대요 이 부분은 디벨로이드에 자료가 있더라고요 참고하시길..

```makefile
WIFI_DRIVER_MODULE_NAME          := wlan  
WIFI_DRIVER_MODULE_PATH          := "/system/lib/modules/wlan.ko"  
WPA_SUPPLICANT_VERSION           := VER_0_8_X  
BOARD_WPA_SUPPLICANT_DRIVER      := NL80211  
BOARD_HOSTAPD_DRIVER             := NL80211  
BOARD_WLAN_DEVICE                := qcwcn  
WIFI_DRIVER_FW_PATH_STA          := "sta"  
WIFI_DRIVER_FW_PATH_AP           := "ap"  
WIFI_DRIVER_FW_PATH_P2P          := "p2p"
```

이 부분은 모두 WIFI관련 선언입니다

모듈의 이름과 kernel컴파일시 나오는 wifi모듈의 위치, 무선랜의 칩셋등을 정의해 주고 있습니다

```makefile
TARGET_PREBUILT_KERNEL := device/pantech/ef46l/kernel  
LOCAL_KERNEL := $(TARGET_PREBUILT_KERNEL)

PRODUCT_COPY_FILES += \  
    $(LOCAL_KERNEL):kernel \
```

이 부분은 kernel을 빌드한 커널, 즉 zImage로 사용하며, 이것을 out/tatget/product/(기기명)으로 이동시켜주는 역할을 합니다

이 부분이 없을경우 "Boot.img에 필요한 Kernel이 없습니다" 오류가 나타나게 될것입니다

```makefile
TARGET\_USERIMAGES\_USE\_EXT4 := true
BOARD\_BOOTIMAGE\_PARTITION\_SIZE := 9437184
BOARD\_RECOVERYIMAGE\_PARTITION\_SIZE := 10485760
BOARD\_SYSTEMIMAGE\_PARTITION\_SIZE := 1073741824
BOARD\_USERDATAIMAGE\_PARTITION\_SIZE := 8589934592
BOARD\_FLASH\_BLOCK\_SIZE := 131072
BOARD\_VOLD\_MAX\_PARTITIONS := 33
`````n
!! 이부분은 잘 지정해 주셔야 합니다

Boot파티션, 리커버리 파티션, 시스탬 파티션, data파티션등의 크기를 선언하고 있습니다

만약 완성된 img가 선언된 크기보다 클경우 오류가 발생하며 완성된 파일을 지워 버립니다

확인하는 방법은 cat /proc/mtd라고 하나, ICS이상부터는 /proc에 있는 파일을 보고 직접 확인해야 합니다

```makefile
BOARD\_CUSTOM\_RECOVERY\_KEYMAPPING := ../../device/[제조사]/[기기명]/recovery\_keys.c
`````

리커버리에 사용되는 키맵 파일을 우리가 만든 파일로 지정하는 선언 입니다

리커버리 키 패치에 사용됩니다

```makefile
BOARD\_USES\_GENERIC\_AUDIO:= true
`````

'out/target/product/(기기명)/obj/lib/libaudio.so'를 만들 규칙이 없습니다.  멈춤

이 오류를 해결하는대 필요한 문구 입니다

```makefile
USE\_CAMERA\_STUB:= true
`````

`out/target/product/(기기명)/obj/lib/libcamera.so'를 만들 규칙이 없습니다.  멈춤.

이 오류를 해결하는대 필요한 문구 입니다

vendor/*/BoardConfigVendor.mk에 저런 값이 false되어 있다면 역시 true로 지정해야 합니다

```makefile
TARGET\_ARCH := arm
`````

cm-10.1을 빌드하려면 이 문구가 필요합니다

만약 이 문구가 없을경우 brunch할때 "TARGET_ARCH이 선언되어 있지 않습니다 TARGET_ARCH을 선언하세요"와 같은 오류가 나타납니다

```makefile
RECOVERY\_GRAPHICS\_USE\_LINELENGTH := true
`````

리커버리의 그래픽이 깨질때 이 구문을 넣어 빌드하면 정상 작동 됩니다

VegaRacer2 젤리빈 CWM을 빌드할경우 이 구문이 꼭 필요합니다

```makefile
BOARD\_CUSTOM\_GRAPHICS := ../../../device/제조사/기기명/graphics.c
`````

커스텀 그래픽 소스를 사용할때 사용되는 구문 입니다

미라크a는 CWM을 그냥 빌드하면 화면이 짤려 나오는 오류가 있는대 이때 삼성 갤럭시 ace등 비슷한 해상도의 graphics.c를 적용하면 정상으로 나옵니다

기타 많은 구문은 Android.mk를 보시면 어떤 작용을 하는지 알 수 있습니다

**2. Device.mk**

Device.mk는 이름이 두가지 일수 있습니다

하나는 device.mk, 또하나는 device_(기기명).mk

같은 파일이니 혼동 없으시길 바랍니다

이 이름은 AndroidProducts.mk을 열면 나오는

PRODUCT_MAKEFILES := \  
    $(LOCAL_DIR)/device_ef46l.mk

에 따라 달라집니다

device.mk는 필요한 파일을 out/tatget/product/(기기명)으로 이동시켜 주는 역할을 합니다

복사 명령어 라고 생각하시면 되는대요

이 명령어는 아래와 같은 형식으로 이루어져 있습니다

PRODUCT_COPY_FILES += \  
    (복사할 파일이 있는 위치):(복사할 파일의 위치) \

    (복사할 파일이 있는 위치):(복사할 파일의 위치)

복사할 파일이 있는 위치는 예를 들자면

device/pantech/ef46l/configs/media_profiles.xml입니다

또 복사할 파일의 위치는 예를 들자면

system/etc/media_profiles.xml입니다

즉 이걸 조합해 보면

PRODUCT_COPY_FILES += \  
    device/pantech/ef46l/configs/media_profiles.xml:system/etc/media_profiles.xml
```

이렇게 구성해 주면 됩니다

(복사할 파일의 위치)에서 중요한건 system/etc등의 경로를 지정해야 합니다

(복사할 파일의 위치) 앞에 "out/tatget/product/(기기명)/"이 생략 되어 있다고 생각하시면 됩니다

저 구문을 짧게 줄여보면

```makefile
PRODUCT\_COPY\_FILES += device/common/gps/gps.conf\_AS:system/etc/gps.conf
`````

이렇게도 작성할수 있습니다

이 문구는 common에서 gps.conf를 가져와라 라는 hPa님 소스안에 있는 구문입니다

```makefile
FRAMEWORKS\_BASE\_SUBDIRS += ../../$(LOCAL\_PATH)/ril/
`````

이렇게 hPa님의 소스에는 ril패치가 되어 있습니다

하지만 이 방법으로 ril패치를 하는 건 cm10에서는 되지만 cm10.1에서는 직접 소스를 이동해서 작업해야 합니다

```makefile
PRODUCT\_AAPT\_CONFIG := normal hdpi xhdpi
PRODUCT\_AAPT\_PREF\_CONFIG := xhdpi
PRODUCT\_LOCALES += ko\_KR xhdpi
`````

이 부분은 저도 아직은 잘 모르는 부분입니다..만

첫 줄은 SystemUI.apk등에 drawable-가 무엇 무엇 들어갈지 결정해주는것 같습니다

두번째 줄은 어떤 drawable을 사용하는지를 설정하는것 같고

마지막 줄은 현재 나라와 drawable을 결정하는것 같습니다

```makefile
$(call inherit-product-if-exists, vendor/pantech/ef46l/ef46l-vendor.mk)
`````

이런 구문으로 vendor/pantech/ef46l/ef46l-vendor.mk을 호출할수 있습니다

```makefile
DEVICE\_PACKAGE\_OVERLAYS += device/(제조사)/(기기명)/overlay
`````

이건 overlay를 지정하는 구문입니다

overlay란? 정확한 개념까지는 잘 모르나 framework-res등의 xml설정을 변경할 수 있도록 도와주는 것 이라 추정합니다

출처

<https://github.com/itmir913/android_device_pantech_ef46l/>

</archive/itmir/2013/197>

</archive/itmir/2012/41>