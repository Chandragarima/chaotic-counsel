
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { personalityImageManager, ImageType } from '../../utils/personalityImageManager';
import { getRandomCatImage } from '../../utils/catImages';
import { useState, useEffect, useRef } from 'react';
import { Character, QuestionMode } from '../types';

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
  const [mediaReady, setMediaReady] = useState(false);
  const [responseImageReady, setResponseImageReady] = useState(false);
  const responseImageRef = useRef<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload response image during thinking phase
  useEffect(() => {
    if (isThinking && responseType !== 'thinking') {
      const responseImage = personalityImageManager.getRandomImage(character.type, responseType);
      if (responseImage) {
        responseImageRef.current = responseImage;
        setResponseImageReady(false);
        
        // Preload the response image
        personalityImageManager.waitForImageLoad(responseImage).then(() => {
          setResponseImageReady(true);
          console.log(`Response image preloaded and ready: ${responseImage}`);
        }).catch(() => {
          console.warn(`Failed to preload response image: ${responseImage}`);
          // Fallback will be handled in the main effect
        });
      }
    } else if (!isThinking) {
      // Clear the response image ref when not thinking
      responseImageRef.current = '';
      setResponseImageReady(false);
    }
  }, [isThinking, responseType, character.type]);

  // Handle media loading and transitions
  useEffect(() => {
    if (isThinking) {
      // Thinking phase - load video
      const personalityVideo = personalityImageManager.getRandomVideo(character.type, 'thinking');
      
      if (personalityVideo) {
        personalityImageManager.waitForVideoLoad(personalityVideo).then(() => {
          setCurrentMedia(personalityVideo);
          setIsVideo(true);
          setFallbackToCat(false);
          setMediaReady(true);
          // For serious mode, keep the video looping until answer is ready
        if (QuestionMode === 'serious') {
        // Set video to loop continuously
          const videoElement = document.querySelector(personalityVideo) as HTMLVideoElement; // or however you reference your video
          if (videoElement) {
            videoElement.loop = true;
            }
          }
        }).catch(() => {
          // Fallback to cat image for thinking
          const randomCatImage = getRandomCatImage();
          setCurrentMedia(randomCatImage);
          setIsVideo(false);
          setFallbackToCat(true);
          setMediaReady(true);
        });
      } else {
        // No personality video available, use cat image
        const randomCatImage = getRandomCatImage();
        setCurrentMedia(randomCatImage);
        setIsVideo(false);
        setFallbackToCat(true);
        setMediaReady(true);
      }
    } else {
      // Response phase - switch to preloaded image if available
      if (responseImageRef.current && responseImageReady) {
        // Use the preloaded response image
        setCurrentMedia(responseImageRef.current);
        setIsVideo(false);
        setFallbackToCat(false);
        setMediaReady(true);
        console.log(`Switched to preloaded response image: ${responseImageRef.current}`);
      } else {
        // Fallback to regular loading if preloading failed
        const personalityImage = personalityImageManager.getRandomImage(character.type, responseType);
        
        if (personalityImage) {
          personalityImageManager.waitForImageLoad(personalityImage).then(() => {
            setCurrentMedia(personalityImage);
            setIsVideo(false);
            setFallbackToCat(false);
            setMediaReady(true);
          }).catch(() => {
            // Final fallback to cat image
            const randomCatImage = getRandomCatImage();
            setCurrentMedia(randomCatImage);
            setIsVideo(false);
            setFallbackToCat(true);
            setMediaReady(true);
          });
        } else {
          // No personality image available, use cat image
          const randomCatImage = getRandomCatImage();
          setCurrentMedia(randomCatImage);
          setIsVideo(false);
          setFallbackToCat(true);
          setMediaReady(true);
        }
      }
    }
  }, [character.type, isThinking, responseType, responseImageReady]);

  const handleVideoError = () => {
    console.warn('Video failed to play, falling back to cat image');
    if (!fallbackToCat) {
      const randomCatImage = getRandomCatImage();
      setCurrentMedia(randomCatImage);
      setIsVideo(false);
      setFallbackToCat(true);
    }
  };

  const handleImageError = () => {
    console.warn('Image failed to load, falling back to cat image');
    if (!fallbackToCat) {
      const randomCatImage = getRandomCatImage();
      setCurrentMedia(randomCatImage);
      setFallbackToCat(true);
    }
  };

  return (
    <div className="text-center">
      <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}>
        {currentMedia && mediaReady ? (
          isVideo ? (
            <video 
              ref={videoRef}
              src={currentMedia} 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={handleVideoError}
              onLoadedData={() => {
                console.log('Video loaded and ready to play');
              }}
            />
          ) : (
            <img 
              src={currentMedia} 
              alt={`${character.name} - ${isThinking ? 'thinking' : responseType}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={handleImageError}
              onLoad={() => {
                console.log('Image loaded successfully');
              }}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl">
            {character.type === 'sassy-cat' && '😾'}
            {character.type === 'wise-owl' && '🦉'}
            {character.type === 'lazy-panda' && '🐼'}
            {character.type === 'sneaky-snake' && '🐍'}
            {character.type === 'people-pleaser-pup' && '🐕'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterAvatar;
