
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
    
    let imageType: 'yes' | 'no' | 'maybe' | 'choice' = 'choice';
    
    if (aiResponse?.responseType === 'binary') {
      imageType = 'maybe';
    } else if (aiResponse?.responseType === 'choice') {
      imageType = 'choice';
    } else {
      imageType = 'choice';
    }

    // Try to get the random image
    let image = personalityImageManager.getRandomImage(character.type, imageType);
    console.log('ShareCard: Selected image:', image, 'for type:', imageType);
    
    // If no image found for the specific type, try fallback to 'choice' type
    if (!image && imageType !== 'choice') {
      console.log('ShareCard: No image found for type', imageType, 'trying choice type');
      image = personalityImageManager.getRandomImage(character.type, 'choice');
    }
    
    // If still no image, try 'yes' type as another fallback
    if (!image) {
      console.log('ShareCard: No image found for choice type, trying yes type');
      image = personalityImageManager.getRandomImage(character.type, 'yes');
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
    console.error('ShareCard: Image failed to load, using character fallback image');
    setImageLoadError(true);
    if (character.image && character.image !== characterImage) {
      setCharacterImage(character.image);
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

  // Improved text cleaning function to handle encoding and formatting issues
  const cleanDisplayAnswer = () => {
    const rawAnswer = getDisplayAnswer();
    if (!rawAnswer || typeof rawAnswer !== 'string') {
      return "The universe whispers its wisdom...";
    }
    
    // Remove any potential encoding issues, extra whitespace, and clean the text
    return rawAnswer
      .replace(/[^\w\s.,!?'"()-]/g, ' ') // Replace special chars with space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  // Clean and format the question text
  const cleanQuestion = () => {
    if (!question || typeof question !== 'string') {
      return "What guidance do you seek?";
    }
    
    return question
      .replace(/[^\w\s.,!?'"()-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Get theme colors for inline styles
  const getGradientBackground = () => {
    const colorMap: Record<string, string> = {
      'sassy-cat': 'linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(131, 24, 67, 0.2) 20%, rgba(30, 41, 59, 0.85) 100%)',
      'wise-owl': 'linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(146, 64, 14, 0.2) 20%, rgba(30, 41, 59, 0.85) 100%)',
      'lazy-panda': 'linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(5, 150, 105, 0.2) 20%, rgba(30, 41, 59, 0.85) 100%)',
      'sneaky-snake': 'linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(194, 65, 12, 0.2) 20%, rgba(30, 41, 59, 0.85) 100%)',
      'people-pleaser-pup': 'linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(202, 138, 4, 0.2) 20%, rgba(30, 41, 59, 0.85) 100%)'
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
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
    gap: '32px'
  };

  const avatarStyle: React.CSSProperties = {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `4px solid ${getPrimaryColor()}`,
    boxShadow: `0 0 40px ${getPrimaryColor()}60`
  };

  const characterNameStyle: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: '600',
    fontFamily: "'Playfair Display', 'Georgia', serif",
    textAlign: 'center',
    margin: '0',
    textShadow: `0 0 20px ${getPrimaryColor()}80`,
    letterSpacing: '1px',
    lineHeight: '1.2'
  };

  const questionStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${getPrimaryColor()}30`,
    borderRadius: '20px',
    padding: '32px 40px',
    fontSize: '26px',
    lineHeight: '1.4',
    textAlign: 'center',
    maxWidth: '800px',
    fontStyle: 'italic',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    wordBreak: 'break-word',
    hyphens: 'auto'
  };

  const answerStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${getPrimaryColor()}dd, ${getPrimaryColor()}bb)`,
    color: 'white',
    borderRadius: '20px',
    padding: '36px 44px',
    fontSize: '30px',
    lineHeight: '1.3',
    textAlign: 'center',
    maxWidth: '800px',
    fontWeight: '500',
    boxShadow: `0 20px 40px ${getPrimaryColor()}30`,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    wordBreak: 'break-word',
    hyphens: 'auto'
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '40px'
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '400',
    color: '#cbd5e1',
    opacity: 0.7,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
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
              onError={handleImageError}
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
          "{cleanQuestion()}"
        </div>

        {/* Answer */}
        <div style={answerStyle}>
          "{cleanDisplayAnswer()}"
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
