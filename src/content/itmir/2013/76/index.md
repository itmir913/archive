---
title: "2012-08-23 smmthass가버너 추가 완료 [완료]"
date: "2012-08-23T13:40:04+09:00"
category: "Android/Kernel"
tags: []
description: "깃허브 대로 하니 추가가 되었네요 ㅋㅋ"
draft: false
original_url: "https://itmir.tistory.com/76"
---

우분투에서 직빵으로 올림니다 ㅋㅋ

참고한 사이트는 깃 허브 입니다~

[바로가기](https://github.com/DooMLoRD/Xperia-2011-Kernel-2.6.32.9/commit/91a78affc5a9a0dfbf8cd5728eef189f859722f2)

깃허브 대로 하니 추가가 되었네요 ㅋㅋ

오류 뜨는 부분은 과감히 지워버렷는대 문제 없을까 걱정되긴 합니다만;;

수정한 거 첨부 합니다~

역시 빌드해둔 폴더 안지우니 컴파일 시간이 5분이라는 ㅋㅋㅋㅋ

아무튼 포스팅 마칩니다~

사용 명령어

./make.sh menuconfig

로 smoothass가버너 추가 설정

./make.sh

컴파일에 사용한 make.sh mkbootimg ramdisk.gz 압축해서 올립니다 ㅋㅋ

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) 2012-08-23 smoothass추가.zip](/attachment/cfile7.uf@15170F455106011F312AD0.zip)

[![](http://i1.daumcdn.net/cfs.tistory/v/110706133414/blog/image/extension/unknown.gif) cpufreq\_smoothass.c](/attachment/cfile8.uf@142DE9455106012002A66E.c)

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) make.sh준비물.zip](/attachment/cfile1.uf@2412D74551060122390421.zip)
