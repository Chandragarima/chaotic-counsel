
import { Character } from '../types';

export interface PersonalityTheme {
  id: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    glow: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  animations: {
    entrance: string;
    thinking: string;
    responding: string;
    floating: string;
    cardHover: string;
    buttonHover: string;
  };
  effects: {
    particles: string;
    backgroundPattern: string;
    borderStyle: string;
  };
  sounds: {
    select: string;
    thinking: string;
    response: string;
  };
}

export const personalityThemes: Record<string, PersonalityTheme> = {
  'sassy-cat': {
    id: 'sassy-cat',
    colors: {
      primary: 'from-pink-600 to-rose-500',
      secondary: 'from-pink-100/20 to-rose-100/20',
      accent: '#ec4899',
      background: 'from-slate-600/95 via-pink-800/15 to-slate-600/95',
      text: 'text-pink-50',
      glow: 'shadow-pink-400/30'
    },
    fonts: {
      heading: 'font-playfair font-medium tracking-wide',
      body: 'font-inter font-normal'
    },
    animations: {
      entrance: 'animate-sassy-entrance',
      thinking: 'animate-sassy-thinking',
      responding: 'animate-sassy-responding',
      floating: 'animate-sassy-float',
      cardHover: 'hover:animate-sassy-wiggle',
      buttonHover: 'hover:animate-sassy-bounce'
    },
    effects: {
      particles: '🐱✨',
      backgroundPattern: 'subtle-grid',
      borderStyle: 'border border-pink-400/30 rounded-lg'
    },
    sounds: {
      select: 'purr',
      thinking: 'soft-purr',
      response: 'content-purr'
    }
  },
  'wise-owl': {
    id: 'wise-owl',
    colors: {
      primary: 'from-amber-600 to-yellow-500',
      secondary: 'from-amber-100/20 to-orange-100/20',
      accent: '#f59e0b',
      background: 'from-slate-600/95 via-amber-800/15 to-slate-600/95',
      text: 'text-amber-50',
      glow: 'shadow-amber-400/30'
    },
    fonts: {
      heading: 'font-playfair font-medium tracking-wide',
      body: 'font-inter font-normal'
    },
    animations: {
      entrance: 'animate-wise-entrance',
      thinking: 'animate-wise-thinking',
      responding: 'animate-wise-responding',
      floating: 'animate-wise-float',
      cardHover: 'hover:animate-wise-glow',
      buttonHover: 'hover:animate-wise-pulse'
    },
    effects: {
      particles: '🌟✨🔮',
      backgroundPattern: 'mystical-dots',
      borderStyle: 'border border-amber-400/30 rounded-lg'
    },
    sounds: {
      select: 'owl-hoot',
      thinking: 'deep-hoot',
      response: 'wise-hoot'
    }
  },
  'lazy-panda': {
    id: 'lazy-panda',
    colors: {
      primary: 'from-emerald-600 to-green-500',
      secondary: 'from-green-100/20 to-emerald-100/20',
      accent: '#10b981',
      background: 'from-slate-600/95 via-green-800/15 to-slate-600/95',
      text: 'text-green-50',
      glow: 'shadow-emerald-400/30'
    },
    fonts: {
      heading: 'font-playfair font-normal tracking-normal',
      body: 'font-inter font-light'
    },
    animations: {
      entrance: 'animate-lazy-entrance',
      thinking: 'animate-lazy-thinking',
      responding: 'animate-lazy-responding',
      floating: 'animate-lazy-float',
      cardHover: 'hover:animate-lazy-sway',
      buttonHover: 'hover:animate-lazy-drift'
    },
    effects: {
      particles: '🍃💚🌿',
      backgroundPattern: 'zen-lines',
      borderStyle: 'border border-emerald-400/30 rounded-lg'
    },
    sounds: {
      select: 'soft-chuff',
      thinking: 'sleepy-breath',
      response: 'content-sigh'
    }
  },
  'anxious-bunny': {
    id: 'anxious-bunny',
    colors: {
      primary: 'from-orange-600 to-red-500',
      secondary: 'from-orange-100/20 to-red-100/20',
      accent: '#f97316',
      background: 'from-slate-600/95 via-orange-800/15 to-slate-600/95',
      text: 'text-orange-50',
      glow: 'shadow-orange-400/30'
    },
    fonts: {
      heading: 'font-playfair font-medium tracking-normal',
      body: 'font-inter font-normal'
    },
    animations: {
      entrance: 'animate-anxious-entrance',
      thinking: 'animate-anxious-thinking',
      responding: 'animate-anxious-responding',
      floating: 'animate-anxious-float',
      cardHover: 'hover:animate-anxious-jitter',
      buttonHover: 'hover:animate-anxious-shake'
    },
    effects: {
      particles: '⚡🔥💥',
      backgroundPattern: 'electric-lines',
      borderStyle: 'border border-orange-400/30 rounded-lg'
    },
    sounds: {
      select: 'quick-squeak',
      thinking: 'nervous-thump',
      response: 'excited-chatter'
    }
  },
  'quirky-duck': {
    id: 'quirky-duck',
    colors: {
      primary: 'from-yellow-600 to-blue-500',
      secondary: 'from-yellow-100/20 to-blue-100/20',
      accent: '#eab308',
      background: 'from-slate-600/95 via-yellow-800/15 to-slate-600/95',
      text: 'text-yellow-50',
      glow: 'shadow-yellow-400/30'
    },
    fonts: {
      heading: 'font-playfair font-medium tracking-wide',
      body: 'font-inter font-normal'
    },
    animations: {
      entrance: 'animate-quirky-entrance',
      thinking: 'animate-quirky-thinking',
      responding: 'animate-quirky-responding',
      floating: 'animate-quirky-float',
      cardHover: 'hover:animate-quirky-spin',
      buttonHover: 'hover:animate-quirky-wobble'
    },
    effects: {
      particles: '🌈🎨🎭',
      backgroundPattern: 'abstract-shapes',
      borderStyle: 'border border-yellow-400/30 rounded-lg'
    },
    sounds: {
      select: 'quirky-quack',
      thinking: 'thoughtful-quack',
      response: 'playful-quack'
    }
  }
};

export const getPersonalityTheme = (characterType: Character['type']): PersonalityTheme => {
  return personalityThemes[characterType] || personalityThemes['wise-owl'];
};
