
import { useState } from 'react';
import { BinaryAIResponse, Character } from '../../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { getPersonalityTheme } from '../../utils/personalityThemes';

interface BinaryResponseRendererProps {
  response: BinaryAIResponse;
  character: Character;
}

const BinaryResponseRenderer = ({ response, character }: BinaryResponseRendererProps) => {
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
      {/* Main Recommendation - Prominent at top */}
      <div className="text-center border-b border-amber-400/20 pb-6">
        <p className={`${theme.colors.text} text-xl leading-relaxed ${theme.fonts.body} font-semibold`}>
          "{response.personalityRecommendation}"
        </p>
      </div>

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
                Reasons to Say YES
              </h4>
              <ChevronDown className={`h-4 w-4 ${theme.colors.text} transition-transform ${expandedSections.pros ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <ul className={`${theme.colors.text} space-y-2 ${theme.fonts.body}`}>
                {response.reasonsForYes.map((reason, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
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
                  <li key={index} className="flex items-center space-x-3">
                    <span className="text-red-400">✗</span>
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
};

export default BinaryResponseRenderer;
