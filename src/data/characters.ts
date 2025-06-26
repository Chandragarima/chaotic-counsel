
import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'sassy-cat',
    name: 'Sassy Cat',
    type: 'sassy-cat',
    personality: 'Drama queen answers only',
    description: 'Sarcastic, bold, and obviously always right (just ask her)',
    unlocked: true, // Always unlocked
    image: 'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750980091/3e3b0145-32d2-4801-b3ac-c7d5af5e5653_r4i77o.png'
  },
  {
    id: 'wise-owl',
    name: 'Wise Owl',
    type: 'wise-owl',
    personality: 'Ancient, analytical, and prudent',
    description: 'Thoughtful guidance with a scholarly tone and hooting wisdom',
    unlocked: true, // Always unlocked
    image: 'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750980090/2cfc8411-76b1-445c-9423-8a2df38f3788_doyq7f.jpg'
  },
  
  {
    id: 'lazy-panda',
    name: 'Lazy Panda',
    type: 'lazy-panda',
    personality: 'Relaxed and easygoing',
    description: 'Cozy, low-effort suggestions delivered with snack-loving calm',
    unlocked: false, // Unlocked at 2-day streak
    image: 'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750980090/f6581916-a5a9-4852-9ef1-172b37caec2f_qwor44.jpg'
  },
  {
    id: 'sneaky-snake',
    name: 'Sneaky Snake',
    type: 'sneaky-snake',
    personality: 'Cunning and strategic',
    description: 'Sharp advice wrapped in charmingly calculated hisssstory',
    unlocked: false, // Unlocked at 4-day streak
    image: 'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750980091/sneaky-snake_iezs8p.png'
  },
  {
    id: 'people-pleaser-pup',
    name: 'People-Pleaser Pup',
    type: 'people-pleaser-pup',
    personality: 'Cheerful and encouraging',
    description: 'Tail-wagging support and sweet validation to boost the mood',
    unlocked: false, // Unlocked at 7-day streak
    image: 'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750980090/pleaser-pup_rixyfj.png'
  }
];
