
import { Character } from '../types';
import { Card } from '@/components/ui/card';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  isSelected?: boolean;
}

const CharacterCard = ({ character, onSelect, isSelected = false }: CharacterCardProps) => {
  const getCharacterSymbol = (type: Character['type']) => {
    const symbols = {
      'sassy-cat': '◈',
      'wise-owl': '◉',
      'lazy-panda': '◎',
      'anxious-bunny': '◊',
      'quirky-duck': '◆'
    };
    return symbols[type];
  };

  return (
    <Card 
      className={`group relative p-6 cursor-pointer transform transition-all duration-300 
        ${isSelected 
          ? 'bg-mystical-gold/10 border-mystical-gold/50 shadow-lg shadow-mystical-gold/20' 
          : 'bg-slate-900/40 border-mystical-gold/20 hover:border-mystical-gold/40'
        } 
        ${!character.unlocked ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:scale-105'}
        backdrop-blur-sm rounded-xl border`}
      onClick={character.unlocked ? onSelect : undefined}
    >
      <div className="text-center space-y-4">
        {/* Character Symbol */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-mystical-gold/20 to-mystical-gold/5 border border-mystical-gold/30 flex items-center justify-center group-hover:border-mystical-gold/50 transition-colors duration-300">
            <span className="text-2xl text-mystical-gold font-light">
              {getCharacterSymbol(character.type)}
            </span>
          </div>
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-mystical-gold rounded-full border-2 border-slate-900"></div>
          )}
        </div>

        {/* Character Info */}
        <div className="space-y-3">
          <h3 className="text-mystical-gold font-medium text-lg tracking-wide">
            {character.name}
          </h3>
          <p className="text-mystical-gold-light/80 text-sm font-light tracking-wide">
            {character.personality}
          </p>
          <p className="text-mystical-gold/60 text-xs font-light leading-relaxed">
            {character.description}
          </p>
        </div>

        {/* Lock Status */}
        {!character.unlocked && (
          <div className="flex items-center justify-center space-x-2 text-mystical-gold/40 pt-2">
            <span className="text-sm">🔒</span>
            <span className="text-xs font-light tracking-wide">Locked</span>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      {character.unlocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-mystical-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
      )}
    </Card>
  );
};

export default CharacterCard;
