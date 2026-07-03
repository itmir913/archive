---
title: "[명령어] 'tar' 명령어로 압축하기"
date: "2013-07-21T11:52:43+09:00"
category: "Computer & PC/Linux"
tags: []
description: "리눅스에서 대표적인 압축 확장자는 tar, tar.gz등이 있습니다."
draft: false
original_url: "https://itmir.tistory.com/272"
---

리눅스에서 대표적인 압축 확장자는 tar, tar.gz등이 있습니다.

이번에는 이 tar명령어에 대해 알아보겠습니다.

먼저 tar의 옵션을 알아보겠습니다.

-c 파일을 tar로 묶음

-p 파일 권한을 저장

-v 묶거나 파일을 풀때 과정을 출력

-f 파일이름을 지정

-C 경로를 지정

-x tar 압축풀기

-z gzip으로 압축하거나 해제함

자주 사용하는 옵션들입니다. ㅎㅎ

그럼 압축 명령어를 알아보겠습니다.

-그냥 tar으로 압축하기

tar -cvf (압축 파일명).tar (압축할 폴더 또는 파일)

-tar.gz로 압축하기

tar -zcvf (압축될 이름.tar.gz) (압축할 폴더/파일)

-tgz로 압축하기

tar -zcvf (압축될 이름.tgz) (압축할 폴더/파일)

그럼 이번에는

압축 풀기 명령어를 알아보겠습니다.

-tar 압축풀기

tar -xvf (압축파일명).tar

-tar.gz 압축풀기

tar -xvzf (압축파일명).tar.gz

-tgz 압축풀기

tar -xzvf (압축파일명).tgz

-C 옵션을 이용하여 다른곳에 압축을 풀수도 있습니다.

-C (압축풀릴 폴더경로)

예를 들어 test.tar.gz를 다른곳($HOME/바탕화면/HI)에 넣어보겠습니다.

tar -xvzf test.tar.gz -C 바탕화면/HI

맨 위에 있는 옵션을 사용하여자유롭게 사용할 수 있도록 연구하는 자세가 필요할듯 합니다. ㅎㅎ

옵션의 v를 제거하면 v는 visual의 약자이므로 압축 과정을 화면에 표시하지 않습니다. ㅎㅎ

파일이 엄청나게 많은경우 v를 생략하게 되면 터미널을 아낄수 있겠지요?(?)

그냥 tar --help라고 입력하면 많은 예시가 나오니 여기서 제시한 일부 명령어 말고도 많은 명령어를 찾으시길 바랍니다!
