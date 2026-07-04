---
title: "우분투 64Bit unpackbootimg 오류 해결법"
date: "2012-10-19T15:18:39+09:00"
category: "Computer & PC/Ubuntu"
tags: []
description: "boot.img를 쪼개기 위해 unpackbootimg가 필요한데요."
draft: false
original_url: "https://itmir.tistory.com/34"
---

boot.img를 쪼개기 위해 unpackbootimg가 필요한데요.

가끔 받은 파일이 64비트에서 실행할때 찾을수 없다고 합니다.

저도 그래서 빡쳤구요.

다음 첨부파일으로 받아 실행해 보시길 바랍니다.

명령어 뒤에 ./을 붙히시는건 아시고 계시겠죠?

첨부파일 출처 : <http://blog.naver.com/squake/20162488857>

제가 받은 파일이 잘못되었다는 생각을 가지고 다른 파일을 구하니 정상적으로 잘 되네요...

64비트로 빌드된 파일을 사용해야 하나 봅니다.

만약 안될경우 /bin에 755퍼미션으로 옮겨 보세요~

~/bin아닙니다. ;;

sudo cp unpackbootimg /bin

sudo chmod /bin/unpackbootimg

로 넣을 수 있습니다.

+추가

만약 이 파일을 받아 /bin에 넣은다음에도 오류가 발생한다면, 다음 게시글을 확인해 주세요.

</archive/itmir/2012/35>