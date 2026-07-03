---
title: "svchost.exe CPU 100%를 해결하자"
date: "2013-03-17T09:27:53+09:00"
category: "Computer & PC/Windows"
tags: []
description: "CPU 100%!!CPU 100%!!"
draft: false
original_url: "https://itmir.tistory.com/178"
---

**CPU 100%!!CPU 100%!!**

이 문제만큼 짜증나는건 없을겁니다

작업관리자를 보면 svchost.exe라는 놈이 CPU자원을 캐먹고 있는대요

이거 바이러스가 아닌가 할수도 있습니다

하지만 svchost.exe는 정상 파일 입니다

"Svchost.exe는 DLL(동적 연결 라이브러리)에서 실행되는 서비스에 대한 일반적인 호스트 프로세스 이름입니다." (각주: 출처 : http://support.microsoft.com/kb/314056/ko)

그럼 어떻게 해서 svchost.exe를 해결할 수 있을까요?

이 글에서는 몇가지 방법을 소개하려 합니다

먼저 inf파일을 설치하는 방법입니다


inf파일이란? 설치 정보가 담긴 파일으로 마우스 오른쪽으로 설치 명령을 내릴 수 있습니다

svchost.inf를 받으신다음 마우스 오른쪽 키를 눌러 설치(I)키를 눌러주세요

![](./images/inf 설치.png)

설치(I) 버튼을 클릭해 주시면 됩니다

두번째 방법은 Windows Updater 패치로 해결하는 방법입니다

참고 문서는 <http://support.microsoft.com/kb/932494/ko> 입니다

업데이트 패치를 받은다음 설치하고 Windows Updater을 실행시켜 업데이트 해주면 됩니다

공식 문서에서는 이 문제는 Windows Update Agent 3.0과 업데이트 927891에서 이 문제가 해결되었다고 합니다

마지막 방법은 네트워크 방식을 바꿔주는 방법 (각주: 출처 : http://2geonchang.blog.me/100148142425)인데요

홈 네트워크를 공용 네트워크로 바꿔주면 된다 합니다

이 방법은 실제 효과가 있는지는 잘 모르겠네요..

이렇게 해서 인터넷에 떠돌아 다니는 대표적인 3가지 방법에 대해 살펴 봤습니다 ㅎㅎ

다시는 CPU자원을 잡아먹지 않게 다들 패치하세요~