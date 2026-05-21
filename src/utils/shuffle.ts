/** Índice aleatório uniforme em [0, max) usando Web Crypto API */
function randomIndex(max: number): number {
  if (max <= 1) return 0;

  const range = 0x1_0000_0000;
  const limit = range - (range % max);
  const buffer = new Uint32Array(1);

  do {
    crypto.getRandomValues(buffer);
  } while (buffer[0] >= limit);

  return buffer[0] % max;
}

/** Embaralhamento Fisher-Yates com aleatoriedade criptográfica */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
