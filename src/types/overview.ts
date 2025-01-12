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

export interface OverviewStats {
  balance: number;
  income: number;
  expenses: number;
}

export interface CardProps {
  title: string;
  linkHref: string;
  linkText: string;
  children: React.ReactNode;
}

export interface PotsListProps {
  pots: IPot[];
}

export interface BudgetDiagramProps {
  budgets: IBudget[];
}

export interface TransactionsListProps {
  transactions: ITransaction[];
}
