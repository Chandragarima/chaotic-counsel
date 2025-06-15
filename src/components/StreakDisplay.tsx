
import { Flame } from 'lucide-react';
import { useSupabaseProgress } from '../hooks/useSupabaseProgress';
import { useIsMobile } from '@/hooks/use-mobile';

const StreakDisplay = () => {
  const { progress } = useSupabaseProgress();
  const isMobile = useIsMobile();

  // Get flame color based on streak
  const getFlameColor = (streak: number) => {
    if (streak >= 7) return 'text-red-400';
    if (streak >= 4) return 'text-orange-400';
    if (streak >= 1) return 'text-yellow-400';
    return 'text-gray-400';
  };

  // Get background gradient based on streak
  const getBackgroundGradient = (streak: number) => {
    if (streak >= 7) return 'from-red-500/20 to-red-600/20 border-red-400/30';
    if (streak >= 4) return 'from-orange-500/20 to-red-500/20 border-orange-400/30';
    if (streak >= 1) return 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30';
    return 'from-gray-500/10 to-gray-600/10 border-gray-400/20';
  };

  // Responsive sizing
  const containerClasses = isMobile 
    ? "flex items-center space-x-1 px-2 py-1 text-xs" 
    : "flex items-center space-x-2 px-4 py-2 text-sm";
  
  const iconSize = isMobile ? "h-3 w-3" : "h-5 w-5";

  return (
    <div className={`${containerClasses} bg-gradient-to-r ${getBackgroundGradient(progress.streak)} backdrop-blur-sm border rounded-full`}>
      <Flame className={`${iconSize} ${getFlameColor(progress.streak)}`} />
      <span className="text-white font-medium">
        {progress.streak} day{progress.streak !== 1 ? 's' : ''}
      </span>
      {progress.streak === 0 && (
        <span className="text-gray-300 text-xs opacity-75">
          - Start your streak!
        </span>
      )}
    </div>
  );
};

export default StreakDisplay;
