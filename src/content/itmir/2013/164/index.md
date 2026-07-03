---
title: "GB → ICS 커널 업데이트시 백포팅 해야 하는것"
date: "2013-02-28T10:13:58+09:00"
category: "Android/Kernel"
tags: []
description: "GB커널로 ICS를 돌리기 위해서는 아래 목록의 백포팅이 필요합니다"
draft: false
original_url: "https://itmir.tistory.com/164"
---

GB커널로 ICS를 돌리기 위해서는 아래 목록의 백포팅이 필요합니다

ICS를 돌리기 위해서 리눅스 커널 3.0.0이상의 커널을 만들던지 GB커널에 ICS에 필요한 기능을 백포팅 해야 하는거지요

**1. KGSL 드라이버**

보통 drivers/gpu 경로에 KGSL 드라이버가 위치하며 칩셋이 같은 기기의 ICS 소스를 복붙하거나 $ git cherry-pick 명령어로 다른 github의 commit하나를 가져오는 스킬을 시전하셔도 됩니다 ㅋ

**2. 터치스크린 드라이버**

이것도 KGSL과 마찬가지로 칩셋이 같은 기기의 commit을 따라하면 됩니다 (복붙시 터치가 이상하게 될 가능성이 있기에)

**3. genlock**

<https://github.com/bananacakes/holiday-2.6.35-crc/commit/61367298cd23dff5cad2217b498319c376d4711d>

<https://github.com/bananacakes/holiday-2.6.35-crc/commit/0ebbcc98add50eec1284459814583ed8beec5dc5>

**4. mem_alloc**

<https://github.com/ThePlayground/tiamat-8x50-kernel/commit/89ca98f4fcffc1f9e387df00221bcb81bf589ab1>

**5. genalloc**

<https://github.com/ThePlayground/tiamat-8x50-kernel/commit/f3747d82cb1bdeb21bd3596bf41cc06a28c1aa8b>

**6. netfilter**

데이터 사용량 체크를 위해 필요합니다

부팅할때는 필요 없으며 이 역시 다른 칩셋이 같은 기기의 commit를 따라하시면 됩니다

**7. 제로 셔터렉 관련 commit**

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/6f84bd20f2941eb7a22f1767550e1633b63662fb>

**8. cpu_attr 관련 commit**

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/789201696f88fd84ffd6120fa5c04d3108c03351>

**9. ashmem 관련 commit**

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/0fe411177b203310d4870e79e813cf2014a7b1c4>

**10. pmem에 관련된 commit**

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/26c831c7abdbefdac31e8a3a7c9f391c8c1ad2bf>

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/8a7cd30112870a799da80a1f9cfa677739829732>

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/138071b6731d813a77a0e1359bd8ae62135be457>

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/4d7c9b05bbaf234bf4cc1d92251bcba32df5b0db> (← 가장 가능성이 있다(?))

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/d4e778922e279cba6489faa66bced425926b9d84>

<https://github.com/CyanogenMod/lge-kernel-msm7x30/commit/285682bf4ad3369c6239a800dd55c1d6fe2f7d1e>

이렇게 GB커널에 위 내용을 포팅하시면 gb커널로도 ics를 돌릴수 있게 됩니다 ㅋ

출처 : <http://cafe.naver.com/androiddevforum/2443>, 사람
