---
title: "Overlay의 문제, <add-resource>를 사용해 해결하자"
date: "2013-03-24T13:02:00+09:00"
category: "Android/Build"
tags: []
description: "cm10 디바이스 소스를 이용해 cm10.1을 빌드할때 발생한 오류입니다."
draft: false
original_url: "https://itmir.tistory.com/182"
---

cm10 디바이스 소스를 이용해 cm10.1을 빌드할때 발생한 오류입니다.

overlay관련 문제 내용을 보면,

> target Export Resources: framework-res (/home/whdghks913/cluster/system/out/target/common/obj/APPS/framework-res\_intermediates/package-export.apk)
>
> device/pantech/ef46l/overlay/frameworks/base/core/res/res/values/config.xml:30: error: Resource at config\_networkLocationProviderPackageName appears in overlay but not in the base package; use <add-resource> to add.
>
> device/pantech/ef46l/overlay/frameworks/base/core/res/res/values/config.xml:33: error: Resource at config\_geocodeProviderPackageName appears in overlay but not in the base package; use <add-resource> to add.
>
> device/pantech/ef46l/overlay/frameworks/base/core/res/res/values/config.xml:40: error: Resource at config\_autoBrightnessButtonKeyboard appears in overlay but not in the base package; use <add-resource> to add.
>
> make: \*\*\* [/home/whdghks913/cluster/system/out/target/common/obj/APPS/framework-res\_intermediates/package-export.apk] 오류 1
>
> make: \*\*\* 파일 `/home/whdghks913/cluster/system/out/target/common/obj/APPS/framework-res\_intermediates/package-export.apk'을(를) 지웁니다

위와 같은 오류가 발생합니다.

이 오류는 `<add-resource>`를 이용해 해결할 수 있습니다.

```xml
<add-resource type="string" name="오류난 overlay의 구문 이름"></add-resource>
```

위 박스의 내용을 오류난 구문의 앞에 넣어주시면 됩니다.

예를 들면,

```xml
<String name="testoverlay">overlay</String>
```

이 부분이 문제가 있다고 합니다.

이때 아래 부분처럼 `<add-resource>`를 넣어주시면 해결됩니다.

```xml
<add-resource type="string" name="testoverlay"></add-resource>

<String name="testoverlay">overlay</String>
```

만약 String이 아니라 bool 등 일경우 type을 적절히 바꿔주시면 되겠죠?

출처: <http://cafe.naver.com/develoid/165665>, 호호
