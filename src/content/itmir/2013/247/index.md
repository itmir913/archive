---
title: "baksmali.jar 진저브레드 이하버전 오류 해결"
date: "2013-06-12T19:58:48+09:00"
category: "SmartPhone/Android"
tags: []
description: "baksmali-1.3.jar이상부터는 기본적으로 ICS이상에 최적화 되어 있기 때문에 ICS이하 버전은 정상적으로 deodex가 되지 않습니다"
draft: false
original_url: "https://itmir.tistory.com/247"
---

baksmali-1.3.jar이상부터는 기본적으로 ICS이상에 최적화 되어 있기 때문에 ICS이하 버전은 정상적으로 deodex가 되지 않습니다

그러므로 -a를 이용하여 API를 지정해 주어야 합니다

> java -jar baksmali.jar -a 10 -d (시스템 파일이 설치된 핸드폰의 framework파일 폴더) -c $BOOTCLASSPATH 프레임워크어플.odex

이렇게 지정해 주시면 됩니다

저 문구는 진저브레드 버전(API=9~10)기준입니다

프로요는 8로 하시면 될겁니다
