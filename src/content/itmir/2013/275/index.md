---
title: "4.1.2 디바이스 소스로 4.2 빌드하기 (cm10소스로 cm10.1빌드하기)"
date: "2013-07-25T20:32:39+09:00"
category: "Android/Build"
tags: []
description: "4.1.2 디바이스 소스란 cm10소스로 이해하시면 되시고 4.2는 4.2.x버전인 cm10.1을 생각하시면 됩니다."
draft: false
original_url: "https://itmir.tistory.com/275"
---

안녕하세요.

4.1.2 디바이스 소스란 cm10소스로 이해하시면 되시고 4.2는 4.2.x버전인 cm10.1을 생각하시면 됩니다.

관련 강좌로 Sleepy님의 강좌([강좌1](http://cafe.naver.com/develoid/165665), [강좌2](http://cafe.naver.com/develoid/141594))가 있지만 약간 이해가 안되는 바람에 다시 작성합니다.

누가봐도 이해할수 있도록 작성해 보겠습니다~만 제 필력이 딸리는 바람에 이해가 안되는게 있다면 덧글로 질문해 주세요~

필자는 베가레이서2에게 cm10.1버프를 내려보고 싶어 이미 존재하는 hPa님의 cm10소스를 가지고 cm10.1을 빌드해본 경험이 있습니다.

하지만 엄청난 오류로 2주간 고생을 한 적이 있습니다.

(결국 부팅에 실패하고 작렬히 전사했습니다)

그때 한 뻘짓을 되풀이 하는 분이 없기를 바라는 마음에서 빨리 작성해 봅니다 ㅎㅎ

먼저 BoardConfig.mk를 수정해 봅시다.

**1. Target_arch 정의**

보드컨픽에 아래 구문을 추가해 줍시다.

TARGET_ARCH := arm

이 구문을 넣어줘야 cm10.1에서 빌드를 진행할수 있습니다.

**2. 낡은 명령어 교체**

BOARD_FORCE_RAMDISK_ADDRESS은 사용할 수 없습니다.

BOARD_MKBOOTIMG_ARGS

이 구문을 사용해야 합니다. (만약 바꾸지 않을경우 빌드하다 구문이 오래되었으므로 BOARD_MKBOOTIMG_ARGS으로 바꿔라 라는 것이 뜹니다.)

그런대 BOARD_MKBOOTIMG_ARGS에는 BOARD_FORCE_RAMDISK_ADDRESS에서 사용한 값 그대로 넣으시면 안됩니다.

ramdisk_offset값을 구해 --ramdisk_offset의 형식으로 넣어줘야만 합니다.

값을 구하는 방법은 전에 포스팅 한 글이 있기 때문에 링크로 대체합니다.

[**2013/07/21 - [강좌/팁/빌드 오류 해결] - ramdisk_offset 만들기**](http://whdghks913.tistory.com/271)

값을 구하셨다면 BOARD_MKBOOTIMG_ARGS := --ramdisk_offset (구한 값) 의 형식으로 넣어주시면 됩니다.

**3. overlay오류 수정**

빌드하시다 보면 overlay부분에서 오류가 발생합니다.

영어를 해석하다 보면 <add-recource>를 사용하라는 메모가 나타납니다.

오류 내용을 확인해 보겠습니다.

target Export Resources: framework-res (/home/whdghks913/cluster/system/out/target/common/obj/APPS/framework-res_intermediates/package-export.apk)  
device/pantech/ef46l/overlay/frameworks/base/core/res/res/values/config.xml:30: **error: Resource at config_networkLocationProviderPackageName appears in overlay but not in the base package; use <add-resource> to add.**  
device/pantech/ef46l/overlay/frameworks/base/core/res/res/values/config.xml:33: **error: Resource at config_geocodeProviderPackageName appears in overlay but not in the base package; use <add-resource> to add.**  
device/pantech/ef46l/overlay/frameworks/base/core/res/res/values/config.xml:40: **error: Resource at config_autoBrightnessButtonKeyboard appears in overlay but not in the base package; use <add-resource> to add.**  
make: *** [/home/whdghks913/cluster/system/out/target/common/obj/APPS/framework-res_intermediates/package-export.apk] 오류 1  
make: *** 파일 `/home/whdghks913/cluster/system/out/target/common/obj/APPS/framework-res_intermediates/package-export.apk'을(를) 지웁니다

자 굵고 큰 글씨를 봅시다.

친절하게 <add-resource>를 사용하라는 말이 뜹니다.

그럼 이 add-resource를 사용해 봅시다.

오류가 난 overlay파일을 열어주세요.

그다음 오류가 난 줄 위에 아래 구문을 넣어주세요.

<add-resource type="string" name="오류난 overlay의 구문 이름"></add-resource>

위 형식으로 넣어주시면 됩니다.

만약 타입이 string이 아니라 bool이라면 맞게 넣어주시면 됩니다.

예를 들어 볼까요?

<bool name="config_hardwareAccelerated">true</bool>

이 구문에서 오류가 났습니다 그럼 해결해 봅시다.

<add-resource type="bool" name="config_hardwareAccelerated"></add-resource>

이렇게 해결해 주시면 됩니다.

참조 : [2013/03/24 - [강좌/팁/빌드 오류 해결] - Overlay의 문제, <add-resource>를 사용해 해결하자](http://whdghks913.tistory.com/182)

**4. bluetooth 관련 오류**

NO BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR, using only generic configuration

이런 오류가 빌드 시작시 뜨며 또한 빌드를 진행하면 bdroid_buildcfg.h관련 오류가 뜰겁니다.

한번 해결해 볼까요?

디바이스 폴더에 bluetooth라는 폴더를 만든다음 파일을 생성합시다.

이름 : bdroid_buildcfg.h

내용

/*

\* Copyright (C) 2012 The Android Open Source Project

\*

\* Licensed under the Apache License, Version 2.0 (the "License");

\* you may not use this file except in compliance with the License.

\* You may obtain a copy of the License at

\*

\* http://www.apache.org/licenses/LICENSE-2.0

\*

\* Unless required by applicable law or agreed to in writing, software

\* distributed under the License is distributed on an "AS IS" BASIS,

\* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

\* See the License for the specific language governing permissions and

\* limitations under the License.

\*/

#ifndef _BDROID_BUILDCFG_H

#define _BDROID_BUILDCFG_H

#define BTM_DEF_LOCAL_NAME "SGH-I727"

#define BTA_DISABLE_DELAY 1000 /* in milliseconds */

#endif

hPa님의 말씀에 따르면 #define BTM_DEF_LOCAL_NAME "SGH-I727"는 bluetooth를 실행했을때 기기명을 결정하는 것이고, 아래는 딜레이 라고 합니다 처음 실행했을때의 기기명은 원하는 것으로 바꿔줘야겠죠?

그다음 BoardConfig.mk에 추가해 줍시다.

BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR := device/(제조사)/(기기명)/bluetooth

이제 오류는 나지 않을겁니다.

관련 게시글 :

[2013/04/06 - [강좌/팁/빌드 오류 해결] - NO BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR, using only generic configuration](http://whdghks913.tistory.com/188)

**5. ril폴더의 변경**

cm10까지만 해도 ril관련 java파일을 아래 구문으로 처리할수 있었습니다.

FRAMEWORKS_BASE_SUBDIRS += ../../$(LOCAL_PATH)/ril/

-device.mk안

그러나 cm10.1부터는 이 구문을 사용할수 없으며 java파일을 직접 옮겨 주어야 합니다.

변경된 폴더는 frameworks/opt/telephony/src/java/com/android/internal/telephony.

이 폴더안에 java파일을 수동으로 옮겨야 작동합니다.

cp ./ril/telephony/java/com/android/internal/telephony/(파일명).java ../../../frameworks/opt/telephony/src/java/com/android/internal/telephony

이 명령어 등으로 복사 하시거나 nautilus파일탐색기 등으로 수동으로 옮기면 됩니다.
