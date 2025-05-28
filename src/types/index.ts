
export interface Character {
  id: string;
  name: string;
  type: 'sassy-cat' | 'wise-owl' | 'lazy-panda' | 'anxious-bunny' | 'quirky-duck';
  personality: string;
  description: string;
  unlocked: boolean;
  image?: string;
  responses: {
    dinner: string[];
    movie: string[];
    hangout: string[];
    choice: string[];
  };
}

export interface UserProgress {
  streak: number;
  lastVisit: string;
  unlockedCharacters: string[];
  totalDecisions: number;
}

export type QuestionType = 'dinner' | 'movie' | 'hangout' | 'choice';

export type AppScreen = 'splash' | 'selector' | 'question' | 'answer' | 'streak' | 'gallery' | 'settings';
