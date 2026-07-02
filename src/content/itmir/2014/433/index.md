---
title: "유동적으로 어플 Icon 런처에서 숨기기"
date: "2014-01-18T22:32:00+09:00"
category: "Android/App"
tags: []
description: "실행할경우 런처에서 아이콘을 숨기는 기능이 있습니다"
draft: false
original_url: "https://itmir.tistory.com/433"
---

파워 앰프 언락커를 예로 들면

실행할경우 런처에서 아이콘을 숨기는 기능이 있습니다

이처럼 런처에서 어플의 Icon을 숨길수 있습니다

AndroidManifest.xml에서는 아래와 같이 설정하지만 java에서 유동적으로도 설정이 가능합니다

<intent-filter>

    <action android:name="android.intent.action.MAIN" />

**<category android:name="android.intent.category.LAUNCHER" />**

</intent-filter>

아래는 예제 입니다

첫번째 예제

ComponentName componentToDisable =

    new ComponentName("com.example.app",

"com.example.app.Activity");

getPackageManager().setComponentEnabledSetting(

    componentToDisable,

PackageManager.COMPONENT\_ENABLED\_STATE\_DISABLED,

PackageManager.DONT\_KILL\_APP);

두번째 예제

PackageManager pm = getPackageManager();

pm.setApplicationEnabledSetting("com.example.app",

    PackageManager.COMPONENT\_ENABLED\_STATE\_DISABLED,

PackageManager.DONT\_KILL\_APP);

자신의 어플(this)외 타 어플의 아이콘을 숨기려고 하면 퍼미션 오류가 나타납니다

android:sharedUserId속성을 이용하면 가능하다고도 합니다

출처 : <http://www.helloandroid.com/tutorials/removing-app-icon-launcher>

<http://cafe.naver.com/aphone/55892>
