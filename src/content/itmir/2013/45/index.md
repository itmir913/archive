---
title: "어플의 종료를 막는 방법 [빌드프롭 트윅]"
date: "2012-12-16T16:09:36+09:00"
category: "SmartPhone/Android"
tags: []
description: "이 팁은 Diaz님께서 알려주셨습니다"
draft: false
original_url: "https://itmir.tistory.com/45"
---

이 팁은 Diaz님께서 알려주셨습니다

sys.keep\_app\_1=어플 이름

이렇게 빌드프롭에 추가하게 된다면 그 어플은 종료금지가 되게 됩니다

두가지 이상의 어플을 종료방지할때는 저 숫자만 바꿔서 쓰시면 됩니다

여기서 어플이름이란

어플의 패키지명 이름으로

data/app의 어플들 이름또는

data/data의 어플 이름 폴더또는

스타트업 매니저의 상세보기등으로 알수 있습니다
