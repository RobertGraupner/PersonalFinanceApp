import Link from 'next/link';
import Image from 'next/image';

interface ErrorPageProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

export function ErrorPage({
  title,
  description,
  showHomeButton,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-beige100 p-5">
      <div className="max-w-xl text-center">
        <div className="mb-8">
          <Image
            src="/images/logo-large.svg"
            alt="Finance logo"
            width={120}
            height={22}
            className="mx-auto"
            style={{ filter: 'invert(0.12) brightness(0.2)' }}
          />
        </div>
        <h1 className="mb-4 text-preset-1 text-grey900">{title}</h1>
        <p className="mb-8 text-preset-4 text-grey500">{description}</p>
        {showHomeButton && (
          <Link
            href="/overview"
            className="inline-flex items-center justify-center rounded-lg bg-grey900 px-6 py-3 text-preset-4 font-bold text-white transition-colors hover:bg-grey900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige500 focus-visible:ring-offset-2"
            aria-label="Return to overview page"
          >
            Return to Financial Safety
          </Link>
        )}
      </div>
    </div>
  );
}
