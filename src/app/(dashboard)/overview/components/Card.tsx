import { CardProps } from '@/types/overview';
import Link from 'next/link';
import Image from 'next/image';
export function Card({ title, linkHref, linkText, children }: CardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-preset-2">{title}</h2>
        <Link
          href={linkHref}
          className="flex gap-3 text-preset-4 text-grey500 hover:text-grey900"
          aria-label={`${linkText} for ${title}`}
        >
          {linkText}
          <Image
            src="/images/icon-caret-right.svg"
            alt="Arrow Right"
            width={5}
            height={10}
            className="mb-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
      {children}
    </div>
  );
}
