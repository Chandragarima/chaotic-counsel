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

  // Enhanced AI response function with timeout and better error handling
  const getAIResponse = async (question: string, character: Character, category: string): Promise<AIResponse> => {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('AI request timeout')), 8000); // 8 second timeout
    });

    try {
      console.log('Calling AI decision helper with timeout protection:', { question, character: character.type, category });
      
      const aiPromise = supabase.functions.invoke('ai-decision-helper', {
        body: {
          question,
          character: character.type,
          category
        }
      });

      const { data, error } = await Promise.race([aiPromise, timeoutPromise]);

      console.log('AI response received:', data, 'Error:', error);

      if (error) throw error;
      
      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid AI response structure');
      }

      // Parse the response if it's a string
      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          console.log('Parsed AI response:', parsed);
          
          // Validate required fields
          if (!parsed.responseType) {
            throw new Error('Missing responseType in AI response');
          }
          
          return parsed;
        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          throw new Error('Invalid JSON format from AI');
        }
      }
      
      // Validate direct response
      if (!data.responseType) {
        throw new Error('Missing responseType in direct AI response');
      }
      
      console.log('Using direct AI response:', data);
      return data;
    } catch (error) {
      console.error('AI response error:', error);
      
      // Enhanced fallback response with correct property names
      const fallbackResponse: AIResponse = {
        responseType: 'binary',
        deeperQuestion: "What would bring you peace of mind in this situation?",
        reasonsForYes: ["Trust your instincts - they're usually right", "Taking action often leads to clarity"],
        reasonsForNo: ["Sometimes waiting reveals better options", "Caution can prevent costly mistakes"],
        calculatedRisk: "Every decision carries uncertainty, but inaction is also a choice with consequences.",
        personalityRecommendation: getCharacterSignature(character.type)
      };
      
      return fallbackResponse;
    }
  };

  // Get character-specific signature for fallback
  const getCharacterSignature = (characterType: Character['type']): string => {
    switch (characterType) {
      case 'wise-owl': return "Trust in the wisdom of your experience and the lessons you've learned. Hoot!";
      case 'sassy-cat': return "Darling, you know what's best for you - now own that decision! Meow!";
      case 'lazy-panda': return "Keep it simple and go with what feels right for your peace of mind.";
      case 'sneaky-snake': return "Between you and me, the clever choice is often the one others don't see coming...";
      case 'people-pleaser-pup': return "Whatever you choose, we'll support you all the way! You've got this! Woof!";
      default: return "Trust your instincts and move forward with confidence.";
    }
  };

  useEffect(() => {
    console.log('Answer generation started:', { character: character.type, mode, questionType, question });
    
    setIsThinking(true);
    setIsRevealing(true);
    setResponseType('thinking');
    setAiResponse(null);
    setAnswer('');

    // Determine thinking duration based on mode
    const thinkingDuration = mode === 'fun' ? 2000 : 0; // Reduced from 3s to 2s for fun mode

    const generateAnswer = async () => {
      if (mode === 'serious') {
        console.log(`Using serious mode for ${character.type}`);
        try {
          const analysis = analyzeQuestion(question);
          console.log('Question analysis:', analysis);
          
          // Get AI response with timeout protection
          const aiResult = await getAIResponse(question, character, analysis.category);
          console.log('AI response successful:', aiResult);
          setAiResponse(aiResult);
          
          // Set response type based on category
          const responseImageType = analysis.category === 'binary' ? 'yes' : 
                                 analysis.category === 'choice' ? 'choice' : 'maybe';
          setResponseType(responseImageType);
          
        } catch (error) {
          console.error('Serious mode failed, using fun mode fallback:', error);
          // Fall back to fun mode logic
          const orQuestionResult = handleOrQuestion(question);
          if (orQuestionResult) {
            setAnswer(orQuestionResult.answer);
            setResponseType(getImageTypeFromTemplate(orQuestionResult.templateType));
          } else {
            const randomResponse = getWeightedResponse(character.type);
            const formattedAnswer = formatYesNoMaybeResponse(randomResponse, character.type);
            const imageType = getImageTypeFromTemplate(randomResponse);
            setResponseType(imageType);
            setAnswer(formattedAnswer);
          }
          setAiResponse(null);
        }
      } else {
        // Fun mode logic - unchanged
        const orQuestionResult = handleOrQuestion(question);
        if (orQuestionResult) {
          setAnswer(orQuestionResult.answer);
          setResponseType(getImageTypeFromTemplate(orQuestionResult.templateType));
        } else {
          const randomResponse = getWeightedResponse(character.type);
          const formattedAnswer = formatYesNoMaybeResponse(randomResponse, character.type);
          const imageType = getImageTypeFromTemplate(randomResponse);
          setResponseType(imageType);
          setAnswer(formattedAnswer);
        }
      }
      
      setIsThinking(false);
      setIsRevealing(false);

      // Play response sound
      audioManager.playSound('response', character.type);
    };

    // Start generation with appropriate delay
    if (mode === 'fun') {
      const timer = setTimeout(generateAnswer, thinkingDuration);
      return () => clearTimeout(timer);
    } else {
      generateAnswer();
    }
  }, [character, question, mode, questionType]);

  return {
    answer,
    isRevealing,
    isThinking,
    responseType,
    aiResponse
  };
};
