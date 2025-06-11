
import { Character, AIResponse } from '../../types';
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
    let imageType: 'yes' | 'no' | 'maybe' | 'choice' = 'choice';
    
    if (aiResponse?.responseType === 'binary') {
      imageType = 'maybe';
    } else if (aiResponse?.responseType === 'choice') {
      imageType = 'choice';
    } else {
      imageType = 'choice';
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

  // Get theme colors for inline styles
  const getGradientBackground = () => {
    const colorMap: Record<string, string> = {
      'sassy-cat': 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(131, 24, 67, 0.3) 20%, rgba(30, 41, 59, 0.95) 100%)',
      'wise-owl': 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(146, 64, 14, 0.3) 20%, rgba(30, 41, 59, 0.95) 100%)',
      'lazy-panda': 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(5, 150, 105, 0.3) 20%, rgba(30, 41, 59, 0.95) 100%)',
      'sneaky-snake': 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(194, 65, 12, 0.3) 20%, rgba(30, 41, 59, 0.95) 100%)',
      'people-pleaser-pup': 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(202, 138, 4, 0.3) 20%, rgba(30, 41, 59, 0.95) 100%)'
    };
    return colorMap[character.type] || colorMap['wise-owl'];
  };

  const getPrimaryColor = () => {
    const colorMap: Record<string, string> = {
      'sassy-cat': '#ec4899',
      'wise-owl': '#f59e0b',
      'lazy-panda': '#10b981',
      'sneaky-snake': '#f97316',
      'people-pleaser-pup': '#eab308'
    };
    return colorMap[character.type] || colorMap['wise-owl'];
  };

  const cardStyle: React.CSSProperties = {
    width: '1080px',
    height: '1080px',
    background: getGradientBackground(),
    position: isGenerating ? 'fixed' : 'relative',
    top: isGenerating ? '-2000px' : 'auto',
    left: isGenerating ? '0' : 'auto',
    zIndex: isGenerating ? -1 : 'auto',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
    color: '#f8fafc',
    overflow: 'hidden',
    padding: '80px 60px'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px'
  };

  const avatarStyle: React.CSSProperties = {
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `4px solid ${getPrimaryColor()}`,
    boxShadow: `0 0 40px ${getPrimaryColor()}60`
  };

  const characterNameStyle: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: '600',
    fontFamily: 'Playfair Display, serif',
    textAlign: 'center',
    margin: '0',
    textShadow: `0 0 20px ${getPrimaryColor()}80`
  };

  const questionStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${getPrimaryColor()}30`,
    borderRadius: '20px',
    padding: '35px 45px',
    fontSize: '28px',
    lineHeight: '1.4',
    textAlign: 'center',
    maxWidth: '800px',
    fontStyle: 'italic',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '120px'
  };

  const answerStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${getPrimaryColor()}dd, ${getPrimaryColor()}bb)`,
    color: 'white',
    borderRadius: '20px',
    padding: '40px 50px',
    fontSize: '32px',
    lineHeight: '1.3',
    textAlign: 'center',
    maxWidth: '800px',
    fontWeight: '500',
    boxShadow: `0 20px 40px ${getPrimaryColor()}30`
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '60px'
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '500',
    color: '#cbd5e1',
    opacity: 0.8
  };

  return (
    <div 
      id="share-card" 
      style={cardStyle}
    >
      {/* Main Content */}
      <div style={contentStyle}>
        {/* Character Image */}
        {characterImage && (
          <div style={avatarStyle}>
            <img 
              src={characterImage} 
              alt={character.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Character Name */}
        <h2 style={characterNameStyle}>
          You Asked {character.name}
        </h2>

        {/* Question */}
        <div style={questionStyle}>
          "{question}"
        </div>

        {/* Answer */}
        <div style={answerStyle}>
          "{getDisplayAnswer()}"
        </div>
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <div style={footerTextStyle}>
          chaoticcounsel.com
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
