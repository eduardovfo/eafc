import type { DrawPair } from "@/types";

export function formatCopyText(pairs: DrawPair[]): string {
  return pairs.map((p) => `${p.player} - ${p.team}`).join("\n");
}
