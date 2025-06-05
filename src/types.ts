
export interface AdviceAIResponse {
  advice: string;
  considerations?: string[];
  nextSteps?: string[];
}

export interface RecommendationAIResponse {
  recommendation: string;
  pros?: string[];
  cons?: string[];
}

export interface AnalysisAIResponse {
  analysis: string;
  keyPoints?: string[];
  implications?: string[];
}

export interface ChoiceAIResponse {
  recommendation: string;
  options?: string[];
  factors?: string[];
}

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

// Enhanced AI Response types for different question categories - these match what AnswerDisplay.tsx expects
export interface BinaryAIResponse {
  responseType: 'binary';
  deeperQuestion: string;
  reasonsForYes: string[];
  reasonsForNo: string[];
  calculatedRisk: string;
  personalityRecommendation: string;
}

export interface AdviceAIResponseEnhanced {
  responseType: 'advice';
  mainAdvice: string;
  steps: string[];
  considerations: string[];
  personalityWisdom: string;
}

export interface RecommendationAIResponseEnhanced {
  responseType: 'recommendation';
  topRecommendation: string;
  alternatives: string[];
  reasoning: string;
  personalityNote: string;
}

export interface AnalysisAIResponseEnhanced {
  responseType: 'analysis';
  keyInsights: string[];
  perspectives: string[];
  conclusion: string;
  personalityReflection: string;
}

export interface ChoiceAIResponseEnhanced {
  responseType: 'choice';
  recommendedChoice: string;
  choiceAnalysis: { option: string; pros: string[]; cons: string[] }[];
  finalThought: string;
}

export type AIResponse = 
  | BinaryAIResponse 
  | AdviceAIResponseEnhanced 
  | RecommendationAIResponseEnhanced 
  | AnalysisAIResponseEnhanced 
  | ChoiceAIResponseEnhanced;

// Legacy type for backward compatibility
export interface LegacyAIResponse {
  deeperQuestion: string;
  reasonsForYes: string[];
  reasonsForNo: string[];
  calculatedRisk: string;
  personalityRecommendation: string;
}
