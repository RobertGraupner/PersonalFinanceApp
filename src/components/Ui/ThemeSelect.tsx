import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Ui/select';
import { cn } from '@/lib/utils/cn';
import { ThemeSelectProps } from '@/types/ui';
export function ThemeSelect({
  options,
  currentValue,
  onSelect,
  label,
  className,
}: ThemeSelectProps) {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-grey500">{label}</span>}
      <Select value={currentValue} onValueChange={onSelect}>
        <SelectTrigger className={cn('h-10 bg-white', className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="block h-3 w-3 rounded-full"
                    style={{ backgroundColor: option.value }}
                  />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
