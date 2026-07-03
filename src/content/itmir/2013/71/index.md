---
title: "2012-08-19 smartass2 가버너 추가한뒤 빌드중"
date: "2012-08-19T13:33:26+09:00"
category: "Android/Kernel"
tags: []
description: "참고한 사이트:http://blog.naver.com/squake/20164009787"
draft: false
original_url: "https://itmir.tistory.com/71"
---

참고한 사이트:<http://blog.naver.com/squake/20164009787>

메가 소마님 감사드립니다 ㅎㅎ

정말 자세한 강좌~

<http://blog.naver.com/squake/20162490596>

여기 들어가면 있는 make.sh부분이 베가s가 아니라 미라크a에 맞는 부분으로 수정해야 하는대

readme파일에는 없어서 고민하던중 build\_kernel.sh파일을 보니까 저 부분이 있어서 같다 붙혔습니다 ㅋㅋ

그리고 ./build\_kernel.sh를 하면 커널 폴더속에 zImage가 생기는대 make.sh를 보면 합치는 명령어도 있더라고요 그래서 필요없는 부분 지우고 아에 갈아 엎었습니다 ㅋㅋ

하하;; 또 언제 컴파일 완성될까요?ㅋㅋ

아무튼 make.sh첨부합니다

사용 명령어

./make.sh menuconfig

./make.sh

빌드중...
