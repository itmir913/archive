---
title: "마우스 오른쪽 비활성화 HTML 소스"
date: "2013-06-26T15:53:16+09:00"
category: "Tistory"
tags: []
description: "마우스 오른쪽 버튼을 비활성화 하는 HTML 소스입니다"
draft: false
original_url: "https://itmir.tistory.com/258"
---

마우스 오른쪽 버튼을 비활성화 하는 HTML 소스입니다

document.oncontextmenu = function anonymous() { alert('마우스 오른쪽 버튼은 사용하실 수 없습니다'); return false } ;

학교 홈페이지에 주석으로 있기에 가져왔습니다 ㅋ

아래는 드레그를 방지하는 HTML 소스 입니다

document.onselectstart = function anonymous() { return false } ;
