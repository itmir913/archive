---
title: "Python (*.py)를 exe화 하기"
date: "2013-09-12T16:35:21+09:00"
category: "Computer & PC/Windows"
tags: []
description: "python으로 짜여진 프로그램을 exe화할 때가 있습니다."
draft: false
original_url: "https://itmir.tistory.com/339"
---

python으로 짜여진 프로그램을 exe화할 때가 있습니다.

예를들면 파이썬이 설치되지 않은 곳에서 실행을 위해서이죠.

이때 사용하는 프로그램이 있습니다.

py2exe가 그 주인공 인데요.

이번에는 그 방법을 알아보겠습니다.

먼저 python을 받아주세요.

python은 [www.python.org](http://www.python.org)에서 받을 수 있습니다.



첨부로도 올려두겠습니다.

또한 py2exe라는 프로그램도 설치해야 합니다.

<http://sourceforge.net/projects/py2exe/files/py2exe/0.6.9/>

여기서 설치한 python에 맞는 py2exe를 받아주세요.

위에 올려진 python을 설치했다면,


자 모두 설치해주시면 아래를 따라해주세요.

py파일을 하나 생성해 줍시다.

이름은 make.py로 해줍시다.

from distutils.core import setup

import py2exe

setup(console=['컴파일할파일명.py'])

내용은 위와 같이 심플합니다. ㅎㅎ

저기에 있는 컴파일할파일명.py만 조절해 주세요.

그다음 cmd에서

C:\Python27\python.exe make.py (만들어질 이름).exe

그럼 dist폴더에 만들어진 exe가 존재하는데요.

파일이 많습니다...

하나의 exe로 만드는 방법은 아래와 같습니다.

from distutils.core import setup

import py2exe

excludes = [

    "pywin",

    "pywin.debugger",

    "pywin.debugger.dbgcon",

    "pywin.dialogs",

    "pywin.dialogs.list",

    "win32com.server",

]

options = {

    "bundle_files": 1,                 # create singlefile exe

    "compressed"  : 1,                 # compress the library archive

    "excludes"    : excludes,

    "dll_excludes": ["w9xpopen.exe"]   # we don't need this

}

setup(

    options = {"py2exe": options},

    zipfile = None,

    console = ["컴파일할파일명.py"]

)

아까 만든 make.py의 내용을 위와 같이 바꿔주세요.

위와 마찬가지로

C:\Python27\python.exe make.py (만들어질 이름).exe

이렇게 입력하면 dist폴더에 한개의 exe가 생성됩니다.

[make.py](./files/make.py)

출처 : <http://huddling.tistory.com/5>

---

## 첨부파일

- [make.py](./files/make.py)
