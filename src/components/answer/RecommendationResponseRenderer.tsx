import { useState } from 'react';
import { RecommendationAIResponseEnhanced, Character } from '../../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface RecommendationResponseRendererProps {
  response: RecommendationAIResponseEnhanced;
  character: Character;
}

const RecommendationResponseRenderer = ({ response, character }: RecommendationResponseRendererProps) => {
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
      {/* Top Recommendation */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <p className={`${theme.colors.text} text-lg ${theme.fonts.body} font-medium italic`}>
          "{response.personalityNote}"
        </p>
      </div>

      {/* Reasoning - Collapsible */}
      <Collapsible open={expandedSections.reasoning} onOpenChange={() => toggleSection('reasoning')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mt-6 mb-2">
          <h4 className={`${theme.colors.text} font-bold text-base`}>Why This Advice</h4>
          <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.reasoning ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <p className={`${theme.colors.text} ${theme.fonts.body} opacity-90 text-sm pl-1`}>
            {response.reasoning}
          </p>
        </CollapsibleContent>
      </Collapsible>

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
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-amber-400">→</span>
                  <span className="text-sm">{alternative}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default RecommendationResponseRenderer;
