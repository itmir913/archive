---
title: "볼륨 조절 메소드"
date: "2013-07-07T17:01:01+09:00"
category: "Application"
tags: []
description: "public  void volumeDown(View v){"
draft: false
original_url: "https://itmir.tistory.com/262"
---

// 볼륨 낮추는 메소드

public  void volumeDown(View v){

    AudioManager am = (AudioManager)getSystemService(Context.AUDIO\_SERVICE);

    // 현재 볼륨 가져오기

    int volume = am.getStreamVolume(AudioManager.STREAM\_MUSIC); //volume은 0~15 사이어야 함

    // volume이 0보다 클 때만 키우기 동작

    if(volume > 0) {

        am.setStreamVolume(AudioManager.STREAM\_MUSIC, volume-1, AudioManager.FLAG\_PLAY\_SOUND);

    }else {

        Toast.makeText(getApplicationContext(), "현재 최저음량입니다.", Toast.LENGTH\_SHORT).show();

    }

}

// 볼륨 높이는 메소드

public  void volumeUp(View v){

    AudioManager am = (AudioManager)getSystemService(Context.AUDIO\_SERVICE);

    // 현재 볼륨 가져오기

    int volume = am.getStreamVolume(AudioManager.STREAM\_MUSIC);

     // volume이 15보다 작을 때만 키우기 동작

    if(volume < 15) {

        am.setStreamVolume(AudioManager.STREAM\_MUSIC, volume+1, AudioManager.FLAG\_PLAY\_SOUND);

    }else {

        Toast.makeText(getApplicationContext(), "현재 최고음량입니다.", Toast.LENGTH\_SHORT).show();

    }

}

출처 : <http://iamsungeun.blog.me/100191287357>
