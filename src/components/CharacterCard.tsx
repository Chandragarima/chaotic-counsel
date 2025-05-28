
import { Character } from '../types';
import { Card } from '@/components/ui/card';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  isSelected?: boolean;
}

const CharacterCard = ({ character, onSelect, isSelected = false }: CharacterCardProps) => {
  return (
    <Card 
      className={`character-card ${isSelected ? 'ring-2 ring-mystical-gold' : ''} ${!character.unlocked ? 'opacity-50 grayscale' : ''}`}
      onClick={character.unlocked ? onSelect : undefined}
    >
      <div className="text-center space-y-4">
        {/* Character Image */}
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-mystical-purple-light/20 border-2 border-mystical-gold/30">
          {character.image ? (
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">
              {character.type === 'sassy-cat' && '😾'}
              {character.type === 'wise-owl' && '🦉'}
              {character.type === 'lazy-panda' && '🐼'}
              {character.type === 'anxious-bunny' && '🐰'}
              {character.type === 'quirky-duck' && '🦆'}
            </div>
          )}
        </div>

        {/* Character Info */}
        <div className="space-y-2">
          <h3 className="text-mystical-gold font-bold text-lg font-mystical">
            {character.name}
          </h3>
          <p className="text-mystical-gold-light text-sm font-medium">
            {character.personality}
          </p>
          <p className="text-foreground/80 text-xs">
            {character.description}
          </p>
        </div>

        {/* Lock Status */}
        {!character.unlocked && (
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <span className="text-lg">🔒</span>
            <span className="text-xs">Locked</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CharacterCard;
