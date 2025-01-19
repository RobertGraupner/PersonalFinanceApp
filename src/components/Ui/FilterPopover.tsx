import { Check } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Ui/popover';
import type { FilterPopoverProps } from '@/types/ui';

export function FilterPopover({
  options,
  currentValue,
  onSelect,
  icon,
  iconAlt,
  label,
  translateX = '0',
}: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild aria-label={label}>
        <button className="p-2">
          <Image src={icon} alt={iconAlt} width={24} height={24} />
        </button>
      </PopoverTrigger>
      <PopoverContent className={`w-[160px] p-1 ${translateX}`}>
        <div className="flex flex-col">
          {options.map((option) => (
            <button
              key={option.value}
              className="flex w-full items-center justify-between rounded-md px-1 py-2 text-left text-sm hover:bg-gray-100"
              onClick={() => onSelect(option.value)}
            >
              {option.label}
              {currentValue === option.value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
