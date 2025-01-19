import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-preset-1',
        'text-preset-2',
        'text-preset-3',
        'text-preset-4',
        'text-preset-5',
      ],
      'text-color': ['text-grey500', 'text-grey900', 'text-green'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
