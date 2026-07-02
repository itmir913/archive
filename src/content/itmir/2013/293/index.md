---
title: "번외 - 설치된 패키지명 확인하기 (활용:언락커)"
date: "2013-08-02T11:51:19+09:00"
category: "Android/App"
tags: []
description: "언락커를 만들려면 설치된 어플을 한다음 언락커가 설치되었는지를 살펴봐야 합니다"
draft: false
original_url: "https://itmir.tistory.com/293"
---

언락커를 만들려면 설치된 어플을 한다음 언락커가 설치되었는지를 살펴봐야 합니다

마켓 결제 체크든지 이런 기능은 아직 잘 모르겠습니다..

번외편으로 설치된 어플을 확인해보겠습니다

private static final String CHECK\_PACKAGE\_NAME = "(확인하려는 어플의패키지명 대문자)";

// Package 설치여부 확인

PackageManager pm = getPackageManager();

try {

pm.getApplicationInfo(CHECK\_PACKAGE\_NAME.toLowerCase(),

PackageManager.GET\_META\_DATA);

// 패키지가 있을경우 실행할 내용

Toast.makeText(this,

"PACKAGE 명 = " + CHECK\_PACKAGE\_NAME.toLowerCase(),

Toast.LENGTH\_SHORT).show();

} catch (NameNotFoundException e) {

// 패키지가 없을경우 실행할 내용

Toast.makeText(this, "PACKAGE 가 설치 되지 않았습니다.", Toast.LENGTH\_SHORT).show();

}

이정도만 써도 아실겁니다 ㅎㅎ

출처 : <http://arabiannight.tistory.com/86>
