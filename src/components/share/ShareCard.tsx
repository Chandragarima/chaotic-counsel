
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
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    console.log('ShareCard: Loading image for character:', character.type, 'with response type:', aiResponse?.responseType);
    
    // Always try to get a 'yes' image first as it's most positive and available for all personalities
    let image = personalityImageManager.getRandomImage(character.type, 'yes');
    console.log('ShareCard: Selected yes image:', image);
    
    // If no 'yes' image, try 'choice' as fallback
    if (!image) {
      console.log('ShareCard: No yes image found, trying choice type');
      image = personalityImageManager.getRandomImage(character.type, 'choice');
    }
    
    // If still no image, try 'maybe' type
    if (!image) {
      console.log('ShareCard: No choice image found, trying maybe type');
      image = personalityImageManager.getRandomImage(character.type, 'maybe');
    }
    
    // Final fallback to character.image from character data
    if (!image && character.image) {
      console.log('ShareCard: Using character.image as final fallback:', character.image);
      image = character.image;
    }
    
    console.log('ShareCard: Final selected image:', image);
    setCharacterImage(image);
    setImageLoadError(false);
  }, [character.type, character.image, aiResponse]);

  const handleImageError = () => {
    console.error('ShareCard: Image failed to load, trying character fallback image');
    setImageLoadError(true);
    if (character.image && character.image !== characterImage) {
      setCharacterImage(character.image);
    } else {
      // If character image also fails, set to null to hide the image
      setCharacterImage(null);
    }
  };

  const getDisplayAnswer = () => {
    if (aiResponse) {
      switch (aiResponse.responseType) {
        case 'binary':
          return aiResponse.personalityRecommendation || "Trust your instincts on this one.";
        case 'advice':
          return aiResponse.mainAdvice || "Consider all perspectives before deciding.";
        case 'recommendation':
          return aiResponse.topRecommendation || "Follow your heart's guidance.";
        case 'analysis':
          return aiResponse.conclusion || "Reflect deeply on this matter.";
        case 'choice':
          return aiResponse.recommendedChoice || "Choose what aligns with your values.";
        default:
          return answer || "The universe whispers its wisdom...";
      }
    }
    return answer || "The universe whispers its wisdom...";
  };

  const cleanDisplayAnswer = () => {
    const rawAnswer = getDisplayAnswer();
    if (!rawAnswer || typeof rawAnswer !== 'string') {
      return "The universe whispers its wisdom...";
    }
    
    // Clean the text properly but preserve readability
    return rawAnswer
      .replace(/[^\w\s.,!?'"()-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const cleanQuestion = () => {
    if (!question || typeof question !== 'string') {
      return "What guidance do you seek?";
    }
    
    return question
      .replace(/[^\w\s.,!?'"()-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
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

  const getSecondaryColor = () => {
    const colorMap: Record<string, string> = {
      'sassy-cat': '#be185d',
      'wise-owl': '#d97706',
      'lazy-panda': '#059669',
      'sneaky-snake': '#ea580c',
      'people-pleaser-pup': '#ca8a04'
    };
    return colorMap[character.type] || colorMap['wise-owl'];
  };

  const cardStyle: React.CSSProperties = {
    width: '1080px',
    height: '1350px',
    background: `linear-gradient(135deg, 
      #0f172a 0%, 
      #1e293b 15%, 
      ${getPrimaryColor()}15 30%, 
      #1e293b 60%, 
      #0f172a 100%)`,
    position: isGenerating ? 'fixed' : 'relative',
    top: isGenerating ? '-2000px' : 'auto',
    left: isGenerating ? '0' : 'auto',
    zIndex: isGenerating ? -1 : 'auto',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    color: '#f8fafc',
    overflow: 'hidden',
    padding: '80px 60px',
    boxSizing: 'border-box',
    position: 'relative' as const,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    width: '100%',
    maxWidth: '960px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '56px',
    fontWeight: '700',
    fontFamily: "'Playfair Display', Georgia, serif",
    textAlign: 'center',
    margin: '0',
    background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()}, #ffffff)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '1px',
    lineHeight: '1.1',
    textShadow: `0 0 30px ${getPrimaryColor()}60`,
    position: 'relative',
  };

  const avatarContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const avatarStyle: React.CSSProperties = {
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `6px solid transparent`,
    background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()})`,
    padding: '6px',
    boxShadow: `
      0 0 60px ${getPrimaryColor()}40,
      0 20px 40px rgba(0, 0, 0, 0.3),
      inset 0 0 0 2px rgba(255, 255, 255, 0.1)
    `,
    position: 'relative',
  };

  const avatarImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  };

  const questionContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '850px',
  };

  const questionStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, 
      rgba(255, 255, 255, 0.12) 0%, 
      rgba(255, 255, 255, 0.08) 50%, 
      rgba(255, 255, 255, 0.05) 100%)`,
    backdropFilter: 'blur(20px)',
    border: `2px solid ${getPrimaryColor()}30`,
    borderRadius: '32px',
    padding: '40px 48px',
    fontSize: '28px',
    lineHeight: '1.5',
    textAlign: 'center',
    width: '100%',
    fontStyle: 'italic',
    color: '#e2e8f0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
    boxSizing: 'border-box',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    position: 'relative',
  };

  const answerContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '850px',
  };

  const answerStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, 
      ${getPrimaryColor()}f0 0%, 
      ${getPrimaryColor()}e0 30%, 
      ${getSecondaryColor()}e0 70%, 
      ${getSecondaryColor()}f0 100%)`,
    color: '#ffffff',
    borderRadius: '32px',
    padding: '48px 52px',
    fontSize: '32px',
    lineHeight: '1.4',
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
    boxShadow: `
      0 30px 60px ${getPrimaryColor()}40,
      0 15px 30px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2)
    `,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
    boxSizing: 'border-box',
    position: 'relative',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '60px',
    width: '100%',
    position: 'relative',
    zIndex: 2,
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '500',
    color: '#94a3b8',
    opacity: 0.8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    letterSpacing: '0.5px',
  };

  const decorativeElement1Style: React.CSSProperties = {
    position: 'absolute',
    top: '120px',
    right: '80px',
    width: '120px',
    height: '120px',
    background: `radial-gradient(circle, ${getPrimaryColor()}20, transparent 70%)`,
    borderRadius: '50%',
    filter: 'blur(40px)',
    zIndex: 1,
  };

  const decorativeElement2Style: React.CSSProperties = {
    position: 'absolute',
    bottom: '200px',
    left: '60px',
    width: '160px',
    height: '160px',
    background: `radial-gradient(circle, ${getSecondaryColor()}15, transparent 70%)`,
    borderRadius: '50%',
    filter: 'blur(50px)',
    zIndex: 1,
  };

  return (
    <div 
      id="share-card" 
      style={cardStyle}
    >
      {/* Decorative background elements */}
      <div style={decorativeElement1Style}></div>
      <div style={decorativeElement2Style}></div>

      <div style={contentStyle}>
        <h2 style={headerStyle}>
          Asked {character.name}
        </h2>

        <div style={questionContainerStyle}>
          <div style={questionStyle}>
            "{cleanQuestion()}"
          </div>
        </div>

        {characterImage && (
          <div style={avatarContainerStyle}>
            <div style={avatarStyle}>
              <img 
                src={characterImage} 
                alt={character.name}
                onError={handleImageError}
                style={avatarImageStyle}
              />
            </div>
          </div>
        )}

        <div style={answerContainerStyle}>
          <div style={answerStyle}>
            "{cleanDisplayAnswer()}"
          </div>
        </div>
      </div>

      <div style={footerStyle}>
        <div style={footerTextStyle}>
          chaoticcounsel.com
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
