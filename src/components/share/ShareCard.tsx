
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
      'sassy-cat': 'linear-gradient(135deg, #1e293b 0%, #831843 20%, #1e293b 100%)',
      'wise-owl': 'linear-gradient(135deg, #1e293b 0%, #92400e 20%, #1e293b 100%)',
      'lazy-panda': 'linear-gradient(135deg, #1e293b 0%, #059669 20%, #1e293b 100%)',
      'sneaky-snake': 'linear-gradient(135deg, #1e293b 0%, #c2410c 20%, #1e293b 100%)',
      'people-pleaser-pup': 'linear-gradient(135deg, #1e293b 0%, #ca8a04 20%, #1e293b 100%)'
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
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '60px 60px 40px 60px'
  };

  const titleStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, ${getPrimaryColor()}, ${getPrimaryColor()}dd)`,
    color: 'white',
    padding: '20px 40px',
    borderRadius: '50px',
    fontSize: '36px',
    fontWeight: '600',
    fontFamily: 'Playfair Display, serif',
    display: 'inline-block',
    boxShadow: `0 0 30px ${getPrimaryColor()}40`
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 60px',
    gap: '50px'
  };

  const avatarStyle: React.CSSProperties = {
    width: '200px',
    height: '200px',
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
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${getPrimaryColor()}40`,
    borderRadius: '20px',
    padding: '30px 40px',
    fontSize: '28px',
    lineHeight: '1.4',
    textAlign: 'center',
    maxWidth: '800px',
    fontStyle: 'italic',
    color: '#e2e8f0'
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
    padding: '40px 60px 60px 60px',
    borderTop: `1px solid ${getPrimaryColor()}20`
  };

  const footerTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#f1f5f9'
  };

  const footerUrlStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    background: `linear-gradient(90deg, ${getPrimaryColor()}, ${getPrimaryColor()}cc)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <div 
      id="share-card" 
      style={cardStyle}
    >
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          Mystical Guidance
        </div>
      </div>

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
        <div style={footerTitleStyle}>
          Meet your chaotic counsel today!
        </div>
        <div style={footerUrlStyle}>
          {window.location.origin}
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
