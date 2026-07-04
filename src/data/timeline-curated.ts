export interface TimelinePost {
  title: string;
  href: string;
  external?: boolean;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  keywords: string[];
  posts: TimelinePost[];
}

export const timeline: TimelineEntry[] = [
  {
    year: '2026',
    title: 'luminousky',
    description: 'Archived 7 years of ITMir posts and launched Teacher Utility Kit under the luminousky brand.',
    keywords: ['Archive', 'Education', 'Tool'],
    posts: [
      { title: 'luminousky Archive', href: 'https://luminousky.com/archive', external: true },
      { title: 'Teacher Utility Kit', href: 'https://luminousky.com/teacher-utility-kit/', external: true },
    ],
  },
  {
    year: '2024',
    title: 'CS Education & Contest Tools',
    description: 'Built classroom tooling for CS education — a problem set converter for running school programming contests with an online judge.',
    keywords: ['Python', 'OnlineJudge', 'DOMjudge', 'Contest', 'Education'],
    posts: [
      { title: 'FPSConverter', href: 'https://github.com/itmir913/FPSConverter', external: true },
    ],
  },
  {
    year: '2022',
    title: 'Competitive Programming',
    description: 'Applied the data structure and algorithm fundamentals from C studies to solving Baekjoon problems in Python.',
    keywords: ['Python', 'Algorithm', 'Data Structure', 'Baekjoon'],
    posts: [
      { title: 'Study-Programming', href: 'https://github.com/itmir913/Study-Programming', external: true },
    ],
  },
  {
    year: '2021',
    title: 'C and Computer Science',
    description: 'Studied C, data structures, and algorithms from scratch — a deliberate reset to first principles.',
    keywords: ['C', 'Computer Science', 'Data Structure', 'Algorithm'],
    posts: [
      { title: 'Linux Shell이란 무엇인가?', href: '/itmir/2021/688/' },
      { title: '[자료구조] #1 재귀호출', href: '/itmir/2021/689/' },
      { title: '[C] printf로 *(별) 피라미드 출력하기', href: '/itmir/2021/691/' },
    ],
  },
  {
    year: '2020–2021',
    title: 'Linux, Virtualization & Home Server',
    description: 'Built hands-on Linux and virtualization experience — VMware on AMD hardware, Ubuntu server administration, and a self-hosted NAS.',
    keywords: ['Linux', 'Ubuntu', 'VMware', 'Virtualization', 'NAS', 'Server'],
    posts: [
      { title: 'AMD Ryzen CPU로 VMWare에서 Mac OS 설치하기', href: '/itmir/2020/676/' },
      { title: 'XPEnology NAS (헤놀로지 나스) 구축기', href: '/itmir/2021/685/' },
    ],
  },
  {
    year: '2015',
    title: 'Software for Others',
    description: 'Rebuilt a school app with Material Design and shipped multiple apps — meal info, grade reports — to real users.',
    keywords: ['Android', 'Java', 'Material Design', 'Education'],
    posts: [
      { title: '학교앱을 Material 디자인으로 새로 만들고 있습니다', href: '/itmir/2015/563/' },
      { title: '학교앱 Material Design 적용 완료', href: '/itmir/2015/564/' },
      { title: '성적표 앱을 출시했습니다.', href: '/itmir/2015/601/' },
    ],
  },
  {
    year: '2014',
    title: 'Android Apps and Libraries',
    description: 'Shifted from ROM porting to writing apps and libraries from scratch — including AOSP builds, a published crypto API, and the meal-parsing library that became the foundation for the school apps.',
    keywords: ['Android', 'Java', 'Library', 'AOSP', 'API'],
    posts: [
      { title: 'AOSP 소스를 받고 빌드해보자', href: '/itmir/2014/450/' },
      { title: 'Xor 암호화 라이브러리 다운로드/API 가이드', href: '/itmir/2014/431/' },
      { title: 'Android Meal Library - 학교 급식 파싱 라이브러리', href: '/itmir/2014/486/' },
    ],
  },
  {
    year: '2013',
    title: 'ROM Porting and First Code',
    description: 'Built CyanogenMod from source for the first time, and started learning Java.',
    keywords: ['Android', 'CyanogenMod', 'ROM', 'Java', 'Build'],
    posts: [
      { title: '나도 CM7 포팅해 보자 — 디바이스 소스와 벤더를 짜자', href: '/itmir/2013/107/' },
      { title: '★미라크a CM7부팅 성공★', href: '/itmir/2013/21/' },
      { title: 'ClockWorkMod Recovery for Mirach A', href: '/itmir/2013/8/' },
    ],
  },
  {
    year: '2012',
    title: 'Android Kernel',
    description: 'Began analyzing and modifying Android ROM internals — first look under the hood of a smartphone.',
    keywords: ['Android', 'Kernel', 'ROM'],
    posts: [
      { title: 'Mir Rom Apple — stable for IM-750K (미라크a)', href: '/itmir/2012/6/' },
      { title: '커널 컴파일을 위한 기본 환경 구축 스크립트', href: '/itmir/2012/52/' },
    ],
  },
];
