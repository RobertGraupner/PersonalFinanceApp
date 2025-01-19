import { Search } from 'lucide-react';
import { Input } from '@/components/Ui/input';
import { cn } from '@/lib/utils/cn';
import type { FilterInputProps } from '@/types/ui';

export function FilterInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: FilterInputProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-10 truncate bg-white pr-10 placeholder:truncate',
          className
        )}
      />
      <Search
        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey500"
        aria-hidden="true"
      />
    </div>
  );
}
