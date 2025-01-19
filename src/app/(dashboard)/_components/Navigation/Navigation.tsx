'use client';

import type { NavigationProps } from '@/types/navigation';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { MobileNavigation } from './MobileNavigation';
import { MinimizeButton } from './MinimizeButton';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { LogoutButton } from './LogoutButton';

export function Navigation({ isMinimized, onMinimize }: NavigationProps) {
  return (
    <>
      {/* Desktop navigation */}
      <motion.aside
        className={cn(
          'hidden flex-shrink-0 flex-col rounded-r-[16px] bg-grey900 md:flex',
          isMinimized ? 'w-[86px]' : 'w-[300px]'
        )}
        initial={false}
        animate={{ width: isMinimized ? 86 : 300 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.75,
        }}
        aria-label="Main navigation"
      >
        <div
          className={cn('flex h-full flex-col p-6 ps-0', isMinimized && 'pe-2')}
        >
          {/* Logo */}
          <div className="mb-16 h-6 shrink-0">
            <Logo isMinimized={isMinimized} />
          </div>

          {/* Navigation items */}
          <nav className="">
            {NAVIGATION_ITEMS.map((item) => (
              <NavItem key={item.href} {...item} isMinimized={isMinimized} />
            ))}
          </nav>

          {/* Minimize button */}
          <MinimizeButton
            isMinimized={isMinimized}
            onMinimize={onMinimize}
            aria-expanded={!isMinimized}
            aria-label={
              isMinimized ? 'Expand navigation' : 'Minimize navigation'
            }
          />

          <LogoutButton isMinimized={isMinimized} isMobile={false} />
        </div>
      </motion.aside>

      {/* Mobile navigation */}
      <MobileNavigation />
    </>
  );
}
