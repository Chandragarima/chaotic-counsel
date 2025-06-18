import { useState, useEffect, useRef } from 'react';
import { personalityImageManager } from '../../utils/personalityImageManager';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { audioManager } from '../../utils/audioManager';
import { Character } from '../../types';

interface CharacterAvatarProps {
  character: Character;
  responseType: 'thinking' | 'yes' | 'no' | 'maybe' | 'choice';
  isThinking: boolean;
  className?: string;
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  responseType,
  isThinking,
  className = ''
}) => {
  const [preloadedImages, setPreloadedImages] = useState<Record<string, string>>({});
  const [showResponseImage, setShowResponseImage] = useState(false);
  const [responseImageLoaded, setResponseImageLoaded] = useState(false);
  const theme = getPersonalityTheme(character.type);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Characters with full animation support
  const hasFullAnimationSupport = ['sassy-cat', 'wise-owl', 'lazy-panda', 'sneaky-snake', 'people-pleaser-pup'].includes(character.type);

  // Preload all possible response images when thinking starts
  useEffect(() => {
    if (isThinking && hasFullAnimationSupport) {
      // List of possible response types
      const possibleResponses: ('yes' | 'no' | 'maybe' | 'choice')[] = ['yes', 'no', 'maybe', 'choice'];
      
      // Preload an image for each possible response
      possibleResponses.forEach(type => {
        const responseImage = personalityImageManager.getRandomImage(character.type, type);
        if (responseImage) {
          // Create new Image object to preload
          const img = new Image();
          img.src = responseImage;
          img.onload = () => {
            console.log(`Preloaded ${type} image for ${character.type}: ${responseImage}`);
            setPreloadedImages(prev => ({
              ...prev,
              [type]: responseImage
            }));
          };
        }
      });
    }
  }, [isThinking, character.type, hasFullAnimationSupport]);

  // Handle transition from thinking to response
  useEffect(() => {
    if (!isThinking && hasFullAnimationSupport) {
      // Check if the response image is already preloaded
      const responseImage = preloadedImages[responseType];
      
      if (responseImage) {
        // Response image is preloaded, show it immediately
        setShowResponseImage(true);
        setResponseImageLoaded(true);
      } else {
        // Response image not preloaded, load it now and wait
        const fallbackImage = personalityImageManager.getRandomImage(character.type, responseType);
        if (fallbackImage) {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => ({
              ...prev,
              [responseType]: fallbackImage
            }));
            setResponseImageLoaded(true);
            setShowResponseImage(true);
          };
          img.src = fallbackImage;
        }
      }
    } else if (isThinking) {
      setShowResponseImage(false);
      setResponseImageLoaded(false);
    }
  }, [isThinking, hasFullAnimationSupport, responseType, preloadedImages]);

  // Handle video source changes
  useEffect(() => {
    if (videoRef.current && isThinking) {
      const thinkingVideo = personalityImageManager.getRandomVideo(character.type, 'thinking');
      if (thinkingVideo) {
        videoRef.current.src = thinkingVideo;
        videoRef.current.load();
        videoRef.current.play().catch(console.error);
      }
    }
  }, [isThinking, character.type]);

  // Get the appropriate media content for the current state
  const getMediaContent = () => {
    // For characters without full animation support, use static images
    if (!hasFullAnimationSupport) {
      const fallbackImage = personalityImageManager.getRandomImage(character.type, responseType) || character.image;
      return (
        <img
          src={fallbackImage || '/placeholder.svg'}
          alt={`${character.name} ${responseType}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          onError={(e) => {
            console.error('Fallback image failed to load:', fallbackImage);
            e.currentTarget.src = character.image || '/placeholder.svg';
          }}
        />
      );
    }

    // Show response image only when it's loaded and we're not thinking
    if (!isThinking && showResponseImage && responseImageLoaded) {
      return (
        <img
          key={preloadedImages[responseType]}
          src={preloadedImages[responseType]}
          alt={`${character.name} ${responseType}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            console.error('Response image failed to load:', preloadedImages[responseType]);
            e.currentTarget.src = character.image || '/placeholder.svg';
          }}
        />
      );
    }

    // Show thinking video during thinking phase OR during transition until response image is ready
    if (isThinking || (!showResponseImage || !responseImageLoaded)) {
      const thinkingVideo = personalityImageManager.getRandomVideo(character.type, 'thinking');
      if (thinkingVideo) {
        console.log(`Playing thinking video: ${thinkingVideo}`);
        return (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onLoadStart={() => console.log('Thinking video loading started')}
            onError={(e) => {
              console.error('Thinking video error:', e);
              // Fallback to thinking image if video fails
              const thinkingImage = personalityImageManager.getRandomImage(character.type, 'thinking');
              if (thinkingImage) {
                e.currentTarget.style.display = 'none';
                const img = document.createElement('img');
                img.src = thinkingImage;
                img.className = 'w-full h-full object-cover';
                e.currentTarget.parentNode?.appendChild(img);
              }
            }}
          >
            <source src={thinkingVideo} type="video/mp4" />
          </video>
        );
      } else {
        // Fallback to thinking image if no video
        const thinkingImage = personalityImageManager.getRandomImage(character.type, 'thinking');
        return (
          <img
            src={thinkingImage || character.image || '/placeholder.svg'}
            alt={`${character.name} thinking`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        );
      }
    }

    // Return null instead of default image to prevent flicker
    return null;
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`w-40 h-40 mx-auto object-cover overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}
      >
        {getMediaContent()}
      </div>
      
      {/* Animated thinking indicator */}
      {isThinking && (
        <div className="absolute -bottom-2 -right-2">
          <div className={`w-6 h-6 ${theme.colors.primary} animate-pulse flex items-center justify-center`}>
            <div className="w-2 h-2 object-cover bg-white animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterAvatar;
