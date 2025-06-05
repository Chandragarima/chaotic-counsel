
import React from 'react';
import { getPersonalityImageManager } from '../../utils/personalityImageManager';
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
  const imageManager = getPersonalityImageManager(character.type);
  const theme = getPersonalityTheme(character.type);

  // Get the appropriate image/video for the current state
  const getMediaContent = () => {
    if (isThinking) {
      const thinkingVideo = imageManager.getRandomVideo('thinking');
      if (thinkingVideo) {
        return (
          <video
            key={thinkingVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-full"
            onLoadStart={() => console.log('Video loading started')}
            onError={(e) => console.error('Video error:', e)}
          >
            <source src={thinkingVideo} type="video/mp4" />
          </video>
        );
      }
    }

    const imageUrl = imageManager.getRandomImage(responseType);
    return (
      <img
        key={imageUrl}
        src={imageUrl}
        alt={`${character.name} ${responseType}`}
        className="w-full h-full object-cover rounded-full transition-opacity duration-500"
        onError={(e) => {
          console.error('Image failed to load:', imageUrl);
          e.currentTarget.src = character.image || '/placeholder.svg';
        }}
      />
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`w-32 h-32 rounded-full overflow-hidden border-4 ${theme.effects.borderStyle} shadow-2xl ${theme.animations.floating}`}
        style={{ 
          borderColor: theme.colors.accent,
          boxShadow: `0 0 30px ${theme.colors.accent}40`
        }}
      >
        {getMediaContent()}
      </div>
      
      {/* Animated thinking indicator */}
      {isThinking && (
        <div className="absolute -bottom-2 -right-2">
          <div className={`w-6 h-6 rounded-full ${theme.colors.primary} animate-pulse flex items-center justify-center`}>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterAvatar;
