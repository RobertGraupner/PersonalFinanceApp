'use client';

import { Button } from '@/components/Ui/button';
import type { AddEntityButtonProps } from '@/types/ui';

export function AddEntityButton({
  onClick,
  label = 'Add New',
}: AddEntityButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="h-auto bg-grey900 px-4 py-4 text-white hover:bg-grey500"
    >
      <span className="hidden text-preset-4 font-bold sm:inline">{label}</span>
      <span className="inline text-preset-4 font-bold sm:hidden">
        + Add New
      </span>
    </Button>
  );
}
