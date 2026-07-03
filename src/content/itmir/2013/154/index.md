---
title: "Aroma Installer의 메뉴박스 터치 (비)활성화 방법"
date: "2013-02-21T17:06:39+09:00"
category: "SmartPhone/Android"
tags: []
description: "먼저 이 글은 아로마 인스톨러를 사용하는 롬 개발자 분들을 위한 글 입니다"
draft: false
original_url: "https://itmir.tistory.com/154"
---

먼저 이 글은 아로마 인스톨러를 사용하는 롬 개발자 분들을 위한 글 입니다

이해가 어려울수 있으나 지극히 정상입니다

또한 제가 알기로는 이 방법은 어떤 롬에도 쓰이지 않은 오로지 제 아이디어 이며 이렇게 값을 변경하는 방법은 제가 최초라고 생각됩니다

아마 아로마 인스톨러의 **극한 응용 방법**이 아닐까 생각되는군요..

그럼 (비)활성화 방법을 살펴보겠습니다

제가 전에 정말 좋은 아로마 인스톨러 응용법을 생각해 냈습니다

메뉴박스에서 메뉴를 선택할때 그 메뉴가 비활성화 되어 있으면 활성화를 하고 활성화 안내 알림을 띄우고, 만약 활성화가 되어있었다면 비활성화하고 비활성화 안내 알림을 띄우는 방식입니다

구조를 나타내면 아래와 같습니다

![](./images/구조.png)

|  |
| --- |
|  |

그래서 이방법을 구현하기 위해 재미있는 방식을 하나 만들게 되었습니다

쉘스크립트의 도움과 if ~ else구문의 도움을 받았습니다

그럼 본격적으로 시작하겠습니다

먼저 sh를 받아야 합니다

[FileName\_Change\_0.sh](./files/FileName_Change_0.sh)

[FileName\_Change\_1.sh](./files/FileName_Change_1.sh)

[FileName\_Start.sh](./files/FileName_Start.sh)

파일 설명을 하자면 FileName\_Start.sh파일은 아로마 인스톨러가 시작할때 실행되어야 하는 파일입니다

FileName\_Change\_1.sh파일은 값을 0에서 1으로 변경해 주는 스크립트 이며

마지막으로 FileName\_Change\_0.sh파일은 0.sh와 반대로 값을 1에서 0으로 바꿔주는 스크립트 입니다.

이제 이 스크립트를 사용하여 어떻게 이방법을 구현할수 있는지 살펴보도록 하겠습니다

먼저 스크립트의 내용을 확인해 보도록 하겠습니다

(각 스크립트 안에는 주석으로 설명해 두었습니다)

1. FileName\_Start.sh

##

# If the file does not have, Script will make tmp file

if [ ! -s /tmp/aroma/FileName.prop ]; then

# Make a tmp file

touch /tmp/aroma/FileName.prop

# Write tmp file "selected.1=0"

echo "selected.1=0" > /tmp/aroma/FileName.prop

fi

#-- End Script

위 코드를 보면 스크립트를 아시는 분은 모두 아실겁니다

/tmp/aroma/FileName.prop가 없을경우 파일을 생성하고 비활성화 코드인 selected.1=0을 넣어줍니다

2. FileName\_Change\_1.sh

##

# Script Will change File name.prop

if [ -s /tmp/aroma/FileName.prop ]; then

cd /tmp/aroma

cp FileName.prop FileName.prop.bak

# change "selected.1=0" into "selected.1=1"

busybox sed -e 's/selected.1=\*/selected.1=1\n#/g' FileName.prop.bak > FileName.prop

fi

#-- End Script

처음 Start.sh가 실행되어서 비활성화 되어있는 상태입니다

그러므로 값은 selected.1=0이 들어가 있습니다

이 스크립트로 값을 0에서 1로 바꿔주는 역활을 하게 됩니다

그래서 Change\_1.sh가 실행되게 되면 "활성화"가 되는것이지요

3. FileName\_Change\_0.sh

##

# Script Will change File name.prop

if [ -s /tmp/aroma/FileName.prop ]; then

cd /tmp/aroma

cp FileName.prop FileName.prop.bak

# change "selected.1=1" into "selected.1=0"

busybox sed -e 's/selected.1=\*/selected.1=0\n#/g' FileName.prop.bak > FileName.prop

fi

#-- End Script

마지막으로 selected=1을 0으로 비활성화 하는 스크립트 입니다

Change\_1스크립트가 실행되면 값이 1로 변하며 활성화가 됩니다

