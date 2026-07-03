---
title: "XDA에 누군가 CM7 SOURCE를 올려두었습니다"
date: "2012-12-14T16:07:25+09:00"
category: "Android/Build"
tags: []
description: "이 소스는 구버전 소스이고 java.mk오류가 나므로 본인이 직접 압축해서 배포중인 소스를 사용해주시면 감사드리겠습니다~"
draft: false
original_url: "https://itmir.tistory.com/42"
---

+추가

이 소스는 구버전 소스이고 java.mk오류가 나므로 본인이 직접 압축해서 배포중인 소스를 사용해주시면 감사드리겠습니다~

[2013/01/27 - [강좌/팁/Kernel/Build 강좌] - CM7소스를 배포합니다](/archive/itmir/2013/43)

요즈음 cm7소스를 받으면 재대로 받아지지 않아 make -j4 otatools를 하면 ace.mk부터 기기정보 파일이 없다고 나타나는대요

이것은 바로 언제부터인가 기기정보가 누락되어 받아지게되었는대

이것이 repo에서 완벽한 cm7소스로 인정하고 repo를 끝낸다고 합니다

그럼 완벽한 소스를 받아야 겠죠?

XDA에 어떤 위대하신 분이 올려두셨습니다

<http://forum.xda-developers.com/showthread.php?t=1883358>

분활 압축으로 총 7개 입니다

각각 200mb로 총 1.4GB정도 되는것 같더라고요

귀찮으신 분은 아래 링크를 눌러 미디어 파이어 링크로 가셔서 다운로드 하시면 됩니다

xda에 가입이 되어 있다면 감사덧글이라도 드리고 싶습니다 ㅎㅎ

그럼 저는 시험공부하러 갑니다 ㅃ

위 미디어 파이어

아래 미디어 파이어 직접다운(크롬에서 따옴)

Part_1: <http://www.mediafire.com/?vciuchgf258swzk>

<http://205.196.121.135/m2v15kmx44fg/vciuchgf258swzk/CM7_source_part_1>

Part_2: <http://www.mediafire.com/?e158vscc38bo8tr>

<http://205.196.123.204/23abm4mq28vg/e158vscc38bo8tr/CM7_source_part_2>

Part_3: <http://www.mediafire.com/?b8neb6lijkwa2a5>

<http://199.91.152.229/v4ntxfu3wrtg/b8neb6lijkwa2a5/CM7_source_part_3>

Part_4: <http://www.mediafire.com/?yhw9upr8kc7vnl2>

<http://205.196.123.22/7erkvxjc3csg/yhw9upr8kc7vnl2/CM7_source_part_4>

Part_5: <http://www.mediafire.com/?599lhdpl2eklalh>

<http://205.196.122.15/p1c61han3xtg/599lhdpl2eklalh/CM7_source_part_5>

Part_6: <http://www.mediafire.com/?k50ogkm5qmgg0zp>

<http://205.196.123.205/8ovnlhqmtp3g/k50ogkm5qmgg0zp/CM7_source_part_6>

Part_7: <http://www.mediafire.com/?3qk64tyykex54w4>

<http://205.196.122.24/2cc0asmmckbg/3qk64tyykex54w4/CM7_source_part_7>

한 폴더에 넣으신후

cat * > cm7.tar.gz

tar -xvf cm7.tar.gz