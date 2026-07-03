---
title: "커널(Kernel) 마이너 패치/버전업 하기"
date: "2014-01-20T12:43:53+09:00"
category: "Android/Kernel"
tags: []
description: "커널 마이너 패치 또는 버전 업을 하기 위해서는 먼저 patch파일을 만들어 사용해야 합니다."
draft: false
original_url: "https://itmir.tistory.com/438"
---

커널 마이너 패치 또는 버전 업을 하기 위해서는 먼저 patch파일을 만들어 사용해야 합니다.

diff -urpN (원본폴더명) (수정된폴더명) > (파일이름).patch

이렇게 하면 원본 폴더와 수정된 폴더의 파일을 비교하여 차이점을 상세하게 분석한 patch파일이 만들어 집니다.

이 파일을 원본 커널 폴더에 집어넣은 다음,

patch -p1 < (파일이름).patch

이렇게 하시면 됩니다.

diff를 쉽게 하기 위해 스크립트를 만들었습니다.

원본폴더명과 수정된 폴더명, 파일 이름을 입력하면 patch파일이 만들어 집니다.

[diff.sh](./files/diff.sh)

---

## 첨부파일

- [diff.sh](./files/diff.sh)
