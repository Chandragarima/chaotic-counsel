
import { Character } from '../types';
import { PERSONALITY_WEIGHTS } from './personalityWeights';

// Improved random selection to avoid patterns
export const getRandomChoice = <T extends any>(array: readonly T[]): T => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return array[randomArray[0] % array.length];
  }
  const entropy = Date.now() % 1000 + Math.random() * 1000;
  return array[Math.floor(entropy) % array.length];
};

export const getWeightedResponse = (characterType: Character['type']): 'yes' | 'no' | 'maybe' => {
  const weights = PERSONALITY_WEIGHTS[characterType];
  
  let random: number;
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const randomArray = new Uint32Array(2);
    window.crypto.getRandomValues(randomArray);
    random = ((randomArray[0] * randomArray[1]) % 10000) / 100;
  } else {
    const timeEntropy = (Date.now() % 10000) / 100;
    const mathRandom1 = Math.random() * 100;
    const mathRandom2 = Math.random() * 100;
    const performanceEntropy = typeof performance !== 'undefined' ? (performance.now() % 100) : 0;
    
    random = (timeEntropy + mathRandom1 + mathRandom2 + performanceEntropy) % 100;
  }
  
  if (random < weights.yes) {
    return 'yes';
  } else if (random < weights.yes + weights.no) {
    return 'no';
  } else {
    return 'maybe';
  }
};
