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
    description: 'Built hands-on Linux and virtualization experience — VMware on AMD hardware, a self-hosted NAS, and virtual machines running on an iPad.',
    keywords: ['Linux', 'Ubuntu', 'VMware', 'Virtualization', 'NAS', 'Server', 'iPad'],
    posts: [
      { title: 'AMD Ryzen CPU로 VMWare에서 Mac OS 설치하기', href: '/itmir/2020/676/' },
      { title: 'UTM iOS Virtual Machines 앱으로 iPad에 윈도우, 맥 설치하기', href: '/itmir/2020/684/' },
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
    title: 'Android Apps, Libraries & Reverse Engineering',
    description: 'Shifted from ROM porting to building apps and libraries from scratch — patched the CYTTSP_Gen3 touch driver to add Slide2Wake, built the meal-parsing library behind the school apps, cracked InApp Billing DRM, and wrote an SMS-controlled remote shell.',
    keywords: ['Android', 'Java', 'Kernel', 'Library', 'Reverse Engineering', 'DRM'],
    posts: [
      { title: 'Slide2Wake for CYTTSP_Gen3(베가 레이서, 미라크A) 패치파일', href: '/itmir/2014/naver-1/' },
      { title: 'Android Meal Library - 학교 급식 파싱 라이브러리', href: '/itmir/2014/486/' },
      { title: '인앱결제(Inapp Billing)와 언락커(Unlocker) 크랙하기 (DRM Crack)', href: '/itmir/2014/489/' },
      { title: 'SMS로 원격 제어하기 예제 (내 폰과의 대화 예제)', href: '/itmir/2014/547/' },
    ],
  },
  {
    year: '2013',
    title: 'ROM Porting, Kernel Hacking & First Apps',
    description: 'Shipped the first CyanogenMod for Mirach A, hacked the VegaRacer2 kernel to extend multitouch to 10 points, open-sourced the ROM work, and launched the first Android app on Google Play.',
    keywords: ['Android', 'CyanogenMod', 'Kernel', 'ROM', 'Java', 'Play Store'],
    posts: [
      { title: '★미라크a CM7부팅 성공★', href: '/itmir/2013/21/' },
      { title: 'VegaRacer2 커널 수정으로 멀티터치 최대 10점으로 상향 성공', href: '/itmir/2013/naver-2/' },
      { title: 'Easy_Root_for_VegaRacer2 [한번의 재부팅으로 루팅이 가능합니다]', href: '/itmir/2013/205/' },
      { title: 'CM7 소스 오픈소스화', href: '/itmir/2013/360/' },
      { title: '하루에 어플을 실행할 횟수를 정하자! — 세번만 (BETA)', href: '/itmir/2013/383/' },
    ],
  },
  {
    year: '2012',
    title: 'First ROM & Kernel',
    description: 'Released the first official MIR ROM, compiled a custom kernel from source, and pushed everything to GitHub — the beginning of the whole journey.',
    keywords: ['Android', 'Kernel', 'ROM', 'CyanogenMod', 'GitHub'],
    posts: [
      { title: 'MIR ROM 정식버전 for KT-A750K', href: '/itmir/2012/3/' },
      { title: '2012-08-18 순정 커널 빌드 성공!', href: '/itmir/2012/70/' },
      { title: 'itmir913 on GitHub — Oct 2012', href: 'https://github.com/itmir913?tab=overview&from=2012-10-01&to=2012-10-31', external: true },
    ],
  },
];
