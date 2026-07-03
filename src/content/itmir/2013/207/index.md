---
title: "[Dev] 루팅용 Boot.img 만들기 강좌"
date: "2013-05-03T18:12:38+09:00"
category: "Computer & PC/Ubuntu"
tags: []
description: "이 글은 기초적인 우분투 지식이 있으신 분들을 위한 글입니다."
draft: false
original_url: "https://itmir.tistory.com/207"
---

이 글은 기초적인 우분투 지식이 있으신 분들을 위한 글입니다.

또한 리눅스 언어를 약간 알고 있으셔야 이해하기 쉬운 글입니다. 만약 이해가 안가신다면 각주를 클릭해 주세요.

이번에는 한번의 부팅으로 루팅이 되는 Boot.img를 만들어 보도록 하겠습니다.

연관된글 or 먼저 읽으시면 이해에 도움이 되는 글

[2013/01/27 - [강좌/팁/Ubuntu 강좌] - 부트이미지(Boot.img) 분해/조립(?) 강좌](/archive/itmir/2013/48)

[2013/01/27 - [강좌/팁/Ubuntu 강좌] - 우분투 64Bit unpackbootimg 오류 해결법](/archive/itmir/2013/34)

[2013/03/24 - [강좌/팁/Ubuntu 강좌] - mkbootimg](/archive/itmir/2013/181)

[2013/01/27 - [강좌/팁/Ubuntu 강좌] - 어디서나 실행할수 있게 PATH해주는 스크립트](/archive/itmir/2013/58)

[2013/01/27 - [강좌/팁/Ubuntu 강좌] - 64Bit 우분투에서 32Bit 바이너리/프로그램 이용하기](/archive/itmir/2013/35)

위 목록은 먼저 읽어주시면 아주 도움이 많이 되실 겁니다.

준비물 목록

1. 부트이미지 언/패킹에 필요한 파일들

[mkbootimg](https://github.com/itmir913/archive/releases/download/itmir-attachments/207-mkbootimg)

[split_bootimg.pl](./files/split_bootimg.pl)

[unpackbootimg](https://github.com/itmir913/archive/releases/download/itmir-attachments/207-unpackbootimg)

2. 루팅 파일들

[init.rooting.sh](./files/init.rooting.sh)


나참; 어이 없네요.

Root.zip폴더의 내용물은 악성코드가 아닙니다.

아래 빨간 박스에도 있드시 su와 Superuser.apk만 있습니다 다음이 뭘 제대로 하는지 ㅡㅡ

그냥 su바이너리와 Superuser.apk를 사용하셔도 됩니다. ㅎㅎ

모든 준비파일을 받아주세요.

수정해야 하는 파일 목록

램디스크안

init.rc                     - 수정

init.rooting.sh          - 추가

Root/su                  - 추가

Root/Superuser.apk - 추가

준비작업을 완료하셨다면, 본격적으로 시작해볼까요?

수정해야 하는 파일 목록을 보시면 우리가 어떤 파일을 수정해야 하는지 대충 알 수 있습니다.

이 강좌의 원리는 init.rc에 init.rooting.sh를 실행하게 하는 구문을 넣는 겁니다.

init.rooting.sh에서는 Root폴더에 있는 su파일들을 /system에 넣은 뒤에 적절한 권한을 주고 재부팅 하는 명령어가 들어 있습니다.

그럼 하나하나 수정해 보겠습니다.

먼저 init.rc를 수정해 보겠습니다.

service flash_recovery /system/etc/install-recovery.sh

    class main

    oneshot

**service rooting /init.rooting.sh**

**class main**

**user root**

**group root**

**oneshot**

이렇게 굵게 칠해진 부분을 추가해 주세요.

위치는 flash_recovery아래정도에 넣어주시면 됩니다.

이 문구의 설명은 rooting이라는 서비스를 실행하는데, /(루트)에 있는 init.rooting.sh를 실행하라는 의미입니다.

그 다음은 Root.zip을 풀어서 나오는 파일을 램디스크에 넣어주시면 됩니다.

init.rooting.sh는 init.rc와 같은 위치인 /에,

Superuser.apk와 su는 램디스크안 Root라는 폴더를 만들어 넣어주시면 됩니다.

R의 대문자 소문자를 가려야 하나? 라고 하실수 있는데요.

init.rooting.sh를 열어보시면

#!/system/bin/sh

**mount -orw,remount /system**

**cp /Root/Superuser.apk /system/app/Superuser.apk**

**cp /Root/su /system/bin/su**

**chmod 644 /system/app/Superuser.apk**

**chmod 06755 /system/bin/su**

**ln -s /system/bin/su /system/xbin/su**

reboot

위와 같이 su와 SuperUser.apk를 /Root에서 복사하도록 설정하고 있기에 대소문자를 구분해서 정확하게 쓰셔야 합니다.

이왕 소스를 올린거 소스 분석을 해보면,

mount구문으로 /system을 마운트 하고 있습니다.

그 다음 cp(copy)명령어로 /Root에 있는 파일을 /system/app과 /system/bin에 넣어주고 있지요.

그 아래는 권한을 설정하는 부분과 심링크를 걸어주는 명령이 있습니다

마지막으로 reboot명령어로 이제 기능을 다한 루팅용 boot.img의 사용을 중단하게 하는 것 이지요.

이렇게 램디스크를 수정하신다음 boot.img를 만드시면 한번의 부팅으로 루팅을 가능하게 하는 boot.img가 완성됩니다.

어제 만든 Easy_Root_for_VegaRacer2툴도 위와 같은 방법으로 제작된 파일입니다.

-- Boot.img를 분해하고 다시 만드는 작업은 [**2013/01/27 - [강좌/팁/Ubuntu 강좌] - 부트이미지(Boot.img) 분해/조립(?) 강좌**](/archive/itmir/2013/48) 을 참고해 주세요 --

이제 우리가 만든 원부팅 루팅 boot.img를 fastboot boot명령어로 한번 부팅시켜 주시면.

자동으로 init.rooting.sh가 실행되며 완전히 켜지기전 (reboot로) 재부팅 될겁니다.

fastboot boot의 특성상 재부팅이 일어날경우 원래 boot.img로 부팅하기 때문에 우리가 만들었던 루팅용 이미지는 딱 한 번만 사용되고 이후에는 사용되지 않습니다.

그럼 이것으로 루팅용 Boot.img만들기 강좌를 마치겠습니다.

thanks for hPa!!

hPa님의 Vega R3 루팅방법입니다.

---

## 첨부파일

- [init.rooting.sh](./files/init.rooting.sh)
- [mkbootimg](https://github.com/itmir913/archive/releases/download/itmir-attachments/207-mkbootimg) `32 KB`
- [split_bootimg.pl](./files/split_bootimg.pl)
- [unpackbootimg](https://github.com/itmir913/archive/releases/download/itmir-attachments/207-unpackbootimg) `17 KB`