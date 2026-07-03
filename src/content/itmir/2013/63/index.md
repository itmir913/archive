---
title: "단 한번만 img로 부팅/리커버리진입 해보자!"
date: "2013-01-08T17:21:45+09:00"
category: "SmartPhone/Android"
tags: []
description: "뜻은 바로 부트이미지 혹은 리커버리 이미지로 단 한번만 부팅할수 있다는 뜻입니다"
draft: false
original_url: "https://itmir.tistory.com/63"
---

제목의 의미를 잘 모르시겠나요?

뜻은 바로 부트이미지 혹은 리커버리 이미지로 단 한번만 부팅할수 있다는 뜻입니다

일단 이를 위해서는 fastboot모드에 진입하셔야 합니다

그리고 이 방법을 사용하여도 원본 boot.img혹은 recovery.img는 변동이 없습니다

그러니 테스트 용으로도 사용할수 있다는 뜻이지요 ㅋㅋ

이게 정말 내 기기 전용일까 라는 의문을 가지고 계신다면 이 방법으로 테스트해 보시길 바랍니다

자 그럼 시작하겠습니다

**1. fastboot 모드 진입**

먼저 fastboot를 받으셔야 합니다

첨부파일을 받으셔도 되고 다른 곳에서 따로 받으셔도 됩니다

그뒤 기기를 fastboot모드로 진입시켜야 합니다

이 방법은 두세가지 정도로 간추릴수 있는대요

일단 adb로 adb reboot fastboot또는 adb reboot bootloader등으로 진입해 주시면 됩니다

또한 기기에 fastboot진입키가 있는 경우도 있으니 참고하시길 바랍니다

참고로 베가레이서2의 경우 전원+볼륨업+볼륨다운을 모두 누를경우 진입 가능합니다

터미널 어플을 통해서도 가능한대요

su

reboot fastboot

이런 명령어를 입력하시면 진입이 가능합니다

**2. fastboot 준비/대기**

첨부파일을 받으셔도 되고 또한 다른곳에서 준비하셔도 된다고 위에 언급하였습니다

압축을 풀어 주신뒤에 cmd로 해당 폴더로 이동해 주세요

cmd는 시작-실행에서 타이핑 해주시면 되고

또한 압축을 푼 폴더에 Shift키+마우스 오른쪽키를 누르시게 되면 여기서 명령창 열기라는 메뉴가 나타나게 됩니다

**3. 명령어 타이핑**

이제 폰과 컴퓨터를 연결해 주세요

fastboot드라이버가 설치되지 않았다면 http://itmir.tistory.com/57 을 참고해 주시거나 검색을 이용해 주세요 따로 언급하진 않겠습니다

이제 명령어를 입력해야 합니다

fastboot devices

명령어로 인식이 되어 있는지 확인해 봅시다

? 이 나타나는것이 정상입니다

(나타나지 않아도 인식되어 있는 경우가 있다고 합니다)

그다음

fastboot boot 이미지명.img

명령어로 부팅해 줍시다

그럼 스마트폰이 이미지명.img로 한번만 부팅하게 됩니다

물론 이방법을 쓰셔도 원본 boot파티션과 원본 recovery파티션은 피해가 가지 않습니다

(recovery만 확인되었습니다 boot의 경우 확인이 필요합니다)

이 방법을 응용하면 cwm을 설치하지 않은 상태에서 한번만 cwm으로 부팅한뒤 롬설치/공초를 한뒤 재부팅을 하게 되면 롬은 설치되게 되고 리커버리는 cwm이 아니라 순정리커버리로 남게 되는거죠

명령어는 첨부파일로 정리해 두었습니다

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) fastboot.zip](/attachment/cfile27.uf@2406263C5104E3951373FB.zip)

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/txt.gif) 명령어.txt](/attachment/cfile23.uf@2208D63C5104E3960EC428.txt)
