---
title: "[Dev] ClockWorkMod Recovery 키값과 표시 로고 바꿔보기 [개발자글]"
date: "2013-04-26T16:35:01+09:00"
category: "Android/Build"
tags: []
description: "이번에는 ClockWorkMod Recovery에 대해 한번 살펴보도록 하겠습니다"
draft: false
original_url: "https://itmir.tistory.com/197"
---

이번에는 ClockWorkMod Recovery에 대해 한번 살펴보도록 하겠습니다

이 글은 약간의 소스를 읽는 능력이 필요합니다

일반 유저 분께서는 이해하기 힘드실 수도 있는 부분을 다루고 있습니다

**또한 아직 확실하지 않은 부분과 비정확한 내용도 기록되어 있으니 판단해서 받아드리시길 바랍니다**

항상 부족한 부분이 있으면 보충/보완될 예정입니다

ClockWorkMod Recovery, 줄여서 CWM 이라고도 언급합니다

이 리버커리는 Koush라는 분께서 작업하시고 계시는 커스텀 리커버리 입니다

다들 아시다 싶이 CM의 소스를 받으면 bootable/recovery폴더에 CWM관련 파일들이 있지요

[htt](https://github.com/cyanogenmod/android_bootable_recovery)[ps://github.com/cyanogenmod/android_bootable_recovery](https://github.com/cyanogenmod/android_bootable_recovery)

이 링크를 들어가 보셔도 recovery폴더의 내용물을 확인 하실수 있으십니다

이제 CWM에 대해 하나하나 살펴보도록 하겠습니다 (jellybean(cm10)기준)

**1. CWM-based Recovery말고 내 이름을 넣어보자**

우리는 CWM을 들어가면 아래 나오는 CWM-based-recovery등을 바꿔보고 싶습니다

Android.mk를 열어봐 주시면 아래와 같은 내용이 있습니다

```makefile
ifdef I_AM_KOUSH

RECOVERY_NAME := ClockworkMod Recovery

LOCAL_CFLAGS += -DI_AM_KOUSH

else

ifndef RECOVERY_NAME

RECOVERY_NAME := CWM-based Recovery

endif

endif

RECOVERY_VERSION := $(RECOVERY_NAME) v6.0.2.8

LOCAL_CFLAGS += -DRECOVERY_VERSION="$(RECOVERY_VERSION)"
```

Recovery Name을 설정해 주는 부분이 보이시나요?

제 생각에는 BoardConfig.mk에 I_AM_KOUSH := true 라면 RECOVERY_NAME은 ClockworkMod Recovery로,

만약 지정되지 않았거나 false라면 CWM-based Recovery라고 설정되어 진다고 예상할 수 있습니다

즉 이 부분의 수정이 이루어 진다면 표시되는 이름의 수정이 가능할 것이라는 뜻이 되겠지요

RECOVERY_VERSION := $(RECOVERY_NAME) v6.0.2.8  
바로 이부분과 RECOVERY_NAME부분을 수정해 주면 재작자의 이름도 넣을수 있을겁니다

**RECOVERY_NAME을 CWM-based Recovery말고 다른 이름으로 수정해서 빌드해 보세요**

아직까지 BoardConfig.mk에 구문을 추가해 이름을 지정하는건 모르겠습니다

**2. Power Off 추가하기**

그냥 빌드하다 보면 버튼이 맞지 않을 경우가 생깁니다

예를 들자면 볼륨위-아래-위 키를 눌러 활성화 시킨다음에서야 확인이 가능하다는 것이지요

cwm - 5.x.x.x 버전에서는 default_recovery_ui.c파일이,

cwm - 6.x.x.x 버전에서는 default_recovery_keys.c파일이 키를 담당하고 있습니다

그럼 CWM6에서는 ui.c가 없냐? 그건 아닙니다

소스를 다운받지 않아도 [github에서 확인](https://github.com/CyanogenMod/android_bootable_recovery/blob/jellybean/default_recovery_ui.c)해 보시면 default_recovery_ui.c에는

```c
char* MENU_ITEMS[] = { "reboot system now",

                       "install zip from sdcard",

                       "install zip from sideload",

                       "wipe data/factory reset",

                       "wipe cache partition",

                       "backup and restore",

                       "mounts and storage",

                       "advanced",

                       "power off",

                       NULL };
```

이런 부분이 있는대요 짐작해 보컨대 cwm6버전에서는 default_recovery_ui.c는 화면에 표시되는 메뉴를 나타낸다고 짐작할 수 있습니다

여기서 뭔가를 발견해 보자면 power off 버튼이 사라진것을 눈치 채실수 있으신대요

<https://github.com/CyanogenMod/android_bootable_recovery/commit/cd3705e4aba68274f7033a32bfc0d9b1010a4513>

이 commit을 보면 Koush께서 이 부분을 삭제 하신것을 알수 있습니다

그런대 메뉴만 삭제하셨지 기능은 제거하지 않으셨는대요

[이 파일을 참고해 주시면 됩니다](https://github.com/CyanogenMod/android_bootable_recovery/blob/jellybean/extendedcommands.c) - extendedcommands.c

선택 버튼만 사라진 거라면 되돌릴수 있겠죠?

```c
char* MENU_ITEMS[] = { "reboot system now",

                       "install zip from sdcard",

                       "install zip from sideload",

                       "wipe data/factory reset",

                       "wipe cache partition",

                       "backup and restore",

                       "mounts and storage",

                       "advanced",

                       "power off",

                       NULL };
```

이렇게 수정해 주시면 됩니다

**3. 키 바꾸기**

자 이제 막바지에 접어들고 있군요

참고글 : <http://cafe.naver.com/androidhacker/461>

이번에는 키를 변경해 보도록 하겠습니다

아까 언급한것처럼 default_recovery_ui.c와 default_recovery_keys.c을 봐주시면 됩니다

CWM6을 기준으로 설명하고 있으므로 default_recovery_keys.c을 기준으로 설명하겠습니다

```c
int device_handle_key(int key_code, int visible) {

    if (visible) {

        switch (key_code) {

            case KEY_CAPSLOCK:

            case KEY_DOWN:

            case KEY_VOLUMEDOWN:

            case KEY_MENU:

                return HIGHLIGHT_DOWN;

            case KEY_LEFTSHIFT:

            case KEY_UP:

            case KEY_VOLUMEUP:

            case KEY_HOME:

                return HIGHLIGHT_UP;

            case KEY_POWER:

                if (ui_get_showing_back_button()) {

                    return SELECT_ITEM;

                }

                if (!get_allow_toggle_display() && !ui_root_menu) {

                    return GO_BACK;

                }

                break;

            case KEY_LEFTBRACE:

            case KEY_ENTER:

            case BTN_MOUSE:

            case KEY_CAMERA:

            case KEY_F21:

            case KEY_SEND:

                return SELECT_ITEM;

            case KEY_END:

            case KEY_BACKSPACE:

            case KEY_SEARCH:

                if (ui_get_showing_back_button()) {

                    return SELECT_ITEM;

                }

                if (!get_allow_toggle_display() && !ui_root_menu) {

                    return GO_BACK;

                }

            case KEY_BACK:

                if (!ui_root_menu) {

                    return GO_BACK;

                }

        }

    }

    return NO_ACTION;

}
```

아! 딱 감이 오시는 분들도 계실겁니다

짤라서 보도록 하겠습니다

```c
case KEY_LEFTBRACE:

            case KEY_ENTER:

            case BTN_MOUSE:

            case KEY_CAMERA:

            case KEY_F21:

            case KEY_SEND:

                return SELECT_ITEM;
```

만약 KEY_XXX가 눌려졌을경우 SELECT_ITEM을 반환한다 라는 뜻입니다

어떠한 키가 눌려졌는지를 확인한 다음 값을 반환해서 작동하는 방식으로 되어 있지요

그럼 이것을 이용하여 어떤 키가 눌려졌을경우 어떠한 작업을 할지 우리가 직접 정할 수 있습니다

case KEY_XXX또는 case [버튼의 키코드]를 추가해 주시면 되겠죠?

키코드는 CWM에서 advanced 부분에 보시면 Key test부분이 있습니다 참고 하시길

또한 소스를 수정하지 않고 BoardConfig.mk을 통해서 소스를 수정 할 수 있습니다

```makefile
BOARD_CUSTOM_RECOVERY_KEYMAPPING := ../../device/[제조사]/[기기명]/recovery_keys.c
```

BOARD_CUSTOM_RECOVERY_KEYMAPPING옵션으로 자신이 수정한 key.c를 사용해 주셔도 되지요~

hPa님의 소스를 보시면 (https://github.com/985hPaKicK/android_device_pantech_ef46l/blob/jellybean/recovery/recovery_keys.c )

```c
if (ui_get_showing_back_button()) {

                    return SELECT_ITEM;

                }

                if (!get_allow_toggle_display() && !ui_root_menu) {

                    return GO_BACK;

                }

                break;
```

부분이 없는것을 확인할 수 있습니다

볼륨위-아래-위를 했을때 변하는 키의 값 같은대요 이런게 필요 없으시다면 지우셔도 될거 같습니다~

이렇게 해서 ClockWorkMod Recovery에 대해 살펴봤습니다

CWM으로 할 수 있는 간단한 작업들 3가지를 확인해 보는 시간이었습니다~ 읽어 주셔서 감사합니다 ㅎㅎ
