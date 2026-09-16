export type Project = {
  /** 포스트 페이지와 검색 메타에 사용하는 정식 표시 이름 */
  name: string;
  /** 필터 버튼과 좁은 화면에 사용하는 한국어 별칭 */
  alias: string;
};

export const PROJECTS: Record<string, Project> = {
  'log': { name: 'Dev Log', alias: '개발 일지' },
  'cs-education': { name: 'CS Education', alias: '정보 교과' },
  'teacher-utility-kit': { name: 'Utility Kit', alias: '교사 도구' },
  'school-record-app': { name: 'Record Editor', alias: '생기부 에디터' },
  'principal-candidate-manager': { name: 'PCM', alias: '학교장추천' },
  'gfpc': { name: 'GFPC', alias: 'GFPC 대회' },
  'ml-playgrounds': { name: 'ML Playgrounds', alias: 'ML 플레이그라운드' },
};

/** 정식 표시 이름. 등록되지 않은 slug는 fallback을 거쳐 slug 자체를 반환한다. */
export function projectName(slug: string, fallback?: string): string {
  return PROJECTS[slug]?.name ?? fallback ?? slug;
}

/** 한국어 별칭. 별칭이 없으면 정식 이름으로 대체한다. */
export function projectAlias(slug: string, fallback?: string): string {
  return PROJECTS[slug]?.alias ?? projectName(slug, fallback);
}
