---
title: "#번외 멀티 윈도우에 내가 만든 어플을 추가해 보자"
date: "2013-08-09T19:00:34+09:00"
category: "Android/App"
tags: []
description: "내가 만든 어플을 멀티 윈도우가 지원되게 바꾸려면?"
draft: false
original_url: "https://itmir.tistory.com/301"
---

내가 만든 어플을 멀티 윈도우가 지원되게 바꾸려면?

<application

android:label="string/app_name" />

밑에 아래 구문을 추가합니다

> <meta-data android:name="com.sec.android.support.multiwindow" android:value="true" />
>
> <meta-data android:name="com.sec.android.multiwindow.STYLE" android:value="fixedRatio" />

그다음 런처에 아이콘을 표시하려는 액티비티, 즉

<category android:name="android.intent.category.LAUNCHER" />

밑에

> <category android:name="android.intent.category.MULTIWINDOW_LAUNCHER" />

추가합니다

그다음 </application>위에

> <meta-data android:name="com.sec.android.multiwindow.DEFAULT_SIZE_W"  android:resource="@dimen/app_defaultsize_w" />
>
> <meta-data android:name="com.sec.android.multiwindow.DEFAULT_SIZE_H" android:resource="@dimen/app_defaultsize_h" />
>
> <meta-data android:name="com.sec.android.multiwindow.MINIMUM_SIZE_W" android:resource="@dimen/app_minimumsize_w" />
>
> <meta-data android:name="com.sec.android.multiwindow.MINIMUM_SIZE_H" android:resource="@dimen/app_minimumsize_h" />

이 네줄을 추가합니다

마지막으로 values/dimens.xml에

> <dimen name="app_defaultsize_w">1.0dip</dimen>
>
> <dimen name="app_defaultsize_h">1.0dip</dimen>
>
> <dimen name="app_minimumsize_w">1.0dip</dimen>
>
> <dimen name="app_minimumsize_h">1.0dip</dimen>

이 4줄을 추가하면 됩니다

그럼 작동은 되게 되는대 짤릴수 있습니다

ScrollView등을 잘 이용하여서 짤려도 스크롤되게, 또는 그냥 보이게 수정해야 합니다

그건 어플 개발자라면 할줄 있겠죠?

출처:http://cafe.naver.com/samfirm/3185

오리도리(wowo5605)님 감사드립니다~
