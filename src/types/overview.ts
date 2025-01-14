import type { ITransaction } from '@/lib/models/Transaction';
import type { IBudget } from '@/lib/models/Budget';
import type { IPot } from '@/lib/models/Pot';
import type { IUserBalance } from '@/lib/models/User';
import type { CategorySpent } from '@/types/api';
export interface OverviewData {
  transactions: ITransaction[];
  budgets: IBudget[];
  pots: IPot[];
  recurring: ITransaction[];
  stats: IUserBalance;
  spent: CategorySpent;
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
  spent: CategorySpent;
}

export interface TransactionsListProps {
  transactions: ITransaction[];
}

export interface RecurringListProps {
  recurring: ITransaction[];
}
