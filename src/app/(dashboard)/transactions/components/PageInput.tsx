import { useState } from 'react';
import type { PageInputProps } from '@/types/transactions';

export function PageInput({ totalPages, onSubmit, onClose }: PageInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const page = parseInt(value);
    if (page >= 1 && page <= totalPages) {
      onSubmit(page);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        step="1"
        min={1}
        max={totalPages}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 w-16 bg-white px-2 text-center text-preset-4 text-grey900 [appearance:textfield] focus:rounded-xl focus:outline-grey500 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        placeholder={`1-${totalPages}`}
        autoFocus
        onBlur={onClose}
        aria-label="Enter page number"
      />
    </form>
  );
}
