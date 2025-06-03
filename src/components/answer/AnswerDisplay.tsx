
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

  // Parse AI response if it contains JSON string
  const getParsedAIResponse = (): AIResponse | null => {
    if (!aiResponse) return null;

    // Check if reflection contains JSON that needs parsing
    if (aiResponse.reflection && aiResponse.reflection.includes('```json')) {
      try {
        // Extract JSON from the reflection
        const jsonMatch = aiResponse.reflection.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          const parsedResponse = JSON.parse(jsonMatch[1]);
          console.log('Successfully parsed embedded JSON:', parsedResponse);
          return parsedResponse;
        }
      } catch (error) {
        console.error('Failed to parse embedded JSON:', error);
      }
    }

    // Return the original response if no parsing needed
    return aiResponse;
  };

  const parsedResponse = getParsedAIResponse();

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
          
          {parsedResponse && parsedResponse.reflection ? (
            // AI Response Layout for Serious Mode
            <div className="space-y-8 text-left">
              <div>
                <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body} italic`}>
                  "{parsedResponse.reflection}"
                </p>
              </div>
              
              {parsedResponse.considerations && parsedResponse.considerations.length > 0 && (
                <div>
                  <h4 className={`${theme.colors.text} font-semibold mb-3 text-center`}>Key Considerations</h4>
                  <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
                    {parsedResponse.considerations.map((consideration, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className={`${theme.colors.accent} mt-1`}>•</span>
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {parsedResponse.nextSteps && parsedResponse.nextSteps.length > 0 && (
                <div>
                  <h4 className={`${theme.colors.text} font-semibold mb-3 text-center`}>Suggested Steps</h4>
                  <ol className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
                    {parsedResponse.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className={`${theme.colors.accent} font-semibold min-w-[1.5rem]`}>{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              
              {parsedResponse.deeperQuestion && (
                <div className="border-t border-amber-400/20 pt-6">
                  <h4 className={`${theme.colors.text} font-semibold mb-2 text-center`}>Reflect Deeper</h4>
                  <p className={`${theme.colors.text} ${theme.fonts.body} italic text-center opacity-90`}>
                    "{parsedResponse.deeperQuestion}"
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
