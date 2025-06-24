
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
      className={`group relative p-8 cursor-pointer transform transition-all duration-500 ease-out hover:-translate-y-2
        ${isSelected 
          ? 'bg-slate-800/70 border-amber-400/80 shadow-2xl shadow-amber-400/25 scale-105' 
          : 'bg-slate-900/70 border-slate-700/40 hover:border-amber-400/60 hover:bg-slate-800/50'
        } 
        ${isLocked ? 'opacity-50 grayscale cursor-not-allowed hover:transform-none' : 'hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/15'}
        backdrop-blur-md rounded-2xl border
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-amber-400/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100`}
      onClick={!isLocked ? onSelect : undefined}
    >
      <div className="text-center space-y-6 relative z-10">
        {/* Character Avatar with enhanced hover effects */}
        <div className="relative mx-auto">
          <div className={`relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 transition-all duration-500 ${
            isSelected 
              ? 'border-amber-400/90 shadow-xl shadow-amber-400/40 scale-110' 
              : 'border-slate-600/40 group-hover:border-amber-400/70 group-hover:shadow-lg group-hover:shadow-amber-400/30 group-hover:scale-110'
          }`}>
            <Avatar className="w-full h-full transition-transform duration-500 group-hover:scale-105">
              <AvatarImage 
                src={character.image} 
                alt={character.name}
                className="object-cover w-full h-full transition-all duration-500 group-hover:brightness-110"
              />
              <AvatarFallback className="bg-slate-800 text-amber-400 text-xl font-light transition-all duration-300 group-hover:text-amber-300">
                {getCharacterSymbol(character.type)}
              </AvatarFallback>
            </Avatar>
          </div>
          {isSelected && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full border-2 border-slate-900 flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Character Info with improved typography and spacing */}
        <div className="space-y-4">
          <h3 className="text-amber-100 font-medium text-xl tracking-wide transition-all duration-300 group-hover:text-amber-50 group-hover:scale-105">
            {character.name}
          </h3>
          <p className="text-amber-200/70 text-sm font-light tracking-wide leading-relaxed transition-all duration-300 group-hover:text-amber-200/90 px-2">
            {character.personality}
          </p>
          <p className="text-slate-400 text-xs font-light leading-relaxed px-4 transition-all duration-300 group-hover:text-slate-300">
            {character.description}
          </p>
        </div>
      </div>

      {/* Enhanced selection indicator overlay */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/15 via-amber-400/5 to-transparent rounded-2xl pointer-events-none animate-pulse"></div>
      )}

      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-amber-400/0 to-amber-400/0 opacity-0 transition-all duration-500 group-hover:from-amber-400/5 group-hover:via-amber-400/2 group-hover:to-transparent group-hover:opacity-100 pointer-events-none"></div>
    </Card>
  );
};

export default CharacterCard;
