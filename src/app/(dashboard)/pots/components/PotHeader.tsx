import { PotHeaderProps } from '@/types/pots';
import { MoreHorizontal } from 'lucide-react';

export function PotHeader({ pot }: PotHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: pot.theme }}
        />
        <h3 className="text-preset-2 text-grey900">{pot.name}</h3>
      </div>

      <button className="text-grey300">
        <MoreHorizontal className="h-6 w-6" />
      </button>
    </div>
  );
}
