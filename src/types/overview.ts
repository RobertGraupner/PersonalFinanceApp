import type { ITransaction } from '@/lib/models/Transaction';
import type { IBudget } from '@/lib/models/Budget';
import type { IPot } from '@/lib/models/Pot';
import type { IUserBalance } from '@/lib/models/User';

export interface OverviewData {
  transactions: ITransaction[];
  budgets: IBudget[];
  pots: IPot[];
  stats: IUserBalance;
}
// Types for StatsCards component
export interface StatsCardsProps {
  stats: IUserBalance;
}

export interface CardProps {
  title: string;
  linkHref: string;
  children: React.ReactNode;
}

export interface PotsListProps {
  pots: IPot[];
}
