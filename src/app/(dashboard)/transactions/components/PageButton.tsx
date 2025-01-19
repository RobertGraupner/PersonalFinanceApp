import Image from 'next/image';
import type { PageButtonProps } from '@/types/transactions';

export function PageButton({ onClick, disabled, direction }: PageButtonProps) {
  const isNext = direction === 'next';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 items-center gap-2 rounded-lg border border-grey500 bg-white px-4 text-preset-4 text-grey500 disabled:opacity-50"
      aria-label={isNext ? 'Next page' : 'Prev page'}
    >
      {!isNext && (
        <Image
          src="/images/icon-caret-left.svg"
          alt=""
          width={5}
          height={10}
          className="mb-0.5"
          aria-hidden="true"
        />
      )}
      <span className="hidden sm:block">{isNext ? 'Next' : 'Prev'}</span>
      {isNext && (
        <Image
          src="/images/icon-caret-right.svg"
          alt=""
          width={5}
          height={10}
          className="mb-0.5"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
