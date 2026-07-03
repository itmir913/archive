---
title: "#10 String 변수 (문자열 변수 설정하기)"
date: "2013-08-17T17:04:15+09:00"
category: "Android/App"
tags: []
description: "원래 이 글은 번외편 이었다가 진도에 맞춰 강좌에 포함된 글입니다"
draft: false
original_url: "https://itmir.tistory.com/298"
---

원래 이 글은 번외편 이었다가 진도에 맞춰 강좌에 포함된 글입니다

어플 개발 강좌에서 번외 강좌는 추후 본 강좌에 추가됩니다

(추가되며 내용이 변경될수 있습니다)

이번에는 String에서 글자 변수를 사용하는 방법을 배워보도록 하겠습니다

## 10. String 변수 (문자열 변수 설정하기)

### 10-1 String.xml사용법

안드로이드에서 화면에 글자를 표시하는 방법은 두가지 정도가 있습니다

`android:text="안녕하십니까?"`

처럼 그냥 글자를 넣는 방법이 있습니다'

그리고 res/values/string.xml을 이용하여 국가마다 다른 언어를 보여줄수도 있고 여러번 필요한 글자를 저장할수도 있습니다

그런대 이 String.xml에서 값이 변할수 있는 여지가 있습니다

예를 들자면

"현재 남은 배터리가 12%입니다"

"미르님 안녕하십니까?"

"오늘 일정은 강좌 정독 입니다"

처럼 말이죠

어떻게 해야 할까요?

필요한 string.xml에

%1$s

%2$s

이런 형식으로 string에 추가하시면 됩니다

마지막에 있는 알파벳 s에 관한 설명을 해드리자면

%1$**s**:문자(string)

%1$**d**:숫자(int)

이렇게 써주셔야 합니다

### 10-2 자바에서는?

그렇다면 자바에서 어떻게 처리해야 할까요?

```java
String.format(getString(R.string.hello), getString(R.string.ok))
```

이렇게 String.format을 이용하시면 됩니다

예를 들어 볼까요?

```java
TextView Test;
Test = (TextView) findViewById(R.id.textview1);
test.setText(String.format(getString(R.string.hello), "미르"));
```

뭐 이런 내용이 있다고 합시다

string.xml에는 `<string name="hello">%1$s님 안녕하세요!</string>`라고 되어 있습니다

그렇다면 이때 앞에 있는 getString(R.string.hello)는 "%1$s님 안녕하세요!"이라는 글자인대 ,뒤에 "미르"라는 글자가 있으므로

"미르님 안녕하세요!"

라고 나타나게 됩니다

저 "미르"부분도 String처리가 가능합니다 getString(R.string.mir) 이렇게 저 "미르"자리에 넣어주시면 국가에 맞게 다른 언어가 나타납니다

만약 2개이상 변수를 하려면 쉼표를 입력한다음 게속 이어나가시면 됩니다

이 부분은 String.xml에게 꼭 필요한 부분이니 꼭 숙지하시길 바랍니다!

참조 : <http://jhrun.tistory.com/123>
