import Link from 'next/link';
import Image from 'next/image';
import type { SectionHeaderProps } from '@/types/ui';

export function SectionHeader({
  title,
  linkHref,
  linkText = 'See All',
  titleStyle,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className={titleStyle}>{title}</h2>
      {linkHref && (
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
      )}
    </div>
  );
}
