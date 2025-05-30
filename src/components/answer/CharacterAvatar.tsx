
import { Character } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { personalityImageManager, ImageType } from '../../utils/personalityImageManager';
import { getRandomCatImage } from '../../utils/catImages';
import { useState, useEffect } from 'react';

interface CharacterAvatarProps {
  character: Character;
  isThinking: boolean;
  responseType?: ImageType;
}

const CharacterAvatar = ({ character, isThinking, responseType = 'thinking' }: CharacterAvatarProps) => {
  const theme = getPersonalityTheme(character.type);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [fallbackToCat, setFallbackToCat] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get appropriate image based on state and response type
  useEffect(() => {
    const imageType = isThinking ? 'thinking' : responseType;
    const personalityImage = personalityImageManager.getRandomImage(character.type, imageType);
    
    if (personalityImage) {
      setImageLoaded(false);
      
      // Wait for image to be preloaded before setting it
      personalityImageManager.waitForImageLoad(personalityImage).then(() => {
        setCurrentImage(personalityImage);
        setFallbackToCat(false);
        setImageLoaded(true);
      }).catch(() => {
        // If preloading fails, fallback to cat image
        const randomCatImage = getRandomCatImage();
        setCurrentImage(randomCatImage);
        setFallbackToCat(true);
        setImageLoaded(true);
      });
    } else {
      // No personality image available, use cat image
      const randomCatImage = getRandomCatImage();
      setCurrentImage(randomCatImage);
      setFallbackToCat(true);
      setImageLoaded(true);
    }
  }, [character.type, isThinking, responseType]);

  return (
    <div className="text-center">
      <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}>
        {currentImage && imageLoaded ? (
          <img 
            src={currentImage} 
            alt={`${character.name} - ${isThinking ? 'thinking' : responseType}`}
            className="w-full h-full object-cover"
            onError={() => {
              // If personality image fails to load, fallback to cat image
              if (!fallbackToCat) {
                const randomCatImage = getRandomCatImage();
                setCurrentImage(randomCatImage);
                setFallbackToCat(true);
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl">
            {character.type === 'sassy-cat' && '😾'}
            {character.type === 'wise-owl' && '🦉'}
            {character.type === 'lazy-panda' && '🐼'}
            {character.type === 'anxious-bunny' && '🐰'}
            {character.type === 'quirky-duck' && '🦆'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterAvatar;
