
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
      primary: 'from-pink-600 to-purple-600',
      secondary: 'from-pink-500 to-purple-500',
      accent: '#EC4899',
      background: 'from-pink-900/20 via-purple-900/20 to-pink-900/20',
      text: 'text-pink-100',
      glow: 'shadow-pink-500/30'
    },
    fonts: {
      heading: 'font-bold tracking-tight',
      body: 'font-medium tracking-wide'
    },
    animations: {
      entrance: 'animate-bounce',
      thinking: 'animate-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '✨💫⭐',
      backgroundPattern: 'diagonal-stripes',
      borderStyle: 'border-pink-400/50 border-2'
    },
    sounds: {
      select: 'purr',
      thinking: 'dramatic-pause',
      response: 'sassy-snap'
    }
  },
  'wise-owl': {
    id: 'wise-owl',
    colors: {
      primary: 'from-amber-600 to-orange-600',
      secondary: 'from-amber-500 to-orange-500',
      accent: '#F59E0B',
      background: 'from-amber-900/20 via-orange-900/20 to-amber-900/20',
      text: 'text-amber-100',
      glow: 'shadow-amber-500/30'
    },
    fonts: {
      heading: 'font-mystical font-bold tracking-widest',
      body: 'font-mystical tracking-wide'
    },
    animations: {
      entrance: 'animate-float',
      thinking: 'animate-glow-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '🌟✨🔮',
      backgroundPattern: 'mystical-runes',
      borderStyle: 'border-amber-400/50 border border-dashed'
    },
    sounds: {
      select: 'mystical-chime',
      thinking: 'ancient-wisdom',
      response: 'ethereal-voice'
    }
  },
  'lazy-panda': {
    id: 'lazy-panda',
    colors: {
      primary: 'from-green-600 to-emerald-600',
      secondary: 'from-green-500 to-emerald-500',
      accent: '#10B981',
      background: 'from-green-900/20 via-emerald-900/20 to-green-900/20',
      text: 'text-green-100',
      glow: 'shadow-green-500/30'
    },
    fonts: {
      heading: 'font-light tracking-relaxed',
      body: 'font-normal tracking-normal'
    },
    animations: {
      entrance: 'animate-fade-in',
      thinking: 'animate-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '🍃💚🌿',
      backgroundPattern: 'zen-circles',
      borderStyle: 'border-green-400/30 border rounded-3xl'
    },
    sounds: {
      select: 'zen-chime',
      thinking: 'peaceful-breath',
      response: 'calm-voice'
    }
  },
  'anxious-bunny': {
    id: 'anxious-bunny',
    colors: {
      primary: 'from-orange-600 to-red-600',
      secondary: 'from-orange-500 to-red-500',
      accent: '#F97316',
      background: 'from-orange-900/20 via-red-900/20 to-orange-900/20',
      text: 'text-orange-100',
      glow: 'shadow-orange-500/30'
    },
    fonts: {
      heading: 'font-bold tracking-tight',
      body: 'font-medium tracking-wide'
    },
    animations: {
      entrance: 'animate-bounce',
      thinking: 'animate-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '⚡🔥💥',
      backgroundPattern: 'chaotic-zigzag',
      borderStyle: 'border-orange-400/50 border-2 border-dashed animate-pulse'
    },
    sounds: {
      select: 'excited-squeak',
      thinking: 'rapid-heartbeat',
      response: 'energetic-voice'
    }
  },
  'quirky-duck': {
    id: 'quirky-duck',
    colors: {
      primary: 'from-yellow-600 to-blue-600',
      secondary: 'from-yellow-500 to-blue-500',
      accent: '#EAB308',
      background: 'from-yellow-900/20 via-blue-900/20 to-purple-900/20',
      text: 'text-yellow-100',
      glow: 'shadow-yellow-500/30'
    },
    fonts: {
      heading: 'font-light tracking-widest',
      body: 'font-light tracking-wide'
    },
    animations: {
      entrance: 'animate-spin',
      thinking: 'animate-bounce',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '🌈🎨🎭',
      backgroundPattern: 'random-shapes',
      borderStyle: 'border-yellow-400/50 border-4 border-double'
    },
    sounds: {
      select: 'quirky-quack',
      thinking: 'whimsical-tune',
      response: 'playful-voice'
    }
  }
};

export const getPersonalityTheme = (characterType: Character['type']): PersonalityTheme => {
  return personalityThemes[characterType] || personalityThemes['wise-owl'];
};
