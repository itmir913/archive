---
title: "Boot.img등을 쪼개고 합쳐주는 스크립트"
date: "2013-01-11T17:26:42+09:00"
category: "Computer & PC/Ubuntu"
tags: []
description: "Boot.img등을 쪼개고 합치는 일이 번거로워 만들었습니다."
draft: false
original_url: "https://itmir.tistory.com/65"
---

Boot.img등을 쪼개고 합치는 일이 번거로워 만들었습니다.

이것을 사용하면 한번에 합치고 분해가 가능합니다.

사용방법은 같은 폴더안에 boot.img와 저 두 개의 파일을 모두 같이 집어넣은다음, 분해할땐 bootimg1.sh를, 합칠땐 bootimg2.sh를 실행해 주시면 됩니다.

또한 bootimg2.sh를 실행하기전 Command line값, base값, pagesize 값을 기록해 주셔야 합니다. 필수!

(위치 혹은 그 방법은 [2013/01/27 - [강좌/팁/Ubuntu 강좌] - 부트이미지(Boot.img) 분해/조립(?) 강좌](/archive/itmir/2013/48)를 참고하시길 바랍니다)

그리고 마지막으로 이 스크립트를 사용하기 위해서는 bin에 모든 사용파일이 PATH되어 있어야 합니다.

mkbootimg등을 직접 ~/bin에 넣으시던지, 귀찮으시면 [/archive/itmir/2013/58](http://whdghks913.blog.me/20174424872) 이 글의 스크립트를 실행하시면 됩니다.

(이게 더 귀찮다 하시는 분은 파일이 따로 필요한 명령어에 ./을 붙히시면 됩니다)

그냥 스크립트 한번 실행하는것이 편합니다.

그럼 오늘 포스팅은 이것으로 종료하겠습니다.

