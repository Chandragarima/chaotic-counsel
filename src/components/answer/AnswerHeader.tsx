import { Character } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface AnswerHeaderProps {
  character: Character;
}

const AnswerHeader = ({ character }: AnswerHeaderProps) => {
  const theme = getPersonalityTheme(character.type);

  const getPersonalityPrompt = () => {
    switch (character.type) {
      case 'sassy-cat':
        return "The enigmatic feline contemplates your query...";
      case 'wise-owl':
        return "Ancient wisdom stirs in the depths of knowledge...";
      case 'lazy-panda':
        return "Peaceful contemplation flows through tranquil thoughts...";
      case 'sneaky-snake':
        return "Cunning calculations weave through strategic thoughts...";
      case 'people-pleaser-pup':
        return "Eager energy bounces through supportive considerations...";
      default:
        return "Consulting the universe...";
    }
  };

  return (
    <div className="text-center space-y-6 pt-12">
      <div className="space-y-4">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.animations.floating}`}>
          {character.name}
        </h1>
        <div className="flex items-center justify-center space-x-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></div>
              <div className="w-3 h-3 border border-amber-400/70 rotate-45 bg-amber-400/15"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400/70 to-transparent"></div>
            </div>
      </div>
      
      <p className={`${theme.colors.text} ${theme.fonts.body} opacity-80 text-sm sm:text-base`}>
        {getPersonalityPrompt()}
      </p>
    </div>
  );
};

export default AnswerHeader;
