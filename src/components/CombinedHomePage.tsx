
import { Character } from '../types';
import { characters } from '../data/characters';
import CharacterCard from './CharacterCard';
import UnlockCelebration from './UnlockCelebration';
import { audioManager } from '../utils/audioManager';
import { useSupabaseProgress } from '../hooks/useSupabaseProgress';
import { useEffect, useState } from 'react';

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
  const { progress, isNewUnlockAvailable, newlyUnlockedCharacter, dismissUnlockCelebration } = useSupabaseProgress();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCharacterSelect = (character: Character) => {
    // Check if character is unlocked based on progress only
    if (!progress.unlockedCharacters.includes(character.id)) {
      return; // Character is locked, don't allow selection
    }

    onCharacterSelect(character);
    
    // Play selection sound when character is selected
    audioManager.playSound('selection', character.type);
    
    // Go to question type selection instead of continuing directly
    onContinue();
  };

  // Filter characters based on unlock status from progress only
  const getCharacterUnlockStatus = (character: Character) => {
    return progress.unlockedCharacters.includes(character.id);
  };

  // UPDATED: Correct unlock requirements to match database changes
  const getUnlockRequirement = (characterId: string) => {
    switch (characterId) {
      case 'lazy-panda':
        return '2-day streak required';
      case 'sneaky-snake':
        return '4-day streak required';
      case 'people-pleaser-pup':
        return '7-day streak required';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-20 md:pt-6 relative overflow-hidden">
      {/* Unlock celebration popup */}
      <UnlockCelebration 
        isVisible={isNewUnlockAvailable}
        unlockedCharacter={newlyUnlockedCharacter}
        onDismiss={dismissUnlockCelebration}
      />

      {/* Enhanced premium background with better layering */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-600">
        {/* Refined geometric patterns with subtle animation */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 border border-amber-400/20 rotate-45 rounded-3xl animate-[float_20s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-amber-400/15 rotate-12 rounded-2xl animate-[float_25s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute top-1/2 left-1/6 w-48 h-48 border border-amber-400/25 -rotate-12 rounded-xl animate-[float_30s_ease-in-out_infinite]"></div>
        </div>
        
        {/* Enhanced ambient lighting with smooth pulsing */}
        <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-amber-400/8 rounded-full blur-[120px] animate-[glow-pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[100px] animate-[glow-pulse_12s_ease-in-out_infinite_reverse]"></div>
      </div>

      {/* Main Content with staggered fade-in animation */}
      <div className={`text-center space-y-20 max-w-6xl w-full transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Enhanced branding section with improved spacing */}
        <div className="space-y-12">
          <div className="space-y-8">
            {/* Main Title with premium typography and subtle glow */}
            <div className="relative">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-medium tracking-[0.3em] text-slate-50 relative transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ animationDelay: '200ms' }}>
                CHAOTIC
              </h1>
              <div className="absolute inset-0 text-amber-400/20 blur-sm pointer-events-none">CHAOTIC</div>
            </div>
            
            {/* Elegant divider with enhanced animation */}
            <div className={`flex items-center justify-center space-x-8 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ animationDelay: '400ms' }}>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
              <div className="w-4 h-4 border border-amber-400/60 rotate-45 bg-amber-400/10 transition-transform duration-500 hover:rotate-[225deg] hover:scale-110"></div>
              <div className="w-20 h-px bg-gradient-to-l from-transparent via-amber-400/60 to-transparent"></div>
            </div>
            
            {/* Subtitle with refined spacing */}
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-normal tracking-[0.2em] text-slate-100 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: '600ms' }}>
              COUNSEL
            </h2>
          </div>
          
          {/* Refined tagline with premium spacing */}
          <div className={`space-y-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ animationDelay: '800ms' }}>
            <p className="text-base sm:text-lg text-amber-300/70 font-inter font-light tracking-wide uppercase">
              Choose your guide
            </p>
          </div>
        </div>

        {/* Character Selection with enhanced spacing and animations */}
        <div className="space-y-12">
          {/* Character Grid with staggered entrance animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
            {characters.map((character, index) => {
              const isUnlocked = getCharacterUnlockStatus(character);
              const unlockRequirement = getUnlockRequirement(character.id);
              
              return (
                <div 
                  key={character.id} 
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ animationDelay: `${1000 + index * 150}ms` }}
                >
                  <div className="group relative">
                    <CharacterCard
                      character={character}
                      onSelect={() => handleCharacterSelect(character)}
                      isSelected={false}
                      isLocked={!isUnlocked}
                    />
                    {!isUnlocked && unlockRequirement && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-black/75">
                        <div className="text-center space-y-3 p-6">
                          <div className="text-3xl animate-pulse">🔒</div>
                          <p className="text-amber-300 text-base font-medium tracking-wide">
                            {unlockRequirement}
                          </p>
                          <p className="text-slate-400 text-sm font-light">
                            Current streak: {progress.streak} day{progress.streak !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instruction Text with premium spacing */}
          <div className={`pt-8 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ animationDelay: `${1000 + characters.length * 150 + 200}ms` }}>
            <p className="text-amber-300/60 text-sm sm:text-base font-inter font-light tracking-wider">
              Select an advisor to begin your session
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced border effects with subtle animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-[glow-pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-[glow-pulse_6s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/20 to-transparent animate-[glow-pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/20 to-transparent animate-[glow-pulse_8s_ease-in-out_infinite_reverse]"></div>
      </div>
    </div>
  );
};

export default CombinedHomePage;
