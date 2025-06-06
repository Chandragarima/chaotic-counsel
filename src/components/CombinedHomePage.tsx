
import { useState, useEffect } from 'react';
import { characters } from '../data/characters';
import { Character } from '../types';
import CharacterCard from './CharacterCard';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Sparkles from './Sparkles';
import PersonalityEffects from './PersonalityEffects';
import { audioManager } from '../utils/audioManager';

interface CombinedHomePageProps {
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  onStartGame: () => void;
}

const CombinedHomePage = ({ selectedCharacter, onCharacterSelect, onStartGame }: CombinedHomePageProps) => {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    setShowSparkles(true);
    const timer = setTimeout(() => setShowSparkles(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCharacterSelect = (character: Character) => {
    audioManager.playSound('selection', character.type);
    onCharacterSelect(character);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {selectedCharacter && <PersonalityEffects character={selectedCharacter} />}
      
      {showSparkles && <Sparkles />}
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Chaotic Counsel
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Welcome to the mystical realm where ancient wisdom meets quirky chaos. 
            Choose your guide and unlock the secrets of destiny!
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 mb-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Choose Your Cosmic Guide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={() => handleCharacterSelect(character)}
                isSelected={selectedCharacter?.id === character.id}
              />
            ))}
          </div>

          {selectedCharacter && (
            <div className="text-center space-y-6">
              <div className="bg-white/10 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedCharacter.name}
                </h3>
                <p className="text-purple-200 mb-4">
                  {selectedCharacter.description}
                </p>
                <div className="text-sm text-purple-300 italic">
                  Personality: {selectedCharacter.personality}
                </div>
              </div>
              
              <Button 
                onClick={onStartGame}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Begin Your Journey ✨
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CombinedHomePage;
