import type { DrawPair } from "@/types";
import { shuffle } from "@/utils/shuffle";

const MAX_RETRIES = 32;

function buildDraw(teams: string[], players: string[]): DrawPair[] {
  const shuffledTeams = shuffle(teams);
  const shuffledPlayers = shuffle(players);

  const pairs = shuffledPlayers.map((player, index) => ({
    player,
    team: shuffledTeams[index],
  }));

  return shuffle(pairs);
}

function sameDraw(a: DrawPair[], b: DrawPair[]): boolean {
  if (a.length !== b.length) return false;
  const key = (p: DrawPair) => `${p.player}\0${p.team}`;
  const setA = new Set(a.map(key));
  return b.every((p) => setA.has(key(p)));
}

/**
 * Sorteia 1 jogador para 1 time sem repetição.
 * Cada execução usa aleatoriedade criptográfica (crypto.getRandomValues).
 */
export function performDraw(
  teams: string[],
  players: string[],
  previous?: DrawPair[],
): DrawPair[] {
  if (!previous?.length) {
    return buildDraw(teams, players);
  }

  let result = buildDraw(teams, players);
  let attempts = 0;

  while (sameDraw(result, previous) && attempts < MAX_RETRIES) {
    result = buildDraw(teams, players);
    attempts++;
  }

  return result;
}
