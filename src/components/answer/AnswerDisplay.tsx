
import { Character, AIResponse, BinaryAIResponse, AdviceAIResponseEnhanced, RecommendationAIResponseEnhanced, AnalysisAIResponseEnhanced, ChoiceAIResponseEnhanced } from '../../types';
import { Card } from '@/components/ui/card';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import BinaryResponseRenderer from './BinaryResponseRenderer';
import AdviceResponseRenderer from './AdviceResponseRenderer';
import RecommendationResponseRenderer from './RecommendationResponseRenderer';
import AnalysisResponseRenderer from './AnalysisResponseRenderer';
import ChoiceResponseRenderer from './ChoiceResponseRenderer';

interface AnswerDisplayProps {
  character: Character;
  answer: string;
  isRevealing: boolean;
  isThinking: boolean;
  aiResponse?: AIResponse | null;
}

const AnswerDisplay = ({ character, answer, isRevealing, isThinking, aiResponse }: AnswerDisplayProps) => {
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

  const renderAIResponse = (response: AIResponse) => {
    switch (response.responseType) {
      case 'binary':
        return <BinaryResponseRenderer response={response as BinaryAIResponse} character={character} />;
      case 'advice':
        return <AdviceResponseRenderer response={response as AdviceAIResponseEnhanced} character={character} />;
      case 'recommendation':
        return <RecommendationResponseRenderer response={response as RecommendationAIResponseEnhanced} character={character} />;
      case 'analysis':
        return <AnalysisResponseRenderer response={response as AnalysisAIResponseEnhanced} character={character} />;
      case 'choice':
        return <ChoiceResponseRenderer response={response as ChoiceAIResponseEnhanced} character={character} />;
      default:
        // Fallback to binary format for legacy responses
        return <BinaryResponseRenderer response={response as BinaryAIResponse} character={character} />;
    }
  };

  return (
    <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-10 ${theme.colors.glow} shadow-2xl ${theme.animations.cardHover}`}>
      {isRevealing ? (
        <div className={`text-center space-y-6 ${theme.animations.thinking}`}>
          <div className={`w-8 h-8 border-2 border-transparent border-t-current animate-spin mx-auto ${theme.colors.text}`} style={{ borderTopColor: theme.colors.accent }}></div>
          <p className={`${theme.colors.text} animate-pulse ${theme.fonts.body} text-lg opacity-70`}>
            {isThinking ? getPersonalityPrompt() : "Weaving threads of destiny..."}
          </p>
        </div>
      ) : (
        <div className={`space-y-6 text-center ${theme.animations.responding}`}>
          <h3 className={`bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.fonts.heading} text-xl`}>
            {character.name} speaks:
          </h3>
          
          {aiResponse ? (
            // New AI Response Layout
            renderAIResponse(aiResponse)
          ) : answer ? (
            // Regular Fun Mode Response
            <p className={`${theme.colors.text} text-xl leading-relaxed ${theme.fonts.body}`}>
              "{answer}"
            </p>
          ) : (
            // Fallback when no response is available
            <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body} opacity-70`}>
              "The universe whispers its answer, but the winds carry it away..."
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default AnswerDisplay;
