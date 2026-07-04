---
title: "64Bit 우분투에서 32Bit 바이너리/프로그램 이용하기"
date: "2012-12-25T15:20:28+09:00"
category: "Computer & PC/Ubuntu"
tags: []
description: "unpackbootimg오류등 우분투 64비트버전에서 32비트의 응응 프로그램을 사용하기가 어렵습니다."
draft: false
original_url: "https://itmir.tistory.com/35"
---

unpackbootimg오류등 우분투 64비트버전에서 32비트의 응응 프로그램을 사용하기가 어렵습니다.

그렇다고 64비트로 설치한것을 다시 32비트로 내려오기도 힘든 상황이죠...

이럴 때 다음을 설치하여 사용할 수 있습니다.

ia32-libs

lib32asound2

lib32gcc1

lib32ncurses5

lib32nss-mdns

lib32stdc++6

lib32z1

libc6-i386

위 목록을 sudo apt-get install으로 각각 설치할수도 있습니다만,

한번에 설치할수 있는 스크립트를 올려드릴테니

다운받으셔서 터미널로 실행을 하시면 sudo비번을 친뒤 자동으로 설치하게 됩니다.

그후 unpackbootimg등의 32비트 바이너리도 정상적으로 값이 나왔습니다.

[32bit 64bit.sh](./files/32bit%2064bit.sh)

참고: <http://blog.naver.com/01191879872/10071037107>

**주의: 스크립트 파일을 실행한뒤 Yes, as I say등의 문구 혹은 다음 패키지가 지워집니다 라는 문구가 있을경우 절대 스크립트 파일을 실행하지 말고 터미널의 창을 닫으세요. 잘못했다간 우분투 날라갑니다. 절대 Yes하지 마세요.**

---

## 첨부파일

- [32bit 64bit.sh](./files/32bit%2064bit.sh)
