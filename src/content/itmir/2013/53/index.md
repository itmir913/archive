---
title: "커널에 Zram,Zcache를(을) 추가하자"
date: "2013-01-27T16:24:00+09:00"
category: "Android/Kernel"
tags: []
description: "Zram과 Zcache는 swap의 일종 입니다"
draft: false
original_url: "https://itmir.tistory.com/53"
---

Zram과 Zcache는 swap의 일종 입니다

램을 압축하여 저장하는 방식이라 알고 있으나 자세히는 모르겠습니다

<https://github.com/edoko/Air_Kernel_for_VR/tree/master/drivers/staging>  
  
다음 github 주소에서 zram과 zcache를 작업할 소스로 가져와 주십시오!

그리고 소스 에서 drivers/staging폴더내에 ramzswap을 삭제해 주세요

그다음 staging폴더안  
Kconfig와 Makefile을 수정해 주세요 (-는 제거, +는 추가를 의미합니다)

Kconfig

-source "drivers/staging/ramzswap/Kconfig"

+source "drivers/staging/zram/Kconfig"

+source "drivers/staging/zcache/Kconfig"

Makefile

-obj-$(CONFIG\_RAMZSWAP)+= ramzswap/

+obj-$(CONFIG\_ZRAM) += zram/

+obj-$(CONFIG\_XVMALLOC) += zram/

+obj-$(CONFIG\_ZCACHE) += zcache/

그뒤

.config의 옵션인 CONFI\_ZRAM, CONFIG\_XVMALLOC,CONFIG\_ZCACHE을 활성화 해주시거나 또는  
  
menuconfig에서

device drivers/staging drivers/Compressed RAM block device support

를 활성화 시켜주세요  
  
  
PS.  
3.x커널부터는 zram이 있기때문에 그냥 활성화만 해주시면 됩니다 ㅎㅎ  
  
  
지금까지 Zram을 추가하는 방법에 대해 서술하였습니다  
그럼 활성화를 해야겠지요?

Zram의 활성화 방법을 알려드리겠습니다

swap이다보니 기기에 무리가 갈수도 있습니다 주의해서 사용하세요 ㅋ

Zram을 활성화 시키기 위해선

1. Zram이 있는 커널

2. busybox

3. Terminal emulator

이 필요합니다  
  
/sys/block/zramX가 있는지 확인해 주세요(X는 숫자)

(만약 저 폴더가 없다면 비활성화, 적용실패;;)  
  
있다면 터미널에물레이터에 su를 입력합니다  
  
그리고 입력해 주세요 ㅋ  
echo $((50\*1024\*1024)) > /sys/block/zram0/disksize   
  
50Mb를 지정한겁니다 수치를 바꾸고 싶으신 분들은 수치를 바꾸셔도 무방합니다

(단 너무 큰값은 위험합니다)

mkswap /dev/block/zramX swapon /dev/block/zramX   
  
(이 두개 의 명령어를 입력해야 잡히더라구요 mkfs.ext4 /dev/zram1 mount /dev/zram1 /tmp)

free를 입력하셔서 swap이 잡히는지 확인해 주세요

그럼 Zram에 대해 마치겠습니다

PS1. zram을 추가한뒤 오류가 너무 많길래 전 뺐다는..

PS2. 원본글은 <http://cafe.naver.com/androiddevforum/1315> 이고 약간의 정리와 설명을 붙혔습니다
