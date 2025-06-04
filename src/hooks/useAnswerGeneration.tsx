import { useState, useEffect } from 'react';
import { Character, QuestionMode, AIResponse, LegacyAIResponse } from '../types';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { audioManager } from '../utils/audioManager';
import { formatChoiceResponse, formatYesNoMaybeResponse } from '../utils/responseTemplates';
import { getImageTypeFromTemplate } from '../utils/responseTypeDetector';
import { ImageType } from '../utils/personalityImageManager';
import { supabase } from '../integrations/supabase/client';
import { analyzeQuestion } from '../utils/questionTypeDetector';

interface UseAnswerGenerationProps {
  character: Character;
  question: string;
  mode?: QuestionMode;
  questionType?: string;
}

// Personality-specific probability weights for yes/no/maybe responses
const PERSONALITY_WEIGHTS = {
  'people-pleaser-pup': { yes: 70, no: 15, maybe: 15 },
  'wise-owl': { yes: 45, no: 45, maybe: 10 },
  'lazy-panda': { yes: 20, no: 15, maybe: 65 },
  'sassy-cat': { yes: 25, no: 50, maybe: 25 },
  'sneaky-snake': { yes: 35, no: 45, maybe: 20 }
};

export const useAnswerGeneration = ({ character, question, mode = 'fun', questionType }: UseAnswerGenerationProps) => {
  const [answer, setAnswer] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [responseType, setResponseType] = useState<ImageType>('thinking');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const theme = getPersonalityTheme(character.type);

  // Improved random selection to avoid patterns
  const getRandomChoice = <T extends any>(array: readonly T[]): T => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      return array[randomArray[0] % array.length];
    }
    const entropy = Date.now() % 1000 + Math.random() * 1000;
    return array[Math.floor(entropy) % array.length];
  };

  const getWeightedResponse = (characterType: Character['type']): 'yes' | 'no' | 'maybe' => {
    const weights = PERSONALITY_WEIGHTS[characterType];
    
    let random: number;
    
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomArray = new Uint32Array(2);
      window.crypto.getRandomValues(randomArray);
      random = ((randomArray[0] * randomArray[1]) % 10000) / 100;
    } else {
      const timeEntropy = (Date.now() % 10000) / 100;
      const mathRandom1 = Math.random() * 100;
      const mathRandom2 = Math.random() * 100;
      const performanceEntropy = typeof performance !== 'undefined' ? (performance.now() % 100) : 0;
      
      random = (timeEntropy + mathRandom1 + mathRandom2 + performanceEntropy) % 100;
    }
    
    if (random < weights.yes) {
      return 'yes';
    } else if (random < weights.yes + weights.no) {
      return 'no';
    } else {
      return 'maybe';
    }
  };

  // Function to detect and handle "or" questions
  const handleOrQuestion = (question: string): { answer: string; templateType: 'choice' } | null => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes(' or ')) {
      const orIndex = lowerQuestion.indexOf(' or ');
      const beforeOr = question.substring(0, orIndex).trim();
      const afterOr = question.substring(orIndex + 4).trim();
      
      let options = [];
      
      const parts = question.split(/\s+or\s+/i);
      if (parts.length >= 2) {
        const firstOption = parts[0].replace(/^(should i|do i|can i|will i|shall i|would i)\s+/i, '').trim();
        options.push(firstOption);
        
        for (let i = 1; i < parts.length; i++) {
          options.push(parts[i].replace(/\?$/, '').trim());
        }
        
        const randomOption = getRandomChoice(options);
        return {
          answer: formatChoiceResponse(randomOption, character.type),
          templateType: 'choice'
        };
      }
    }
    
    else if (lowerQuestion.includes('cuisine')) {
      const cuisines = ['Italian', 'Thai', 'Mexican', 'Japanese', 'Indian', 'Chinese', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek', 'French', 'Lebanese', 'Ethiopian', 'Spanish', 'American'];
      const randomCuisine = getRandomChoice(cuisines);
      return {
        answer: formatChoiceResponse(randomCuisine, character.type),
        templateType: 'choice'
      };
    }
    
    else if (lowerQuestion.includes('dinner') || lowerQuestion.includes('lunch') || lowerQuestion.includes('hungry')) {
      const meals = ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Ramen', 'Burgers', 'Poke Bowl', 'Biryani', 'Sandwich', 'Salad', 'Curry', 'Dumplings', 'Pho', 'Bibimbap', 'Shawarma'];
      const randomMeal = getRandomChoice(meals);
      return {
        answer: formatChoiceResponse(randomMeal, character.type),
        templateType: 'choice'
      };
    }

    else if (lowerQuestion.includes('dessert')) {
      const sweet = ['Ice Cream', 'Cake', 'Milkshake', 'Pudding', 'Cheesecake', 'Cupcakes', 'Bubble Tea', 'Tiramisu', 'Donuts', 'Pie', 'Cookies', 'Chocolates', 'Pastries'];
      const randomSweet = getRandomChoice(sweet);
      return {
        answer: formatChoiceResponse(randomSweet, character.type),
        templateType: 'choice'
      };
    }

    else if (lowerQuestion.includes('movie') || lowerQuestion.includes('genre') ) {
      const movie = ['Thriller', 'Horror', 'RomCom', 'Documentry', 'Action', 'Drama', 'Comedy', 'Romance', 'Feel Good'];
      const randomMovie = getRandomChoice(movie);
      return {
        answer: formatChoiceResponse(randomMovie, character.type),
        templateType: 'choice'
      };
    }
    
    return null;
  };

  // Enhanced AI response function
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
        personalityRecommendation: "Hoot! When the path is unclear, the wise owl chooses growth over comfort."
      } as AIResponse;
    }
  };

  useEffect(() => {
    console.log('Answer generation started with:', { character: character.type, mode, questionType, question });
    
    setIsThinking(true);
    setIsRevealing(true);
    setResponseType('thinking');
    setAiResponse(null);
    setAnswer(''); // Clear previous answer

    // Determine thinking duration based on mode
    const thinkingDuration = mode === 'fun' ? 3000 : 5000; // 3s for fun, 5s for serious

    const generateAnswer = async () => {
      // Enhanced Wise Owl logic for both fun and serious modes
      if (character.type === 'wise-owl') {
        if (mode === 'serious') {
          console.log('Using serious mode for Wise Owl with intelligent analysis');
          try {
            const category = questionType || 'general';
            const aiResult = await getAIResponse(question, character, category);
            console.log('Setting AI response:', aiResult);
            setAiResponse(aiResult);
            setResponseType('choice'); // Use choice image for AI responses
            // Don't set answer - let AnswerDisplay handle the aiResponse
          } catch (error) {
            console.error('Failed to get AI response, falling back to regular mode:', error);
            // Fall back to regular response system
            const randomResponse = getWeightedResponse(character.type);
            const formattedAnswer = formatYesNoMaybeResponse(randomResponse, character.type);
            const imageType = getImageTypeFromTemplate(randomResponse);
            setResponseType(imageType);
            setAnswer(formattedAnswer);
            setAiResponse(null);
          }
        } else {
          // Fun mode for Wise Owl
          const randomResponse = getWeightedResponse(character.type);
          const formattedAnswer = formatYesNoMaybeResponse(randomResponse, character.type);
          const imageType = getImageTypeFromTemplate(randomResponse);
          setResponseType(imageType);
          setAnswer(formattedAnswer);
        }
      } else {
        // Other characters - same behavior for both modes
        const randomResponse = getWeightedResponse(character.type);
        const formattedAnswer = formatYesNoMaybeResponse(randomResponse, character.type);
        const imageType = getImageTypeFromTemplate(randomResponse);
        setResponseType(imageType);
        setAnswer(formattedAnswer);
      }
      
      setIsThinking(false);
      setIsRevealing(false);

      // Play response sound when the answer is provided
      audioManager.playSound('response', character.type);
    };

    // Start the answer generation after the thinking duration
    const timer = setTimeout(generateAnswer, thinkingDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [character, question, mode, questionType]);

  return {
    answer,
    isRevealing,
    isThinking,
    responseType,
    aiResponse
  };
};
