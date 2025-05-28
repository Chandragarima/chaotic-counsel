
import { Character } from '../types';
import { characters } from '../data/characters';
import CharacterCard from './CharacterCard';
import { Button } from '@/components/ui/button';

interface CombinedHomePageProps {
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  onContinue: () => void;
}

const CombinedHomePage = ({ 
  selectedCharacter, 
  onCharacterSelect, 
  onContinue 
}: CombinedHomePageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-mystical-purple via-purple-900 to-indigo-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mystical-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mystical-gold-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Mystical Symbols */}
      <div className="absolute top-16 left-12 text-mystical-gold/60 text-7xl animate-float">🔮</div>
      <div className="absolute top-32 right-16 text-mystical-gold/50 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute bottom-40 left-20 text-mystical-gold/60 text-6xl animate-float" style={{ animationDelay: '2.5s' }}>🌙</div>
      <div className="absolute bottom-32 right-8 text-mystical-gold/50 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute top-1/2 left-8 text-mystical-gold/40 text-5xl animate-float" style={{ animationDelay: '3s' }}>🪄</div>

      {/* Main Content */}
      <div className="text-center space-y-8 animate-fade-in relative z-10 max-w-4xl w-full">
        {/* Logo/Title with Enhanced Styling */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-mystical font-bold text-mystical-gold mb-2 animate-glow-pulse relative">
              CHAOTIC
              <div className="absolute inset-0 text-mystical-gold-light opacity-50 blur-sm">CHAOTIC</div>
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-mystical-gold to-transparent mx-auto mb-4"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-mystical font-semibold text-mystical-gold-light relative">
            COUNSEL
            <div className="absolute inset-0 text-mystical-gold opacity-30 blur-sm">COUNSEL</div>
          </h2>
          
          <div className="flex justify-center space-x-4 mt-6">
            <div className="w-2 h-2 bg-mystical-gold rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-mystical-gold-light rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-mystical-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Enhanced Subtitle */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-mystical-gold-light font-medium max-w-md mx-auto leading-relaxed">
            Where ancient wisdom meets modern decisions
          </p>
          
          <p className="text-lg text-mystical-gold/80 max-w-sm mx-auto italic">
            Choose your mystical advisor and let them guide your choices through the chaos of life
          </p>
        </div>

        {/* Character Selection */}
        <div className="space-y-6">
          <h3 className="text-2xl font-mystical font-bold text-mystical-gold">
            Choose Your Advisor
          </h3>
          
          {/* Character Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
            <div className="animate-fade-in space-y-4 pt-4">
              <Button 
                onClick={onContinue}
                className="mystical-button text-xl font-bold px-12 py-6 text-mystical-purple shadow-2xl hover:shadow-mystical-gold/25 transform hover:scale-110 transition-all duration-300 relative group"
              >
                <span className="relative z-10">Begin Your Journey with {selectedCharacter.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-mystical-gold via-mystical-gold-light to-mystical-gold opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
              </Button>
              
              <p className="text-mystical-gold/60 text-sm animate-pulse">
                Your mystical advisor awaits your questions...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mystical Border Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mystical-gold/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mystical-gold/50 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-mystical-gold/50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-mystical-gold/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default CombinedHomePage;
