---
title: "이상하군요 fastboot boot가 작동합니다"
date: "2013-05-01T18:56:57+09:00"
category: "SmartPhone/Android"
tags: []
description: "이 글을 보시면 젤리빈 루팅툴이 있는것을 알수 있습니다"
draft: false
original_url: "https://itmir.tistory.com/202"
---

<http://cafe.naver.com/skydevelopers/246182>

이 글을 보시면 젤리빈 루팅툴이 있는것을 알수 있습니다

젤리빈 sk분께서 이 루팅툴로 루팅이 된다는 것을 확인하고 제가 직접 확인해 봤습니다

fastboot boot recovery.img가 작동합니다..!

혹시 fastboot의 버전 문제인가 해서 다른 리커버리도 boot로 해보았지만 작동하지 않았습니다

즉 툴안에 있는 리커버리는 어떤 이유에서인지는 몰라도 부팅이 가능하다는 뜻이 됩니다

이렇게 되면 추정할수 있는 경우는 약 2가지정도..

먼저 리커버리를 만들때 어떠한 코드를 넣었던지 (예를 들면 BoardConfig.mk라던지 램디스크에 파일을 넣는다던지등)

아니라면 커널과 리커버리를 만들때 cmdline등을 다시 설정해 줘야 하는지 등등

좀있다 하나씩 테스트 해 봐야 겠습니다

그리고 컴퓨터를 쓸수 있다면 원인을 살펴봐야죠

정말 부트로고에서 체크섬으로 확인하고 있는지, 아니면 리커버리를 mkbootimg로 만들때 어떤 설정이 필요한지 등..
