
import { useState } from 'react';
import { characters } from '../data/characters';
import { Character } from '../types';
import CharacterCard from './CharacterCard';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PersonalitySelectorProps {
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  onBack: () => void;
}

const PersonalitySelector = ({ selectedCharacter, onCharacterSelect, onBack }: PersonalitySelectorProps) => {
  const [hoveredCharacter, setHoveredCharacter] = useState<Character | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Choose Your Cosmic Guide
          </h1>
          <p className="text-purple-200 text-center max-w-2xl mx-auto">
            Each personality offers a unique perspective on life's mysteries. 
            Select the guide that resonates with your soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={() => onCharacterSelect(character)}
              isSelected={selectedCharacter?.id === character.id}
            />
          ))}
        </div>

        {(selectedCharacter || hoveredCharacter) && (
          <Card className="mt-8 bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {(hoveredCharacter || selectedCharacter)?.name}
              </h3>
              <p className="text-purple-200 mb-4">
                {(hoveredCharacter || selectedCharacter)?.description}
              </p>
              <div className="text-sm text-purple-300 italic">
                Personality: {(hoveredCharacter || selectedCharacter)?.personality}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PersonalitySelector;
