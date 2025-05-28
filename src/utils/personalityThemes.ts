
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
      primary: 'from-slate-800 to-slate-900',
      secondary: 'from-pink-900/30 to-purple-900/30',
      accent: '#EC4899',
      background: 'from-slate-900/95 via-pink-950/20 to-slate-900/95',
      text: 'text-pink-100',
      glow: 'shadow-pink-500/20'
    },
    fonts: {
      heading: 'font-light tracking-[0.2em]',
      body: 'font-light tracking-wide'
    },
    animations: {
      entrance: 'animate-fade-in',
      thinking: 'animate-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '✨💫⭐',
      backgroundPattern: 'subtle-grid',
      borderStyle: 'border border-pink-500/20 rounded-lg'
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
      primary: 'from-slate-800 to-slate-900',
      secondary: 'from-amber-900/30 to-orange-900/30',
      accent: '#F59E0B',
      background: 'from-slate-900/95 via-amber-950/20 to-slate-900/95',
      text: 'text-amber-100',
      glow: 'shadow-amber-500/20'
    },
    fonts: {
      heading: 'font-light tracking-[0.3em]',
      body: 'font-extralight tracking-wide'
    },
    animations: {
      entrance: 'animate-fade-in',
      thinking: 'animate-glow-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '🌟✨🔮',
      backgroundPattern: 'mystical-dots',
      borderStyle: 'border border-amber-500/20 rounded-lg'
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
      primary: 'from-slate-800 to-slate-900',
      secondary: 'from-green-900/30 to-emerald-900/30',
      accent: '#10B981',
      background: 'from-slate-900/95 via-green-950/20 to-slate-900/95',
      text: 'text-green-100',
      glow: 'shadow-green-500/20'
    },
    fonts: {
      heading: 'font-extralight tracking-relaxed',
      body: 'font-light tracking-normal'
    },
    animations: {
      entrance: 'animate-fade-in',
      thinking: 'animate-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '🍃💚🌿',
      backgroundPattern: 'zen-lines',
      borderStyle: 'border border-green-500/20 rounded-lg'
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
      primary: 'from-slate-800 to-slate-900',
      secondary: 'from-orange-900/30 to-red-900/30',
      accent: '#F97316',
      background: 'from-slate-900/95 via-orange-950/20 to-slate-900/95',
      text: 'text-orange-100',
      glow: 'shadow-orange-500/20'
    },
    fonts: {
      heading: 'font-normal tracking-tight',
      body: 'font-light tracking-wide'
    },
    animations: {
      entrance: 'animate-fade-in',
      thinking: 'animate-pulse',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '⚡🔥💥',
      backgroundPattern: 'electric-lines',
      borderStyle: 'border border-orange-500/20 rounded-lg'
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
      primary: 'from-slate-800 to-slate-900',
      secondary: 'from-yellow-900/30 to-blue-900/30',
      accent: '#EAB308',
      background: 'from-slate-900/95 via-yellow-950/20 to-slate-900/95',
      text: 'text-yellow-100',
      glow: 'shadow-yellow-500/20'
    },
    fonts: {
      heading: 'font-light tracking-widest',
      body: 'font-light tracking-wide'
    },
    animations: {
      entrance: 'animate-fade-in',
      thinking: 'animate-bounce',
      responding: 'animate-fade-in'
    },
    effects: {
      particles: '🌈🎨🎭',
      backgroundPattern: 'abstract-shapes',
      borderStyle: 'border border-yellow-500/20 rounded-lg'
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
