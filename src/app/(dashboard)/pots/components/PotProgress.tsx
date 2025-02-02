import { cn } from '@/lib/utils/cn';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { IPot } from '@/lib/models/Pot';

interface PotProgressProps {
  pot: IPot;
}

export function PotProgress({ pot }: PotProgressProps) {
  const progress = (pot.total / pot.target) * 100;
  const clampedProgress = Math.min(Math.max(progress, 0), 100).toFixed(2);

  return (
    <div className="space-y-4">
      {/* progress text */}
      <div className="flex items-center justify-between">
        <span className="text-preset-4 text-grey500">Total Saved</span>
        <span className="text-preset-1 font-bold text-grey900">
          {formatCurrency(pot.total)}
        </span>
      </div>
      {/* progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-beige100">
        <div
          className={cn('h-full rounded-full transition-all duration-300')}
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: pot.theme,
          }}
        />
      </div>
      {/* progress text */}
      <div className="flex items-center justify-between">
        <p className="text-preset-5 font-bold text-grey500">
          {clampedProgress}%
        </p>
        <p className="text-preset-5 text-grey500">
          Target of {formatCurrency(pot.target)}
        </p>
      </div>
    </div>
  );
}
