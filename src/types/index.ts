
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

export type QuestionType = 'dinner' | 'movie' | 'hangout' | 'choice' | 'career' | 'finance' | 'personal-growth' | 'relationships';

export type AppScreen = 'selector' | 'question' | 'questions' | 'answer';

export type QuestionMode = 'fun' | 'serious';

export interface SampleQuestion {
  id: string;
  text: string;
  category: QuestionType;
}

// Enhanced AI Response types for different question categories
export interface BinaryAIResponse {
  responseType: 'binary';
  deeperQuestion: string;
  reasonsForYes: string[];
  reasonsForNo: string[];
  calculatedRisk: string;
  personalityRecommendation: string;
}

export interface AdviceAIResponse {
  responseType: 'advice';
  mainAdvice: string;
  steps: string[];
  considerations: string[];
  personalityWisdom: string;
}

export interface RecommendationAIResponse {
  responseType: 'recommendation';
  topRecommendation: string;
  alternatives: string[];
  reasoning: string;
  personalityNote: string;
}

export interface AnalysisAIResponse {
  responseType: 'analysis';
  keyInsights: string[];
  perspectives: string[];
  conclusion: string;
  personalityReflection: string;
}

export interface ChoiceAIResponse {
  responseType: 'choice';
  recommendedChoice: string;
  choiceAnalysis: { option: string; pros: string[]; cons: string[] }[];
  finalThought: string;
}

export type AIResponse = 
  | BinaryAIResponse 
  | AdviceAIResponse 
  | RecommendationAIResponse 
  | AnalysisAIResponse 
  | ChoiceAIResponse;

// Legacy type for backward compatibility
export interface LegacyAIResponse {
  deeperQuestion: string;
  reasonsForYes: string[];
  reasonsForNo: string[];
  calculatedRisk: string;
  personalityRecommendation: string;
}
