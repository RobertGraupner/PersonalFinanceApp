import { PotProgressBarProps } from '@/types/pots';

export function PotModalProgress({
  baseProgressPercentage,
  progressWidth,
  changeWidth,
  type,
  numericAmount,
}: PotProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-grey100">
      <div className="relative h-full w-full">
        {/* Base bar */}
        {type === 'addMoney' ? (
          <div
            className="absolute h-full rounded-full bg-grey900 transition-all duration-300"
            style={{ width: `${baseProgressPercentage}%` }}
          />
        ) : (
          <div
            className="absolute h-full rounded-full bg-grey900 transition-all duration-300"
            style={{
              width:
                numericAmount > 0
                  ? `${progressWidth}%`
                  : `${baseProgressPercentage}%`,
            }}
          />
        )}

        {/* Change bar */}
        {numericAmount > 0 && (
          <div
            className={`absolute h-full rounded-full transition-all duration-300 ${
              type === 'addMoney' ? 'bg-turquoise' : 'bg-red'
            }`}
            style={{
              width: `${changeWidth}%`,
              left:
                type === 'addMoney' ? `${baseProgressPercentage}%` : undefined,
              right:
                type === 'addMoney'
                  ? undefined
                  : `${100 - baseProgressPercentage}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
