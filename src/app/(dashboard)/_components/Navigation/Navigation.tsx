'use client';

import { NavItem } from './NavItem';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

const navigation = [
  {
    label: 'Overview',
    href: '/overview',
    icon: '/images/icon-nav-overview.svg',
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: '/images/icon-nav-transactions.svg',
  },
  {
    label: 'Budgets',
    href: '/budgets',
    icon: '/images/icon-nav-budgets.svg',
  },
  {
    label: 'Pots',
    href: '/pots',
    icon: '/images/icon-nav-pots.svg',
  },
  {
    label: 'Recurring Bills',
    href: '/recurring',
    icon: '/images/icon-nav-recurring-bills.svg',
  },
];

interface NavigationProps {
  isMinimized: boolean;
  onMinimize: () => void;
}

export function Navigation({ isMinimized, onMinimize }: NavigationProps) {
  return (
    <>
      {/* Desktop navigation */}
      <aside
        className={cn(
          'hidden h-full flex-col bg-grey900 transition-all duration-300 md:flex',
          isMinimized ? 'w-20' : 'w-[300px]'
        )}
        aria-label="Navigation"
      >
        <div className="flex flex-col p-6 ps-0">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo-large.svg"
              alt="Finance"
              width={120}
              height={22}
              priority
              className={cn('ms-6', isMinimized && 'hidden')}
            />
            {isMinimized && (
              <Image
                src="/images/logo-small.svg"
                alt="Finance"
                width={32}
                height={32}
                priority
              />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isMinimized={isMinimized}
              />
            ))}
          </nav>

          {/* Minimize button */}
          <button
            onClick={() => {
              onMinimize();
            }}
            className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-preset-4 text-grey300 transition-colors hover:text-white"
          >
            <Image
              src="/images/icon-minimize-menu.svg"
              alt="Minimize menu"
              width={20}
              height={20}
              className={cn(
                'transition-transform',
                isMinimized && 'rotate-180'
              )}
            />
            {!isMinimized && <span>Minimize Menu</span>}
          </button>
        </div>
      </aside>

      {/* Mobile navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t border-beige500/10 bg-grey900 md:hidden"
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            className="flex flex-col items-center gap-1 px-2 py-1 text-[10px]"
            isMobile
          />
        ))}
      </nav>
    </>
  );
}
