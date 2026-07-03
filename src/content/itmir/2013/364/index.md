---
title: "#18 소리를 재생해 보자 - MusicPlayer"
date: "2013-10-26T23:55:47+09:00"
category: "Android/App"
tags: []
description: "빨리 20번대 순서가 와야 본격적으로 쓰래드, 핸들러, 서비스, 설정값 저장 등등 실제 어플제작에 필요한걸 만들탠대 말이죠~..."
draft: false
original_url: "https://itmir.tistory.com/364"
---

안녕하세요~

빨리 20번대 순서가 와야 본격적으로 쓰래드, 핸들러, 서비스, 설정값 저장 등등 실제 어플제작에 필요한걸 만들탠대 말이죠~...

아무튼 빨리 시작해 봅니다

이번에는 음악을 재생하는 MusicPlayer에 대해 배워보도록 하겠습니다

## 18. 소리를 재생해 보자 - MusicPlayer

### 18-1 필요한 파일이 있어요

안드로이드에서 음악을 재생할수 있는것은 SoundPool이라는것과 MusicPlayer 2가지가 있습니다

SoundPool은 이 강좌에서 다루지 않을 예정입니다

비프음같은 간단한 소리를 재생할때는 자주 쓰이지만 배경화면과 같이 긴 음악에는 적합하지 않아요

그래서 이번 강좌는 MusicPlayer만 사용하도록 하겠습니다

일단 필요한 파일이 하나 있습니다

바로 우리가 재생할 음악파일 입니다

저는 코난의 BGM을 선택했습니다

http://blog.naver.com/hyunjune01/130161271676

이 블로그의 두번째 첨부파일 입니다

음악이 준비되었다면 꼭 이름을 소문자 영어로 시작해 주시고, 대문자가 절대 들어가서는 안됩니다

저는 konan으로 하겠습니다 ㅎㅎ

이제 이 파일을 우리의 이클립스 프로젝트 안에 추가해 주어야 합니다

프로젝트를 만든다음 res/raw폴더를 만들후, 그안에 넣어주세요

[미르의 팁]

Q. 왜 하필이면 폴더 이름이 raw입니까?

A. 암묵적인 약속이랄까... 그런겁니다(?)

원래 아무폴더에 넣어도 되나

안드로이드 시스탬에서 미디어 파일은 raw폴더에 넣자 라는 암묵적인 약속이 있기에 그렇게 하는겁니다

ㅁ..물론 강제는 아닙니다

### 18-2 레이아웃 패스

점점 강좌가 나갈수록 레이아웃은 간단해 집니다

<Button

    android:id="@+id/button1"

    android:layout\_width="wrap\_content"

    android:layout\_height="wrap\_content"

    android:layout\_alignParentTop="true"

    android:layout\_centerHorizontal="true"

    android:layout\_marginTop="50dp"

**android:onClick="button"**

    android:text="@string/start" />

<SeekBar

    android:id="@+id/seekBar1"

    android:layout\_width="match\_parent"

    android:layout\_height="wrap\_content"

    android:layout\_alignParentLeft="true"

    android:layout\_below="@+id/button1"

    android:layout\_marginTop="30dp" />

모두 한번 배운 내용이므로 언급없이 진행하겠습니다

만약 이 코드가 이해가 안가신다면 이 글의 정독을 멈추고 저번 강좌를 정독해 주세요

중요한거라곤... onClick말고는 없습니다 ㅎ

### 18-3 자바 소스 구현

밤이 늦었습니다 빨리 구현해 보겠습니다

먼저 우리가 필요한것들 정의해야 겠죠 맨날 하던거 처럼?

Button button;

SeekBar seekbar;

MediaPlayer music;

그다음 onCreate메소드 안 내용물들입니다

music = MediaPlayer.create(this, R.raw.konan);

music.setLooping(true);

맨 처음에는 MusicPlayer부터 정의해 봅시다

첫번째 줄은 뮤직 플레이어를 만드는 부분입니다

저기 this옆에 있는 R.raw.konan은 아까 집어넣은 음악파일의 이름이 되겠습니다

그 다음 아래에 있는 코드는 무한 반복설정입니다

true는 무한반복, false는 무한반복 안함의 뜻으로 저는 true로 설정했습니다

button = (Button) findViewById(R.id.button1);

seekbar = (SeekBar) findViewById(R.id.seekBar1);

이건 지겹게 봐서 아실거고...ㅋㅋㅋ

아래가 중요합니다

이 예제에서는 SeekBar를 움직이면 재생 위치가 변하게 만들 예정입니다

seekbar.setMax(music.getDuration());

seekbar.setOnSeekBarChangeListener(new OnSeekBarChangeListener() {

@Override

public void onStopTrackingTouch(SeekBar seekBar) {

// TODO Auto-generated method stub

}

@Override

public void onStartTrackingTouch(SeekBar seekBar) {

// TODO Auto-generated method stub

}

@Override

public void onProgressChanged(SeekBar seekBar, int progress,

boolean fromUser) {

// TODO Auto-generated method stub

if(fromUser)

music.seekTo(progress);

}

});

