import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Ui/select';
import type { FilterSelectProps } from '@/types/ui';
import { cn } from '@/lib/utils/cn';

export function FilterSelect({
  options,
  currentValue,
  onSelect,
  label,
  className,
}: FilterSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-grey500">{label}</span>
      <Select value={currentValue} onValueChange={onSelect}>
        <SelectTrigger
          className={cn('h-10 w-[160px] bg-white', className)}
          aria-label={label}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="bottom" sideOffset={4} position="item-aligned">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                aria-label={option.label}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
