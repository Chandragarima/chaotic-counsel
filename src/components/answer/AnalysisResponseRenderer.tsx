
import { useState } from 'react';
import { AnalysisAIResponseEnhanced, Character } from '../../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface AnalysisResponseRendererProps {
  response: AnalysisAIResponseEnhanced;
  character: Character;
}

const AnalysisResponseRenderer = ({ response, character }: AnalysisResponseRendererProps) => {
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
      {/* Conclusion First */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <p className={`${theme.colors.text} text-lg ${theme.fonts.body} font-medium italic`}>
        "{response.personalityReflection}"
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
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-amber-400">•</span>
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
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-amber-400">•</span>
                  <span className="text-sm">{perspective}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default AnalysisResponseRenderer;
