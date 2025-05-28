
import { Character } from '../types';
import { characters } from '../data/characters';
import CharacterCard from './CharacterCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PersonalitySelectorProps {
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  onContinue: () => void;
  onBack: () => void;
}

const PersonalitySelector = ({ 
  selectedCharacter, 
  onCharacterSelect, 
  onContinue, 
  onBack 
}: PersonalitySelectorProps) => {
  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-3xl font-mystical font-bold text-mystical-gold">
          Choose Your Advisor
        </h1>
        <p className="text-mystical-gold-light">
          Select a mystical companion to guide your decision
        </p>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onSelect={() => onCharacterSelect(character)}
            isSelected={selectedCharacter?.id === character.id}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-4 max-w-sm mx-auto pt-4">
        {selectedCharacter && (
          <Button 
            onClick={onContinue}
            className="mystical-button w-full min-h-[48px]"
          >
            Continue with {selectedCharacter.name}
          </Button>
        )}
        
        <Button 
          onClick={onBack}
          variant="ghost"
          className="text-mystical-gold-light hover:text-mystical-gold min-h-[44px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Start
        </Button>
      </div>
    </div>
  );
};

export default PersonalitySelector;
