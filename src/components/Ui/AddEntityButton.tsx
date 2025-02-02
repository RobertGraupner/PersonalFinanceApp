'use client';

import { Button } from '@/components/Ui/button';
import { cn } from '@/lib/utils/cn';

interface AddEntityButtonProps {
  onClick: () => void;
  variant?: 'default' | 'outline';
  className?: string;
  label?: string;
}

export function AddEntityButton({
  onClick,
  className,
  label = 'Add New',
}: AddEntityButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'h-auto bg-grey900 px-4 py-4 text-white hover:bg-grey500',
        className
      )}
    >
      <span className="text-preset-4 font-bold">{label}</span>
    </Button>
  );
}
