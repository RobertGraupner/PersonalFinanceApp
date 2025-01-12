import { ColorBarProps } from '@/types/ui';
import { formatCurrency } from '@/lib/utils/formatCurrency';

export function ColorBar({ color, label, value }: ColorBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-full min-h-[43px] w-1 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col gap-1">
        <p className="text-preset-5 text-grey500">{label}</p>
        <p className="text-preset-4 font-bold text-grey900">
          {formatCurrency(value)}
        </p>
      </div>
    </div>
  );
}
