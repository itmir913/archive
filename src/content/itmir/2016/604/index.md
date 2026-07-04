---
title: "Plugin is too old, please update to a more recent version, or set ANDROID_DAILY_OVERRIDE"
date: "2016-01-03T19:56:56+09:00"
category: "Programming"
tags: []
description: "오류 정보Plugin is too old, please update to a more recent version, or set ANDROID_DAILY_OVERRIDE environment variable toError:Could not find…"
draft: false
original_url: "https://itmir.tistory.com/604"
---

오류 정보

```
Plugin is too old, please update to a more recent version, or set ANDROID_DAILY_OVERRIDE environment variable to

Error:Could not find com.android.tools.build:gradle:2.0.0.

Searched in the following locations:

    file:/C:/Program Files/AndroidStudio/gradle/m2repository/com/android/tools/build/gradle/2.0.0/gradle-2.0.0.pom

    file:/C:/Program Files/AndroidStudio/gradle/m2repository/com/android/tools/build/gradle/2.0.0/gradle-2.0.0.jar

    https://jcenter.bintray.com/com/android/tools/build/gradle/2.0.0/gradle-2.0.0.pom

    https://jcenter.bintray.com/com/android/tools/build/gradle/2.0.0/gradle-2.0.0.jar

Required by:

    :ReportCard:unspecified
```

해결 방법

필자는 이 오류를 해결하기 위해 Android Studio와 SDK를 지우고 다시 깔았지만 해결이 안되었다 :)

app/build.gradle 파일이 아닌(Not)

<App Source>/build.gradle 파일을 수정해야 한다.

```groovy
dependencies {

    classpath 'com.android.tools.build:gradle:2.0.0-alpha1'

    // NOTE: Do not place your application dependencies here; they belong

    // in the individual module build.gradle files

}
```

필자는 classpath의 마지막 부분이 alpha1 으로 되어 있었다.

이 부분을 alpha3으로 바꿔서 해결하였다.

alpha3으로 바꾼 이유는

https://jcenter.bintray.com/com/android/tools/build/gradle/

이 사이트의 맨 마지막이 2.0.0-alpha3 이었기 때문이다.

출처 / 팁

없다.
