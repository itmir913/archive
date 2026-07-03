---
title: "AMD Ryzen CPU로 VMWare에서 Mac OS 설치하기"
date: "2020-11-03T01:33:09+09:00"
category: "Computer & PC"
tags: []
description: "라이젠 CPU에서 VMware로 Mac OS인 Catalina를 설치하는 방법이다."
draft: false
original_url: "https://itmir.tistory.com/676"
---

## 서론

라이젠 CPU에서 VMware로 Mac OS인 Catalina를 설치하는 방법이다.

[이 유튜브 영상](https://www.youtube.com/watch?v=gr2fQXgcb2U)을 참고하면 더 이해하기 쉬울 것이다.

이번 포스팅은 카탈리나 버전을 설치하는 영상이므로 빅 서 버전은 [이 영상](https://www.youtube.com/watch?v=uD5mwLzcXRc)을 참고하라.

![](./images/img.jpg)

필자는 AMD Ryzen 5 4500U가 장착된 Asus ZenBook UM425 노트북을 사용하고 있으며, 이 노트북에서 Mac OS인 카탈리나를 VMWare로 돌려보고 싶었다.

이를 위해서는 먼저 AMD-V가 활성화되어 있는지 확인해야 한다.

[이곳](https://leomoon.com/downloads/desktop-apps/leomoon-cpu-v/)을 클릭하여 LeoMoon CPU-V 프로그램을 받은 다음, 실행하여 AMD-V가 활성화되어 있는지 확인한다.

혹은 아래 첨부파일을 다운받아도 된다. 2020-11-03일자 공식 홈페이지에서 다운받은 파일이다.

[leomoon-dot-com_leomoon-cpu-v_win.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/leomoon-dot-com_leomoon-cpu-v_win.zip)

프로그램을 실행하면 아래와 같은 스크린샷이 뜬다.

![](./images/img.png)

이렇게 AMD-v가 모두 활성화 되어 있어야 한다.

만약 Hyper-v, 혹은 Windows Sandbox를 사용해서 LeoMoon Cpu-v에서 위와 같은 모습이 나오지 않을 경우, 다음 포스팅을 참고하여 Hyper-v 등의 옵션을 꺼주자.

[[Development/Error] - Android Emulator Hypervisor Driver for AMD Processors installation failed.](/archive/itmir/2020/667)

대부분의 기기는 기본 값으로 AMD-V가 활성화되어 있을 테지만, 특정 모델의 경우에는 바이오스에서 해당 옵션을 활성화해주어야 할 수도 있다.

## 필요 파일 다운로드

이 포스팅에서 필요한 파일은 다음과 같다.

-Mac OS Catalina.iso

-VMWare Player 15.x.x

-unlocker.zip : <https://github.com/paolo-projects/unlocker/releases>

-~~darwin.iso~~

당연히 맥 OS를 설치할 것이기 때문에 iso 파일이 필요하며, 이 포스팅에서는 VMWare에 Mac을 설치할 것이므로 VMWare가 필요하다.

세 번째 unlocker.zip은 윈도우 VMWare에서 Mac을 돌릴 수 있도록 패치하는 프로그램이다.

마지막 darwin.iso는 VMWare Tools.iso 파일이다.

현재 unlocker의 최신 버전은 3.0.3이다. 이 프로젝트의 README를 읽어보면 다음과 같이 쓰여있다.

> Unlocker 3 is designed for VMware Workstation 11-15 and Player 7-15.

따라서 VMWare Player 16 버전이 설치되어 있다면, 지우고 15버전으로 다운그레이드 해야 한다.

필자의 사례와 각종 글을 보니, VMware 15.5와 15.6 버전에서는 설치에 실패하였다는 사례를 보았다.

[이 글](https://sungpil94.tistory.com/312)에 따르면, VMWare Workstation 15.1에서 성공하였다고 하셨다. 필자는 VMWare Player 15.0.4 버전에서 성공하였으니 참고하기를 바란다.

아래에 unlocker 파일을 첨부한다. 하지만 darwin.iso 파일은 딱히 다운로드 할 필요 없다.

그 이유는 unlocker를 설치하면 하위 폴더 tools 안에 darwin.iso가 생기기 때문이다.

이 글을 읽으시는 분께서 다운받아야 하는 파일은 세 개인데, **VMWare Player 15 버전**, **unlocker**, **Mac OS Catalina.iso 파일**이다.

필자는 [이곳](https://blog.notepads.kr/124)의 블로그를 참고하여 맥 카탈리나 iso 파일을 다운로드 받았다.

[unlocker_v3.0.3.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/unlocker_v3.0.3.zip)

VMWare Player 15버전을 설치한다음, unlocker 압축 파일을 다운받고 **관리자 권한**으로 win-install.cmd 파일을 실행한다.

![](./images/img_1.png)

그러면 약 600MB 정도의 파일을 다운로드 받고 설치한다.

이렇게 맨 마지막에 Finished!가 뜬다면 정상 설치된 것이다.

## VMWare Virtual Machine 생성하기

unlocker를 설치하면 VMWare에 Mac OS 항목이 생긴다.

VMWare를 실행한 뒤, Create a New Virtual Mechine을 클릭하여 새로운 가상 머신을 만들어보자.

![](./images/img_2.png)

다운받은 카탈리나 iso 파일을 선택한다.

![](./images/img_3.png)

Apple Mac OS X를 선택한다.

**이 항목이 없을 경우 unlocker를 다시 설치**해주어야만 한다.

unlocker를 설치하지 않으면 Guest operating system에 Apple Mac OS X가 없다.

![](./images/img_4.png)

각종 설정을 다 마치고 Finish를 누르면 가상 머신이 생성된다.

## Mac OS를 실행하기 위해 설정하기

가상 머신을 만든 폴더로 들어가서, vmx 파일을 메모장 등의 텍스트 편집기로 열어준다.

![](./images/img_5.png)

그 뒤, virtualHW.version을 10으로 변경해준다.

![](./images/img_6.png)

이후 vmx 파일의 맨 마지막에 아래 텍스트를 붙여넣기 한다.

smc.version = "0"

cpuid.0.eax = "0000:0000:0000:0000:0000:0000:0000:1011"

cpuid.0.ebx = "0111:0101:0110:1110:0110:0101:0100:0111"

cpuid.0.ecx = "0110:1100:0110:0101:0111:0100:0110:1110"

cpuid.0.edx = "0100:1001:0110:0101:0110:1110:0110:1001"

cpuid.1.eax = "0000:0000:0000:0001:0000:0110:0111:0001"

cpuid.1.ebx = "0000:0010:0000:0001:0000:1000:0000:0000"

cpuid.1.ecx = "1000:0010:1001:1000:0010:0010:0000:0011"

cpuid.1.edx = "0000:1111:1010:1011:1111:1011:1111:1111"

featureCompat.enable = "FALSE"

이제 가상머신 설정을 바꿔줘야 한다.

VMWare에서 Edit virtual machine settings를 클릭한다.

Hardware 탭의 Processors에서 Virtualize Intel VT-x/EPT or AMD-V/RVI를 활성화한다.

![](./images/img_7.png)

USB Controller에서 USB 2.0으로 설정하고, Show all USB input devices를 체크한다.

![](./images/img_8.png)

Options 탭의 General에서 Guest operating system을 Microsoft Windows로 설정한다.

![](./images/img_9.png)

이를 모두 완료하면 이제 Mac OS를 실행해볼 차례다.

## Mac OS VM 시작하기

카탈리나 VM을 실행하면 아래와 같은 검정 화면에 애플 로고가 뜬다.

![](./images/img_10.png)

잠시 뒤에 게이지바가 나타나며 맥 OS 설치가 시작된다.

만약 위 화면이 계속 지속된다면 무언가 잘못 설정한 것이다.

다시 윗 단계로 돌아가서 하나씩 점검해보길 바란다.

![](./images/img_11.png)

이 게이지바가 차고 아래 스크린샷처럼 키보드가 없다는 오류가 뜨지 않고 바로 언어 선택 화면이 나왔다면, 사진 몇 개를 건너 뛰고 Mac OS 시작하기 단락부터 읽으면 된다.

그러나 아래와 같은 화면이 뜬다면, 현재 Mac이 키보드를 감지하지 못하고 있다는 뜻이다.

![](./images/img_12.png)

좌측 상단의 Player 버튼을 누르고, Removable Devices를 클릭하면 현재 VMWare가 인식된 장치를 확인할 수 있다.

만약 여기에 여러분의 키보드가 뜬다면 다행이다.

![](./images/img_13.png)

이미 키보드를 연결한 상태에서 스크린샷을 찍었기 때문에 Disconnect로 뜬다.

정상적이라면 Connect를 눌러 키보드를 연결하면 된다.

그러나 Removable Devices에 키보드가 인식되지 않을 때가 문제다.

이에 대해 구글링을 해보니 아래와 같은 방법이 있었다.

먼저 아까전에 수정한 vmx 파일을 다시 열어준다.

![](./images/img_14.png)

이후 두 줄을 추가한다.

usb.generic.allowHID = "TRUE"

usb.generic.allowLastHID = "TRUE"

필자의 경우에는 두 개 중에서 usb.generic.allowHID는 이미 추가되어 있었다.

그럴 경우 아래의 usb.generic.allowLastHID = "TRUE"만 추가해준다.

필자는 노트북 키보드도 안 잡히고, 블루투스 키보드도 잡히지 않았다.

따라서 USB를 끼우는 형태인 무선 키보드(블루투스X)를 구석에서 꺼내와서 끼웠다.

블루투스 키보드를 사용하고 있다면, USB로 연결하는 형태의 키보드로 시도해보기를 바란다.

(Mac OS 설치 이후에는 노트북 키보드도 인식하였다.)

키보드 문제를 해결하면 이제 언어 선택 화면이 나오며 본격적으로 Mac OS를 설치하게 된다.

이제는 사용자가 설정할 일이 점점 줄어들고, 기다리는 시간이 늘어날 것이다.

## Mac OS 시작하기

![](./images/img_15.png)

언어를 선택해준다.

![](./images/img_16.png)

macOS 유틸리티 화면이 뜨면, 디스크 유틸리티로 들어간다.

가상 하드디스크를 포맷해주어야 하기 때문이다.

![](./images/img_17.png)

좌측의 VMware Virtual SATA Hard Drive Media를 선택한 뒤, 지우기 버튼을 눌러 포맷을 해준다.

![](./images/img_18.png)

작업이 완료되었다면, 디스크 유틸리티 창의 좌측 위 빨간 버튼(닫기)을 눌러 다시 macOS 유틸리티 화면으로 돌아오자.

참고로 한영키가 먹히지 않을텐데, 맥에서는 컨트롤+스페이스가 한영전환이다.

윈도우에서의 한/영 키는 작동하지 않는다.

![](./images/img_19.png)

이제는 macOS 설치 메뉴로 들어간다.

![](./images/img_20.png)

드디어 Catalina를 설치하는 화면이 떴다.

계속 버튼을 클릭하여 진행한다.

![](./images/img_21.png)

아까 포맷한 드라이브를 클릭한 후, 설치 버튼을 누른다.

필자는 포맷할 때 드라이브 이름을 Mac OS라고 하였다.

![](./images/img_22.png)

이제 잠시 기다린다.

![](./images/img_23.png)

아까와의 차이점은 아래에 남은 시각이 표시된다는 점이다.

이제 계속 기다리면 된다.

## Mac OS 설치 완료 및 VMWare Tools 설치

가만히 있으면 맥 OS 설치가 끝나고, 초기 세팅을 시작하는 화면이 뜰 것이다.

만약 macOS 유틸리티 화면이 또다시 뜬다면, 이는 가상 하드로 부팅한 것이 아니라 맥 설치 iso 파일으로 부팅하였기 때문이다.

VM을 끄고 Virtual Machine Settings에 다시 들어간 다음 CD/DVD 설정을 변경하자.

![](./images/img_24.png)

ISO 파일을 해제한 뒤에 다시 VM을 실행하면 된다.

![](./images/img_25.png)

언어 설정을 해준다.

이후 진행되는 초기 설정 중 필요 없는 부분은 전부 생략하겠다.

![](./images/img_26.png)

애플 아이디를 입력하여 로그인하는 화면이다.

필자는 이 단계에서 아직 로그인하지 않고 "나중에 설정" 텍스트를 눌러 Apple ID 로그인 단계를 건너뛰었다.

![](./images/img_27.png)

시리 설정이다.

![](./images/img_28.png)

이제 위 스크린샷처럼 Mac을 설정하는 중... 화면이 나타난다면 처음 설정 부분도 끝난 것이다.

조금만 기다리면 바탕화면이 뜨면서 맥을 사용할 수 있다.

![](./images/img_29.png)

성공!

VMWare로 Mac OS를 실행한 결과다.

이제 Mac을 끄고 Virtual Machine Settings으로 들어가서 Guest operating system을 Apple Mac OS로 바꿔주자.

## VMWare Tools 설치

이제 VMWare Tools를 설치해주어야 한다.

맨 위에서 필요한 파일을 설명하며 언급한 darwin.iso를 인식시킬 차례다.

unlocker를 설치했다면 그 안에 tools라는 폴더가 생겼을 것이다.

거기에 darwin.iso가 있다.

Virtual Machine Settings을 열고 ISO 파일을 연결한다.

![](./images/img_30.png)

이제 Mac을 실행한 뒤에 VMware Tools를 설치해주면 된다.

![](./images/img_31.png)

설치 도중 VMWare Inc.의 프로그램을 신뢰하지 못한다는 오류가 뜰 텐데, 알림창의 설정을 들어가서 계정 비밀번호를 입력하고 신뢰 버튼을 누르면 된다.

![](./images/img_32.png)

설치가 끝나고 재시동을 클릭하여 Mac OS를 재부팅하면 모든 단계가 끝난다.

아래 포스팅을 확인하여 전체 화면에서 VMWare의 전체화면 툴바를 없애주면 깨끗한 Mac OS를 감상할 수 있다.

[[Computer/PC] - VMware 전체화면 툴바(Toolbar) 없애기](/archive/itmir/2020/677)

## 참고

<https://www.youtube.com/watch?v=gr2fQXgcb2U>

<https://blog.notepads.kr/124>

<https://communities.vmware.com/thread/598528>