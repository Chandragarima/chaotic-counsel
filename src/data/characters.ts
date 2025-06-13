
import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'wise-owl',
    name: 'Wise Owl',
    type: 'wise-owl',
    personality: 'Philosophical and thoughtful, offering deep wisdom and careful consideration',
    description: 'Sees the bigger picture with ancient wisdom',
    unlocked: true
  },
  {
    id: 'sassy-cat',
    name: 'Sassy Cat',
    type: 'sassy-cat',
    personality: 'Sharp-tongued but caring, delivers truth with wit and attitude',
    description: 'Tells it like it is with feline sass',
    unlocked: true
  },
  {
    id: 'lazy-panda',
    name: 'Lazy Panda',
    type: 'lazy-panda',
    personality: 'Relaxed and zen-like, promotes balance and taking things slow',
    description: 'Takes life one bamboo shoot at a time',
    unlocked: false
  },
  {
    id: 'sneaky-snake',
    name: 'Sneaky Snake',
    type: 'sneaky-snake',
    personality: 'Cunning and strategic, excels at finding clever solutions',
    description: 'Slithers through problems with cunning',
    unlocked: false
  },
  {
    id: 'people-pleaser-pup',
    name: 'People Pleaser Pup',
    type: 'people-pleaser-pup',
    personality: 'Enthusiastic and supportive, focuses on harmony and making everyone happy',
    description: 'Wants everyone to be happy and get along',
    unlocked: false
  }
];
