---
title: "번외 - rand함수를 이해하자"
date: "2013-08-14T17:42:17+09:00"
category: "Programming/Java"
tags: []
description: "안드로이드 어플을 만드는도중 rand라는 것이 하나 필요했습니다."
draft: false
original_url: "https://itmir.tistory.com/309"
---

안드로이드 어플을 만드는도중 rand라는 것이 하나 필요했습니다.

이는 "드림나래"의 히든모드와 비슷한 건데요.

랜덤의 숫자를 얻을수 있습니다.

자바에서 랜덤숫자를 구하기 위해서는 Math.random();을 사용하면 됩니다.

이 놈은 특이하게도 다른 언어와 달리 int형이 아닌 double형으로 반환합니다.

그리고 반환하는 값이 0.0에서 1.0사이입니다.

> 0.0 <= Math.random() < 1.0

그렇다면, 어떻게 정수를 얻을수 있을까요?

int로 형변환을 하면 됩니다.

아래 순서를 생각하면 됩니다.

만약 1~10사이의 랜덤 정수를 구하기를 원한다면,

> (1) 각 변에 10을 곱합니다
>
> 0.0 <= Math.random() \* 10 < 10.0
>
> (2) 각 변을 int로 형변환 합니다
>
> 0 <= (int)Math.random() \*10 <10
>
> (3) 각 변에 1을 더합니다
>
> 1 <= (int)Math.random() \*10 +1 < 11

이렇게 되면 원하는 대로 1부터 10까지의 정수가 반환됩니다.

만약 n까지의 정수를 구하려면 n을 곱하면 됩니다.

자바 식으로 세우자면,

> double rand = Math.random();
>
> rand = rand \* 10;
>
> int num = (int)rand;
>
> num++;
>
> 간단히 줄여보면
>
> int num= ((int)(Math.random() \* 10));
>
> num++;

이렇게 하면 작동하지 않을까요??ㅎㅎ

아직 테스트는 안해봤습니다

작동하는군요. ㅎㅎ

> import java.util.Random;

를 해야 합니다.

출처 : <http://aychoi.tistory.com/8>

여기가 가장 명쾌하더군요. ㅎㅎ
