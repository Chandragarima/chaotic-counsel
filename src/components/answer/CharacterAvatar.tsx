
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
  const [currentMedia, setCurrentMedia] = useState<string>('');
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [fallbackToCat, setFallbackToCat] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  // Get appropriate media based on state and response type
  useEffect(() => {
    setMediaLoaded(false);
    
    if (isThinking) {
      // Use video for thinking stage
      const personalityVideo = personalityImageManager.getRandomVideo(character.type, 'thinking');
      
      if (personalityVideo) {
        // Wait for video to be preloaded before setting it
        personalityImageManager.waitForVideoLoad(personalityVideo).then(() => {
          setCurrentMedia(personalityVideo);
          setIsVideo(true);
          setFallbackToCat(false);
          setMediaLoaded(true);
        }).catch(() => {
          // If preloading fails, fallback to cat image
          const randomCatImage = getRandomCatImage();
          setCurrentMedia(randomCatImage);
          setIsVideo(false);
          setFallbackToCat(true);
          setMediaLoaded(true);
        });
      } else {
        // No personality video available, use cat image
        const randomCatImage = getRandomCatImage();
        setCurrentMedia(randomCatImage);
        setIsVideo(false);
        setFallbackToCat(true);
        setMediaLoaded(true);
      }
    } else {
      // Use image for response stage
      const personalityImage = personalityImageManager.getRandomImage(character.type, responseType);
      
      if (personalityImage) {
        // Wait for image to be preloaded before setting it
        personalityImageManager.waitForImageLoad(personalityImage).then(() => {
          setCurrentMedia(personalityImage);
          setIsVideo(false);
          setFallbackToCat(false);
          setMediaLoaded(true);
        }).catch(() => {
          // If preloading fails, fallback to cat image
          const randomCatImage = getRandomCatImage();
          setCurrentMedia(randomCatImage);
          setIsVideo(false);
          setFallbackToCat(true);
          setMediaLoaded(true);
        });
      } else {
        // No personality image available, use cat image
        const randomCatImage = getRandomCatImage();
        setCurrentMedia(randomCatImage);
        setIsVideo(false);
        setFallbackToCat(true);
        setMediaLoaded(true);
      }
    }
  }, [character.type, isThinking, responseType]);

  return (
    <div className="text-center">
      <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}>
        {currentMedia && mediaLoaded ? (
          isVideo ? (
            <video 
              src={currentMedia} 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onError={() => {
                // If personality video fails to load, fallback to cat image
                if (!fallbackToCat) {
                  const randomCatImage = getRandomCatImage();
                  setCurrentMedia(randomCatImage);
                  setIsVideo(false);
                  setFallbackToCat(true);
                }
              }}
            />
          ) : (
            <img 
              src={currentMedia} 
              alt={`${character.name} - ${isThinking ? 'thinking' : responseType}`}
              className="w-full h-full object-cover"
              onError={() => {
                // If personality image fails to load, fallback to cat image
                if (!fallbackToCat) {
                  const randomCatImage = getRandomCatImage();
                  setCurrentMedia(randomCatImage);
                  setFallbackToCat(true);
                }
              }}
            />
          )
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
