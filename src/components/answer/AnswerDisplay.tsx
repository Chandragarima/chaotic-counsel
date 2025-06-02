
import { Character } from '../../types';
import { Card } from '@/components/ui/card';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface AnswerDisplayProps {
  character: Character;
  answer: string;
  isRevealing: boolean;
  isThinking: boolean;
}

const AnswerDisplay = ({ character, answer, isRevealing, isThinking }: AnswerDisplayProps) => {
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
    <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-10 ${theme.colors.glow} shadow-2xl ${theme.animations.cardHover}`}>
      {isRevealing ? (
        <div className={`text-center space-y-6 ${theme.animations.thinking}`}>
          <div className={`w-8 h-8 border-2 border-transparent border-t-current rounded-full animate-spin mx-auto ${theme.colors.text}`} style={{ borderTopColor: theme.colors.accent }}></div>
          <p className={`${theme.colors.text} animate-pulse ${theme.fonts.body} text-lg opacity-70`}>
            {isThinking ? getPersonalityPrompt() : "Weaving threads of destiny..."}
          </p>
        </div>
      ) : (
        <div className={`space-y-6 text-center ${theme.animations.responding}`}>
          <h3 className={`bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.fonts.heading} text-xl`}>
            {character.name} speaks:
          </h3>
          <p className={`${theme.colors.text} text-xl leading-relaxed ${theme.fonts.body}`}>
            "{answer}"
          </p>
        </div>
      )}
    </Card>
  );
};

export default AnswerDisplay;
