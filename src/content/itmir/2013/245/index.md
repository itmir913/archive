---
title: "베가레이서2 전원키 강제 재부팅 소스 적용 커널"
date: "2013-06-10T21:46:34+09:00"
category: "Android/Kernel"
tags: []
description: "patch_153528-7_16242_input_pwrkey_fix_press-release_irq_dispatch다운로드"
draft: false
original_url: "https://itmir.tistory.com/245"
---

<http://cafe.naver.com/skydevelopers/252005>

일러님께서 올려주신 패치파일

[patch\_153528-7\_16242\_input\_pwrkey\_fix\_press-release\_irq\_dispatch](https://github.com/itmir913/archive/releases/download/itmir-attachments/patch_153528-7_16242_input_pwrkey_fix_press-release_irq_dispatch)

[patch\_156998-2\_16666\_power-key\_fix\_reboot-deepsleep\_timers\_20120](https://github.com/itmir913/archive/releases/download/itmir-attachments/patch_156998-2_16666_power-key_fix_reboot-deepsleep_timers_20120)

> 최근 많은 스마트 폰들이 강제 재부팅을 넣어서, 배터리를 빼서 생길 수 있는 브릭을 방지하도록 하고 있습니다. 그래서 이 기능을 구해 왔습니다.
>
> 7초간 전원 버튼을 길게 누르면 재부팅이 된다고 패치에서 소개하고 있습니다.
>
> 일단 2012년 9월 5일자 패치 파일을 하시면 Hunk가 실패로 뜰 수가 있습니다. 그러한 경우에는 해당되는 실패한 작업을 직접 진행하시면 됩니다.
>
> 그 다음에 2012년 9월 18일자 패치 파일을 사용합니다. 반드시 순서를 지켜야 합니다. 그렇지 않으면 혼동될 수 있습니다.
>
> 패치 변경사항을 남김없이 적용한 뒤에 할 일이 한 가지 있습니다.
>
> dump\_reg() 함수를 비활성화해야 합니다. 7초간 길게 눌러 재부팅하는 기능에서는 dump\_reg() 함수를 사용하지 않도록 하고 있습니다.
>
> #include <linux/mfd/pm8xxx/pm8921.h> 문구를 비활성화해야 빌드가 됩니다. (베가 레이서 기준 37행

패치파일을 patch -p1 < (파일이름).patch 명령어로 적용한다음

fail이 뜨는 부분은 제가 직접 한땀 한땀(?) 적용하여 만든 커널 입니다

LucidOS의 커널 + 재부팅 소스이며 전원키를 게속 누르고 있으면 재부팅 됩니다

그러나 재부팅 될때 어플리케이션 오류가 뜨며 강제 재부팅으로 넘어갑니다...

참고 : <http://cafe.naver.com/skydevelopers/252065>

일러님께서 말씀하신 그대로 증상이 나타나는군요..

재부팅이 아니더라도 종료를 호출하도록 수정하면 또 오류가 나기에 일단 커널만 배포합니다

[boot.img](https://github.com/itmir913/archive/releases/download/itmir-attachments/245-boot.img)

[Reboot.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/Reboot.zip)

boot.img는 적용된 부트이미지 파일이며

Reboot.img는 그냥 모듈 모와둔것 입니다 (만 모듈 적용 안하셔도 상관 없습니다 Wi-Fi등등 잘 작동합니다)

---

## 첨부파일

- [boot.img](https://github.com/itmir913/archive/releases/download/itmir-attachments/245-boot.img) `7.3 MB`
- [patch_153528-7_16242_input_pwrkey_fix_press-release_irq_dispatch](https://github.com/itmir913/archive/releases/download/itmir-attachments/patch_153528-7_16242_input_pwrkey_fix_press-release_irq_dispatch) `3 KB`
- [patch_156998-2_16666_power-key_fix_reboot-deepsleep_timers_20120](https://github.com/itmir913/archive/releases/download/itmir-attachments/patch_156998-2_16666_power-key_fix_reboot-deepsleep_timers_20120) `7 KB`
- [Reboot.zip](https://github.com/itmir913/archive/releases/download/itmir-attachments/Reboot.zip) `2.4 MB`
