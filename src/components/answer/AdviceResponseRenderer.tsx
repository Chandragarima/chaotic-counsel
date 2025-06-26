
import { useState } from 'react';
import { AdviceAIResponseEnhanced, Character } from '../../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface AdviceResponseRendererProps {
  response: AdviceAIResponseEnhanced;
  character: Character;
}

const AdviceResponseRenderer = ({ response, character }: AdviceResponseRendererProps) => {
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
      {/* Main Advice - Prominent */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <p className={`${theme.colors.text} text-lg ${theme.fonts.body} font-medium italic`}>
          "{response.personalityWisdom}"
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
            <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body} list-decimal list-inside`}>
              {response.steps.map((step, index) => (
               <li key={index} className="flex items-center space-x-3">
               <span className="text-amber-400">•</span>
               <span className="text-sm">{step}</span>
             </li>
              ))}
            </ul>
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
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-amber-400">•</span>
                  <span className="text-sm">{consideration}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default AdviceResponseRenderer;
