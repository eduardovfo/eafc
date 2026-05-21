import type { TeamBadgeStyle } from "@/types/teamBadge";

/** Cores inspiradas nas identidades visuais, sem logos oficiais. */
const KNOWN_TEAMS: Record<string, TeamBadgeStyle> = {
  psg: {
    initials: "PSG",
    primary: "#004170",
    secondary: "#DA291C",
    accent: "#D4AF37",
    textColor: "#FFFFFF",
    variant: "psg-circle",
  },
  "paris saint-germain": {
    initials: "PSG",
    primary: "#004170",
    secondary: "#DA291C",
    accent: "#D4AF37",
    textColor: "#FFFFFF",
    variant: "psg-circle",
  },
  "paris saint germain": {
    initials: "PSG",
    primary: "#004170",
    secondary: "#DA291C",
    accent: "#D4AF37",
    textColor: "#FFFFFF",
    variant: "psg-circle",
  },
  "real madrid": {
    initials: "RM",
    primary: "#FFFFFF",
    secondary: "#C9A227",
    accent: "#1E3A8A",
    textColor: "#B8860B",
    variant: "crown-circle",
  },
  "bayern de munique": {
    initials: "BAY",
    primary: "#DC052D",
    secondary: "#0066B3",
    textColor: "#FFFFFF",
  },
  arsenal: {
    initials: "ARS",
    primary: "#EF0107",
    secondary: "#FFFFFF",
    textColor: "#FFFFFF",
  },
  "manchester city": {
    initials: "MCI",
    primary: "#6CABDD",
    secondary: "#1C2C5B",
    textColor: "#FFFFFF",
  },
  chelsea: {
    initials: "CHE",
    primary: "#034694",
    secondary: "#FFFFFF",
    textColor: "#FFFFFF",
  },
  barcelona: {
    initials: "BAR",
    primary: "#A50044",
    secondary: "#004D98",
    textColor: "#FFFFFF",
  },
  liverpool: {
    initials: "LIV",
    primary: "#C8102E",
    secondary: "#F6EB61",
    textColor: "#FFFFFF",
  },
  "inter de milao": {
    initials: "INT",
    primary: "#010E80",
    secondary: "#000000",
    textColor: "#FFFFFF",
  },
  "inter de milão": {
    initials: "INT",
    primary: "#010E80",
    secondary: "#000000",
    textColor: "#FFFFFF",
  },
  "atletico de madrid": {
    initials: "ATM",
    primary: "#E31837",
    secondary: "#FFFFFF",
    accent: "#1A237E",
    textColor: "#FFFFFF",
    variant: "striped-shield",
  },
  "atlético de madrid": {
    initials: "ATM",
    primary: "#E31837",
    secondary: "#FFFFFF",
    accent: "#1A237E",
    textColor: "#FFFFFF",
    variant: "striped-shield",
  },
  "atletico de madri": {
    initials: "ATM",
    primary: "#E31837",
    secondary: "#FFFFFF",
    accent: "#1A237E",
    textColor: "#FFFFFF",
    variant: "striped-shield",
  },
};

function normalizeKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function getTeamBadgeStyle(teamName: string): TeamBadgeStyle {
  const key = normalizeKey(teamName);
  const known = KNOWN_TEAMS[key];
  if (known) return known;
  return buildGenericStyle(teamName);
}

function buildGenericStyle(teamName: string): TeamBadgeStyle {
  const words = teamName.trim().split(/\s+/).filter(Boolean);
  let initials: string;

  if (words.length >= 2) {
    initials = words
      .slice(0, 3)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  } else {
    initials = (words[0] ?? "?").slice(0, 3).toUpperCase();
  }

  const primary = hashToColor(teamName);

  return {
    initials,
    primary,
    secondary: adjustBrightness(primary, -18),
    textColor: "#FFFFFF",
  };
}

function hashToColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 55% 42%)`;
}

function adjustBrightness(hsl: string, amount: number): string {
  const match = hsl.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
  if (!match) return hsl;
  const l = Math.max(20, Math.min(70, Number(match[3]) + amount));
  return `hsl(${match[1]} ${match[2]}% ${l}%)`;
}