그리고 다시 터치하게 되면 이 스크립트가 실행되면서 값이 0으로 변하고 "비활성화"가 되는거죠

이제 스크립트의 설명은 끝났습니다

FileName.sh의 이름은 마음대로 변경 하셔도 됩니다

또한 /tmp/aroma/Filename.prop도 사용할 이름을 변경하시면 됩니다

그럼 스크립트를 aroma-config에서 실행하면 끝나게 됩니다

aroma-config의 첫 부분에 아래 구문을 넣어주세요

setvar(

    "resexec\_retstatus",

    resexec("sh/FileName\_Start.sh")

);

위 구문은 아로마 인스톨러 원문에도 있던 구문입니다

아로마 인스톨러에서 쉘 스크립트를 실행시키는 방법이 위 문구말고는 없는것 같더라고요..

꼭 ~box(textbox, menubox)전, intset 바로 아래 등에 넣어줘야 합니다

config가운데 넣으시면 값이 다시 초기화 될수 있습니다

참고 - setvar에 대해

참고로 setvar은 시스탬 정보등을 파악할때 사용하는 스크립트 입니다

위 코드의 resexec\_retstatus은 sh를 실행시킨다음 그곳에 저장하라는 뜻의 코드입니다 (지우지 마세요 ㅋ)

아무튼 위 코드를 ini\_set 코드 아래쯤 넣어주시면 아로마 인스톨러가 처음 시작할때 자동으로 실행됩니다

그러면서 아로마 인스톨러의 작업폴더인 /tmp/aroma에 FileName.prop가 들어가게 되며 자동으로 비활성화 코드가 들어가게 됩니다

이제 메뉴 박스를 만들어 주신다음 if절로 메뉴가 선택되면 아래 구문이 실행되도록 만들어 주세요

if  (prop("FileName.prop","selected.1")=="0") then

    setvar(

        "Adfree\_enable",

        resexec("sh/FileName\_Change\_1.sh")

    );

    alert("알림","FileName를 활성화 했습니다 - 현재 상태:활성화", "@info");

else

    setvar(

        "Adfree\_disable",

        resexec("sh/FileName\_Change\_0.sh")

    );

    alert("알림","FileName를 비활성화 했습니다 - 현재 상태:비활성화", "@info");

endif;

위 구문을 넣어 주시면 됩니다

다중 if를 사용해서 구현해야 합니다

메뉴가 선택될경우 위 파란 상자안 구문이 실행될수 있도록 말이죠

약간 해석하자면 처음에 Start.sh를 실행해서 현재 값이 0입니다

if절의 처음을 보면 FileName.prop의 값이 selected.1=0이라면 Change\_1.sh를 실행해서 값을 1로 바꾼다음 활성화 하고

값이 1이라면(값이 0이 아니라면) Change\_0.sh를 실행해서 값을 0으로 바꾼다음 비활성화 하는 구조입니다

처음부분에서 0으로 만들고 사용자가 터치를 한번 하면 1로 바뀌게 되며 또다시 터치를 하게 되면 0으로 바꾸는 방식이 되죠

이렇게 aroma-config에 들어갈 내용이 마쳐졌습니다

update(r)-script에는 평소처럼 작업하시면 됩니다

위와 같은 방법으로 메뉴박스 터치시 (비)활성화 방법을 알아봤습니다

아로마 인스톨러의 극한의 응용 방법이라 생각되는군요 ㅋ

이 방법은 제 아이디어로 만들어낸것이며 어떠한 분도 사용한것을 확인하지 못했습니다

그러므르 제가 최초 개발자(?)가 되는건가요?ㅋㅋㅋ

아마 위 내용을 한번에 이해하기는 아주 힘들겁니다

이해하기 힘든 부분이 있다면 덧글로 알려주시면 알려드리겠습니다 ㅎ

ps. 쉘 스크립트 파일 3개를 한 sh파일에 담아내었습니다만 뭔가 오작동 되는군요

파일은 완성되었는대.. grep를 사용해서 하는 방법도 있습니다 이방법을 사용하면 sh한 파일로 모든것이 해결되지요..

나중에 100%완성하겠습니다 ㅋ

  

#AROMA #아로마 인스톨러 #아로마 인스톨러 응용 #aroma installer #aroma-config #aroma-ins #aroma-install #/tmp/aroma #비활성화 #메뉴박스

---

## 첨부파일

- [FileName_Change_0.sh](./files/FileName_Change_0.sh)
- [FileName_Change_1.sh](./files/FileName_Change_1.sh)
- [FileName_Start.sh](./files/FileName_Start.sh)
