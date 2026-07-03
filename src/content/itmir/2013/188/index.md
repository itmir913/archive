---
title: "NO BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR, using only generic configuration"
date: "2013-04-06T13:20:27+09:00"
category: "Android/Build"
tags: []
description: "external/bluetooth/bluedroid/Android.mk:8: NO BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR, using only generic configuration"
draft: false
original_url: "https://itmir.tistory.com/188"
---

external/bluetooth/bluedroid/Android.mk:8: NO BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR, using only generic configuration

cm10.1 빌드를 하고 있는대 초반에 이런 오류가 발생합니다

이 오류를 해결해 보도록 하겠습니다

device/samsung/msm8660-common 또는 msm8660-common에 들어간 다음 bluetooth라는 폴더를 만들어 주세요

이제 소스를 하나 생성할 겁니다

> /*
>
> * Copyright (C) 2012 The Android Open Source Project
>
> *
>
> * Licensed under the Apache License, Version 2.0 (the "License");
>
> * you may not use this file except in compliance with the License.
>
> * You may obtain a copy of the License at
>
> *
>
> * http://www.apache.org/licenses/LICENSE-2.0
>
> *
>
> * Unless required by applicable law or agreed to in writing, software
>
> * distributed under the License is distributed on an "AS IS" BASIS,
>
> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
>
> * See the License for the specific language governing permissions and
>
> * limitations under the License.
>
> */
>
> #ifndef _BDROID_BUILDCFG_H
>
> #define _BDROID_BUILDCFG_H
>
> #define BTM_DEF_LOCAL_NAME "SGH-I727"
>
> #define BTA_DISABLE_DELAY 1000 /* in milliseconds */
>
> #endif

[bdroid_buildcfg.h](./files/bdroid_buildcfg.h)

파란 박스안의 소스를 저장하여 bdroid_buildcfg.h으로 만드시던가 첨부파일을 받아 주시면 됩니다

이 파일을 아까 만든 bluetooth폴더안에 넣어주시면 됩니다

이제 BoardConfigComon.mk을 수정할 겁니다

이 파일은 device/samsung/msm8660-common또는 msm8660-commom에 들어 있습니다

> BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR := device/samsung/msm8660-common/bluetooth

이 구문을 넣어 주세요

[BOARD.txt](./files/BOARD.txt)

구문을 txt로 저장했습니다

만약 이미 있다면 #을 풀어주시거나 없다면 추가해 주시면 됩니다

이제 NO BOARD_BLUETOOTH_BDROID_BUILDCFG_INCLUDE_DIR, using only generic configuration오류는 나타나지 않을 것 입니다

출처 : <http://forum.xda-developers.com/showthread.php?p=35522843>

---

## 첨부파일

- [bdroid_buildcfg.h](./files/bdroid_buildcfg.h)
- [BOARD.txt](./files/BOARD.txt)
