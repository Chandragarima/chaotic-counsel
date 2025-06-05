
import { Character, QuestionType } from '../types';

interface SeriousQuestion {
  id: string;
  text: string;
  category: QuestionType;
  characterType: Character['type'];
}

export const seriousQuestions: SeriousQuestion[] = [
  // Career & Growth Questions
  {
    id: 'career-1-wise-owl',
    text: 'Should I pursue this new career opportunity that requires relocating?',
    category: 'career',
    characterType: 'wise-owl'
  },
  {
    id: 'career-1-sassy-cat',
    text: 'Should I quit my job without having another one lined up?',
    category: 'career',
    characterType: 'sassy-cat'
  },
  {
    id: 'career-1-lazy-panda',
    text: 'How do I advance my career without working overtime?',
    category: 'career',
    characterType: 'lazy-panda'
  },
  {
    id: 'career-1-sneaky-snake',
    text: 'What strategic moves should I make to get promoted?',
    category: 'career',
    characterType: 'sneaky-snake'
  },
  {
    id: 'career-1-people-pleaser-pup',
    text: 'How do I handle workplace conflict with my team?',
    category: 'career',
    characterType: 'people-pleaser-pup'
  },

  // Finance & Money Questions
  {
    id: 'finance-1-wise-owl',
    text: 'Should I invest my savings in the stock market or real estate?',
    category: 'finance',
    characterType: 'wise-owl'
  },
  {
    id: 'finance-1-sassy-cat',
    text: 'Should I lend money to my friend who never pays back?',
    category: 'finance',
    characterType: 'sassy-cat'
  },
  {
    id: 'finance-1-lazy-panda',
    text: 'What are some low-maintenance ways to save money?',
    category: 'finance',
    characterType: 'lazy-panda'
  },
  {
    id: 'finance-1-sneaky-snake',
    text: 'How can I maximize my tax deductions legally?',
    category: 'finance',
    characterType: 'sneaky-snake'
  },
  {
    id: 'finance-1-people-pleaser-pup',
    text: 'How do I discuss money issues with my partner?',
    category: 'finance',
    characterType: 'people-pleaser-pup'
  },

  // Personal Growth Questions
  {
    id: 'personal-growth-1-wise-owl',
    text: 'How do I find my life purpose and meaning?',
    category: 'personal-growth',
    characterType: 'wise-owl'
  },
  {
    id: 'personal-growth-1-sassy-cat',
    text: 'Should I cut toxic people out of my life?',
    category: 'personal-growth',
    characterType: 'sassy-cat'
  },
  {
    id: 'personal-growth-1-lazy-panda',
    text: 'How do I build better habits without overwhelming myself?',
    category: 'personal-growth',
    characterType: 'lazy-panda'
  },
  {
    id: 'personal-growth-1-sneaky-snake',
    text: 'What skills should I develop to gain an advantage in life?',
    category: 'personal-growth',
    characterType: 'sneaky-snake'
  },
  {
    id: 'personal-growth-1-people-pleaser-pup',
    text: 'How do I set boundaries without hurting others?',
    category: 'personal-growth',
    characterType: 'people-pleaser-pup'
  },

  // Relationships Questions
  {
    id: 'relationships-1-wise-owl',
    text: 'Should I forgive someone who deeply hurt me?',
    category: 'relationships',
    characterType: 'wise-owl'
  },
  {
    id: 'relationships-1-sassy-cat',
    text: 'Should I tell my friend their partner is cheating?',
    category: 'relationships',
    characterType: 'sassy-cat'
  },
  {
    id: 'relationships-1-lazy-panda',
    text: 'How do I maintain friendships without constant effort?',
    category: 'relationships',
    characterType: 'lazy-panda'
  },
  {
    id: 'relationships-1-sneaky-snake',
    text: 'How do I network effectively to build valuable connections?',
    category: 'relationships',
    characterType: 'sneaky-snake'
  },
  {
    id: 'relationships-1-people-pleaser-pup',
    text: 'How do I help my friend through their difficult time?',
    category: 'relationships',
    characterType: 'people-pleaser-pup'
  },
];

export const getSeriousQuestionsByCharacterAndCategory = (
  characterType: Character['type'], 
  category: QuestionType
): SeriousQuestion[] => {
  return seriousQuestions.filter(
    q => q.characterType === characterType && q.category === category
  );
};
