---
title: "어플을 어플 서랍에서 숨기는 방법"
date: "2013-05-11T16:50:21+09:00"
category: "SmartPhone/Android"
tags: []
description: "어플이 어플서랍에서 숨겨져야 할때가 있습니다"
draft: false
original_url: "https://itmir.tistory.com/212"
---

어플이 어플서랍에서 숨겨져야 할때가 있습니다

특히 액티비티로 호출될때 말이죠

이럴때는 xml을 하나 수정하면 되는대요

AndroidManifest.xml에서 아래 구문을 찾아 지워 주시면 됩니다

```xml
<category android:name="android.intent.category.LAUNCHER" />
```
