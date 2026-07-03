---
title: "Slide2Wake for CYTTSP_Gen3(베가 레이서, 미라크A) 패치파일"
date: "2014-01-09T00:00:00+09:00"
category: "Android/Kernel"
tags: []
description: "베가 레이서·미라크A용 CYTTSP_Gen3 터치스크린 Slide2Wake 커널 패치파일"
draft: false
original_url: "https://blog.naver.com/whdghks913/20202774967"
---

본 패치 파일을 사용함에 있어서 먼저 주의할 것이 있습니다.
1. 만일 버그가 있을 경우 즉시 개발자에게 로그와 함께 의뢰를 하는 것이 좋으며, cat /proc/kmsg > /sdcard/log.txt 한 뒤 log.txt를 보내 주시면 됩니다.
2. 본 코드는 시야 커널에서 편집한 것으로 코드의 원저작권은 고칸 모랄에게 있습니다. 즉 본인은 이 소스의 저작권에 대해 권리를 주장하지 않습니다.
3. 이 커널 패치는 v2.17용 순정 커널 소스에만 적용 가능하며, 그 외의 경우에는 패치 적용을 보증할 수 없습니다.
4. 이 코드는 정상적인 동작을 보증할 수 없으며, 정확한 진단이 필요한 상태입니다. 또한 Slide2Wake가 정상적으로 추가되어도 Slide2Wake를 활성화할 방법을 아직 정확히 알 수 없기 때문에 그것에 대한 진단도 필요합니다.
