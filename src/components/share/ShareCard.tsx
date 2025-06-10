import { Character, AIResponse } from '../../types';
import { Card } from '@/components/ui/card';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { personalityImageManager } from '../../utils/personalityImageManager';
import { useEffect, useState } from 'react';

interface ShareCardProps {
  character: Character;
  question: string;
  answer?: string;
  aiResponse?: AIResponse | null;
  isGenerating?: boolean;
}

const ShareCard = ({ character, question, answer, aiResponse, isGenerating = false }: ShareCardProps) => {
  const theme = getPersonalityTheme(character.type);
  const [characterImage, setCharacterImage] = useState<string | null>(null);

  useEffect(() => {
    // Get appropriate character image based on response
    let imageType: 'yes' | 'no' | 'maybe' | 'choice' = 'choice';
    
    if (aiResponse?.responseType === 'binary') {
      imageType = 'maybe'; // Default for binary
    } else if (aiResponse?.responseType === 'choice') {
      imageType = 'choice';
    } else {
      imageType = 'choice'; // Default for other types
    }

    const image = personalityImageManager.getRandomImage(character.type, imageType);
    setCharacterImage(image);
  }, [character.type, aiResponse]);

  const getDisplayAnswer = () => {
    if (aiResponse) {
      switch (aiResponse.responseType) {
        case 'binary':
          return aiResponse.personalityRecommendation;
        case 'advice':
          return aiResponse.mainAdvice;
        case 'recommendation':
          return aiResponse.topRecommendation;
        case 'analysis':
          return aiResponse.conclusion;
        case 'choice':
          return aiResponse.recommendedChoice;
        default:
          return answer || "The universe whispers its wisdom...";
      }
    }
    return answer || "The universe whispers its wisdom...";
  };

  return (
    <div 
      id="share-card" 
      className={`w-[1080px] h-[1080px] relative ${isGenerating ? 'fixed -top-[2000px] left-0 z-[-1]' : ''}`}
      style={{ 
        background: `linear-gradient(135deg, ${theme.colors.background.replace('from-slate-600/95 via-', '').replace('/15 to-slate-600/95', '')})` 
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`w-full h-full ${theme.effects.backgroundPattern}`}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-16 h-full flex flex-col items-center justify-between">
        {/* Header */}
        <div className="text-center w-full">
          <div className={`inline-block px-8 py-4 rounded-full bg-gradient-to-r ${theme.colors.primary}`}>
            <h1 className={`text-white text-4xl ${theme.fonts.heading}`}>
              Mystical Guidance
            </h1>
          </div>
        </div>

        {/* Character and Content */}
        <div className="flex flex-col items-center space-y-8 flex-grow justify-center w-full">
          {/* Character Image */}
          {characterImage && (
            <div className={`relative w-48 h-48 rounded-full overflow-hidden shadow-2xl`}>
              <img 
                src={characterImage} 
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Character Name */}
          <h2 className={`text-6xl ${theme.fonts.heading} ${theme.colors.text} text-center`}>
            {character.name}
          </h2>

          {/* Question */}
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-8 w-full max-w-4xl`}>
            <p className={`${theme.colors.text} text-center text-3xl leading-relaxed ${theme.fonts.body}`}>
              "{question}"
            </p>
          </Card>

          {/* Answer */}
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.primary} p-8 w-full max-w-4xl shadow-2xl`}>
            <p className="text-white text-center text-3xl leading-relaxed font-medium">
              "{getDisplayAnswer()}"
            </p>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 w-full">
          <div className={`${theme.colors.text} text-2xl ${theme.fonts.body}`}>
            Get your own mystical guidance
          </div>
          <div className={`text-4xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}>
            {window.location.origin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
