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