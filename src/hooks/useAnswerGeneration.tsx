
import { useState, useEffect } from 'react';
import { Character, QuestionMode, AIResponse, ImageType } from '../types';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { audioManager } from '../utils/audioManager';
import { formatYesNoMaybeResponse } from '../utils/responseTemplates';
import { getImageTypeFromTemplate } from '../utils/responseTypeDetector';
import { analyzeQuestion } from '../utils/questionTypeDetector';
import { getWeightedResponse } from '../utils/randomUtils';
import { handleOrQuestion } from '../utils/questionHandler';
import { useAIResponse } from './useAIResponse';

interface UseAnswerGenerationProps {
  character: Character;
  question: string;
  mode?: QuestionMode;
  questionType?: string;
}

export const useAnswerGeneration = ({ character, question, mode = 'fun', questionType }: UseAnswerGenerationProps) => {
  const [answer, setAnswer] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [responseType, setResponseType] = useState<ImageType>('thinking');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const theme = getPersonalityTheme(character.type);
  const { getAIResponse } = useAIResponse();

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
      // Serious mode logic for ALL characters
      if (mode === 'serious') {
        console.log(`Using serious mode for ${character.type} with intelligent analysis`);
        try {
          // Analyze the question to determine its type
          const analysis = analyzeQuestion(question);
          console.log('Question analysis:', analysis);
          
          // Use the detected category for AI response
          const aiResult = await getAIResponse(question, character, analysis.category);
          console.log('Setting AI response:', aiResult);
          setAiResponse(aiResult);
          
          // Set response type based on the detected category
          const responseImageType = analysis.category === 'binary' ? 'yes' : 
                                 analysis.category === 'choice' ? 'choice' : 'maybe';
          setResponseType(responseImageType);
          
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
        // Fun mode for all characters - existing logic
        const orQuestionResult = handleOrQuestion(question, character.type);
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

      // Play response sound when the answer is provided
      audioManager.playSound('response', character.type);
    };

    // Start the answer generation after the thinking duration
    const timer = setTimeout(generateAnswer, thinkingDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [character, question, mode, questionType, getAIResponse]);

  return {
    answer,
    isRevealing,
    isThinking,
    responseType,
    aiResponse
  };
};
