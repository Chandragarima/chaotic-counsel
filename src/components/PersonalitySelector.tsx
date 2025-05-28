
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Back Button - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <Button 
          onClick={onBack}
          variant="ghost"
          className="text-amber-200 hover:text-amber-100 hover:bg-slate-800/50 p-3 rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-6 pt-20 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-wider text-amber-100">
            Choose Your Advisor
          </h1>
          <p className="text-amber-200/70 font-light tracking-wide">
            Select a mystical companion to guide your decision
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={() => onCharacterSelect(character)}
              isSelected={selectedCharacter?.id === character.id}
            />
          ))}
        </div>

        {/* Continue Button */}
        {selectedCharacter && (
          <div className="flex justify-center pt-8">
            <Button 
              onClick={onContinue}
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-900 font-medium px-8 py-3 text-lg tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Continue with {selectedCharacter.name}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalitySelector;
