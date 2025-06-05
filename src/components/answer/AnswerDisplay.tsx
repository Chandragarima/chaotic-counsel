
import { Character, AIResponse, BinaryAIResponse, AdviceAIResponse, RecommendationAIResponse, AnalysisAIResponse, ChoiceAIResponse } from '../../types';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { useState } from 'react';

interface AnswerDisplayProps {
  character: Character;
  answer: string;
  isRevealing: boolean;
  isThinking: boolean;
  aiResponse?: AIResponse | null;
}

const AnswerDisplay = ({ character, answer, isRevealing, isThinking, aiResponse }: AnswerDisplayProps) => {
  const theme = getPersonalityTheme(character.type);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const renderBinaryResponse = (response: BinaryAIResponse) => (
    <div className="space-y-6 text-left">
      {/* Main Recommendation - Prominent at top */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <p className={`${theme.colors.text} text-xl leading-relaxed ${theme.fonts.body} font-semibold`}>
          "{response.personalityRecommendation}"
        </p>
      </div>

     {/* Risk Assessment - Quick visibility */}
      {/* <div className="text-center">
        <h4 className={`${theme.colors.text} font-semibold mb-2`}>Risk Level</h4>
        <p className={`${theme.colors.text} ${theme.fonts.body} opacity-90`}>
          {response.calculatedRisk}
        </p>
      </div> */}

      {/* Collapsible Deeper Question */}
      {response.deeperQuestion && (
        <Collapsible open={expandedSections.deeper} onOpenChange={() => toggleSection('deeper')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h4 className={`${theme.colors.text} font-semibold`}>Consider This First</h4>
            <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.deeper ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <p className={`${theme.colors.text} leading-relaxed ${theme.fonts.body} italic opacity-90`}>
              "{response.deeperQuestion}"
            </p>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Collapsible Pros and Cons */}
      <div className="space-y-4">
        {response.reasonsForYes && response.reasonsForYes.length > 0 && (
          <Collapsible open={expandedSections.pros} onOpenChange={() => toggleSection('pros')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h4 className={`${theme.colors.text} font-semibold flex items-center`}>
                {/* <span className="text-amber-400 mr-2">🌟</span> */}
                Reasons to Say YES
              </h4>
              <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.pros ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
                {response.reasonsForYes.map((reason, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {response.reasonsForNo && response.reasonsForNo.length > 0 && (
          <Collapsible open={expandedSections.cons} onOpenChange={() => toggleSection('cons')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h4 className={`${theme.colors.text} font-semibold`}>Reasons to Say NO</h4>
              <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.cons ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
                {response.reasonsForNo.map((reason, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span className="text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  );

  const renderAdviceResponse = (response: AdviceAIResponse) => (
    <div className="space-y-6 text-left">
      {/* Main Advice - Prominent */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <h4 className={`${theme.colors.text} font-bold text-xl mb-3`}>Wise Guidance</h4>
        <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body} font-medium`}>
          {response.mainAdvice}
        </p>
      </div>

      {/* Steps - Collapsible */}
      {response.steps && response.steps.length > 0 && (
        <Collapsible open={expandedSections.steps} onOpenChange={() => toggleSection('steps')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h4 className={`${theme.colors.text} font-semibold`}>Steps to Take</h4>
            <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.steps ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <ol className={`${theme.colors.text} space-y-2 ${theme.fonts.body} list-decimal list-inside`}>
              {response.steps.map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Considerations */}
      {response.considerations && response.considerations.length > 0 && (
        <Collapsible open={expandedSections.considerations} onOpenChange={() => toggleSection('considerations')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h4 className={`${theme.colors.text} font-semibold`}>Keep in Mind</h4>
            <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.considerations ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
              {response.considerations.map((consideration, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <span className="text-sm">{consideration}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Final Wisdom */}
      <div className="text-center border-t border-amber-400/20 pt-6">
        <p className={`${theme.colors.text} text-lg ${theme.fonts.body} font-medium italic`}>
          "{response.personalityWisdom}"
        </p>
      </div>
    </div>
  );

  const renderRecommendationResponse = (response: RecommendationAIResponse) => (
    <div className="space-y-6 text-left">
      {/* Top Recommendation */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <h4 className={`${theme.colors.text} font-bold text-xl mb-3`}>Recommended Choice</h4>
        <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body} font-medium`}>
          {response.topRecommendation}
        </p>
      </div>

      {/* Reasoning */}
      <div className="text-center">
        <h4 className={`${theme.colors.text} font-semibold mb-2`}>Why This Choice</h4>
        <p className={`${theme.colors.text} ${theme.fonts.body} opacity-90 text-sm`}>
          {response.reasoning}
        </p>
      </div>

      {/* Alternatives */}
      {response.alternatives && response.alternatives.length > 0 && (
        <Collapsible open={expandedSections.alternatives} onOpenChange={() => toggleSection('alternatives')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h4 className={`${theme.colors.text} font-semibold`}>Other Options</h4>
            <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.alternatives ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
              {response.alternatives.map((alternative, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">→</span>
                  <span className="text-sm">{alternative}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Final Note */}
      <div className="text-center border-t border-amber-400/20 pt-6">
        <p className={`${theme.colors.text} text-lg ${theme.fonts.body} font-medium italic`}>
          "{response.personalityNote}"
        </p>
      </div>
    </div>
  );

  const renderAnalysisResponse = (response: AnalysisAIResponse) => (
    <div className="space-y-6 text-left">
      {/* Conclusion First */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <h4 className={`${theme.colors.text} font-bold text-xl mb-3`}>Key Understanding</h4>
        <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body} font-medium`}>
          {response.conclusion}
        </p>
      </div>

      {/* Key Insights */}
      {response.keyInsights && response.keyInsights.length > 0 && (
        <Collapsible open={expandedSections.insights} onOpenChange={() => toggleSection('insights')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h4 className={`${theme.colors.text} font-semibold`}>Key Insights</h4>
            <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.insights ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
              {response.keyInsights.map((insight, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">💡</span>
                  <span className="text-sm">{insight}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Perspectives */}
      {response.perspectives && response.perspectives.length > 0 && (
        <Collapsible open={expandedSections.perspectives} onOpenChange={() => toggleSection('perspectives')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h4 className={`${theme.colors.text} font-semibold`}>Different Perspectives</h4>
            <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.perspectives ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
              {response.perspectives.map((perspective, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">👁️</span>
                  <span className="text-sm">{perspective}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Final Reflection */}
      <div className="text-center border-t border-amber-400/20 pt-6">
        <p className={`${theme.colors.text} text-lg ${theme.fonts.body} font-medium italic`}>
          "{response.personalityReflection}"
        </p>
      </div>
    </div>
  );

  const renderChoiceResponse = (response: ChoiceAIResponse) => (
    <div className="space-y-6 text-left">
      {/* Recommended Choice */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <h4 className={`${theme.colors.text} font-bold text-xl mb-3`}>Best Choice</h4>
        <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body} font-medium`}>
          {response.recommendedChoice}
        </p>
      </div>

      {/* Choice Analysis */}
      {response.choiceAnalysis && response.choiceAnalysis.length > 0 && (
        <Collapsible open={expandedSections.analysis} onOpenChange={() => toggleSection('analysis')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h4 className={`${theme.colors.text} font-semibold`}>Detailed Comparison</h4>
            <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.analysis ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-4">
              {response.choiceAnalysis.map((choice, index) => (
                <div key={index} className="border border-amber-400/20 rounded-lg p-4">
                  <h5 className={`${theme.colors.text} font-semibold mb-2`}>{choice.option}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-green-400 font-medium mb-1">Pros:</p>
                      <ul className="text-sm space-y-1">
                        {choice.pros.map((pro, i) => (
                          <li key={i} className={`${theme.colors.text} opacity-90`}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-red-400 font-medium mb-1">Cons:</p>
                      <ul className="text-sm space-y-1">
                        {choice.cons.map((con, i) => (
                          <li key={i} className={`${theme.colors.text} opacity-90`}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Final Thought */}
      <div className="text-center border-t border-amber-400/20 pt-6">
        <p className={`${theme.colors.text} text-lg ${theme.fonts.body} font-medium italic`}>
          "{response.finalThought}"
        </p>
      </div>
    </div>
  );

  const renderAIResponse = (response: AIResponse) => {
    switch (response.responseType) {
      case 'binary':
        return renderBinaryResponse(response as BinaryAIResponse);
      case 'advice':
        return renderAdviceResponse(response as AdviceAIResponse);
      case 'recommendation':
        return renderRecommendationResponse(response as RecommendationAIResponse);
      case 'analysis':
        return renderAnalysisResponse(response as AnalysisAIResponse);
      case 'choice':
        return renderChoiceResponse(response as ChoiceAIResponse);
      default:
        // Fallback to binary format for legacy responses
        return renderBinaryResponse(response as BinaryAIResponse);
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
