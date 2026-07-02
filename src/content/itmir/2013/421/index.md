---
title: "[Smali] Toast 알림 띄우기"
date: "2013-12-31T12:48:18+09:00"
category: "Android/App"
tags: []
description: "직접 수정한 어플을 실행했을 때, Toast 알림을 띄우는 smali코드입니다."
draft: false
original_url: "https://itmir.tistory.com/421"
---

직접 수정한 어플을 실행했을 때, Toast 알림을 띄우는 smali코드입니다.

예로 크랙어플의 경우 처음 실행 시 "cracked by 어쩌구"라는 Toast가 나타나는데요.

이를 위한 smali 코드입니다.

const-string v0, "나타낼 문구"

    const/4 v1, 0x0

    invoke-static {p0, v0, v1}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;

    move-result-object v0

    invoke-virtual {v0}, Landroid/widget/Toast;->show()V

v0이 smali에서 사용되는 변수인데, 중복되지 않도록 어찌어찌 하시면 될 듯 합니다.

그리고 나타낼 문구가 한글일 경우 따로 변환해줘야 합니다.
