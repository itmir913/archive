---
title: "FPS Unlock - 프레임 제한 해제하기"
date: "2012-10-14T15:14:14+09:00"
category: "SmartPhone/Android"
tags: []
description: "ICS이하 버전에는 모두 프레임 제한이라는게 걸려있다고 합니다"
draft: false
original_url: "https://itmir.tistory.com/31"
---

ICS이하 버전에는 모두 프레임 제한이라는게 걸려있다고 합니다

최대프레임이 30fps이나 25fps로 제한이 되어 있는 이유가 한번씩 오류가 발생한다거나 먹통이 되는경우를 방지하기 위함인대요

이걸 풀면 좀 더 프레임이 향상된다고 합니다

방법은 debug.gr.swapinterval=0 빌드프롭에 추가해주시면 됩니다

제 미라크a에해본결과 2D 그래픽이 아주 놀랍게향상되는것을 확인했습니다

80fps까지나오더라고요ㅎ

ps.베레2 ICS에적용해본결과 오작동일어났습니다

전원키로 화면을켜도 검정화면만 나타나는 현상발생

하시기전 cwm백업은 필수, 없다면 순정 build.prop를 adb로 밀어넣으세요ㅎ

원본출처

http://m.blog.naver.com/goodekdrms/100169260594
