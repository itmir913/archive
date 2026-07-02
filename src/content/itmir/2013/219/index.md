---
title: "android_stubs_current_intermediates/javalib.jar 만들 규칙"
date: "2013-05-24T20:52:40+09:00"
category: "Android/Build"
tags: []
description: "make: *** `/home/whdghks913/cluster/system/out/target/common/obj/APPS/Apollo_intermediates/classes-full-debug.jar'에서 필요로 하는 타겟…"
draft: false
original_url: "https://itmir.tistory.com/219"
---

make: \*\*\* `/home/whdghks913/cluster/system/out/target/common/obj/APPS/Apollo\_intermediates/classes-full-debug.jar'에서 필요로 하는 타겟 `/home/whdghks913/cluster/system/out/target/common/obj/JAVA\_LIBRARIES/android\_stubs\_current\_intermediates/javalib.jar'를 만들 규칙이 없습니다. 멈춤.

이상하게 cluster을 빌드하면 이런 오류가 나는군요

이 롬의 기반 소스인 cm-10.1을 빌드해 보면 이런 오류는 없습니다

즉 cluster소스가 꼬였다던지 등의 문제로 빌드가 안되는 겁니다

그래서 해결법을 알아보던중 cm-10.1에서 빌드한 파일을 가져오니 정상적으로 진행하더군요..

또 문제가 일어났던 Apollo어플의 Android.mk에 있는

LOCAL\_SRC\_FILES += $(call all-java-files-under, src)

을 주석처리 하였습니다

아직은 빌드가 완료된것이 아니라 잘은 모르겠지만 아무튼 파일은 올립니다

out/target/common/obj/JAVA\_LIBRARIES

out/target/common/obj/APPS

이 위치에 넣어주세요~

[Apollo\_intermediates.zip

다운로드](./file/Apollo_intermediates.zip)

[JAVA\_LIBRARIES.zip

다운로드](./file/JAVA_LIBRARIES.zip)

+ 2013-05-25 추가

빌드된(?)파일 올립니다

반디집으로 7z 분활압축 했습니다

[android\_stubs\_current\_intermediates.7z.001

다운로드](./file/android_stubs_current_intermediates.7z.001)

[android\_stubs\_current\_intermediates.7z.002

다운로드](./file/android_stubs_current_intermediates.7z.002)

[android\_stubs\_current\_intermediates.7z.003

다운로드](./file/android_stubs_current_intermediates.7z.003)

---

## 첨부파일

- [Apollo_intermediates.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/Apollo_intermediates.zip) `37 KB`
- [JAVA_LIBRARIES.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/JAVA_LIBRARIES.zip) `256 KB`
