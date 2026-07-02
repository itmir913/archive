---
title: "[Java] HTML 태그(Tag) 삭제하기"
date: "2014-02-15T11:30:00+09:00"
category: "Programming/Java"
tags: []
description: "HTML을 파싱하고난 후 결과를 받아보면 HTML의 태그가 존재하는 경우가 간혹 있습니다."
draft: false
original_url: "https://itmir.tistory.com/474"
---

HTML을 파싱하고난 후 결과를 받아보면 HTML의 태그가 존재하는 경우가 간혹 있습니다.

<p>안녕하세요<img>~</img></p>

여기서 "안녕하세요"만 얻고 싶은데 <img>까지 같이 오는 경우에

아래 메소드로 HTML 태그 삭제가 가능합니다.

```java
public String RemoveHTMLTag(String changeStr){
    if(changeStr != null && !changeStr.equals("")){
        changeStr = changeStr.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
    }else{
        changeStr = "";
    }
    return changeStr;
}
```
