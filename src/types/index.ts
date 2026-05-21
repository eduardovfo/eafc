export interface DrawPair {
  player: string;
  team: string;
}

export interface PersistedLists {
  teams: string;
  players: string;
}

export type Theme = "light" | "dark";
