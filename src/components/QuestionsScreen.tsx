import { useState } from 'react';
import { QuestionType, SampleQuestion, Character, QuestionMode } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';
import PersonalityEffects from './PersonalityEffects';
import QuestionHelpTooltip from './QuestionHelpTooltip';
import { seriousQuestions } from '../data/seriousQuestions';

interface QuestionsScreenProps {
  questionType: QuestionType;
  questionMode: QuestionMode;
  character: Character;
  onQuestionSelect: (question: string) => void;
  onBack: () => void;
}

const QuestionsScreen = ({ questionType, questionMode, character, onQuestionSelect, onBack }: QuestionsScreenProps) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = getPersonalityTheme(character.type);

  // Get sample questions based on mode
  const getSampleQuestions = (): SampleQuestion[] => {
    // For serious mode, use the serious questions data
    if (questionMode === 'serious') {
      const matchingQuestions = seriousQuestions.filter(
        q => q.characterType === character.type && q.category === questionType
      );
      
      return matchingQuestions.map(q => ({
        id: q.id,
        text: q.text,
        category: q.category
      }));
    }

    // For fun mode, use the existing personality-specific questions
    const baseId = `${character.type}-${questionType}`;
    
    switch (character.type) {
      case 'sassy-cat':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I actually cook tonight, or just keep pretending I will?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Do I deserve dessert before dinner or after both meals?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'What cuisine should I order tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Is today a salad day or a "carbs don\'t count" day?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Pizza or tacos for my cheat meal?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I binge-watch something tonight?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Do I watch for the plot… or for the hot people?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What movie I should watch tonight?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I rewatch The Office again?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Netflix or Disney+ tonight?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Is it rude to cancel plans because my vibes said no?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Coffee shop or bubble tea place?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Text the group chat or just keep being mysterious?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I post this on my story?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Beach day or shopping mall?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I text my ex?', category: 'choice' },
              { id: `${baseId}-2`, text: 'iPhone or Android for my next phone?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I keep scrolling… or pretend I respect my sleep schedule tonight?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I quit my job and become an influencer?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Post the selfie or pretend I\'m humble?', category: 'choice' }
            ];
        }
        break;
        
      case 'wise-owl':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I practice mindful eating tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Does skipping breakfast count as intermittent fasting or just poor planning?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'What cuisine will nourish my soul tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I cook with intention tonight?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Should I quit meat and start judging people from a higher plane?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I seek wisdom through a movie tonight?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Watch a documentary or let my brain relax with cartoons?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What genre will expand my consciousness?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Philosophical drama or feel-good comfort watch?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Classic literature adaptation or modern storytelling?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I spend time alone to recharge or push myself to connect?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Nature walk or meditation center?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Do I need this break or am I just avoiding growth?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I journal in solitude today?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Art gallery or bookstore?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Listen to logic or follow the gut feeling?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Passion or financial stability?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Will reading a book tonight lead to enlightenment?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Make the safe choice or leap into the unknown?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Is it time to let go… or hold on with purpose?', category: 'choice' }
            ];
        }
        break;
        
      case 'lazy-panda':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I order delivery tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'DoorDash or whatever is in my fridge?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Should I just eat the leftovers and call it gourmet?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Do I really need vegetables today?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'what is the dessert vibe today?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I just let Netflix autoplay?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Something I can nap to or mindless comedy?', category: 'movie' },
              { id: `${baseId}-3`, text: 'Start something new or scroll for 40 minutes and give up?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I rewatch Friends again?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Should I queue up something "productive" just to feel better?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I leave my couch today?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'My couch or someone else\'s couch?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Should I keep napping with the TV on and pretend I\'m still watching?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I cancel and say I\'m "recharging"?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Activity that requires pants or pajama-friendly?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I adult today?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Ice Cream or Cake tonight?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I cancel my plans because doing nothing is kinda working for me?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I clean my room?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Gym membership or accept my fate?', category: 'choice' }
            ];
        }
        break;
        
      case 'sneaky-snake':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Which spot will get me the best dinner and look impressive on stories?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Expensive restaurant or cheap eats for maximum savings?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Should I order something healthy just to feel good?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I cook at home where no one can judge me?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Fast food or fine-dining tonight?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Do I watch the trending show just to stay in the loop?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Thriller or comedy to throw people off my scent?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What genre would be the perfect companion for tonight?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I binge-watch spy shows for research purposes?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Should I suggest a movie I secretly want them to hate?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I go somewhere public for a perfectly innocent hangout?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Coffee shop with good Wi-Fi or park with no security cameras?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Where should I meet my... completely legitimate friends?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Work smarter or make it look like I worked harder?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Do I attend just long enough to be seen, then ghost?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I reveal my true intentions now or wait longer?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Direct approach or continue with subtle manipulation?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I reveal the truth or keep the advantage?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I trust them with my secret... or keep scheming?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Play it safe or take the calculated risk for maximum gain?', category: 'choice' }
            ];
        }
        break;
        
      case 'people-pleaser-pup':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I cook a real food or just snack again?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'What dessert will everyone praise me for?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Is ordering fries and onion rings too much?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I offer to split dessert or just get my own slice?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'What cuisine would make absolutely everyone happy tonight?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I let everyone else pick the movie again?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Is it okay to rewatch my comfort show for the 12th time?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What movie genre would get the most group approval tonight?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I suggest my favorite movie even if others might not like it?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Should I finally start that show everyone\'s been recommending?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Go with my first instinct or ask everyone what they think?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Expensive place they love or budget option that won\'t stress anyone?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Should I say yes to that spontaneous invite?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I plan everything myself so no one else has to worry?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Is it okay to cancel plans for a cozy night in?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Text them now or wait so I don\'t seem too eager?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Board games or movie night with friends?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I set boundaries even if it might upset someone?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I say yes to avoid conflict even though I want to say no?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Be honest or just say what they want to hear?', category: 'choice' }
            ];
        }
        break;
        
      default:
        return [
          { id: '1', text: 'Should I order pizza?', category: 'dinner' },
          { id: '2', text: 'Should I go out tonight?', category: 'hangout' },
          { id: '3', text: 'What should I watch?', category: 'movie' },
          { id: '4', text: 'Should I make this choice?', category: 'choice' }
        ];
    }
    
    return [];
  };

  const sampleQuestions = getSampleQuestions();

  const getTypeTitle = () => {
    const baseTitle = (() => {
      switch (questionType) {
        case 'dinner': return 'Dinner Decisions';
        case 'movie': return 'Entertainment Choices';
        case 'hangout': return 'Activity Ideas';
        case 'choice': return 'Life Choices';
        case 'career': return 'Career & Professional Growth';
        case 'finance': return 'Finance & Money Decisions';
        case 'personal-growth': return 'Personal Growth';
        case 'relationships': return 'Relationships';
      }
    })();

    // Add personality flair to titles
    switch (character.type) {
      case 'sassy-cat':
        return `${baseTitle} (With Attitude)`;
      case 'wise-owl':
        return questionMode === 'serious' ? `Sacred ${baseTitle}` : `Sacred ${baseTitle}`;
      case 'lazy-panda':
        return `Low-Effort ${baseTitle}`;
      case 'sneaky-snake':
        return `Strategic ${baseTitle}`;
      case 'people-pleaser-pup':
        return `Considerate ${baseTitle}`;
      default:
        return baseTitle;
    }
  };

  const getPersonalityPrompt = () => {
    if (questionMode === 'serious') {
      switch (character.type) {
        case 'wise-owl': return "Ancient wisdom for life's important decisions";
        case 'sassy-cat': return "Real talk for your life challenges";
        case 'lazy-panda': return "Stress-free guidance for big decisions";
        case 'sneaky-snake': return "Strategic insights for life's complexities";
        case 'people-pleaser-pup': return "Supportive guidance for difficult choices";
        default: return "Thoughtful wisdom for serious matters";
      }
    }
    
    switch (character.type) {
      case 'sassy-cat':
        return "Ready to judge your choices with style";
      case 'wise-owl':
        return "Ancient wisdom awaits your inquiry";
      case 'lazy-panda':
        return "Here to help with minimal effort required";
      case 'sneaky-snake':
        return "Plotting the perfect answer for your schemes";
      case 'people-pleaser-pup':
        return "Eager to help make everyone happy!";
      default:
        return `${character.name} is here to help you choose`;
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setTimeout(() => {
      onQuestionSelect(question);
    }, 150);
  };

  const handleCustomSubmit = () => {
    if (customQuestion.trim() && !isSubmitting) {
      setIsSubmitting(true);
      setTimeout(() => {
        onQuestionSelect(customQuestion.trim());
      }, 150);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  return (
    <div className={`relative min-h-screen ${theme.animations.entrance}`}>
      <PersonalityEffects character={character} isActive={true} />
      
      <div className="relative z-10 min-h-screen p-4 space-y-8">
        {/* Header with Character Image */}
        <div className="text-center space-y-6 pt-12">
          {/* Character Image */}
          <div className="flex justify-center">
            <div className={`relative ${theme.animations.floating}`}>
              <img 
                src={character.image} 
                alt={character.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white/20 backdrop-blur-sm"
                style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.4))',
                  animation: `${theme.animations.floating} 3s ease-in-out infinite`
                }}
              />
            </div>
          </div>

           {/* Elegant divider */}
        <div className="flex items-center justify-center space-x-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></div>
              <div className="w-3 h-3 border border-amber-400/70 rotate-45 bg-amber-400/15"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400/70 to-transparent"></div>
            </div>
            
          <h1 className={`text-4xl ${theme.fonts.heading} ${theme.colors.text} opacity-90 ${theme.animations.floating}`}>
            {getTypeTitle()}
          </h1>
          <p className={`${theme.colors.text} opacity-70 ${theme.fonts.body}`}>
            {getPersonalityPrompt()}
          </p>
        </div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center space-x-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></div>
              <div className="w-3 h-3 border border-amber-400/70 rotate-45 bg-amber-400/15"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400/70 to-transparent"></div>
            </div>

        {/* Sample Questions */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className={`${theme.colors.text} ${theme.fonts.heading} text-xl text-center opacity-80`}>
            {character.name}'s {questionMode === 'serious' ? 'Thoughtful' : 'Signature'} Questions
          </h3>
          
          <div className="grid gap-4">
            {sampleQuestions.map((question, index) => (
              <Card
                key={question.id}
                className={`${theme.effects.borderStyle} bg-slate-900/40 backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 min-h-[80px] flex items-center ${theme.colors.glow} ${theme.animations.cardHover} ${
                  selectedQuestion === question.text 
                    ? 'scale-95 opacity-75' 
                    : 'hover:scale-102 hover:bg-slate-900/60 active:scale-98'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => handleQuestionSelect(question.text)}
              >
                <p className={`${theme.colors.text} ${theme.fonts.body} text-center w-full text-lg opacity-90`}>
                  {question.text}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Question Input */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            <h3 className={`${theme.colors.text} ${theme.fonts.heading} text-xl opacity-80`}>
              Or Ask Your Own
            </h3>
            {questionMode === 'serious' && <QuestionHelpTooltip character={character} />}
          </div>
          
          <div className="flex gap-3">
            <Input
              placeholder="Type your question here..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`${theme.effects.borderStyle} bg-slate-900/40 backdrop-blur-sm ${theme.colors.text} ${theme.fonts.body} min-h-[56px] text-lg placeholder:opacity-50 focus:bg-slate-900/60 transition-all duration-300`}
              disabled={isSubmitting}
              style={{ color: theme.colors.accent }}
            />
            <Button
              onClick={handleCustomSubmit}
              disabled={!customQuestion.trim() || isSubmitting}
              className={`min-h-[56px] min-w-[56px] bg-gradient-to-r ${theme.colors.primary} hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${theme.animations.buttonHover}`}
              style={{ backgroundColor: theme.colors.accent }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center pt-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            className={`${theme.colors.text} hover:opacity-80 min-h-[44px] px-8 ${theme.fonts.body} transition-all duration-300 ${theme.animations.buttonHover}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsScreen;
