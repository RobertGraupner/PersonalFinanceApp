import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
  className?: string;
  isMinimized?: boolean;
  isMobile?: boolean;
}

export function NavItem({
  href,
  icon,
  label,
  className,
  isMinimized,
  isMobile,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center text-preset-3 transition-colors',
        isActive && !isMinimized
          ? 'bg-grey100 text-grey900'
          : 'text-grey300 hover:text-white',
        isMinimized ? 'justify-center px-2' : 'gap-3 rounded-r-lg px-3 py-2',
        className
      )}
      aria-label={isActive ? 'page' : undefined}
    >
      <Image
        src={icon}
        alt={label}
        width={20}
        height={20}
        style={{
          filter: isActive ? 'var(--icon-active-filter)' : 'none',
        }}
      />
      {!isMinimized && !isMobile && (
        <span className="text-preset-3">{label}</span>
      )}
      {isMobile && <span className="text-preset-3">{label}</span>}
    </Link>
  );
}
