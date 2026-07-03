---
title: "최신 스마트폰의 boot.img 분해/조립시 dt.img가 필요하다?!"
date: "2014-06-06T22:51:04+09:00"
category: "SmartPhone/Android"
tags: []
description: "저번에 저는 베가 아이언2의 루팅용 boot.img만들기를 시도하였습니다"
draft: false
original_url: "https://itmir.tistory.com/502"
---

저번에 저는 베가 아이언2의 루팅용 boot.img만들기를 시도하였습니다

참고글 : [[Ubuntu] - [Dev] 루팅용 Boot.img 만들기 강좌](/archive/itmir/2013/207)

루팅용 boot.img만들기는 베가레이서2 젤리빈때 만들고 처음이므로 많이 지났네요 ㅎㅎ;

그런대 모든 과정을 정상적으로 따랐지만 fastboot boot에서 failed (remote : dtb not found)라는 메세지와 함께 부팅이 되지 않았습니다

원본 boot.img는 잘 됬는대 말이죠.. <-- 이를통해 fastboot가 막힌건 아니라는 사실을 알수 있습니다

구글링을 해보면 dtb에 대해 아래와 같은 정보를 알아낼수 있었습니다

<http://forum.xda-developers.com/showthread.php?t=2428117> 등등

그리고 mkbootimg 바이너리를 업데이트해서 '--dt' 옵션을 만드신 한분의 github도 발견했습니다

<https://github.com/osm0sis/mkbootimg>

아래는 .c파일에서 볼수 있는 mkbootimg의 사용방법 설명 입니다

usage: mkbootimg"

       --kernel <filename>"

       --ramdisk <filename>"

       [ --second <2ndbootloader-filename> ]"

       [ --cmdline <kernel-commandline> ]"

       [ --board <boardname> ]"

       [ --base <address> ]"

       [ --pagesize <pagesize> ]"

       [ --kernel\_offset <base offset> ]"

       [ --ramdisk\_offset <base offset> ]"

       [ --second\_offset <base offset> ]"

       [ --tags\_offset <base offset> ]"

       [ --dt <filename> ]"

       -o|--output <filename>"

<https://github.com/osm0sis/mkbootimg/blob/master/mkbootimg.c>

처음보는 옵션들이 많네요..

https://github.com/osm0sis 의 파일을 make하면 unpackbootimg도 나오는대 이때 offset도 알려주더라고요

직접 해본 결과입니다

Page size: 2048 (0x00000800)

Kernel size: 6373800 (0x006141a8)

Ramdisk size: 969088 (0x000ec980)

Second size: 0 (0x00000000)

Board name:

Command line: console=NULL,115200,n8 androidboot.hardware=qcom user\_debug=31 msm\_rtb.filter=0x37 ehci-hcd.park=3 vmalloc=260M loglevel=0

Writing boot.img-kernel ... complete.

Writing boot.img-ramdisk.gz ... complete.

whdghks913@Ubuntu:~/바탕화면/iron2root2222$ ./unpackbootimg -i boot.img

BOARD\_KERNEL\_CMDLINE console=NULL,115200,n8 androidboot.hardware=qcom user\_debug=31 msm\_rtb.filter=0x37 ehci-hcd.park=3 vmalloc=260M loglevel=0

**BOARD\_KERNEL\_BASE 00000000**

BOARD\_PAGE\_SIZE 2048

BOARD\_KERNEL\_OFFSET 00008000

BOARD\_RAMDISK\_OFFSET 01000000

BOARD\_TAGS\_OFFSET 00000100

BOARD\_DT\_SIZE 223232

특이하게 베가 아이언2의 커널 base값이 '00000000' 이더라고요;;;

그럼 dt.img는 어떻게 만드냐??

일단 이 img는 파티션은 아닙니다 부탁드려서 확인해보니 파티션은 아니더라고요

그리고 구글링 결과 이 dt.img파일은 커널소스에서 만들어 내는듯 합니다

만들어 내는 툴의 이름은 dtbTool입니다

<http://forum.xda-developers.com/showthread.php?t=2469510>

./dtbTool -o ~/dt\_files/dt.img -s 2048 -p ./scripts/dtc/ ./arch/arm/boot/

이렇게 만들어진 dt.img는 mkbootimg와 함께 아래 처럼 쓰입니다

./mkbootimg --base 0x00000000 --kernel zImage --ramdisk\_offset 0x02000000 --tags\_offset 0x01E00000 --pagesize 2048 --cmdline "androidboot.hardware=qcom user\_debug=31 maxcpus=2 msm\_rtb.filter=0x3F ehci-hcd.park=3 msm\_rtb.enable=0 lpj=192598 dwc3.maximum\_speed=high dwc3\_msm.prop\_chg\_detect=Y" --ramdisk initrd.img **--dt dt.img** -o boot.img

그렇지만 dt.img가 뭔지는 모르겟습니다...

<http://forum.xda-developers.com/showthread.php?t=2428117>

위 링크에서 받을수 있는 split\_bootimg\_dtb.pl 내용을 보면

+-----------------+

|    boot header     |

+-----------------+

|    kernel             |

+-----------------+

|    ramdisk           |

+-----------------+

|    second stage  |

+-----------------+

|    dtb                 |

+-----------------+

이렇게 나와 있습니다

기존까지 쓰던 split\_bootimg.pl 파일은 dtb가 없는 second stage까지만 있었습니다

커널소스로 부터 얻을수 있고(dtbTool) fastboot boot가 안되게 하고, mkbootimg 바이너리의 수정이 필요하며, 추가된 dtb는 무엇일까요?

베가 아이언2의 루팅 펌웨어는 커널소스가 나온후 dt.img를 만들고 나서 다시 시도해 봐야 겠습니다

[dtbTool](./file/dtbTool)

[mkbootimg](./file/mkbootimg)

[mkbootimg-master.zip](./file/mkbootimg-master.zip)

[split\_bootimg\_dtb.pl](./file/split_bootimg_dtb.pl)

[unpackbootimg](./file/unpackbootimg)

---

## 첨부파일

- [dtbTool](https://github.com/itmir913/archive/releases/download/itmir-attachments/dtbTool) `26 KB`
- [mkbootimg](https://github.com/itmir913/archive/releases/download/itmir-attachments/502-mkbootimg) `883 KB`
- [mkbootimg-master.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/mkbootimg-master.zip) `47 KB`
- [split_bootimg_dtb.pl](./files/split_bootimg_dtb.pl)
- [unpackbootimg](https://github.com/itmir913/archive/releases/download/itmir-attachments/502-unpackbootimg) `868 KB`