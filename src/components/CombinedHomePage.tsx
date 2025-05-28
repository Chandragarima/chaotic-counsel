
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
  const handleCharacterSelect = (character: Character) => {
    onCharacterSelect(character);
    // Auto-continue after character selection for seamless UX
    setTimeout(() => {
      onContinue();
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Sophisticated Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 border border-amber-400/20 rotate-45 rounded-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-amber-400/15 rotate-12 rounded-2xl"></div>
          <div className="absolute top-1/2 left-1/6 w-48 h-48 border border-amber-400/25 -rotate-12 rounded-xl"></div>
        </div>
        
        {/* Ambient light effects */}
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-amber-600/6 rounded-full blur-[80px]"></div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-16 animate-fade-in relative z-10 max-w-5xl w-full">
        {/* Modern Branding */}
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Main Title */}
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-thin tracking-[0.3em] text-amber-100 relative">
                CHAOTIC
              </h1>
              <div className="absolute inset-0 text-amber-400/20 blur-sm">CHAOTIC</div>
            </div>
            
            {/* Elegant divider */}
            <div className="flex items-center justify-center space-x-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
              <div className="w-3 h-3 border border-amber-400/60 rotate-45 bg-amber-400/10"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400/60 to-transparent"></div>
            </div>
            
            {/* Subtitle */}
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.2em] text-amber-200/90">
              COUNSEL
            </h2>
          </div>
          
          {/* Refined tagline */}
          <div className="space-y-4">
            <p className="text-xl text-amber-200/80 font-light tracking-wider">
              Ancient wisdom for modern decisions
            </p>
            <p className="text-sm text-amber-300/60 font-light italic tracking-widest uppercase">
              Choose your guide
            </p>
          </div>
        </div>

        {/* Character Selection */}
        <div className="space-y-8">
          {/* Character Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={() => handleCharacterSelect(character)}
                isSelected={selectedCharacter?.id === character.id}
              />
            ))}
          </div>

          {/* Instruction Text */}
          <div className="pt-4">
            <p className="text-amber-300/50 text-sm font-light tracking-wide">
              Select an advisor to begin your session
            </p>
          </div>
        </div>
      </div>

      {/* Minimal border effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default CombinedHomePage;
