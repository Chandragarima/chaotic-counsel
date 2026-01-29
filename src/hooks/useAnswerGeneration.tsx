import { useState, useEffect } from 'react';
import { Character, QuestionMode, AIResponse, LegacyAIResponse } from '../types';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { audioManager } from '../utils/audioManager';
import { formatChoiceResponse, formatYesNoMaybeResponse } from '../utils/responseTemplates';
import { getImageTypeFromTemplate } from '../utils/responseTypeDetector';
import { ImageType } from '../utils/personalityImageManager';
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

  // Enhanced cryptographic random number generator
  const getSecureRandom = (): number => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      // Use multiple 32-bit values for better entropy
      const randomArray = new Uint32Array(4);
      window.crypto.getRandomValues(randomArray);
      
      // Combine multiple entropy sources
      const crypto1 = randomArray[0] / (0xffffffff + 1);
      const crypto2 = randomArray[1] / (0xffffffff + 1);
      const crypto3 = randomArray[2] / (0xffffffff + 1);
      const crypto4 = randomArray[3] / (0xffffffff + 1);
      
      // Mix with performance timing for additional entropy
      const performanceEntropy = typeof performance !== 'undefined' ? 
        (performance.now() % 1000) / 1000 : 0;
      
      // Combine all entropy sources with different weights
      const combined = (crypto1 * 0.4 + crypto2 * 0.3 + crypto3 * 0.2 + crypto4 * 0.1 + performanceEntropy * 0.05) % 1;
      
      console.log('Using crypto randomness:', { crypto1, crypto2, crypto3, crypto4, performanceEntropy, combined });
      return combined;
    } else {
      // Fallback with multiple entropy sources for non-crypto environments
      const timeEntropy1 = (Date.now() % 10007) / 10007; // Use prime modulo
      const timeEntropy2 = (Date.now() % 7919) / 7919;   // Another prime
      const mathRandom1 = Math.random();
      const mathRandom2 = Math.random();
      const mathRandom3 = Math.random();
      const performanceEntropy = typeof performance !== 'undefined' ? 
        (performance.now() % 1009) / 1009 : Math.random(); // Prime modulo
      
      // Complex mixing function to avoid patterns
      const mixed = (
        (timeEntropy1 * 0.2) +
        (timeEntropy2 * 0.15) +
        (mathRandom1 * 0.25) +
        (mathRandom2 * 0.2) +
        (mathRandom3 * 0.15) +
        (performanceEntropy * 0.05)
      ) % 1;
      
      console.log('Using fallback randomness:', { 
        timeEntropy1, timeEntropy2, mathRandom1, mathRandom2, mathRandom3, 
        performanceEntropy, mixed 
      });
      return mixed;
    }
  };

  // Fisher-Yates shuffle for additional randomness
  const shuffleArray = <T extends any>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Use secure random for shuffle
      const j = Math.floor(getSecureRandom() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    console.log('Shuffled array:', { original: array, shuffled });
    return shuffled;
  };

  // Improved random selection with bias elimination
  const getRandomChoice = <T extends any>(array: readonly T[]): T => {
    if (array.length === 0) return array[0];
    if (array.length === 1) return array[0];
    
    // Convert to mutable array for potential shuffling
    let choices = [...array];
    
    // Occasionally shuffle the array for additional randomness (20% chance)
    if (getSecureRandom() < 0.2) {
      choices = shuffleArray(choices);
      console.log('Applied shuffle to choices');
    }
    
    // Use secure random to select index
    const randomValue = getSecureRandom();
    const index = Math.floor(randomValue * choices.length);
    
    // Ensure index is within bounds (extra safety)
    const safeIndex = Math.max(0, Math.min(index, choices.length - 1));
    
    console.log('Random choice selection:', {
      arrayLength: choices.length,
      randomValue,
      calculatedIndex: index,
      safeIndex,
      selected: choices[safeIndex],
      allChoices: choices
    });
    
    return choices[safeIndex];
  };

  const getWeightedResponse = (characterType: Character['type']): 'yes' | 'no' | 'maybe' => {
    const weights = PERSONALITY_WEIGHTS[characterType];
    const random = getSecureRandom() * 100;
    
    console.log('Weighted response selection:', {
      characterType,
      weights,
      randomValue: random
    });
    
    if (random < weights.yes) {
      return 'yes';
    } else if (random < weights.yes + weights.no) {
      return 'no';
    } else {
      return 'maybe';
    }
  };

  // Function to detect and handle "or" questions - PRIORITIZED DETECTION
  const handleOrQuestion = (question: string): { answer: string; templateType: 'choice' } | null => {
    const lowerQuestion = question.toLowerCase();
    
    // PRIORITY CHECK: Handle "or" questions FIRST (including those with binary prefixes)
    if (lowerQuestion.includes(' or ')) {
      console.log('Detected OR question:', question);
      
      // Split on ' or ' and clean up the options
      let parts = question.split(' or ');
      
      // Handle cases like "Do I eat X or Y?" - extract the options properly
      if (parts.length >= 2) {
        let options: string[] = [];
        
        // For questions starting with "Do I", "Should I", etc., extract the action parts
        if (lowerQuestion.startsWith('do i ') || lowerQuestion.startsWith('should i ')) {
          // Extract the base action from the first part
          const firstPart = parts[0].toLowerCase();
          let baseAction = '';
          
          if (firstPart.startsWith('do i ')) {
            baseAction = firstPart.replace('do i ', '').trim();
          } else if (firstPart.startsWith('should i ')) {
            baseAction = firstPart.replace('should i ', '').trim();
          }
          
          // First option is the base action
          options.push(baseAction);
          
          // Add remaining options (remove any trailing punctuation)
          for (let i = 1; i < parts.length; i++) {
            const cleanOption = parts[i].replace(/[?.!]*$/, '').trim();
            options.push(cleanOption);
          }
        } else {
          // For other "or" questions, use parts as-is
          options = parts.map(part => part.replace(/[?.!]*$/, '').trim());
        }
        
        if (options.length >= 2 && options.every(opt => opt.length > 0)) {
          const randomOption = getRandomChoice(options);
          console.log('OR question final selection:', { 
            originalQuestion: question,
            extractedOptions: options, 
            selectedOption: randomOption 
          });
          return {
            answer: formatChoiceResponse(randomOption, character.type),
            templateType: 'choice'
          };
        }
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
      console.log('🤖 Calling AI decision helper with timeout protection:', { 
        question, 
        character: character.type, 
        category 
      });
      
      const aiPromise = fetch('/.netlify/functions/ai-decision-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          character: character.type,
          category
        })
      }).then(async (res) => {
        if (!res.ok) throw new Error(`Function error: ${res.status}`);
        return res.json();
      });

      const data = await Promise.race([aiPromise, timeoutPromise]);

      console.log('📥 AI response received:', { data });

      if (!data || typeof data !== 'object' || !data.responseType) {
        throw new Error('Invalid AI response structure');
      }

      return data;
    } catch (error: any) {
      console.error('🚨 AI response error caught:', {
        message: error?.message,
        name: error?.name,
        status: error?.status,
        statusCode: error?.statusCode,
        context: error?.context,
        stack: error?.stack,
        fullError: error
      });
      
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
    const thinkingDuration = mode === 'fun' ? 3000 : 0;

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
        // Fun mode logic - PRIORITIZE OR QUESTIONS
        const orQuestionResult = handleOrQuestion(question);
        if (orQuestionResult) {
          console.log('Using OR question result:', orQuestionResult);
          setAnswer(orQuestionResult.answer);
          setResponseType(getImageTypeFromTemplate(orQuestionResult.templateType));
        } else {
          console.log('Using yes/no/maybe logic for:', question);
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
