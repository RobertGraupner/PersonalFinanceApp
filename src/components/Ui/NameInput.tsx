import { Input } from '@/components/Ui/input';
import { cn } from '@/lib/utils/cn';
import { NameInputProps } from '@/types/ui';

export function NameInput({
  label,
  error,
  registration,
  value = '',
  maxLength = 30,
  showCharacterCount = true,
  className,
}: NameInputProps) {
  return (
    <div>
      {label && (
        <label className="text-preset-5 font-bold text-grey500">{label}</label>
      )}
      <Input
        type="text"
        maxLength={maxLength}
        {...registration}
        className={cn(
          'mt-1 h-10 truncate bg-white placeholder:truncate',
          error &&
            'border-red focus:border-red focus:ring-0 focus-visible:ring-0',
          className
        )}
      />
      <div className="flex min-h-[20px] items-center justify-between">
        {error ? <p className="text-xs text-red">{error}</p> : <span />}
        {showCharacterCount && (
          <p className="text-xs text-grey500">
            {maxLength - (value?.length || 0)} of {maxLength} characters left
          </p>
        )}
      </div>
    </div>
  );
}
