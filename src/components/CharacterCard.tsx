
import { Character } from '../types';
import { personalityImageManager } from '../utils/personalityImageManager';
import { useState, useEffect } from 'react';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  isSelected: boolean;
  isLocked?: boolean;
}

const CharacterCard = ({ character, onSelect, isSelected, isLocked = false }: CharacterCardProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Get a random image for the character
    const image = personalityImageManager.getRandomImage(character.type, 'choice');
    setImageSrc(image);
  }, [character.type]);

  const handleClick = () => {
    if (isLocked) return;
    onSelect();
  };

  return (
    <div 
      className={`
        relative cursor-pointer transition-all duration-300 transform
        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${isSelected ? 'ring-2 ring-amber-400' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`
        bg-gradient-to-br from-slate-800/80 to-slate-900/80 
        backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6 
        text-center space-y-4 h-full
        ${!isLocked ? 'hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/10' : ''}
      `}>
        {/* Character image */}
        <div className="h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden bg-slate-700/50 flex items-center justify-center">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-4xl">
              {character.id === 'wise-owl' && '🦉'}
              {character.id === 'sassy-cat' && '😸'}
              {character.id === 'lazy-panda' && '🐼'}
              {character.id === 'sneaky-snake' && '🐍'}
              {character.id === 'people-pleaser-pup' && '🐕'}
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold text-amber-100">
          {character.name}
        </h3>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          {character.description}
        </p>

        {!isLocked && (
          <div className="pt-2">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
            <p className="text-xs text-amber-300/60 mt-2 uppercase tracking-wider">
              Select
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
