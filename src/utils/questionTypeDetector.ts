
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
  
  // Binary decision patterns
  const binaryPatterns = [
    /^should i\b/,
    /^can i\b/,
    /^will i\b/,
    /^do i\b/,
    /^is it (time|worth|good|bad|wise|smart|safe)\b/,
    /\b(yes or no|true or false)\b/,
    /^am i\b/
  ];
  
  // Advice patterns
  const advicePatterns = [
    /^how (do|can|should) i\b/,
    /^what('s| is) the best way to\b/,
    /^how to\b/,
    /^what steps\b/,
    /^how can i improve\b/,
    /^what should i do to\b/
  ];
  
  // Recommendation patterns
  const recommendationPatterns = [
    /^what should i\b/,
    /^which (one|option|choice)\b/,
    /^what (would you|do you) recommend\b/,
    /^what('s| is) (better|best)\b/,
    /^suggest\b/,
    /^recommend\b/
  ];
  
  // Analysis patterns
  const analysisPatterns = [
    /^why\b/,
    /^what does\b/,
    /^explain\b/,
    /^what are the (pros|cons|benefits|risks)\b/,
    /^tell me about\b/,
    /^what('s| is) the meaning\b/
  ];
  
  // Choice patterns (or questions)
  const choicePatterns = [
    /\s+or\s+/,
    /\bversus\b/,
    /\bvs\b/,
    /\bbetween\b.*\band\b/
  ];
  
  // Check patterns in order of specificity
  if (binaryPatterns.some(pattern => pattern.test(lowerQuestion))) {
    return {
      category: 'binary',
      confidence: 0.9,
      keywords: ['decision', 'choice', 'yes/no']
    };
  }
  
  if (advicePatterns.some(pattern => pattern.test(lowerQuestion))) {
    return {
      category: 'advice',
      confidence: 0.85,
      keywords: ['guidance', 'steps', 'how-to']
    };
  }
  
  if (recommendationPatterns.some(pattern => pattern.test(lowerQuestion))) {
    return {
      category: 'recommendation',
      confidence: 0.8,
      keywords: ['suggest', 'recommend', 'best']
    };
  }
  
  if (choicePatterns.some(pattern => pattern.test(lowerQuestion))) {
    return {
      category: 'choice',
      confidence: 0.75,
      keywords: ['options', 'alternatives', 'compare']
    };
  }
  
  if (analysisPatterns.some(pattern => pattern.test(lowerQuestion))) {
    return {
      category: 'analysis',
      confidence: 0.7,
      keywords: ['explain', 'understand', 'insight']
    };
  }
  
  return {
    category: 'general',
    confidence: 0.5,
    keywords: ['general', 'advice']
  };
};
