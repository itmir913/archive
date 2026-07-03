---
title: "VegaRacer2 SK 순정 boot.img recovery.img"
date: "2012-10-01T13:57:30+09:00"
category: "Android/Kernel"
tags: []
description: "참고로 7번이 boot.img 19번이 recovery.img 입니다"
draft: false
original_url: "https://itmir.tistory.com/91"
---

직접 추출했습니다

sk 1.34버전의 것이고요

우분투에서 쪼개본 결과 나눠졌습니다

참고로 7번이 boot.img 19번이 recovery.img 입니다

추출 명령어는 귀찮아서 좀있다 추가하겠습니다

참고 글 <http://cafe.naver.com/tdadevelop/392>

adb사용할거니 cmd실행

adb가 있는 위치로 ㄱㄱ

adb shell

(그다음 본문엔 mount를 치라 했는대 별상관 없는거 같아서 패스

아마 partitions부분에서 선택 수고를 덜으려고...?)

이제 cat /proc/partitions를 친다

이때 파일이 없다 나오면 탐색기로 /proc 들어가서 파티션 파일의 이름을 확인한다

여기서 파티션을 찾아야 하는대 1 block은 1kb정도라고 생각하면

적당한 크기를 골라 추출해야 합니다

싱글코어는 5mb정도, 듀얼이상은 10mb정도의 파티션을 선택해 둡시다 ㅎㅎ

선택한다음 su를 쳐준뒤

dd if=/dev/block/파티션 이름 of=/sdcard/추출한 파일이름.img bs=4096

이렇게 추출해 주시면 됩니다

베레2경우 mmcblk0p7, mmcblk0p19

이제 이걸 모와서 우분투에 들어간뒤 ./split_bootimg.pl 파일이름.img를 하면 분해되는게 2개 있는대 그게 부트이미지와 리커버리 입니다

둘을 구분하는 방법은 부트이미지 뜯어서 내용물 확인하면 됩니다


용량이 딱 10MB ㅋㅋ