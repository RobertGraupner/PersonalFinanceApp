import type { PageNumberProps } from '@/types/transactions';
import { cn } from '@/lib/utils/cn';

export function PageNumber({ page, isActive, onClick }: PageNumberProps) {
  return (
    <button
      onClick={() => onClick(page)}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'h-10 w-10 rounded-lg border border-grey500 text-preset-4',
        isActive ? 'bg-grey900 text-white' : 'bg-white text-grey500'
      )}
    >
      {page}
    </button>
  );
}
