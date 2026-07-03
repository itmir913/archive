---
title: "Android Activity theme 기본으로 제공하는 것들"
date: "2013-07-07T16:34:30+09:00"
category: "Application"
tags: []
description: "굳이 customizing 하지 않고 안드로이드에서 기본적으로 제공하는 테마들을 활용해보자구요."
draft: false
original_url: "https://itmir.tistory.com/261"
---

굳이 customizing 하지 않고 안드로이드에서 기본적으로 제공하는 테마들을 활용해보자구요.

(안드로이드 프로젝트 내에 있는 "AndroidManifest.xml" 파일에서 수정하면 됩니다.)

![](http://postfiles1.naver.net/20100514_176/jolangma_1273840651452Yw5pX_png/theme_jolangma.png?type=w3)   ![](http://postfiles2.naver.net/20100514_97/jolangma_1273840651642pSuak_png/theme_notitlebar_jolangma.png?type=w3)   ![](http://postfiles14.naver.net/20100514_109/jolangma_1273840651813MaTRR_png/theme_notitlebar_fullscreen_jolangma.png?type=w3)

`<activity android:theme="@android:style/Theme">`

`<activity android:theme="@android:style/Theme.NoTitleBar">`

`<activity android:theme="@android:style/Theme.NoTitleBar.Fullscreen">`

The default system theme. 이 테마는 기본 테마에 아무 설정도 하지 않으려는 Activity가 사용할때 좋은 테마에요. 하얀색 텍스트와 어두운 배경으로 되어 있지요.

`<activity android:theme="@android:style/Theme.Black">`

`<activity android:theme="@android:style/Theme.Black.NoTitleBar">`

`<activity android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen">`

완벽한 검은색을 배경으로 가지고 있는 기본 테마에요. 얘는 이미지 뷰어나 미디어 플레이어 같이 집중력을 요하는 것들과 같이 사용하면 유용하죠. 만약 보통 테마를 원하시면 이 테마를 사용하지 마시고 바로 위에 있는 테마(**="@android:style/Theme"**)를 사용하세요.

위의 두 개의 테마군은 비슷한 결과가 보여지는 군요.

|  |
| --- |
|  |

![](http://postfiles9.naver.net/20100514_264/jolangma_1273824391352RdyOJ_png/theme_light_jolangma.png?type=w3)   ![](http://postfiles1.naver.net/20100514_112/jolangma_1273824338003QezUD_png/theme_light_notitlebar_jolangma.png?type=w3)   ![](http://postfiles4.naver.net/20100514_131/jolangma_1273824338214lsRYk_png/theme_light_notitlebar_fullscreen_jolangma.png?type=w3)

`<activity android:theme="@android:style/Theme.Light">`

`<activity android:theme="@android:style/Theme.Light.NoTitleBar">`

`<activity android:theme="@android:style/Theme.Light.NoTitleBar.Fullscreen">`

검은색 텍스트를 사용하고 배경은 하얀색을 가지고 있는 테마에요.

이런 외관을 원하시면 여러분의 액티비티에 적용하세요.

|  |
| --- |
|  |

![](http://postfiles16.naver.net/20100514_271/jolangma_1273806218122RAphi_png/theme_dialog_jolangma.png?type=w3)

`<activity android:theme="@android:style/Theme.Dialog">`

다이얼로그 윈도우와 액티비티를 위한 기본 테마에요. `Dialog` class 를 사용하고 있죠. 이 테마는 윈도우를 화면 전체에 채우지 않고 콘텐츠 위에 떠있는 돌출형으로 변환시키며 테두리를 프레임으로 둘러놓았죠. 다이얼로그처럼 보이는 액티비티를 만들기 원하시면 이 테마를 적용하세요.

|  |
| --- |
|  |

![](http://postfiles1.naver.net/20100514_272/jolangma_12738410853615VY6l_png/theme_panel_jolangma.png?type=w3)   ![](http://postfiles1.naver.net/20100515_288/jolangma_1273886087725PvT16_png/theme_light_panel_jolangma.png?type=w3)

`<activity android:theme="@android:style/Theme.Panel">` 기본테마:dark(whit text)

`<activity android:theme="@android:style/Theme.Light.Panel">` 기본테마:light(black text)

윈도우에 보여주고자 하는 뷰들을 제외한 모든것을 지운 테마에요, 기본적으로 텅빈 직사각형안에 여러분이 보여주고자하는 컨텐츠만 보이죠. 다이알 로그처럼 윈도우를 화면 전체에 채우지 않고 콘텐츠 위에 떠있는 돌출형으로 , 배경은 투명하게, 뒤에 있는 윈도우는 흐릿함을 없앤 테마에요.

어라! 타이틀 바가 없네요.

|  |
| --- |
|  |

![](http://postfiles1.naver.net/20100515_48/jolangma_12738876522233q4t0_png/theme_translucent_jolangma.png?type=w3)   ![](http://postfiles9.naver.net/20100515_88/jolangma_12738876524253nEbA_png/theme_translucent_notitlebar_jolangma.png?type=w3)   ![](http://postfiles5.naver.net/20100515_52/jolangma_1273887652643Jkho4_png/theme_translucent_notitlebar_fullscreen_jolangma.png?type=w3)

`<activity android:theme="@android:style/Theme.Translucent">`

`<activity android:theme="@android:style/Theme.Translucent.NoTitleBar">`

`<activity android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen">`

투명한 액티비티를 위한 기본 테마에요, 윈도우 뒷쪽을 훤히 보여주죠.

음...status bar가 사라지지 않는군요...음...=\_=...왜 그러지?

|  |
| --- |
|  |

![](http://postfiles7.naver.net/20100515_22/jolangma_1273888301391l6u1t_png/theme_wallpaper_jolangma.png?type=w3)   ![](http://postfiles14.naver.net/20100515_221/jolangma_12738883017202vJQ3_png/theme_wallpaper_notitlebar_jolangma.png?type=w3)   ![](http://postfiles7.naver.net/20100515_246/jolangma_1273888301983CzzD2_png/theme_wallpaper_notitlebar_fullscreen_jolangma.png?type=w3)

`<activity android:theme="@android:style/Theme.Wallpaper">`

`<activity android:theme="@android:style/Theme.Wallpaper.NoTitleBar">`

`<activity android:theme="@android:style/Theme.Wallpaper.NoTitleBar.Fullscreen">`

맨 뒤에 있는 배경화면을 가지고 싶어하는 윈도우를 위한 테마에요.

|  |
| --- |
|  |

![](http://postfiles3.naver.net/20100515_18/jolangma_12738883022093w9oy_png/theme_wallpapersettings_jolangma.png?type=w3)   ![](http://postfiles16.naver.net/20100515_79/jolangma_1273889354137gC8Am_png/theme_light_wallpapersettings_jolangma.png?type=w3)

`<activity android:theme="@android:style/Theme.WallpaperSettings">`

어두운 배경 위에 그려진 액티비티를 배경화면으로 설정한 테마에요.

`<activity android:theme="@android:style/Theme.Light.WallpaperSettings">`

밝은 배경 위에 그려진 액티비티를 배경화면으로 설정한 테마에요.

|  |
| --- |
|  |

`<activity android:theme="@android:style/Theme.NoDisplay">`

 이 테마는 액티비티가 실행되고도 사용자에게 보여지지 않는다.

`<activity android:theme="@android:style/Theme.InputMethod">`

이 테마를 적용한 액티비티를 입력방식으로 사용할 수 있나 보군요.

**[출처]** [Android Activity theme 기본으로 제공하는 것들](http://blog.naver.com/jolangma/150086283752)|**작성자** [jolangma](http://blog.naver.com/jolangma)

출처 : http://blog.naver.com/jolangma/150086283752
