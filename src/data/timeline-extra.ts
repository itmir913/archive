export type TimelineItemType = 'milestone' | 'project' | 'post';

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  type: TimelineItemType;
  url?: string;
}

export interface TimelineYear {
  year: number;
  chapter: 1 | 2 | 'gap';
  items: TimelineItem[];
}

export const timelineExtra: TimelineYear[] = [
  {
    year: 2022,
    chapter: 'gap',
    items: [
      {
        date: '2022',
        title: 'GitHub 중심으로 개발 활동 이전',
        description: '블로그 대신 GitHub에서 개인 프로젝트와 오픈소스 작업을 이어감.',
        type: 'milestone',
        url: 'https://github.com/itmir913',
      },
    ],
  },
  {
    year: 2023,
    chapter: 'gap',
    items: [],
  },
  {
    year: 2024,
    chapter: 'gap',
    items: [],
  },
  {
    year: 2025,
    chapter: 'gap',
    items: [
      {
        date: '2025',
        title: 'luminousky 브랜드 준비',
        description: '개인 브랜드 luminousky 구상 시작. Teacher Utility Kit 제작.',
        type: 'milestone',
      },
    ],
  },
  {
    year: 2026,
    chapter: 2,
    items: [
      {
        date: '2026-07',
        title: 'luminousky 아카이브 오픈',
        description: 'itmir 블로그 7년치 665개 포스트 아카이빙 완료 및 공개. Chapter 1 정식 보존.',
        type: 'milestone',
        url: 'https://luminousky.com/archive',
      },
      {
        date: '2026-07',
        title: 'luminousky.com 런칭',
        description: '개인 브랜드 사이트 luminousky.com 공개.',
        type: 'milestone',
        url: 'https://luminousky.com',
      },
    ],
  },
];
