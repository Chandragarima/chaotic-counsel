
import { useState, useEffect } from 'react';
import { Character } from '../types';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { audioManager } from '../utils/audioManager';
import { formatChoiceResponse, formatYesNoMaybeResponse } from '../utils/responseTemplates';
import { getImageTypeFromTemplate } from '../utils/responseTypeDetector';
import { ImageType } from '../utils/personalityImageManager';

interface UseAnswerGenerationProps {
  character: Character;
  question: string;
}

export const useAnswerGeneration = ({ character, question }: UseAnswerGenerationProps) => {
  const [answer, setAnswer] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [responseType, setResponseType] = useState<ImageType>('thinking');

  const theme = getPersonalityTheme(character.type);

  // Improved random selection to avoid patterns
  const getRandomChoice = <T extends any>(array: readonly T[]): T => {
    // Use crypto.getRandomValues for better randomness if available
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      return array[randomArray[0] % array.length];
    }
    // Fallback to Math.random with additional entropy
    const entropy = Date.now() % 1000 + Math.random() * 1000;
    return array[Math.floor(entropy) % array.length];
  };

  // Function to detect and handle "or" questions
  const handleOrQuestion = (question: string): { answer: string; templateType: 'choice' } | null => {
    const lowerQuestion = question.toLowerCase();

    // Handle general "or" questions
    if (lowerQuestion.includes(' or ')) {
      const orIndex = lowerQuestion.indexOf(' or ');
      const beforeOr = question.substring(0, orIndex).trim();
      const afterOr = question.substring(orIndex + 4).trim();
      
      // Extract options more intelligently
      let options = [];
      
      // Simple split on "or" and clean up
      const parts = question.split(/\s+or\s+/i);
      if (parts.length >= 2) {
        // Clean up the first option (remove question words)
        const firstOption = parts[0].replace(/^(should i|do i|can i|will i|shall i|would i)\s+/i, '').trim();
        options.push(firstOption);
        
        // Add remaining options
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
    
    // Check if it's a cuisine question
    else if (lowerQuestion.includes('cuisine')) {
      const cuisines = ['Italian', 'Thai', 'Mexican', 'Japanese', 'Indian', 'Chinese', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek', 'French', 'Lebanese', 'Brazilian', 'Ethiopian', 'Moroccan'];
      const randomCuisine = getRandomChoice(cuisines);
      return {
        answer: formatChoiceResponse(randomCuisine, character.type),
        templateType: 'choice'
      };
    }
    
    // Check if it's a dinner/meal question
    else if (lowerQuestion.includes('dinner') || lowerQuestion.includes('lunch') || lowerQuestion.includes('hungry')) {
      const meals = ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Ramen', 'Burgers', 'Poke Bowl', 'Stir Fry', 'Sandwich', 'Salad', 'Curry', 'Dumplings', 'Pho', 'Bibimbap', 'Shawarma'];
      const randomMeal = getRandomChoice(meals);
      return {
        answer: formatChoiceResponse(randomMeal, character.type),
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

  useEffect(() => {
    setIsThinking(true);
    setIsRevealing(true);
    setResponseType('thinking');
    
    // NO AUDIO during thinking phase - removed the thinking sound
    
    // Personality-specific thinking duration
    // const thinkingDuration = character.type === 'lazy-panda' ? 6000 : 
    //                        character.type === 'anxious-bunny' ? 800 : 
    //                        character.type === 'wise-owl' ? 2500 : 1500;

    const thinkingDuration =3000;

    setTimeout(() => {
      setIsThinking(false);
      
      // First check if it's an "or" question or specific type question
      const orResult = handleOrQuestion(question);
      
      let formattedAnswer = '';
      let templateType: 'yes' | 'no' | 'maybe' | 'choice';
      
      if (orResult) {
        formattedAnswer = orResult.answer;
        templateType = orResult.templateType;
      } else {
        // Regular yes/no/maybe logic for other questions with improved randomization
        const responses = ['yes', 'no', 'maybe'] as const;
        const randomResponse = getRandomChoice(responses);
        templateType = randomResponse;
        
        // Use the new modular response system
        formattedAnswer = formatYesNoMaybeResponse(randomResponse, character.type);
      }
      
      // Get image type from template type
      const imageType = getImageTypeFromTemplate(templateType);
      setResponseType(imageType);
      
      setAnswer(formattedAnswer);
      setIsRevealing(false);
      
      // Play response sound when the answer is provided
      audioManager.playSound('response', character.type, formattedAnswer);
    }, thinkingDuration);
  }, [character, question, character.type]);

  return {
    answer,
    isRevealing,
    isThinking,
    responseType
  };
};
