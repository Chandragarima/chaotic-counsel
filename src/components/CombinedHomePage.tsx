import { Character } from '../types';
import { characters } from '../data/characters';
import CharacterCard from './CharacterCard';
import { audioManager } from '../utils/audioManager';

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
    
    // Play selection sound when character is selected
    audioManager.playSound('selection', character.type);
    
    // Immediately continue to question type selection
    onContinue();
    console.log('called');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Brighter, more sophisticated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-600">
        {/* Enhanced geometric patterns */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 border border-amber-400/25 rotate-45 rounded-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-amber-400/20 rotate-12 rounded-2xl"></div>
          <div className="absolute top-1/2 left-1/6 w-48 h-48 border border-amber-400/30 -rotate-12 rounded-xl"></div>
        </div>
        
        {/* Brighter ambient light effects */}
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-amber-400/12 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-16 animate-fade-in relative z-10 max-w-5xl w-full">
        {/* Enhanced branding with better fonts */}
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Main Title with improved typography */}
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-playfair font-medium tracking-[0.3em] text-slate-50 relative">
                CHAOTIC
              </h1>
              <div className="absolute inset-0 text-amber-400/25 blur-sm">CHAOTICtest</div>
            </div>
            
            {/* Elegant divider */}
            <div className="flex items-center justify-center space-x-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></div>
              <div className="w-3 h-3 border border-amber-400/70 rotate-45 bg-amber-400/15"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400/70 to-transparent"></div>
            </div>
            
            {/* Subtitle with better contrast */}
            <h2 className="text-3xl md:text-5xl font-playfair font-normal tracking-[0.2em] text-slate-100">
              COUNSEL
            </h2>
          </div>
          
          {/* Refined tagline with better readability */}
          <div className="space-y-4">
            <p className="text-xl text-slate-200 font-inter font-light tracking-wider">
              Ancient wisdom for modern decisions
            </p>
            <p className="text-sm text-amber-300/80 font-inter font-light italic tracking-widest uppercase">
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
                isSelected={false}
              />
            ))}
          </div>

          {/* Instruction Text */}
          <div className="pt-4">
            <p className="text-amber-300/70 text-sm font-inter font-light tracking-wide">
              Select an advisor to begin your session
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced border effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default CombinedHomePage;
