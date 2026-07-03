---
title: "pre 태그만 있는 과거 게시글도 Highlight.js 적용하기"
date: "2020-11-24T21:50:03+09:00"
category: "Tistory"
tags: []
description: "아래 링크는 과거 2013년에 필자가 Syntax Highlighter를 적용한 후 남긴 포스팅입니다."
draft: false
original_url: "https://itmir.tistory.com/680"
---

## `<pre><code>`가 아닌, `<pre>`만 있는 과거 게시글

아래 링크는 과거 2013년에 필자가 Syntax Highlighter를 적용한 후 남긴 포스팅입니다.

[[Tistory] - 티스토리 좋은 소스코드 표현방법](/archive/itmir/2013/324)

[티스토리 좋은 소스코드 표현방법](/archive/itmir/2013/324)

그러나 이는 업데이트도 없고, [highlight.js](https://highlightjs.org/)라는 강력하고 간편한 대체제가 나왔기 때문에 현재로서는 메리트가 없습니다.

반면, [highlight.js](https://highlightjs.org/)는 자동 언어 감지 기능과, 파일 업로드 대신 코드 몇 줄만 html 소스에 추가하면 바로 적용되는 간편함 등의 장점이 있으며, 지금도 업데이트가 이루어지는 프로젝트입니다.

따라서 필자는 블로그의 코드 하이라이팅 기능을 [highlight.js](https://highlightjs.org/)로 변경하기로 마음먹었습니다.

티스토리 코드 하이라이트 방법을 새로 바꾸면서, 한 가지 문제가 생겼습니다.

바로 기존까지 사용하던 Syntax Highlighter는 `<code>` 태그를 사용하지 않는다는 점입니다.

highlight.js로 코드를 강조 표시하기 위해서는 다음과 같은 html 태그가 필요합니다.

```
<pre><code>
  // your code
</code></pre>
```

즉, pre 태그 안에 code 태그가 있어야하지요.

하지만 Syntax Highlighter는 pre 태그만 사용하였고, code 태그를 사용하지 않았습니다.

이러한 차이는 과거 게시글의 코드가 강조 표시되지 않는 문제를 일으킬 수 있습니다.

만약, 수정해야 할 게시글의 수가 적었다면, 필자가 하나씩 수정하는 방법도 있었을 겁니다.

다만 글을 모두 수정하기에는 Syntax Highlighter를 적용한 뒤로 작성한 게시글의 양이 꽤 많다는 점이 걸림돌이었습니다.

그럴 수 밖에 없는 것이, 2013년 이후로 약 7년 동안 작성한 게시글을 전부 손봐야 한다는 뜻이기 때문입니다.

이러한 노가다를 하고싶지 않았던 저는 방법을 찾았고, 찾았습니다!

## jQuery를 이용하여 적용하기

jQuery를 이용하면 pre 태그만 있는 코드도 하이라이팅을 할 수 있습니다.

아래 자바 스크립트를 hljs.initHighlightingOnLoad(); 이후에 넣어줍니다.

```
<script>
$(document).ready(function() {
  $('pre:not(:has(code))').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
</script>
```

그러면 다음과 같은 모습이 됩니다.

```
<script>
  hljs.initHighlightingOnLoad();
</script>
<script>
$(document).ready(function() {
  $('pre:not(:has(code))').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
</script>
<!-- 생략 -->
</head>
```

이렇게 hljs.initHighlightingOnLoad(); 밑에 스크립트를 넣어주시면 `<pre>` 태그만 있는 소스 파일도 [highlight.js](https://highlightjs.org/)를 적용할 수 있습니다.

원리는 간단합니다.

jquery를 이용하여 code 태그를 갖고 있지 않은 pre 태그를 찾습니다. 그 후에 code를 갖고 있지 않은 pre 태그를 highlight.js의 highlightBlock() 옵션을 이용하여 강제로 하이라이팅을 적용시키는 방법입니다.

이렇게 하여 기존 게시글의 수정 없이 highlight.js를 적용할 수 있었습니다.

이런 방법이 없었다면 그 많은 게시글을 일일이 고쳐야 한다고 생각하니... 아찔하네요.

## 참고.

<https://webdir.tistory.com/439>

<https://www.codingfactory.net/10772>