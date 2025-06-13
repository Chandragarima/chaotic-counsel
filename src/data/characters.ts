
import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'wise-owl',
    name: 'Wise Owl',
    type: 'wise-owl',
    personality: 'Philosophical and thoughtful, offering deep wisdom and careful consideration',
    description: 'A mystical owl that sees through the veil of confusion with ancient wisdom and measured insights.',
    unlocked: true
  },
  {
    id: 'sassy-cat',
    name: 'Sassy Cat',
    type: 'sassy-cat',
    personality: 'Sharp-tongued but caring, delivers truth with wit and attitude',
    description: 'A confident feline with a sharp wit who tells it like it is, but always has your best interests at heart.',
    unlocked: true
  },
  {
    id: 'lazy-panda',
    name: 'Lazy Panda',
    type: 'lazy-panda',
    personality: 'Relaxed and zen-like, promotes balance and taking things slow',
    description: 'A chill panda who believes in the power of taking it easy and finding balance in all things. Unlocked at 2-day streak.',
    unlocked: false
  },
  {
    id: 'sneaky-snake',
    name: 'Sneaky Snake',
    type: 'sneaky-snake',
    personality: 'Cunning and strategic, excels at finding clever solutions',
    description: 'A clever serpent who sees all angles and helps you navigate complex situations with strategic thinking. Unlocked at 4-day streak.',
    unlocked: false
  },
  {
    id: 'people-pleaser-pup',
    name: 'People Pleaser Pup',
    type: 'people-pleaser-pup',
    personality: 'Enthusiastic and supportive, focuses on harmony and making everyone happy',
    description: 'An eager golden retriever who wants everyone to be happy and helps you find solutions that work for everyone. Unlocked at 7-day streak.',
    unlocked: false
  }
];
