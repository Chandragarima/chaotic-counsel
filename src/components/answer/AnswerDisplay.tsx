
import { Character, AIResponse } from '../../types';
import { Card } from '@/components/ui/card';
import { getPersonalityTheme } from '../../utils/personalityThemes';

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
          
          {aiResponse && aiResponse.deeperQuestion ? (
            // New AI Response Layout for Serious Mode
            <div className="space-y-8 text-left">
              {/* Deeper Question */}
              <div className="text-center">
                <h4 className={`${theme.colors.text} font-semibold mb-3`}>First, Consider This</h4>
                <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body} italic`}>
                  "{aiResponse.deeperQuestion}"
                </p>
              </div>
              
              {/* Reasons For Yes */}
              {aiResponse.reasonsForYes && aiResponse.reasonsForYes.length > 0 && (
                <div>
                  <h4 className={`${theme.colors.text} font-semibold mb-3 text-center`}>Reasons to Say YES</h4>
                  <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
                    {aiResponse.reasonsForYes.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className={`${theme.colors.accent} mt-1`}>✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Reasons For No */}
              {aiResponse.reasonsForNo && aiResponse.reasonsForNo.length > 0 && (
                <div>
                  <h4 className={`${theme.colors.text} font-semibold mb-3 text-center`}>Reasons to Say NO</h4>
                  <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
                    {aiResponse.reasonsForNo.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className={`${theme.colors.accent} mt-1`}>✗</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Calculated Risk */}
              {aiResponse.calculatedRisk && (
                <div className="text-center">
                  <h4 className={`${theme.colors.text} font-semibold mb-2`}>Risk Assessment</h4>
                  <p className={`${theme.colors.text} ${theme.fonts.body} opacity-90`}>
                    {aiResponse.calculatedRisk}
                  </p>
                </div>
              )}
              
              {/* Personality Recommendation */}
              {aiResponse.personalityRecommendation && (
                <div className="border-t border-amber-400/20 pt-6 text-center">
                  <h4 className={`${theme.colors.text} font-semibold mb-3`}>The Wise Owl's Decision</h4>
                  <p className={`${theme.colors.text} text-xl leading-relaxed ${theme.fonts.body} font-medium`}>
                    "{aiResponse.personalityRecommendation}"
                  </p>
                </div>
              )}
            </div>
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
