import { MoreHorizontal } from 'lucide-react';
import type { CardHeaderProps } from '@/types/ui';

export function CardHeader({ name, theme, onActionClick }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: theme }}
        />
        <h3 className="text-preset-2 text-grey900">{name}</h3>
      </div>
      <button
        onClick={onActionClick}
        className="text-grey300 transition-colors hover:text-grey500"
      >
        <MoreHorizontal className="h-6 w-6" />
      </button>
    </div>
  );
}
