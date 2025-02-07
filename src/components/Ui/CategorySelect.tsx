import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Ui/select';
import { cn } from '@/lib/utils/cn';
import { CategorySelectProps } from '@/types/ui';

export function CategorySelect({
  options,
  currentValue,
  onSelect,
  label,
  className,
}: CategorySelectProps) {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-grey500">{label}</span>}
      <Select value={currentValue} onValueChange={onSelect}>
        <SelectTrigger className={cn('h-10 bg-white', className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
