---
title: "번외 - ClickableSpan 사용하기"
date: "2013-08-19T18:42:16+09:00"
category: "Android/App"
tags: []
description: "Spannable이라는 것을 이용해서 TextView의 많은 효과를 줄수 있는대요"
draft: false
original_url: "https://itmir.tistory.com/317"
---

번외글입니다

Spannable이라는 것을 이용해서 TextView의 많은 효과를 줄수 있는대요

글자 클릭 이벤트, 일부의 색 변경을 할수 있습니다

[JAVA]

```java
Spannable span;
span = (Spannable) text1.getText();
```

[XML]

```xml
android:bufferType="spannable"
```

을 먼저 해주셔야 합니다

아래는 글자 속성관련 코드입니다

```java
span.setSpan(new UnderlineSpan(), start, end,
        Spannable.SPAN_INCLUSIVE_INCLUSIVE);
// 글자 일부만 밑줄

span.setSpan(new ForegroundColorSpan(0xFF0B76C8), start, end,
        Spannable.SPAN_INCLUSIVE_INCLUSIVE);
// 글자 일부만 색 변경

span.setSpan(new BackgroundColorSpan(0xFF0B76C8), start, end,
        Spannable.SPAN_INCLUSIVE_INCLUSIVE);
// 글자 일부 배경 변경
```

UnderlineSpan()는 밑줄 ForegroundColorSpan는 글자색, BackgroundColorSpan는 배경색을 설정합니다

저기있는 start와 end는 처음부터 적용할 글자의 숫자인대요

처음글자 0부터 시작해서 글자 하나하나마다 1씩 올라가고 공백도 포함됩니다

아래는 클릭관련 코드입니다

```java
private void setClickSpan()
{
    clickSpan = new ClickableSpan()
    {
        public void onClick(View v)
        {
            Toast.makeText(this, "클릭스팬 발생", 1000).show();
        }
    }
}
```

private void setSpan()

{

  Spannable span = (Spannable) textView.getText();

span.setSpan(clickSpan, start, end, Spannable.SPAN\_INCLUSIVE\_INCLUSIVE);

}

출처 : <http://colib.tistory.com/4>
