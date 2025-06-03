
export interface Character {
  id: string;
  name: string;
  type: 'sassy-cat' | 'wise-owl' | 'lazy-panda' | 'sneaky-snake' | 'people-pleaser-pup';
  personality: string;
  description: string;
  unlocked: boolean;
  image?: string;
}

export interface UserProgress {
  streak: number;
  lastVisit: string;
  unlockedCharacters: string[];
  totalDecisions: number;
}

export type QuestionType = 'dinner' | 'movie' | 'hangout' | 'choice' | 'career' | 'finance';

export type AppScreen = 'selector' | 'question' | 'questions' | 'answer';

export type QuestionMode = 'fun' | 'serious';

export interface SampleQuestion {
  id: string;
  text: string;
  category: QuestionType;
}

export interface AIResponse {
  deeperQuestion: string;
  reasonsForYes: string[];
  reasonsForNo: string[];
  calculatedRisk: string;
  personalityRecommendation: string;
}
