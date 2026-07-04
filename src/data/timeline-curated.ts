export interface TimelinePost {
  title: string;
  href: string;  // /itmir/{year}/{num}/ 또는 외부 URL
  external?: boolean;
}

export interface TimelineEntry {
  year: string;           // "2012", "2017–2019" 등
  title: string;
  description: string;
  whatChanged: string;
  keywords: string[];
  posts: TimelinePost[];
}

export const timeline: TimelineEntry[] = [
  {
    year: '2026',
    title: 'luminousky',
    description:
      'ITMir에 남긴 7년치 기록을 아카이빙하고, 교사를 위한 실용 도구 Teacher Utility Kit을 만들었다. 개인 브랜드 luminousky로 공개 활동을 재시작했다.',
    whatChanged:
      '기록을 축적하는 것에서, 기록에 의미를 부여하고 공개하는 것으로.',
    keywords: ['luminousky', 'Archive', 'Education', 'Tool'],
    posts: [
      { title: 'luminousky Archive', href: 'https://luminousky.com/archive', external: true },
      { title: 'Teacher Utility Kit', href: 'https://luminousky.com/teacher-utility-kit/', external: true },
    ],
  },
  {
    year: '2021',
    title: 'C와 컴퓨터 과학',
    description:
      '9년 가까이 Android와 앱 생태계 위에서 작업하다가, C 언어와 자료구조로 내려갔다. 언어와 프레임워크 아래에 있는 것을 이해하려는 시도였다.',
    whatChanged:
      '편리한 도구를 쓰는 것에서, 그 도구가 어떻게 작동하는지 이해하는 것으로.',
    keywords: ['C', 'Computer Science', 'Data Structure', 'Algorithm'],
    posts: [
      { title: '[자료구조] #1 재귀호출', href: '/itmir/2021/689/' },
      { title: '[C] printf로 *(별) 피라미드 출력하기', href: '/itmir/2021/691/' },
      { title: 'Linux Shell이란 무엇인가?', href: '/itmir/2021/688/' },
    ],
  },
  {
    year: '2017–2019',
    title: 'Linux와 시스템',
    description:
      '앱 개발에서 서버와 시스템 쪽으로 관심사가 확장됐다. Linux, 네트워크 구성, 가상화, NAS 서버를 직접 구성하고 운영했다.',
    whatChanged:
      '소프트웨어를 만드는 것에서, 소프트웨어가 실행되는 환경을 이해하고 설계하는 것으로.',
    keywords: ['Linux', 'Network', 'Virtualization', 'NAS', 'Server'],
    posts: [],
  },
  {
    year: '2015',
    title: '다른 사람을 위한 프로그램',
    description:
      '내가 쓰기 위한 코드에서, 실제 사용자가 있는 앱으로. 학교 현장에서 필요한 프로그램을 Material Design으로 새로 만들어 배포했다.',
    whatChanged:
      '기술을 배우는 단계에서, 기술로 실제 사람의 문제를 해결하는 단계로.',
    keywords: ['Android', 'Java', 'Material Design', 'App', 'Education'],
    posts: [
      { title: '학교앱을 Material 디자인으로 새로 만들고 있습니다', href: '/itmir/2015/563/' },
      { title: '학교앱 Material Design 적용 완료', href: '/itmir/2015/564/' },
    ],
  },
  {
    year: '2013',
    title: 'ROM 포팅과 프로그래밍의 시작',
    description:
      'Android 커널을 수정하는 것을 넘어, 운영체제 전체를 처음부터 빌드했다. 같은 시기에 Java를 배우며 프로그래밍을 시작했다.',
    whatChanged:
      '남이 만든 것을 분석하고 수정하는 것에서, 직접 빌드하고 만드는 것으로.',
    keywords: ['Android', 'CyanogenMod', 'ROM', 'Java', 'Build'],
    posts: [
      { title: '나도 CM7 포팅해 보자 — 디바이스 소스와 벤더를 짜자', href: '/itmir/2013/107/' },
      { title: 'CM7 포팅 시작 5일째 각종 로그를 뽑아보고 있다', href: '/itmir/2013/13/' },
    ],
  },
  {
    year: '2012',
    title: 'Android Kernel',
    description:
      '스마트폰을 사용하는 단계에서, 운영체제 내부 구조를 직접 분석하고 수정하는 단계로. Android ROM과 커널을 처음 건드렸다.',
    whatChanged:
      '소비자에서 분해자로. 기기 안에서 무슨 일이 일어나는지 직접 확인하기 시작했다.',
    keywords: ['Android', 'Kernel', 'ROM', 'Build'],
    posts: [
      { title: '부트/리커버리 파티션 찾기', href: '/itmir/2012/naver-2/' },
      { title: '베가레이서2 터치패널 커널 config 분석', href: '/itmir/2012/naver-5/' },
    ],
  },
];
