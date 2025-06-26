
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
    text: 'Should I chase this job offer, even if it means moving cities?',
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
    text: 'Should I step up to lead my team, even with extra stress?',
    category: 'career',
    characterType: 'wise-owl'
  },
  {
    id: 'career-4-wise-owl',
    text: 'How do I figure out my next career move when I\'m stuck?',
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
    text: 'Should I finally tell my boss what I really think?',
    category: 'career',
    characterType: 'sassy-cat'
  },
  {
    id: 'career-3-sassy-cat',
    text: 'Is my coworker throwing shade or am I overthinking it?',
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
    text: 'How do I find a chill job that actually fits my vibe?',
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
    text: 'Should I use my colleague\'s mistake to boost my position?',
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
    text: 'Should I start saving now for a chill future?',
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
    text: 'Is it really worth logging every coffee or should I just guesstimate?',
    category: 'finance',
    characterType: 'lazy-panda'
  },
  {
    id: 'finance-4-lazy-panda',
    text: 'How do I build wealth while staying chill and stress-free?',
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
    text: 'Should I help my family member with debt even if it strains my bank account?',
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
    text: 'Should I split the bill evenly even when I just had fries?',
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
    text: 'Should I focus on spiritual growth or chase material success right now?',
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
    text: 'Am I too judgy, or are people just consistently disappointing?',
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
    text: 'Is my confidence empowering or just too much for people to handle?”',
    category: 'personal-growth',
    characterType: 'sassy-cat'
  },
  {
    id: 'personal-growth-1-lazy-panda',
    text: 'How do I build better habits without burning out?',
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
    text: 'Is it okay to choose comfort over constant self-improvement?',
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
    text: 'How do I influence others without seeming manipulative?',
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
    text: 'How do I know when a relationship is still worth the effort?',
    category: 'relationships',
    characterType: 'wise-owl'
  },
  {
    id: 'relationships-3-wise-owl',
    text: 'Should I focus on love or keep growing alone for now?',
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
    text: 'Is my friend being dramatic, or is their relationship actually a trainwreck?',
    category: 'relationships',
    characterType: 'sassy-cat'
  },
  {
    id: 'relationships-3-sassy-cat',
    text: 'Should I ghost them or deliver a dramatic exit monologue?',
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
    text: 'Is it okay to prefer chill, low-effort relationships over deep emotional drama?',
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
    text: 'Should I use what I know about my ex to get closure or stay classy?',
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
    text: 'Should I let my partner see how calculated I can be or keep a little mystery?',
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
