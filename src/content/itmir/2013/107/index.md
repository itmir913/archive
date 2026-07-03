---
title: "나도 CM7 포팅해 보자 - 디바이스 소스와 벤더를 짜자"
date: "2013-02-03T00:06:13+09:00"
category: "Android/Build"
tags: []
description: "이번에는 device소스를 짜보도록 하겠습니다"
draft: false
original_url: "https://itmir.tistory.com/107"
---

안녕하세요~

이번에는 device소스를 짜보도록 하겠습니다

저번 강좌를 따라하셨다면 device/제조사/기기명 폴더가 있을겁니다

만약 벤더를 짜시지 않으셨다면 저번 강좌를 확인해 주시면 감사드리겠습니다 (본문 아래 배치되어 있습니다)

구하실수 있으시다면 포팅할 기기와 스펙/사양이/칩셋이 비슷하거나 같은 기기의 cm7작업 소스를 구해두시면 작업이 아주 편해지고 수월해 집니다

(구하실수 없으시면 포팅할 기기와 사양이 비슷한 기기를 cm소스/device폴더에 들어가 보시면 찾으실수도 있을겁니다 코드네임으로 찾아야 합니다)

전 http://cafe.naver.com/skydevelopers/86106 의 hPa님의 이자르 cm7소스를 참고하였습니다


다음은 이자르의 cm7작업파일 입니다 (hPa님 게시글 첨부파일)

그럼 좀 까다롭고 어려운 작업을 시작해 보도록 하겠습니다

device/제조사/기기명 폴더에 들어가 주세요

그다음 cm7작업소스에 있는 overlay폴더를 가져와 주세요

다른 기기의 overlay를 가져와도 될겁니다

그다음 vendorsetup.sh등 작업 소스에 있는 파일을 하나씩 가져옵니다

setup-makefiles.sh도 가져옵니다

setup-makefile.sh를 열어보시면

VENDOR=pantech

DEVICE=a630k

이 있는대요 이걸 자신에게 맞게 수정합니다 VENDOR은 제조사 DEVICE는 기기명이 되겠죠?

그리고 setup-makefiles.sh을 실행합니다

이제 BoardConfig.mk를 수정해야 합니다

제가 포팅할 기기와 비슷한 기기의 cm7 작업소스를 구해두라는건 이런 작업에서 아주 편하기 때문입니다

칩셋이 같은 기기라면 더욱 말이죠

TARGET\_BOARD\_PLATFORM := msm7k

TARGET\_ARCH\_VARIANT := armv6-vfp

TARGET\_CPU\_ABI := armeabi-v6l

TARGET\_CPU\_ABI2 := armeabi

TARGET\_BOARD\_PLATFORM\_GPU := qcom-adreno200

다음과 같은 구문을 복붙합니다

작업소스/BoardConfig.mk에 다른 특별한게 있다면 그것도 추가해 줘야 합니다

BoardConfig.mk은 포팅하며 아주 많이 수정할거니 많이 친해지셔야 합니다

오류가 날때마다 여기에 구문을 추가해서 오류를 해결할수가 있습니다

device\_기기명.mk를 열어주세요

여기에 우리가 순정에서 가져와야 하는 순정파일을 넣어주는 매크로를 작성해야 합니다

PRODUCT\_COPY\_FILES += \

    device/제조사/기기명/파일경로:system/파일경로 \

다음과 같은 양식으로 쓰이게 됩니다

참고로 :이후는 out/target/product/기기명/ 입니다

이제 vendor폴더로 이동합니다

vendor/cyanogen/vendorsetup.sh에 add\_lunch\_combo cyanogen\_기기명-eng 을 추가합니다

vendor/cyanogen/products/AndroidProducts.mk에도 다른 기기처럼     $(LOCAL\_DIR)/cyanogen\_기기명.mk \을 추가합니다

vendor/cyanogen/products/cyanogen\_ef32k.mk를 직접 만들어야 합니다

같은 폴더내에 있는 다른 기기 파일을 참고하시거나 작업소스를 참고하시면 쉽게 짜실수 있을거라 생각되어 간략한 설명한 하기로 하겠습니다

이 파일은 다른 기기의 mk를 보시면서 작업하시면 편합니다 경로 확인해 가시며 작업해 주세요

그럼 대충 50%는 마쳤습니다

이제 vendor/제조사/기기명 폴더에 들어갑시다

다른건 필요없고 기기명-vendor-blobs.mk만 수정하면 됩니다

순정에서 가져와야 하는 파일의 목록입니다

이자르는 wifi칩셋이 ar6000을 쓰므로 파일이름도 우리와 다릅니다

이부분을 고려해 두시면서 파일이름을 확인해 주세요

vendor/제조사/기기명/proprietary 폴더에 순정 파일을 같다 넣으시면 됩니다

이제 소스 짜는대 지장은 없으실거라 생각됩니다

사실 이보다 더 많은 작업을 해야 합니다

init.rc를 수정해야 하기도 하고...

램디스크를 쪼개서 파일 가져와야 하기도 하죠 ㅎㅎ

더욱더 자세한 내용은 제가 cm7을 마스터 한뒤(?)에 따로 포스팅 하겠습니다

이제 터미널로 돌아가서 빌드를 해주시면 됩니다

(좀 횡설수설한 감이 없지 않네요... 이해가 안되는건 덧글로 알려주시면 제가 아는한도에서 도와드리겠습니다 ㅎㅎ)

이 강좌는 다음글과 연관되어 있습니다

[2013/01/28 - [강좌/팁/Kernel/Build 강좌] - 나도 CM7 포팅해 보자 - CWM을 포팅해보자](/archive/itmir/2013/94)

이번 강좌를 읽기 전 위 강좌를 한번 읽어 보시면 이해가 빠르실 겁니다