---
title: "어플이 apk를 설치하는 소스"
date: "2013-08-16T23:20:45+09:00"
category: "Android/App"
tags: []
description: "어플에서 apk를 설치하는 소스는 다음과 같습니다"
draft: false
original_url: "https://itmir.tistory.com/313"
---

어플에서 apk를 설치하는 소스는 다음과 같습니다

public void apkInstall(File apkfile){

Uri apkUri = Uri.fromFile(apkfile);

try {

Intent packageinstaller = new Intent(Intent.ACTION\_VIEW);

      packageinstaller.setDataAndType( apkUri, "application/vnd.android.package-archive");

    startActivity(packageinstaller);

} catch (Exception e) {

}

}

apkinstall이라는 메소드입니다

이 메소드를 실행할때 변수를 apkfile의 경로를 주면 됩니다

메소드를 실행할땐 아래 코드를 사용합니다

File apkfile = new File(Environment.getExternalStorageDirectory().getAbsolutePath()+"/(파일이름).apk");

apkInstall(apkfile);

Environment.getExternalStorageDirectory().getAbsolutePath()가 /sdcard를 만들고 +, apk경로를 입력하시면 됩니다

인텐트로 패키지 인스톨러에게 apk의 위치를 주고 끝이군요 ㅎ...

오늘 또하나 배우고 잡니다~
