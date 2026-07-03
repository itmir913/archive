---
title: "Code Server에서, C/C++ 확장 플러그인 충돌 문제 해결법"
date: "2021-02-04T21:43:01+09:00"
category: "Programming/C"
tags: []
description: "Code-Server의 확장 프로그램 중 C/C++ for Visual Studio Code이 아래와 같은 오류 메시지를 표시하며 작동하지 않는 경우가 존재한다."
draft: false
original_url: "https://itmir.tistory.com/687"
---

## 개요

Code-Server의 확장 프로그램 중 C/C++ for Visual Studio Code이 아래와 같은 오류 메시지를 표시하며 작동하지 않는 경우가 존재한다.

> [Error - 6:47:09 PM] Connection to server got closed. Server will not be restarted.  
> /config/extensions/ms-vscode.cpptools-1.1.3/bin/cpptools: 7: /config/extensions/ms-vscode.cpptools-1.1.3/bin/cpptools: Syntax error: word unexpected (expecting ")")

## 이슈 원인

Code-Server는 arm, x86과 같은 운영 체제에 따라 호환되는 버전의 Extension을 설치하는 것을 지원하지 않기 때문에 충돌이 발생한다.

따라서 Code Server가 돌아가는 자신의 서버 사양에 맞는 패키지를 다운받아 수동으로 설치해주면 된다.

## 해결방법

1. 기존에 설치한 Extension을 삭제한다.

2. [Releases · microsoft/vscode-cpptools · GitHub](https://github.com/Microsoft/vscode-cpptools/releases) 에서 자신의 서버에 맞는 vsix 파일을 다운받는다.

이때, Requirements를 꼭 확인한다. VS Code 버전에 따라 설치할 수 있는 버전이 다르다.

3. Code-Server에서 접근 가능한 폴더에 vsix 파일을 집어 넣는다. /config으로 연결한 폴더에 넣으면 될 것이다.

4. Extension에서 Install from VSIX 메뉴를 사용하여 확장 프로그램을 수동으로 설치한다.

Code Server는 정식 VSCode와 달리 호환성 문제가 종종 발생하는 것 같다.

구 버전의 확장 프로그램을 설치하거나 OS에 적합한 파일을 수동으로 설치해주는 수고가 필요하다.

## 참고

<https://www.gaojike.cn/193.html>
