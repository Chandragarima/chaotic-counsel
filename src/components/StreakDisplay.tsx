import { Flame } from 'lucide-react';
import { useSupabaseProgress } from '../hooks/useSupabaseProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { IS_STREAK_ENABLED } from '@/config/features';

const StreakDisplay = () => {
  const { progress } = useSupabaseProgress();
  const isMobile = useIsMobile();

  // Hide streak display when streak tracking is disabled
  if (!IS_STREAK_ENABLED) {
    return null;
  }

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

  // Simplified display - just flame icon and number
  return (
    <div className="flex items-center space-x-1.5">
      <Flame className={`w-4 h-4 ${getFlameColor(progress.streak)}`} />
      <span className="text-white font-medium text-sm">
        {progress.streak}
      </span>
    </div>
  );
};

export default StreakDisplay;
