
import { Character } from '../types';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  isSelected: boolean;
}

const CharacterCard = ({ character, onSelect, isSelected }: CharacterCardProps) => {
  const getCharacterEmoji = (type: string) => {
    switch (type) {
      case 'sassy-cat': return '😾';
      case 'wise-owl': return '🦉';
      case 'lazy-panda': return '🐼';
      case 'anxious-bunny': return '🐍'; // Now represents snake
      case 'quirky-duck': return '🦆';
      default: return '✨';
    }
  };

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group ${
        isSelected 
          ? 'ring-2 ring-amber-400 bg-gradient-to-br from-slate-600 to-slate-700' 
          : 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'
      } ${
        !character.unlocked ? 'opacity-60' : ''
      }`}
      onClick={character.unlocked ? onSelect : undefined}
    >
      {/* Unlock Overlay */}
      {!character.unlocked && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center space-y-2">
            <Lock className="h-8 w-8 text-amber-300 mx-auto" />
            <p className="text-amber-300 text-sm font-medium">Locked</p>
          </div>
        </div>
      )}

      {/* Character Image */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-100/20 to-amber-200/20 flex items-center justify-center text-4xl overflow-hidden">
          {character.image ? (
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            getCharacterEmoji(character.type)
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-amber-100 tracking-wide">
            {character.name}
          </h3>
          <p className="text-amber-300/70 text-sm font-light italic">
            {character.personality}
          </p>
          <p className="text-slate-300 text-xs leading-relaxed">
            {character.description}
          </p>
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-amber-400/10 transition-all duration-300 pointer-events-none"></div>
    </Card>
  );
};

export default CharacterCard;
