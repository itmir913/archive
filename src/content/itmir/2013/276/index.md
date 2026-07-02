---
title: "[명령어] zip 압축하기 unzip 압축풀기"
date: "2013-07-25T21:20:41+09:00"
category: "Computer & PC/Linux"
tags: []
description: "zip확장자를 리눅스에서 압축하고 압축 푸는 방법은 의외로 간단합니다."
draft: false
original_url: "https://itmir.tistory.com/276"
---

zip확장자를 리눅스에서 압축하고 압축 푸는 방법은 의외로 간단합니다.

unzip으로 압축풀고 zip으로 압축하면 끝입니다.

압축률 관련 부분은 저도 자세하게 배우지 않아 모르므로(?) 패스하고, 이번에는 간단한 명령어만 배워보도록 하겠습니다.

1. 압축하기

zip -rF (압축파일명).zip (압축할 폴더 또는 파일)

여기서 r과 F의 옵션 설명을 봅시다.

r : 서브 디렉터리 까지 압축

F : 한글 이름을 가진 파일까지 압축

2. 압축 풀기

unzip (압축파일명).zip

간단한데요 ㅋㅋ tar에서는 압축풀 경로를 -C로 줬지만 unzip에서는 -d로 줍니다.

unzip (압축파일명).zip -d (압축 풀 폴더 경로)

자 이렇게 해서 이번 강좌도 마칩니다~
