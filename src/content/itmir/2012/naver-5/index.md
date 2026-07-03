---
title: "[베레유저 멘붕] 베레 터치패널은 미라크보다 안 좋다"
date: "2012-10-02T00:00:00+09:00"
category: "Android/Kernel"
tags: []
description: "베가레이서2 터치패널 커널 config 분석 — 미라크A보다 스펙이 낮음을 소스로 증명"
draft: false
original_url: "https://blog.naver.com/whdghks913/20168002652"
---

놀라셨죠? 모두 거짓말이 아닌 사실이니 심장 약하신 분들은 마음의 준비를 하시고 와 주세요.

미라크의 config를 참조하면

...

CONFIG_TOUCHSCREEN_QT602240=y
# CONFIG_TOUCHSCREEN_SYNAPTICS_I2C_RMI is not set
# CONFIG_TOUCHSCREEN_TOUCHRIGHT is not set
# CONFIG_TOUCHSCREEN_TOUCHWIN is not set
# CONFIG_TOUCHSCREEN_USB_COMPOSITE is not set
# CONFIG_TOUCHSCREEN_TOUCHIT213 is not set
# CONFIG_TOUCHSCREEN_TSC2007 is not set
CONFIG_TOUCHSCREEN_MSM_LEGACY=y
CONFIG_ANDROID_TOUCHSCREEN_MSM_HACKS=y

...

QT602240 부품은 그리 양질의 부품은 아닐 수도 있겠지만, 구글에 QT602240 datasheet이라 치면 다음과 같이 뜹니다.

!

첫 페이지인데, 세 개가 쫙 뜨죠. 데이터시트가 있어야 편리한 개발이 가능하기 때문에 가끔 필요한 경우가 있습니다.

이번에는 베가 레이서(IM-A760S / IM-A770K)의 config입니다. (LG 베가레이서, 즉 IM-A780L은 Sain Touch 부품을 사용하였으므로 제외합니다.)

...

CONFIG_KEYBOARD_PMIC8XXX=y
# CONFIG_KEYBOARD_PMIC8058 is not set
CONFIG_INPUT_JOYSTICK=y
CONFIG_INPUT_TOUCHSCREEN=y
# CONFIG_TOUCHSCREEN_CY8C_TS is not set
CONFIG_TOUCHSCREEN_CYTTSP_I2C=y

...

이제 cyttsp_i2c datasheet 검색어로 검색을 해 보겠습니다.

!

첫 페이지입니다. 확연히 다르네요. 패치 기록 웹문서 하나가 외로움을 달래줄 뿐입니다.

베가 레이서는 정말 터치패널에서만큼은 망작임을 확신합니다. 미라크도 10점 터치가 되건만, 왜 베가 레이서만은 그 화면 크기에 4점인데다 그 4점조차도 끊겨서 제대로 할 수가 없는 것일까요?

이번에는 베가X의 커널 소스에서 추출한 config의 일부입니다.

...

# CONFIG_TOUCHSCREEN_CYTTSP_I2C is not set
CONFIG_TOUCHSCREEN_QT602240=y
CONFIG_INPUT_MISC=y
# CONFIG_INPUT_AD714X is not set
# CONFIG_INPUT_ATI_REMOTE is not set
# CONFIG_INPUT_ATI_REMOTE2 is not set
# CONFIG_INPUT_KEYCHORD is not set
# CONFIG_INPUT_KEYSPAN_REMOTE is not set
# CONFIG_INPUT_POWERMATE is not set
# CONFIG_INPUT_YEALINK is not set
# CONFIG_INPUT_CM109 is not set
CONFIG_INPUT_UINPUT=y
CONFIG_INPUT_GPIO=y

...

이럴 수가. 미라크와 같네요?

이번에는 LG 베가X입니다.

...

# CONFIG_TOUCHSCREEN_W90X900 is not set
# CONFIG_TOUCHSCREEN_TPS6507X is not set
# CONFIG_TOUCHSCREEN_CY8C_TS is not set
CONFIG_TOUCHSCREEN_QT602240=y
CONFIG_INPUT_MISC=y
# CONFIG_INPUT_AD714X is not set

...

ㅜㅜ... 아니 이게 말이 되나요?;;

이번에는 베가 LTE입니다.

...

CONFIG_INPUT_JOYSTICK=y
CONFIG_INPUT_TOUCHSCREEN=y
# CONFIG_TOUCHSCREEN_ATMEL_MAXTOUCH is not set
# CONFIG_TOUCHSCREEN_CY8C_TS is not set
# CONFIG_TOUCHSCREEN_CYTTSP_I2C is not set
CONFIG_TOUCHSCREEN_QT602240=y
CONFIG_INPUT_MISC=y
CONFIG_INPUT_UINPUT=y

...

이제 서서히 멘탈의 증발이 느껴지시죠?

미라크 A입니다. 베가 레이서와 같은 패널 셋팅이 되어 있습니다.

...

CONFIG_TOUCHSCREEN_MSM_LEGACY=y
CONFIG_ANDROID_TOUCHSCREEN_MSM_HACKS=y
# CONFIG_TOUCHSCREEN_TPS6507X is not set
# CONFIG_TOUCHSCREEN_CY8C_TS is not set
CONFIG_TOUCHSCREEN_CYTTSP_I2C=y
CONFIG_INPUT_MISC=y

...

최종 멘붕을 만드는 LG 베가레이서의 커널 config입니다!!

...

# CONFIG_TOUCHSCREEN_W90X900 is not set
# CONFIG_TOUCHSCREEN_TPS6507X is not set
# CONFIG_TOUCHSCREEN_CY8C_TS is not set
# CONFIG_TOUCHSCREEN_CYTTSP_I2C is not set
CONFIG_TOUCHSCREEN_SAIN_TOUCH=y
CONFIG_INPUT_MISC=y
# CONFIG_INPUT_AD714X is not set

...

왜 이 두 휴대폰만 이런 패널을 썼는지 의문이 사그라들지를 않습니다.. 과연 왜일까요.
