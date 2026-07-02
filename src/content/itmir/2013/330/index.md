---
title: "값을 반환하는 메소드"
date: "2013-09-07T12:20:18+09:00"
category: "Programming/Java"
tags: []
description: "이번에는 값을 반환하는 메소드에 대해 알아보도록 할까 합니다."
draft: false
original_url: "https://itmir.tistory.com/330"
---

안녕하세요~ 오랜만이네요~

이번에는 값을 반환하는 메소드에 대해 알아보도록 할까 합니다.

값을 반환한다... 무슨뜻일까요?

주로 계산 작업, 확인의 기능을 수행하는 메소드를 분리할 때, 그리고 그 기능이 자주 쓰일.때 우리는 메소드로 분리를 합니다.

우리는 메소드를 실행하는 방법을 이미 배웠는데요.

메소드를 실행할때 값을 전달해 주면, 실행된 메소드가 값을 리턴하는 경우가 상당히 많이 쓰입니다.

한번 알아볼까요?

```java
class Return{
	public static void main(String[] args){
		int values = Add(1, 3);
		System.out.println("1+3="+values);
	}
	
	public static int Add(int num1, int num2){
		int result = num1+num2;
		return result;
	}
}
```

[Return.java

다운로드](./file/Return.java)

이런 예제가 있습니다.

(이번 강좌부터는 소스의 가독성을 높이기 위한 방법이 들어가 있습니다. ㅎㅎ

원본 티스토리글에서 확인이 가능합니다(네이버는 자바 스크립트를 허용하지 않으므로...))

2번째줄의 void는 어떤의미일까요?

void란?, 아무것도 반환하지 않겠다. 라는 뜻입니다.

그렇다면 7번째줄의 int는 예상을 해보면,

int형 자료를 반환하겠다 라는 뜻이 되겠지요??

이처럼 메소드의 이름 바로 왼쪽에는 그 메소드의 반환형이 들어가게 됩니다.

> void(아무것도 반환하지 않음), double(double형 자료를 반환), int(int형 자료를 반환), boolean(논리값 T또는 F을 반환함)

위 처럼 들어갈 수 있다는 점 꼭 알아두세요~

이 외에도 조금 더 배우신다면 다양한 내용, 심지어 class까지도 던질(반환)수 있습니다!

---

## 첨부파일

- [Return.java](./files/Return.java)
