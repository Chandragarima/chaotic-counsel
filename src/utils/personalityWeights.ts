
import { Character } from '../types';

// Personality-specific probability weights for yes/no/maybe responses
export const PERSONALITY_WEIGHTS: Record<Character['type'], { yes: number; no: number; maybe: number }> = {
  'people-pleaser-pup': { yes: 70, no: 15, maybe: 15 },
  'wise-owl': { yes: 45, no: 45, maybe: 10 },
  'lazy-panda': { yes: 20, no: 15, maybe: 65 },
  'sassy-cat': { yes: 25, no: 50, maybe: 25 },
  'sneaky-snake': { yes: 35, no: 45, maybe: 20 }
};
