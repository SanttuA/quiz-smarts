export type RandomSource = () => number

export function createSeededRandom(seed: string): RandomSource {
  let hash = 2166136261
  for (const character of seed) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }

  return () => {
    hash += 0x6d2b79f5
    let value = hash
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

export function getAttemptRandom(): RandomSource {
  const testSeed = import.meta.env.VITE_E2E_SEED
  return testSeed ? createSeededRandom(testSeed) : Math.random
}
