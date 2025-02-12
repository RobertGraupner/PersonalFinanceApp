import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavItemProps } from '@/types/navigation';

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

  if (isMobile) {
    return (
      <Link
        href={href}
        className={cn(
          'relative flex h-[44px] w-16 flex-col items-center gap-2 rounded-t-[8px] pt-2 text-preset-3 transition-colors xs:h-[66px] xs:w-28',
          isActive
            ? 'bg-beige100 text-grey900'
            : 'text-grey300 hover:text-white',
          className
        )}
        aria-label={isActive ? 'page' : undefined}
      >
        {isActive && (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-turquoise" />
        )}
        <div className="h-6">
          <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            style={{
              filter: isActive ? 'var(--icon-active-filter)' : 'none',
              maxHeight: '24px',
            }}
          />
        </div>
        <span className="hidden text-nowrap text-preset-5 font-bold xs:block">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'relative flex h-14 items-center gap-4 rounded-r-xl ps-8 text-preset-3 transition-colors',
        isActive ? 'bg-beige100 text-grey900' : 'text-grey300 hover:text-white',
        isMinimized && 'px-6',
        className
      )}
      aria-label={isActive ? 'page' : undefined}
    >
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-turquoise" />
      )}
      <div className="shrink-0">
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          style={{
            filter: isActive ? 'var(--icon-active-filter)' : 'none',
          }}
        />
      </div>
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.span
            className="text-nowrap text-preset-3"
            initial={{ opacity: 0, width: 0 }}
            // animation for showing text
            animate={{
              opacity: 1,
              width: 'auto',
              transition: {
                delay: 0.2,
                duration: 0.5,
              },
            }}
            // animation for hiding text
            exit={{
              opacity: 0,
              width: 0,
              transition: {
                duration: 0.2,
              },
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
