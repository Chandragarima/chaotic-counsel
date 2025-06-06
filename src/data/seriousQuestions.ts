
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
    id: 'career-2-wise-owl',
    text: 'Is it time to leave my stable job to start my own business?',
    category: 'career',
    characterType: 'wise-owl'
  },
  {
    id: 'career-3-wise-owl',
    text: 'Should I accept a leadership role that comes with more responsibility?',
    category: 'career',
    characterType: 'wise-owl'
  },
  {
    id: 'career-4-wise-owl',
    text: 'How do I find my true calling when I feel lost professionally?',
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
    id: 'career-2-sassy-cat',
    text: 'Should I tell my boss what I really think about their management style?',
    category: 'career',
    characterType: 'sassy-cat'
  },
  {
    id: 'career-3-sassy-cat',
    text: 'Is my coworker trying to sabotage my career advancement?',
    category: 'career',
    characterType: 'sassy-cat'
  },
  {
    id: 'career-4-sassy-cat',
    text: 'Should I demand the promotion I deserve or keep waiting?',
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
    id: 'career-2-lazy-panda',
    text: 'Should I take on this big project that seems really stressful?',
    category: 'career',
    characterType: 'lazy-panda'
  },
  {
    id: 'career-3-lazy-panda',
    text: 'Is remote work worth fighting for with my employer?',
    category: 'career',
    characterType: 'lazy-panda'
  },
  {
    id: 'career-4-lazy-panda',
    text: 'How do I find a job that actually aligns with my low-stress lifestyle?',
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
    id: 'career-2-sneaky-snake',
    text: 'Should I leverage my colleague\'s mistake to advance my position?',
    category: 'career',
    characterType: 'sneaky-snake'
  },
  {
    id: 'career-3-sneaky-snake',
    text: 'How do I position myself as indispensable in the next reorganization?',
    category: 'career',
    characterType: 'sneaky-snake'
  },
  {
    id: 'career-4-sneaky-snake',
    text: 'Should I share my innovative idea or keep it secret until the right moment?',
    category: 'career',
    characterType: 'sneaky-snake'
  },
  {
    id: 'career-1-people-pleaser-pup',
    text: 'How do I handle workplace conflict with my team?',
    category: 'career',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'career-2-people-pleaser-pup',
    text: 'Should I speak up about my ideas even if it might upset my colleagues?',
    category: 'career',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'career-3-people-pleaser-pup',
    text: 'How do I ask for a raise without seeming greedy or demanding?',
    category: 'career',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'career-4-people-pleaser-pup',
    text: 'Should I take on extra work to help my overwhelmed teammate?',
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
    id: 'finance-2-wise-owl',
    text: 'Is now the right time to start planning for early retirement?',
    category: 'finance',
    characterType: 'wise-owl'
  },
  {
    id: 'finance-3-wise-owl',
    text: 'Should I prioritize paying off debt or building an emergency fund?',
    category: 'finance',
    characterType: 'wise-owl'
  },
  {
    id: 'finance-4-wise-owl',
    text: 'How do I balance financial security with meaningful life experiences?',
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
    id: 'finance-2-sassy-cat',
    text: 'Is my partner being financially irresponsible with our shared expenses?',
    category: 'finance',
    characterType: 'sassy-cat'
  },
  {
    id: 'finance-3-sassy-cat',
    text: 'Should I call out my friend for always conveniently forgetting their wallet?',
    category: 'finance',
    characterType: 'sassy-cat'
  },
  {
    id: 'finance-4-sassy-cat',
    text: 'Am I being taken advantage of financially in this relationship?',
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
    id: 'finance-2-lazy-panda',
    text: 'Should I automate all my investments so I don\'t have to think about it?',
    category: 'finance',
    characterType: 'lazy-panda'
  },
  {
    id: 'finance-3-lazy-panda',
    text: 'Is it worth the effort to track every expense or should I just estimate?',
    category: 'finance',
    characterType: 'lazy-panda'
  },
  {
    id: 'finance-4-lazy-panda',
    text: 'How do I build wealth without constantly monitoring the market?',
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
    id: 'finance-2-sneaky-snake',
    text: 'Should I negotiate a better deal by mentioning my competitor\'s offer?',
    category: 'finance',
    characterType: 'sneaky-snake'
  },
  {
    id: 'finance-3-sneaky-snake',
    text: 'How do I position myself to benefit from the next market downturn?',
    category: 'finance',
    characterType: 'sneaky-snake'
  },
  {
    id: 'finance-4-sneaky-snake',
    text: 'Should I keep my investment strategy secret from my peers?',
    category: 'finance',
    characterType: 'sneaky-snake'
  },
  {
    id: 'finance-1-people-pleaser-pup',
    text: 'How do I discuss money issues with my partner?',
    category: 'finance',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'finance-2-people-pleaser-pup',
    text: 'Should I help my family member with their debt even if I can\'t afford it?',
    category: 'finance',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'finance-3-people-pleaser-pup',
    text: 'How do I say no to expensive group activities without hurting feelings?',
    category: 'finance',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'finance-4-people-pleaser-pup',
    text: 'Should I split the bill equally even when I ordered much less?',
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
    id: 'personal-growth-2-wise-owl',
    text: 'Should I pursue spiritual growth or focus on material success?',
    category: 'personal-growth',
    characterType: 'wise-owl'
  },
  {
    id: 'personal-growth-3-wise-owl',
    text: 'How do I balance solitude for reflection with social connections?',
    category: 'personal-growth',
    characterType: 'wise-owl'
  },
  {
    id: 'personal-growth-4-wise-owl',
    text: 'Is it time to let go of past mistakes and embrace a new chapter?',
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
    id: 'personal-growth-2-sassy-cat',
    text: 'Am I being too harsh in my judgments or are people really this disappointing?',
    category: 'personal-growth',
    characterType: 'sassy-cat'
  },
  {
    id: 'personal-growth-3-sassy-cat',
    text: 'Should I fake being nice or just embrace my authentic bluntness?',
    category: 'personal-growth',
    characterType: 'sassy-cat'
  },
  {
    id: 'personal-growth-4-sassy-cat',
    text: 'Is my confidence inspiring others or just intimidating them?',
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
    id: 'personal-growth-2-lazy-panda',
    text: 'Should I embrace my low-energy lifestyle or try to become more ambitious?',
    category: 'personal-growth',
    characterType: 'lazy-panda'
  },
  {
    id: 'personal-growth-3-lazy-panda',
    text: 'How do I make self-improvement feel effortless and sustainable?',
    category: 'personal-growth',
    characterType: 'lazy-panda'
  },
  {
    id: 'personal-growth-4-lazy-panda',
    text: 'Is it okay to choose comfort over growth most of the time?',
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
    id: 'personal-growth-2-sneaky-snake',
    text: 'Should I reveal my vulnerabilities to build deeper connections?',
    category: 'personal-growth',
    characterType: 'sneaky-snake'
  },
  {
    id: 'personal-growth-3-sneaky-snake',
    text: 'How do I master the art of influence without manipulating others?',
    category: 'personal-growth',
    characterType: 'sneaky-snake'
  },
  {
    id: 'personal-growth-4-sneaky-snake',
    text: 'Should I share my personal growth journey or keep my progress private?',
    category: 'personal-growth',
    characterType: 'sneaky-snake'
  },
  {
    id: 'personal-growth-1-people-pleaser-pup',
    text: 'How do I set boundaries without hurting others?',
    category: 'personal-growth',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'personal-growth-2-people-pleaser-pup',
    text: 'Should I prioritize my own needs even if it disappoints others?',
    category: 'personal-growth',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'personal-growth-3-people-pleaser-pup',
    text: 'How do I build confidence without feeling selfish or arrogant?',
    category: 'personal-growth',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'personal-growth-4-people-pleaser-pup',
    text: 'Is it wrong to want recognition for all the help I give others?',
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
    id: 'relationships-2-wise-owl',
    text: 'How do I know if this relationship is worth fighting for?',
    category: 'relationships',
    characterType: 'wise-owl'
  },
  {
    id: 'relationships-3-wise-owl',
    text: 'Should I pursue love or focus on my spiritual journey alone?',
    category: 'relationships',
    characterType: 'wise-owl'
  },
  {
    id: 'relationships-4-wise-owl',
    text: 'How do I heal from betrayal while remaining open to new connections?',
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
    id: 'relationships-2-sassy-cat',
    text: 'Is my friend being dramatic or are their relationship problems actually serious?',
    category: 'relationships',
    characterType: 'sassy-cat'
  },
  {
    id: 'relationships-3-sassy-cat',
    text: 'Should I ghost this person or tell them exactly why I\'m done?',
    category: 'relationships',
    characterType: 'sassy-cat'
  },
  {
    id: 'relationships-4-sassy-cat',
    text: 'Am I settling for less than I deserve in this relationship?',
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
    id: 'relationships-2-lazy-panda',
    text: 'Should I address this relationship issue or just hope it resolves itself?',
    category: 'relationships',
    characterType: 'lazy-panda'
  },
  {
    id: 'relationships-3-lazy-panda',
    text: 'How do I show I care without having to plan elaborate gestures?',
    category: 'relationships',
    characterType: 'lazy-panda'
  },
  {
    id: 'relationships-4-lazy-panda',
    text: 'Is it okay to prefer low-maintenance relationships over deep emotional connections?',
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
    id: 'relationships-2-sneaky-snake',
    text: 'Should I use my ex\'s secrets to gain closure in our relationship?',
    category: 'relationships',
    characterType: 'sneaky-snake'
  },
  {
    id: 'relationships-3-sneaky-snake',
    text: 'How do I test if someone is truly trustworthy before opening up?',
    category: 'relationships',
    characterType: 'sneaky-snake'
  },
  {
    id: 'relationships-4-sneaky-snake',
    text: 'Should I reveal my strategic mind to my partner or keep some mystery?',
    category: 'relationships',
    characterType: 'sneaky-snake'
  },
  {
    id: 'relationships-1-people-pleaser-pup',
    text: 'How do I help my friend through their difficult time?',
    category: 'relationships',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'relationships-2-people-pleaser-pup',
    text: 'Should I stay in this relationship even though I\'m unhappy to avoid hurting them?',
    category: 'relationships',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'relationships-3-people-pleaser-pup',
    text: 'How do I express my needs without seeming needy or demanding?',
    category: 'relationships',
    characterType: 'people-pleaser-pup'
  },
  {
    id: 'relationships-4-people-pleaser-pup',
    text: 'Should I always be the one to apologize first to keep the peace?',
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
