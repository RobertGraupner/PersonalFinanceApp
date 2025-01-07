import { CardProps } from '@/types/overview';
import Link from 'next/link';

export function Card({ title, linkHref, children }: CardProps) {
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-preset-2">{title}</h2>
        <Link
          href={linkHref}
          className="text-preset-4 text-grey500 hover:text-grey900"
        >
          See Details
        </Link>
      </div>
      {children}
    </div>
  );
}
