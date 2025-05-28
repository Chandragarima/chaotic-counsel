
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
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-950">
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 border border-mystical-gold/20 rotate-45 rounded-lg"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-mystical-gold/15 rotate-12 rounded-lg"></div>
          <div className="absolute top-1/2 left-1/6 w-32 h-32 border border-mystical-gold/25 -rotate-12 rounded-lg"></div>
        </div>
        
        {/* Ambient light effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-mystical-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute top-16 right-16 text-mystical-gold/30 text-2xl font-thin animate-float">◊</div>
      <div className="absolute top-32 left-12 text-mystical-gold/25 text-xl animate-float" style={{ animationDelay: '2s' }}>✦</div>
      <div className="absolute bottom-40 right-20 text-mystical-gold/20 text-lg animate-float" style={{ animationDelay: '1.5s' }}>◆</div>
      <div className="absolute bottom-32 left-8 text-mystical-gold/25 text-xl animate-float" style={{ animationDelay: '3s' }}>✧</div>

      {/* Main Content */}
      <div className="text-center space-y-12 animate-fade-in relative z-10 max-w-4xl w-full">
        {/* Sophisticated Branding */}
        <div className="space-y-8">
          <div className="space-y-4">
            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl font-thin tracking-[0.2em] text-mystical-gold relative">
              CHAOTIC
              <div className="absolute inset-0 text-mystical-gold/20 blur-sm">CHAOTIC</div>
            </h1>
            
            {/* Elegant divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-mystical-gold/50"></div>
              <div className="w-2 h-2 border border-mystical-gold/50 rotate-45"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-mystical-gold/50"></div>
            </div>
            
            {/* Subtitle */}
            <h2 className="text-4xl md:text-5xl font-thin tracking-[0.15em] text-mystical-gold-light/90">
              COUNSEL
            </h2>
          </div>
          
          {/* Refined tagline */}
          <div className="space-y-3">
            <p className="text-xl text-mystical-gold-light/80 font-light tracking-wide">
              Ancient wisdom for modern decisions
            </p>
            <p className="text-sm text-mystical-gold/60 font-light italic tracking-wider">
              Where intuition meets insight
            </p>
          </div>
        </div>

        {/* Character Selection */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-light text-mystical-gold tracking-wide">
              Select Your Guide
            </h3>
            <div className="w-16 h-px bg-mystical-gold/40 mx-auto"></div>
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
            <div className="animate-fade-in space-y-6 pt-8">
              <Button 
                onClick={onContinue}
                className="bg-gradient-to-r from-mystical-gold/90 to-mystical-gold text-mystical-purple font-medium px-10 py-4 text-lg tracking-wide rounded-lg shadow-2xl hover:shadow-mystical-gold/20 transform hover:scale-105 transition-all duration-300 relative group border border-mystical-gold/20"
              >
                <span className="relative z-10">Begin Session</span>
                <div className="absolute inset-0 bg-gradient-to-r from-mystical-gold to-mystical-gold-light opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              </Button>
              
              <p className="text-mystical-gold/50 text-sm font-light tracking-wide">
                {selectedCharacter.name} awaits your inquiry
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Minimal border effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mystical-gold/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mystical-gold/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-mystical-gold/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-mystical-gold/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default CombinedHomePage;
