import { Input } from '@/components/Ui/input';
import { cn } from '@/lib/utils/cn';
import { AmountInputProps } from '@/types/ui';

export function AmountInput({
  label,
  error,
  registration,
  className,
}: AmountInputProps) {
  return (
    <div>
      {label && (
        <label className="text-preset-5 font-bold text-grey500">{label}</label>
      )}
      <div className="">
        <div className="relative">
          <span className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-grey500">
            €
          </span>
          <Input
            type="number"
            step="0.01"
            {...registration}
            className={cn(
              'h-10 truncate bg-white pl-6 [appearance:textfield] placeholder:truncate [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              error &&
                'border-red focus:border-red focus:ring-0 focus-visible:ring-0',
              className
            )}
          />
        </div>
        <div className="min-h-[20px]">
          {error && <p className="text-xs text-red">{error}</p>}
        </div>
      </div>
    </div>
  );
}
