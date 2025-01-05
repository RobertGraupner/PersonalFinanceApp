import type { NavigationItem } from '@/types/navigation';

export const NAVIGATION_ITEMS: NavigationItem[] = [
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
] as const;
