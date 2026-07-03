---
title: "USB나 CD에 Ubuntu를 구워 설치할때 오류 해결법 - syslinux"
date: "2012-10-15T15:15:48+09:00"
category: "Computer & PC/Ubuntu"
tags: []
description: "Start booting from USB device... SYSLINUX 3.84 2009-12-18 EBIOS Copyright (C) 1994-2009 H. Peter Anvin et al"
draft: false
original_url: "https://itmir.tistory.com/32"
---

Start booting from USB device... SYSLINUX 3.84 2009-12-18 EBIOS Copyright (C) 1994-2009 H. Peter Anvin et al

이렇게 나오고 진행이 되지 않는 문제를 해결하기 위한 방법입니다.

원인은 부트로더로 사용되는 syslinux의 버전에서 문제가 있기 때문에 발생한다고 합니다.

해결 방법은 첨부파일을 압축해제 한다음, 32비트는 폴더안 win32폴더에서, 64비트는 win64폴더에서 cmd를 연다음

syslinux 디스크알파벳:

라고 치면 된다.

만약 디스크가 C일 경우,

syslinux C:

참조글 :<http://warmz.tistory.com/275>

[![](http://i1.daumcdn.net/cfs.tistory/v/0/blog/image/extension/zip.gif) syslinux-4.04.zip](http://itmir.tistory.com/attachment/cfile25.uf@016DAD3E5104C61018B3A6.zip)