먼저 seekbar.setMax(music.getDuration()); 이부분을 봅시다

setMax는 배운 것이므로 아시고 music.getDuration()는 뭘까요?

이건 음악의 총 길이를 가져오는 코드입니다

즉 SeekBar의 총 길이를 음악의 총길이로 설정하는 것이지요!

그아래에는 Listener가 있네요

onProgressChanged()를 봅시다

여기서 볼수 있는 코드는 두줄, 그 전 fromUser에 대해 배워봅시다

onProgressChanged()메소드가 실행될때 세번째로 값이 넘어오는 fromUser

이것은 사용자가 움직여서 값이 변한거면 true, 소스 또는 setProgress등으로 변한것이면 false가 됩니다

아래 코드를 봅시다

if(fromUser)

music.seekTo(progress);

이것을 보면 사용자가 SeekBar를 움직였을때만 if가 실행되게 되었습니다

그럼 또 seekTo는 뭐냐...

간단합니다 재생 위치를 바꿔주는 것입니다

즉 SeekBar를 사용자가 움직일때마다 재생 위치가 변하는 거죠

이제 위에서 버튼에 주었던 android:onClick과 맞는 메소드를 만들어야 겠죠??

public void button(View v){

if(**music.isPlaying()**){

// 재생중이면 실행될 작업 (정지)

music.stop();

try {

music.prepare();

} catch (IllegalStateException e) {

e.printStackTrace();

} catch (IOException e) {

e.printStackTrace();

}

music.seekTo(0);

button.setText(R.string.start);

seekbar.setProgress(0);

}else{

// 재생중이 아니면 실행될 작업 (재생)

music.start();

button.setText(R.string.stop);

Thread();

}

}

자, 먼저 music.isPlaying()를 봅시다

이름에서 알다싶이 이건 재생중이면 true, 아니면 false를 반환합니다

재생중이면 정지, 재생중이 아니면 재생

뭐 이런것이죠 ㅎ

그다음에 설명해야 할건 seekTo입니다

이것은 어디를 재생할것인지 설정하는것으로 위에서 언급한 내용 그대로 입니다

다만 여기서는 0으로 설정해 처음으로 돌아가는 것이죠 ㅎㅎ

마지막 Thread();는 Thread라는 이름을 가진 메소드를 실행하는 것입니다

아직 정의하지 않았으므로 만들어 봅시다

public void Thread(){

Runnable task = new Runnable(){

public void run(){

/\*\*

\* while문을 돌려서 음악이 실행중일때 게속 돌아가게 합니다

\*/

while(music.isPlaying()){

try {

Thread.sleep(1000);

} catch (InterruptedException e) {

// TODO Auto-generated catch block

e.printStackTrace();

}

/\*\*

\* music.getCurrentPosition()은 현재 음악 재생 위치를 가져오는 구문 입니다

\*/

seekbar.setProgress(music.getCurrentPosition());

}

}

};

Thread thread = new Thread(task);

thread.start();

}

대부분 위에서 언급된것인대...

Runnable이라던지 Thread는 20번대 강좌에서 자세하게 배울 예정이므로 지금은 패스해 줍시다

지금 배울것은 seekbar.setProgress(music.getCurrentPosition()); 부분 입니다

music.getCurrentPosition()은 뭘까요?

눈치 빠르신 분들은 아시겠지만 이건 현재 재생되고 있는 위치를 가져오는 겁니다

Thread.sleep(1000);으로 인해 1초씩 건너서 쉬므로

1초마다 SeekBar가 움직이게 됩니다

이렇게 해서 노래를 재생하는 방법에 대해 알아봤습니다

구동영상은 동영상으로 확인해 보겠습니다

[임베드 콘텐츠: https://play-tv.kakao.com/embed/player/cliplink/vb45awTduwY4YIIOAdIIOCb?service=daum\_tistory](https://play-tv.kakao.com/embed/player/cliplink/vb45awTduwY4YIIOAdIIOCb?service=daum_tistory)

모든 기능이 잘 작동하는것으로 확인되었습니다 ㅎㅎ

조금 어려웠나요?

당장 이해가 안되더라도 쭉 가다보면 언젠간 이해가 될겁니다 ㅎㅎ

이 강좌의 예제소스는 19번 강좌가 나오는 즉시 업로드 됩니다

카페에서는 원본글에서만 다운로드가 가능합니다

예제소스 다운로드 :


다음 강좌는 진동에 대해 살펴볼 생각입니다

대부분의 강좌에서 진동은 그냥 위잉~ 이렇게만 언급하는대 제 강좌에서는 진동에 패턴까지 넣어서 위잉~...~윙~... 이런거 까지 해보도록 하겠습니다 ㅎㅎ

참조 : <http://nephilim.tistory.com/56>

<http://naiacinn.tistory.com/109>

<http://indy9052.blog.me/120142002766>