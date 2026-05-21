function normalizeKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

/** Slug do arquivo em /public/teams/{slug}.png */
const TEAM_SLUGS: Record<string, string> = {
  psg: "psg",
  "paris saint-germain": "psg",
  "paris saint germain": "psg",
  "real madrid": "real-madrid",
  "bayern de munique": "bayern",
  "bayern munich": "bayern",
  "bayern munique": "bayern",
  arsenal: "arsenal",
  "manchester city": "manchester-city",
  "man city": "manchester-city",
  chelsea: "chelsea",
  barcelona: "barcelona",
  "fc barcelona": "barcelona",
  liverpool: "liverpool",
  "inter de milao": "inter",
  "inter de milão": "inter",
  "inter milan": "inter",
  internazionale: "inter",
  "atletico de madrid": "atletico-madrid",
  "atletico de madri": "atletico-madrid",
  "atletico madrid": "atletico-madrid",
};

/** Proporção de exibição por slug (escudos largos precisam de mais largura) */
const LOGO_DISPLAY: Partial<Record<string, { width: number; height: number }>> = {
  barcelona: { width: 76, height: 52 },
};

export interface TeamLogo {
  src: string;
  width: number;
  height: number;
}

export function getTeamLogo(teamName: string, baseSize = 48): TeamLogo | null {
  const slug = TEAM_SLUGS[normalizeKey(teamName)];
  if (!slug) return null;

  const custom = LOGO_DISPLAY[slug];
  if (custom) {
    return { src: `/teams/${slug}.png`, ...custom };
  }

  return {
    src: `/teams/${slug}.png`,
    width: baseSize,
    height: baseSize,
  };
}

/** @deprecated Use getTeamLogo */
export function getTeamImageSrc(teamName: string): string | null {
  return getTeamLogo(teamName)?.src ?? null;
}
