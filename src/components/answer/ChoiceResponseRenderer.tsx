
import { useState } from 'react';
import { ChoiceAIResponseEnhanced, Character } from '../../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface ChoiceResponseRendererProps {
  response: ChoiceAIResponseEnhanced;
  character: Character;
}

const ChoiceResponseRenderer = ({ response, character }: ChoiceResponseRendererProps) => {
  const theme = getPersonalityTheme(character.type);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6 text-left">
      {/* Recommended Choice */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <p className={`${theme.colors.text}  text-lg ${theme.fonts.body} font-medium italic`}>
          "{response.finalThought}"
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
    </div>
  );
};

export default ChoiceResponseRenderer;
