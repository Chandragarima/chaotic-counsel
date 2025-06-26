
export type QuestionCategory = 
  | 'binary'           // Yes/no decisions
  | 'advice'           // How-to questions
  | 'recommendation'   // What should I questions
  | 'analysis'         // Why/explain questions
  | 'choice'           // Multiple options
  | 'general';         // Catch-all

export interface QuestionAnalysis {
  category: QuestionCategory;
  confidence: number;
  keywords: string[];
}

export const analyzeQuestion = (question: string): QuestionAnalysis => {
  const lowerQuestion = question.toLowerCase().trim();
  
  // Enhanced binary decision patterns
  const binaryPatterns = [
    /^should i\b/, /^can i\b/, /^will i\b/, /^do i\b/, /^am i\b/,
    /^is it (time|worth|good|bad|wise|smart|safe|okay|ok|right|wrong)\b/,
    /\b(yes or no|true or false)\b/,
    /^would it be (good|bad|wise|smart|better)\b/,
    /^is this (a good|the right)\b/
  ];
  
  // Enhanced advice patterns
  const advicePatterns = [
    /^how (do|can|should) i\b/, /^how to\b/, /^how can i\b/,
    /^what('s| is) the best way to\b/, /^what('s| is) the right way to\b/,
    /^what steps\b/, /^what should i do to\b/,
    /^how can i improve\b/, /^how do i get\b/, /^how do i make\b/,
    /^what('s| is) the process\b/, /^how would i\b/
  ];
  
  // Better recommendation patterns
  const recommendationPatterns = [
    /^what should i\b/, /^which (one|option|choice)\b/,
    /^what (would you|do you) recommend\b/, /^what('s| is) (better|best)\b/,
    /^suggest\b/, /^recommend\b/, /^what would be\b/,
    /^which would be\b/, /^what('s| is) your recommendation\b/
  ];
  
  // Enhanced analysis patterns
  const analysisPatterns = [
    /^why\b/, /^what does\b/, /^explain\b/, /^what are the\b/,
    /^tell me about\b/, /^what('s| is) the meaning\b/,
    /^help me understand\b/, /^what causes\b/, /^what makes\b/,
    /^break down\b/, /^analyze\b/
  ];
  
  // Enhanced choice patterns - these should get HIGHEST priority
  const choicePatterns = [
    /\s+or\s+/, /\bversus\b/, /\bvs\.?\b/, /\bv\.?\b/,
    /\bbetween\b.*\band\b/, /compare.*\band\b/, /\bchoose between\b/,
    /^should i.*or\b/, /^(spiritual|material|career|work|home|stay|go|study|travel).*or.*(spiritual|material|career|work|home|stay|go|study|travel)/i
  ];
  
  // Score-based detection for better accuracy
  let scores = {
    binary: 0,
    advice: 0,
    recommendation: 0,
    choice: 0,
    analysis: 0
  };
  
  let detectedKeywords: string[] = [];
  
  // Pattern matching with scoring - CHOICE gets highest priority
  if (choicePatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.choice += 5; // Highest priority for choice questions
    detectedKeywords.push('options', 'compare', 'versus');
  }
  
  if (binaryPatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.binary += 3;
    detectedKeywords.push('decision', 'yes/no');
  }
  
  if (advicePatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.advice += 3;
    detectedKeywords.push('guidance', 'how-to');
  }
  
  if (recommendationPatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.recommendation += 3;
    detectedKeywords.push('suggest', 'recommend');
  }
  
  if (analysisPatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.analysis += 3;
    detectedKeywords.push('explain', 'understand');
  }
  
  // Additional context scoring
  const questionWords = lowerQuestion.split(/\s+/);
  
  if (questionWords.includes('better') || questionWords.includes('best')) {
    scores.recommendation += 1;
    scores.choice += 2; // Boost choice for comparison words
    detectedKeywords.push('best');
  }
  
  if (questionWords.includes('why') || questionWords.includes('because')) {
    scores.analysis += 2;
    detectedKeywords.push('why');
  }
  
  if (questionWords.includes('how')) {
    scores.advice += 1;
    detectedKeywords.push('how');
  }
  
  // Find the category with highest score
  const maxScore = Math.max(...Object.values(scores));
  let category: QuestionCategory = 'general';
  let confidence = 0.5;
  
  if (maxScore > 0) {
    for (const [cat, score] of Object.entries(scores)) {
      if (score === maxScore) {
        category = cat as QuestionCategory;
        confidence = Math.min(0.9, 0.6 + (score * 0.1));
        break;
      }
    }
  }
  
  // Fallback to general if no clear pattern
  if (maxScore === 0) {
    detectedKeywords = ['general'];
  }
  
  return {
    category,
    confidence,
    keywords: [...new Set(detectedKeywords)] // Remove duplicates
  };
};
