---
title: "This is usually caused by another repository pushing"
date: "2016-01-04T18:00:15+09:00"
category: "Programming"
tags: []
description: "오류 정보이 오류는 git pull으로 서버에 저장된 commit을 받아오지 않은 상태에서 push를 할 때 발생한다.아래는 오류의 전체 상황이다.입력한 명령어 부분을 굵은 글씨로 표시했다.Microsoft Windows [Version 10.0.10240](c)…"
draft: false
original_url: "https://itmir.tistory.com/605"
---

오류 정보

이 오류는 git pull으로 서버에 저장된 commit을 받아오지 않은 상태에서 push를 할 때 발생한다.

아래는 오류의 전체 상황이다.

입력한 명령어 부분을 굵은 글씨로 표시했다.

Microsoft Windows [Version 10.0.10240]

(c) 2015 Microsoft Corporation. All rights reserved.

**C:\Users\whdghks913>cd /d D:\Android\AndroidStudio\WondangHighSchool**

**D:\Android\AndroidStudio\WondangHighSchool>git status**

On branch master

Your branch is up-to-date with 'origin/master'.

Changes not staged for commit:

  (use "git add <file>..." to update what will be committed)

  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   build.gradle

no changes added to commit (use "git add" and/or "git commit -a")

**D:\Android\AndroidStudio\WondangHighSchool>git add -A**

warning: CRLF will be replaced by LF in build.gradle.

The file will have its original line endings in your working directory.

**D:\Android\AndroidStudio\WondangHighSchool>git commit -m "Plugin is too old, please update to a more recent version, or set ANDROID\_DAILY\_OVERRIDE environment variable"**

[master warning: CRLF will be replaced by LF in build.gradle.

The file will have its original line endings in your working directory.

99e0db2] Plugin is too old, please update to a more recent version, or set ANDROID\_DAILY\_OVERRIDE environment variable

warning: CRLF will be replaced by LF in build.gradle.

The file will have its original line endings in your working directory.

 1 file changed, 1 insertion(+), 1 deletion(-)

**D:\Android\AndroidStudio\WondangHighSchool>git push origin master**

Username for 'https://github.com':

Password for 'https://itmir913@github.com':

To https://github.com/itmir913/wondanghighschool

 ! [rejected]        master -> master (fetch first)

error: failed to push some refs to 'https://github.com/itmir913/wondanghighschool'

hint: Updates were rejected because the remote contains work that you do

hint: not have locally. This is usually caused by another repository pushing

hint: to the same ref. You may want to first integrate the remote changes

hint: (e.g., 'git pull ...') before pushing again.

hint: See the 'Note about fast-forwards' in 'git push --help' for details.

**D:\Android\AndroidStudio\WondangHighSchool>git pull**

remote: Counting objects: 4, done.

remote: Compressing objects: 100% (4/4), done.

remote: Total 4 (delta 3), reused 0 (delta 0)

Unpacking objects: 100% (4/4), done.

From https://github.com/itmir913/wondanghighschool

   5bb3741..6917361  master     -> origin/master

Removing app/app.iml

Removing WondangHighSchool.iml

Merge made by the 'recursive' strategy.

 .gitignore            |   1 +

 WondangHighSchool.iml |  19 ---------

 app/app.iml           | 110 --------------------------------------------------

 3 files changed, 1 insertion(+), 129 deletions(-)

 delete mode 100644 WondangHighSchool.iml

 delete mode 100644 app/app.iml

**D:\Android\AndroidStudio\WondangHighSchool>git push origin master**

Username for 'https://github.com':

Password for 'https://itmir913@github.com':

Counting objects: 5, done.

Delta compression using up to 4 threads.

Compressing objects: 100% (5/5), done.

Writing objects: 100% (5/5), 648 bytes | 0 bytes/s, done.

Total 5 (delta 3), reused 0 (delta 0)

To https://github.com/itmir913/wondanghighschool

   6917361..8e8881a  master -> master

해결 방법

git pull

출처 / 팁

You may want to first integrate the remote changes (e.g., 'git pull ...') before pushing again.
