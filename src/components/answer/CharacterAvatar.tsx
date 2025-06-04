import { getPersonalityTheme } from '../../utils/personalityThemes';
import { personalityImageManager, ImageType } from '../../utils/personalityImageManager';
import { getRandomCatImage } from '../../utils/catImages';
import { useState, useEffect, useRef } from 'react';
import { Character, QuestionMode } from '../types';

interface CharacterAvatarProps {
  character: Character;
  isThinking: boolean;
  responseType?: ImageType;
  questionMode?: QuestionMode;
}

const CharacterAvatar = ({ character, isThinking, responseType = 'thinking', questionMode = 'fun' }: CharacterAvatarProps) => {
  const theme = getPersonalityTheme(character.type);
  const [currentMedia, setCurrentMedia] = useState<string>('');
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [fallbackToCat, setFallbackToCat] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [responseImageReady, setResponseImageReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const responseImageRef = useRef<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTimeoutRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  // Start preloading response image as soon as we have the type
  useEffect(() => {
    if (responseType !== 'thinking') {
      const responseImage = personalityImageManager.getRandomImage(character.type, responseType);
      if (responseImage) {
        responseImageRef.current = responseImage;
        setResponseImageReady(false);
        
        // Preload the response image
        personalityImageManager.waitForImageLoad(responseImage).then(() => {
          setResponseImageReady(true);
          console.log(`Response image preloaded and ready: ${responseImage}`);
        }).catch((error) => {
          console.warn(`Failed to preload response image: ${responseImage}`, error);
        });
      }
    }
  }, [responseType, character.type]);

  // Handle media loading and transitions
  useEffect(() => {
    // Clear any existing timeouts
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = null;
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    if (isThinking) {
      setIsTransitioning(false);
      // Thinking phase - load video
      const personalityVideo = personalityImageManager.getRandomVideo(character.type, 'thinking');
      
      if (personalityVideo) {
        personalityImageManager.waitForVideoLoad(personalityVideo).then(() => {
          setCurrentMedia(personalityVideo);
          setIsVideo(true);
          setFallbackToCat(false);
          setMediaReady(true);

          // Set up video behavior based on questionMode
          if (videoRef.current) {
            if (questionMode === 'fun') {
              // For fun mode, video plays once for 3000ms
              videoRef.current.loop = false;
              videoTimeoutRef.current = window.setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
              }, 3000);
            } else {
              // For serious mode, video loops continuously
              videoRef.current.loop = true;
            }
          }
        }).catch((error) => {
          console.warn('Failed to load thinking video:', error);
          handleFallback();
        });
      } else {
        handleFallback();
      }
    } else {
      // Not thinking - transition to response image
      if (responseImageRef.current && responseImageReady) {
        // Start fade out
        setIsTransitioning(true);
        
        // Wait for fade out before changing media
        transitionTimeoutRef.current = window.setTimeout(() => {
          setCurrentMedia(responseImageRef.current);
          setIsVideo(false);
          setFallbackToCat(false);
          setMediaReady(true);
          
          // Wait a frame before starting fade in
          requestAnimationFrame(() => {
            setIsTransitioning(false);
          });
        }, 300); // Full transition duration
      } else {
        // If response image isn't ready yet, keep showing current media
        console.warn('Response image not ready yet');
      }
    }

    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [character.type, isThinking, responseType, questionMode, responseImageReady]);

  const handleFallback = () => {
    setCurrentMedia(getRandomCatImage());
    setIsVideo(false);
    setFallbackToCat(true);
    setMediaReady(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to play');
    handleFallback();
  };

  const handleImageError = () => {
    console.warn('Image failed to load');
    handleFallback();
  };

  return (
    <div className="text-center">
      <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}>
        {mediaReady ? (
          isVideo ? (
            <video 
              ref={videoRef}
              src={currentMedia} 
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              onError={handleVideoError}
              onLoadedData={() => {
                console.log('Video loaded and ready to play');
              }}
            />
          ) : (
            <img 
              src={currentMedia} 
              alt={`${character.name} - ${isThinking ? 'thinking' : responseType}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
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

