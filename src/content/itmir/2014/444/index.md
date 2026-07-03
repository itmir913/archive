---
title: "PackageManager를 이용한 홈런처(Launcher)어플 PackageName구하기"
date: "2014-01-23T02:00:00+09:00"
category: "Android/App"
tags: []
description: "먼저 홈런처 어플의 패키지명을 구해서 String[]으로 반환하는 메소드입니다"
draft: false
original_url: "https://itmir.tistory.com/444"
---

먼저 홈런처 어플의 패키지명을 구해서 String[]으로 반환하는 메소드입니다

```java
private String[] getHomeLauncher(){

    String[] HomeLauncher;

    PackageManager pm =  getPackageManager();

    Intent homeIntent = new Intent(Intent.ACTION_MAIN);

    homeIntent.addCategory(Intent.CATEGORY_HOME);

    List<ResolveInfo> homeApps = pm.queryIntentActivities(homeIntent, PackageManager.GET_ACTIVITIES);

    HomeLauncher = new String[homeApps.size()];

    for(int i=0; i<homeApps.size(); i++){

        ResolveInfo info = homeApps.get(i);

        HomeLauncher[i] = info.activityInfo.packageName;

    }

    return HomeLauncher;

}
```

java안 아무데다 추가해 주시고

이 메소드를 사용하는 방법은 아래와 같습니다

```java
String[] home = getHomeLauncher();

for(int i=0 ; i<home.length ; i++ ){

    if(home[i].equals(**packageName**)){

        // 이 어플이 홈런처 일경우 실행됨

        break;

    }

}
```

굵은 글시로 표시되어 있는 **packageName**에 런처인지 확인하고자 하는 어플의 패키지 명을 집어넣어 주시면

그 어플이 런처일경우 할 작업을 써주시면 됩니다

참고 : <http://chonggi7.tistory.com/entry/PackageManager-홈-화면-Launcher-PackageName-구하기>
