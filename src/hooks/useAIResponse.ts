
import { Character, AIResponse } from '../types';
import { supabase } from '../integrations/supabase/client';

export const useAIResponse = () => {
  const getAIResponse = async (question: string, character: Character, category: string): Promise<AIResponse> => {
    try {
      console.log('Calling AI decision helper with:', { question, character: character.type, category });
      
      const { data, error } = await supabase.functions.invoke('ai-decision-helper', {
        body: {
          question,
          character: character.type,
          category
        }
      });

      console.log('Raw AI response:', data, 'Error:', error);

      if (error) throw error;
      
      // Parse the response if it's a string
      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          console.log('Parsed AI response:', parsed);
          return parsed;
        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          throw new Error('Invalid response format from AI');
        }
      }
      
      console.log('Using direct AI response:', data);
      return data;
    } catch (error) {
      console.error('AI response error:', error);
      // Fallback response with correct property names
      return {
        responseType: 'binary',
        deeperQuestion: "What would you advise a dear friend facing this same decision?",
        reasonsForYes: ["Consider both logic and intuition", "Reflect on your deeper values"],
        reasonsForNo: ["Take time for quiet contemplation", "Seek wisdom from trusted sources"],
        calculatedRisk: "In times of uncertainty, ancient wisdom reminds us that every question carries the seeds of its own answer within.",
        personalityRecommendation: "When the path is unclear, choose growth over comfort."
      } as AIResponse;
    }
  };

  return { getAIResponse };
};
