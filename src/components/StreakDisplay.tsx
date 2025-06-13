
import { Flame } from 'lucide-react';
import { useSupabaseProgress } from '../hooks/useSupabaseProgress';

const StreakDisplay = () => {
  const { progress } = useSupabaseProgress();

  if (progress.streak === 0) return null;

  return (
    <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 py-2">
      <Flame className={`h-5 w-5 ${progress.streak >= 7 ? 'text-red-400' : progress.streak >= 4 ? 'text-orange-400' : 'text-yellow-400'}`} />
      <span className="text-white font-medium text-sm">
        {progress.streak} day{progress.streak !== 1 ? 's' : ''}
      </span>
    </div>
  );
};

export default StreakDisplay;
