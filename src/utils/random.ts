/** Deterministic pseudo-random number in [0, 1) for a given seed. */
export function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}