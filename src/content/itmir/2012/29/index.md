---
title: "SystemUI등이 디컴파일 안될때 방법"
date: "2012-10-03T15:05:57+09:00"
category: "SmartPhone/Android"
tags: []
description: "아샌부터인지 안되더라고요 디컴파일이..."
draft: false
original_url: "https://itmir.tistory.com/29"
---

한시간 정도 삽질했습니다

아샌부터인지 안되더라고요 디컴파일이...

해결방법 찾았습니다!

<http://cromiya.blog.me/130123218733>

이 글의 본문을 보면 어플들이 서로 연동되있어서 그럴수 있다고 하시는데요

이럴때 디컴파일 옵션 10번을 선택하신후 프웤을 경로에 지정한뒤 다시 9번 디컴하면된다 합니다!

무슨뜻이냐 하면 apk manager에서 10번 디컴파일 명령어를 들어간다음 도스창에 프레임 워크.apk를 끌어오면 경로가 나타납니다.

그다음 엔터를 누르면 Sorry가 뜨는데요.

그럼 창을 닫은다음 다시 Script.bat를 실행해서 9번 디컴파일을 선택하시면 정상적으로 이루어지게 됩니다~
