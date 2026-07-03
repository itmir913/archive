---
title: "assets파일을 옮기자"
date: "2013-08-13T19:07:31+09:00"
category: "Android/App"
tags: []
description: "assets안에 있는 파일을 옮기는 소스입니다."
draft: false
original_url: "https://itmir.tistory.com/305"
---

assets안에 있는 파일을 옮기는 소스입니다.

onCreate등에서 아래 메소드 호출문으로 실행할수 있습니다.

```java
assetsFileCopy("이동할 파일 이름");
```

아래 코드는 넣어주시면 됩니다. ㅎㅎ

```java
private void assetsFileCopy(String file) {

if (!new File("/data/data/(패키지명)/(파일이 들어갈 폴더)/"+file).exists()) {

 // TODO Auto-generated method stub

 String dir="/data/data/(패키지명)/(파일이 들어갈 폴더)/";

 String fname = file;

 File folder =new File(dir);

 if(!folder.exists()){

  folder.mkdirs();

 }

 AssetManager aman = getResources().getAssets();

 File ofile = new File(dir+fname);

 ofile.delete();

 InputStream in = null;

 FileOutputStream out = null;

 long filesize=0;

 try{

  in = aman.open(fname,AssetManager.ACCESS_BUFFER);

  filesize = in.available();

  if(ofile.length() <=0){

   byte[] tmpbyte = new byte[(int)filesize];

   in.read(tmpbyte);

   in.close();

   ofile.createNewFile();

   out = new FileOutputStream(ofile);

   out.write(tmpbyte);

   out.close();

  }

 }catch(IOException e){

 AlertDialog.Builder alert = new AlertDialog.Builder(this);

alert.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {

   @Override

   public void onClick(DialogInterface dialog, int which) {

   dialog.dismiss();

   finish();

   } });

alert.setMessage(R.string.no_db);

alert.show();

 }

}

}
```

만약 파일이 1mb가 넘어갈경우 안드로이드 상의 메모리 제한으로 인해 불가능 하니 1mb로 분활해서 합쳐야 합니다..

```java
static String[] INPUT_ASSET_NAMES;
static String OUTPUT_PATH;
```

class안에 이 두개 구문을 넣어주자.

static선언으로 모든 메소드에서 사용가능하도록 만들었다.

```java
public void BigFile(){

// INPUT_ASSET_NAMES 병합할 assets 의 파일명을 나열합니다.

INPUT_ASSET_NAMES = new String[]{

"(이름).zip.001", "(이름).zip.002", "(이름).zip.003", "(이름).004" };

// OUTPUT_PATH에는 병합한 결과로 생성될 파일의 경로를 할당합니다.

OUTPUT_PATH = Environment.getExternalStorageDirectory().getAbsolutePath()+"/(파일이름)";

combineFiles();

}

메소드를 두개로 나눴다 위 메소드랑 아래 메소드.

1mb가 넘는 파일이 여러개일 수도 있어서.ㅇㅅㅇ..

Environment.getExternalStorageDirectory().getAbsolutePath()가 자동으로 /sdcard로 변한다.

분할된 zip파일을 적고 원래 파일이름을 적고 아래 소스를 복붙하면 된다.

물론 분할된 zip파일은 1mb여야하고 zip분할압축(7zip)프로그램을 이용하면 된다.

아래 메소드도 복붙하자.

private void combineFiles(){

  final File OUTPUT = new File(OUTPUT_PATH);

  InputStream is = null;

  BufferedInputStream bis = null;

  FileOutputStream fos = null;

  BufferedOutputStream bos = null;

  try{

  fos = new FileOutputStream(OUTPUT);

  bos = new BufferedOutputStream(fos);

  for(int i=0;i<INPUT_ASSET_NAMES.length;i++){

  is = getApplicationContext().getAssets().open(INPUT_ASSET_NAMES[i]);

  bis = new BufferedInputStream(is);

  int l=0;

  byte[] buf = new byte[4096];

  while((l=bis.read(buf))>0) bos.write(buf, 0, l);

  try{bis.close();}catch(Exception e){}

  try{is.close();}catch(Exception e){}

  }

  }catch(Exception e){

  e.printStackTrace();

  }finally{

  if(bos!=null) try{bos.close();}catch(Exception e){}

  if(fos!=null) try{fos.close();}catch(Exception e){}

  if(bis!=null) try{bis.close();}catch(Exception e){}

  if(is!=null) try{is.close();}catch(Exception e){}

  }

}
```

1mb분활 소스는 <http://hyeongkyu.net/110090943249>를 참고했으며 내가 조금 수정한 상태이다.(만 뭐 중요소스는 수정하지도 않았다.)
