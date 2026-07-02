---
title: "Android Market Version Checker - 안드로이드 마켓 버전 확인하기"
date: "2014-09-05T19:06:03+09:00"
category: "Android/App"
tags: []
description: "마켓에 올려진 어플의 버전을 받아서 반환하는 라이브러리 입니다"
draft: false
original_url: "https://itmir.tistory.com/524"
---

![](./images/Google Play Store Logo.png)

마켓에 올려진 어플의 버전을 받아서 반환하는 라이브러리 입니다

현재 버전과 비교해서 다를경우 마켓으로 이동후, 업데이트 할수 있도록 코드를 작성할 수 있습니다

인터넷에 올라와있는 몇가지 방법을 다듬어 라이브러리의 형태로 배포합니다

원본 java소스도 첨부합니다

### 주의하세요

구글 마켓 웹사이트를 파싱해서 가져오는 방식입니다

데이터가 많이 소요됩니다

어플을 실행할때마다 이 라이브러리를 이용해서 버전을 체크하는 방식은 그닥 추천드리고 싶지는 않네요..

제 테스트로 한번 가져올때 0.02mb~0.04mb가 소요되었습니다

참고로 인터넷 권한을 꼭 추가해 주셔야 합니다

### 라이브러리 다운로드

MarketVersionChecker를 사용하기 위해서는 jsoup 라이브러리가 필요합니다

jsoup라이브러리는 <http://jsoup.org/download>에서 다운로드가 가능하며, 아래에도 첨부해 두었습니다

v1 - 2014-09-05 첫 업로드

[MarketVersionChecker.jar](./file/MarketVersionChecker.jar)

[MarketVersionChecker.java](./file/MarketVersionChecker.java)

[jsoup-1.7.3.jar](./file/jsoup-1.7.3.jar)

### 사용방법

static으로 선언하지 않았습니다

그래서 new 선언후 사용해야 합니다

MarketVersionChecker mChecker = new MarketVersionChecker();

마켓 버전을 가져오는 API는 두가지 방법이 있습니다

- getMarketVersion(String packageName)
- getMarketVersionFast(String packageName)

버전을 가져올 packageName을 전달해주면 WIFI에서 약 0.5~2초, 3G에서 약 1~3~4초 정도 소요되는것으로 나타났습니다

메소드 이름에서도 알수있지만 아래에 있는 Fast가 붙은 메소드가 속도면에서 빠른것으로 확인됬습니다

다만 실제 개발시 속도는 달라질수 있으므로 둘중 하나를 선택해서 사용하시기를 바랍니다

속도 실험 결과

getMarketVersion : Wi-Fi에서 1초~4초, 3G에서 2~4.5초

getMarketVersionFast : Wi-Fi에서 0.6초~1.5초, 3G에서 1~3초

### 출처

getMarketVersion() : http://www.androidside.com/bbs/board.php?bo\_table=B56&wr\_id=24663

getMarketVersionFast() : http://www.androidside.com/bbs/board.php?bo\_table=B49&wr\_id=135849

코드를 수정하고, 라이브러리화 하였습니다

---

## 첨부파일

- [jsoup-1.7.3.jar](https://github.com/itmir913/archive/releases/download/itmir-attachments/jsoup-1.7.3.jar) `290 KB`
- [MarketVersionChecker.jar](https://github.com/itmir913/archive/releases/download/itmir-attachments/MarketVersionChecker.jar) `2 KB`
- [MarketVersionChecker.java](./files/MarketVersionChecker.java)
