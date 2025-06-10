
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
      <div className="relative z-10 p-12 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="text-center">
          <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${theme.colors.primary}`}>
            <h1 className={`text-white text-2xl ${theme.fonts.heading}`}>
              Mystical Guidance
            </h1>
          </div>
        </div>

        {/* Character and Content */}
        <div className="flex-grow flex flex-col items-center justify-center space-y-6">
          {/* Character Image */}
          {characterImage && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl">
              <img 
                src={characterImage} 
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Character Name */}
          <h2 className={`text-4xl ${theme.fonts.heading} ${theme.colors.text} text-center`}>
            {character.name}
          </h2>

          {/* Question */}
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-6 w-full max-w-3xl`}>
            <p className={`${theme.colors.text} text-center text-xl leading-relaxed ${theme.fonts.body}`}>
              "{question}"
            </p>
          </Card>

          {/* Answer */}
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.primary} p-6 w-full max-w-3xl shadow-xl`}>
            <p className="text-white text-center text-xl leading-relaxed font-medium">
              "{getDisplayAnswer()}"
            </p>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center space-y-3">
          <div className={`${theme.colors.text} text-xl ${theme.fonts.body} font-medium`}>
            Meet your chaotic counsel today!
          </div>
          <div className={`text-2xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}>
            {window.location.origin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
