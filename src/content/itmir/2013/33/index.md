---
title: "repo sync 끊김 해결방법"
date: "2012-10-16T15:16:27+09:00"
category: "Computer & PC/Ubuntu"
tags: []
description: "AOSP또는 CM의 소스를 받을때 시간 엄청 걸리시죠?"
draft: false
original_url: "https://itmir.tistory.com/33"
---

AOSP또는 CM의 소스를 받을때 시간 엄청 걸리시죠?

서버가 아주 많이 과부하 되기 때문에 자주 끊기는 현상이 일어납니다...

그러면 repo sync를 다시 해야 하는데요. 너무 귀찮습니다. ㅠㅠ

이걸을 해결하기 위한 방법입니다.

일단 첨부파일을 받아주세요~

그 다음 첨부파일을

(소스 다운 위치)/.repo/repo/subcmds/

이 경로에 넣어주세요. 실패하면 될때까지 sync를 시도하게 됩니다.

.repo라는 폴더가 안보이실경우에는요.

보기-숨긴파일 보기를 누르시면 됩니다.

그럼 유용하게 사용하세요~

(요즘 빌드나 하지않고 팁만 올리는? 재민님 우분투깔았는대 와이파이가 안되서 소스를 받을수 없네요;; 드라이버 찾아서 깔아봤는대 모두 안됩니다. ㄷㄷ 11.04버전을 다시 깔아야 할 듯 합니다.)


참고글

첨부 파일 : <http://blog.naver.com/yearnotw/30107462969>

파일 설명 : <http://huikyun.tistory.com/379>