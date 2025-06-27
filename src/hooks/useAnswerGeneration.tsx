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
    
    // Handle "or" questions first
    if (lowerQuestion.includes(' or ')) {
      const options = question.split(' or ').map(option => option.trim());
      if (options.length >= 2) {
        const randomOption = getRandomChoice(options);
        return {
          answer: formatChoiceResponse(randomOption, character.type),
          templateType: 'choice'
        };
      }
    }
    
    // Simple, natural food question detection
    const isFoodQuestion = (text: string): boolean => {
      const foodKeywords = [
        'what to eat', 'what should i eat', 'what to order', 'what should i order',
        'what to cook', 'what should i cook', 'what to make', 'what should i make',
        'what to have', 'what should i have', 'what to try', 'what should i try',
        'hungry', 'craving', 'in the mood for', 'feel like', 'want to eat', 'need to eat',
        'dinner', 'lunch', 'breakfast', 'snack', 'meal', 'food', 'cuisine', 'dessert'
      ];
      
      return foodKeywords.some(keyword => text.includes(keyword));
    };

    // Handle food questions with natural responses
    const handleFoodQuestion = (question: string): { answer: string; templateType: 'choice' } | null => {
      const lowerQ = question.toLowerCase();
      
      // Cuisine questions
      if (lowerQ.includes('cuisine') || lowerQ.includes('type of food') || lowerQ.includes('what kind of food')) {
        const cuisines = ['Italian', 'Thai', 'Mexican', 'Japanese', 'Indian', 'Chinese', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek', 'French', 'Lebanese', 'Ethiopian', 'Spanish', 'American', 'Moroccan', 'Brazilian', 'Peruvian', 'Filipino'];
        const randomCuisine = getRandomChoice(cuisines);
        return {
          answer: formatChoiceResponse(randomCuisine, character.type),
          templateType: 'choice'
        };
      }
      
      // Dessert questions
      if (lowerQ.includes('dessert') || lowerQ.includes('sweet') || lowerQ.includes('treat')) {
        const desserts = ['Ice Cream', 'Cake', 'Milkshake', 'Pudding', 'Cheesecake', 'Cupcakes', 'Bubble Tea', 'Tiramisu', 'Donuts', 'Pie', 'Cookies', 'Chocolates', 'Pastries', 'Brownies', 'Macarons', 'Gelato', 'Sorbet', 'Creme Brulee', 'Chocolate Mousse', 'Apple Pie'];
        const randomDessert = getRandomChoice(desserts);
        return {
          answer: formatChoiceResponse(randomDessert, character.type),
          templateType: 'choice'
        };
      }
      
      // Meal time specific questions
      if (lowerQ.includes('breakfast')) {
        const breakfast = ['Pancakes', 'Waffles', 'Omelette', 'Cereal', 'Toast', 'Bagel', 'Smoothie Bowl', 'French Toast', 'Bacon & Eggs', 'Oatmeal', 'Yogurt Parfait', 'Breakfast Burrito'];
        const randomBreakfast = getRandomChoice(breakfast);
        return {
          answer: formatChoiceResponse(randomBreakfast, character.type),
          templateType: 'choice'
        };
      }
      
      if (lowerQ.includes('lunch')) {
        const lunch = ['Sandwich', 'Salad', 'Soup', 'Pasta', 'Pizza', 'Burger', 'Sushi', 'Tacos', 'Bowl', 'Wrap', 'Panini', 'Quesadilla'];
        const randomLunch = getRandomChoice(lunch);
        return {
          answer: formatChoiceResponse(randomLunch, character.type),
          templateType: 'choice'
        };
      }
      
      if (lowerQ.includes('dinner')) {
        const dinner = ['Steak', 'Pasta', 'Curry', 'Stir Fry', 'Roast Chicken', 'Fish', 'Pizza', 'Burgers', 'Tacos', 'Sushi', 'Ramen', 'Pho', 'Biryani', 'Paella', 'Lasagna'];
        const randomDinner = getRandomChoice(dinner);
        return {
          answer: formatChoiceResponse(randomDinner, character.type),
          templateType: 'choice'
        };
      }
      
      if (lowerQ.includes('snack')) {
        const snacks = ['Chips', 'Popcorn', 'Nuts', 'Fruit', 'Crackers', 'Cheese', 'Yogurt', 'Granola Bar', 'Trail Mix', 'Hummus', 'Guacamole', 'Salsa'];
        const randomSnack = getRandomChoice(snacks);
        return {
          answer: formatChoiceResponse(randomSnack, character.type),
          templateType: 'choice'
        };
      }
      
      // General food questions (fallback for any food-related question)
      // Removed foods that are already in specific meal arrays to reduce repetition
      const generalFood = ['Poke Bowl', 'Biryani', 'Curry', 'Dumplings', 'Pho', 'Bibimbap', 'Shawarma', 'Chicken Wings', 'Fish & Chips', 'Pad Thai', 'Sushi Roll', 'Burrito', 'Paella', 'Fish', 'Steak'];
      const randomFood = getRandomChoice(generalFood);
      return {
        answer: formatChoiceResponse(randomFood, character.type),
        templateType: 'choice'
      };
    };

    // Check if it's a food question
    if (isFoodQuestion(lowerQuestion)) {
      const foodResponse = handleFoodQuestion(question);
      if (foodResponse) {
        return foodResponse;
      }
    }

    // Handle movie/genre questions
    if (lowerQuestion.includes('movie') || lowerQuestion.includes('genre') || lowerQuestion.includes('watch') || lowerQuestion.includes('show')) {
      const movies = ['Thriller', 'Horror', 'RomCom', 'Documentary', 'Action', 'Drama', 'Comedy', 'Romance', 'Feel Good', 'Sci-Fi', 'Fantasy', 'Mystery', 'Adventure', 'Animation'];
      const randomMovie = getRandomChoice(movies);
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
    const thinkingDuration = mode === 'fun' ? 3000 : 0; // Reduced from 3s to 2s for fun mode

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
