---
title: "어플 알림(진행중) 띄우기"
date: "2013-09-01T13:24:02+09:00"
category: "Android/App"
tags: []
description: "네이버 카페 알림같이 알림을 띄어야 할때가 있습니다"
draft: false
original_url: "https://itmir.tistory.com/328"
---

네이버 카페 알림같이 알림을 띄어야 할때가 있습니다

한번 띄워 볼까요?

private void showNotify(Context context) {

NotificationManager nm = (NotificationManager)context.getSystemService(Context.NOTIFICATION\_SERVICE);

// 시스탬 서비스를 호출한다

Notification notification = new Notification(R.drawable.ic\_launcher, "알림이 뜰때 표시", System.currentTimeMillis());

// 아이콘을 지정한다, 카카오톡의 "새로운 메세지가 도착했습니다"가 잠깐 표시되는것 같은거

notification.flags = Notification.FLAG\_ONGOING\_EVENT;

// FLAG\_AUTO\_CANCEL:은 알림(확인하면 지워짐), FLAG\_ONGOING\_EVENT은 진행중표시

PendingIntent contentIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class), 0);

// MainActivity.class는 알림을 터치하면 이동할 액티비티이다

notification.setLatestEventInfo(context, **"제목", "내용"**, contentIntent);

nm.notify(1234, notification);

// 1234는 알림을 구분할 상수이고, 알림을 지울때 이 상수가 필요하다

}

이 메소드를 실행하면 됩니다

이 메소드는 context가 없는 브로드 캐스트 리시버에서 사용한 메소드이므로 다른 메소드에서는 this를 사용하시면 됩니다

지울때는

nm.cancel(1234);

여기서 1234는 알림을 구분할 상수 입니다
