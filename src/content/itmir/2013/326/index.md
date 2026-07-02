---
title: "안드로이드 현재 서비스가 실행중인지 확인하기"
date: "2013-08-30T18:55:28+09:00"
category: "Android/App"
tags: []
description: "서비스가 실행중인지 알아야 할때가 있습니다"
draft: false
original_url: "https://itmir.tistory.com/326"
---

서비스가 실행중인지 알아야 할때가 있습니다

예제소스를 찾았고, 약간 수정해서 올려드립니다~

```java
public boolean isServiceRunningCheck() {
	    	ActivityManager manager = (ActivityManager) this.getSystemService(Activity.ACTIVITY_SERVICE);
	    	for (RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
	    	    if ("ServiceName".equals(service.service.getClassName())) {
	    	        return true;
	    	    }
	    	}
	    	return false;
	}
```

ServiceName에 검사하기 윈하는 서비스 이름을 적어주면 됩니다

package이름+서비스 이름

예를 들면 com.example.service.myservice

출처 : <a href="http://darkcher.tistory.com/184">http://darkcher.tistory.com/184</a>, 본인 수정
