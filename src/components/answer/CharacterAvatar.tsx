
import { Character } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface CharacterAvatarProps {
  character: Character;
  isThinking: boolean;
}

const CharacterAvatar = ({ character, isThinking }: CharacterAvatarProps) => {
  const theme = getPersonalityTheme(character.type);

  return (
    <div className="text-center">
      <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}>
        {character.image ? (
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl">
            {character.type === 'sassy-cat' && '😾'}
            {character.type === 'wise-owl' && '🦉'}
            {character.type === 'lazy-panda' && '🐼'}
            {character.type === 'anxious-bunny' && '🐰'}
            {character.type === 'quirky-duck' && '🦆'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterAvatar;
