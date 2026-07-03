---
title: "Android Meal Library - 학교 급식 파싱 나이스 주소 변경 안내"
date: "2016-07-27T21:07:44+09:00"
category: "Programming"
tags: []
description: "학교 급식 파싱 라이브러리를 사용해주시는 개발자분들에게 전해드릴 내용이 있습니다."
draft: false
original_url: "https://itmir.tistory.com/616"
---

안녕하세요.

학교 급식 파싱 라이브러리를 사용해주시는 개발자분들에게 전해드릴 내용이 있습니다.

나이스의 급식 주소가 변경되어 기존 주소를 통해 파싱을 시도하실 경우 오류가 발생합니다.

오류를 해결하기 위해서는 아래와 같은 작업을 통해 주소를 변경하셔야 합니다.

MealLibrary.java 파일의 모든 "http://hes."을 "http://stu."로 변경하십시오.

대국민 나이스 서비스의 개편작업으로 사이트 주소가 변경되었지만, 기존 주소 또한 한시적 기한동안 지원하다 이제 hes.~ 주소를 버린 듯 합니다.

관련 commit : <https://github.com/itmir913/WondangHighSchool/commit/0569715fe573f3123078e67334a39d0b81a43e8e>

도움 : <http://cafe.naver.com/orangef914k/26162>

급식 파싱 참고 URL :

[[Application] - Android Meal Library - 학교 급식 파싱 가이드](/archive/itmir/2015/579)

[[Development/App] - Android Meal Library - 학교 급식 파싱 라이브러리](/archive/itmir/2014/486)