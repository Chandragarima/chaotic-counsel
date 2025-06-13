
import { Character } from '../types';
import { personalityImageManager } from '../utils/personalityImageManager';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  isSelected: boolean;
  isLocked?: boolean;
}

const CharacterCard = ({ character, onSelect, isSelected = false, isLocked = false }: CharacterCardProps) => {
  const getCharacterSymbol = (type: Character['type']) => {
    const symbols = {
      'sassy-cat': '◈',
      'wise-owl': '◉',
      'lazy-panda': '◎',
      'sneaky-snake': '◊',
      'people-pleaser-pup': '◆'
    };
    return symbols[type];
  };

  const handleClick = () => {
    if (isLocked) return;
    onSelect();
  };

  return (
    <Card 
      className={`group relative p-6 cursor-pointer transform transition-all duration-300 
        ${isSelected 
          ? 'bg-slate-800/60 border-amber-400/70 shadow-lg shadow-amber-400/20 scale-105' 
          : 'bg-slate-900/60 border-slate-700/50 hover:border-amber-400/50 hover:bg-slate-800/40'
        } 
        ${!character.unlocked ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:scale-102'}
        backdrop-blur-md rounded-2xl border`}
      onClick={character.unlocked ? onSelect : undefined}
    >
      <div className="text-center space-y-4">
        {/* Character Avatar */}
        <div className="relative mx-auto">
          <div className={`relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 transition-all duration-300 ${
            isSelected 
              ? 'border-amber-400/80 shadow-lg shadow-amber-400/30' 
              : 'border-slate-600/50 group-hover:border-amber-400/60'
          }`}>
            <Avatar className="w-full h-full">
              <AvatarImage 
                src={character.image} 
                alt={character.name}
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="bg-slate-800 text-amber-400 text-xl font-light">
                {getCharacterSymbol(character.type)}
              </AvatarFallback>
            </Avatar>
          </div>
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Character Info */}
        <div className="space-y-2">
          <h3 className="text-amber-100 font-medium text-lg tracking-wide">
            {character.name}
          </h3>
          <p className="text-amber-200/70 text-sm font-light tracking-wide leading-relaxed">
            {character.personality}
          </p>
          <p className="text-slate-400 text-xs font-light leading-relaxed px-2">
            {character.description}
          </p>
        </div>

        {/* Lock Status */}
        {!character.unlocked && (
          <div className="flex items-center justify-center space-x-2 text-slate-500 pt-2">
            <span className="text-sm">🔒</span>
            <span className="text-xs font-light tracking-wide">Locked</span>
          </div>
        )}
      </div>

      {/* Selection indicator overlay */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent rounded-2xl pointer-events-none"></div>
      )}
    </Card>
  );
};

export default CharacterCard;
