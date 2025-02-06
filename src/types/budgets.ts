import type { IBudget } from '@/lib/models/Budget';
import type { CategorySpent } from '@/types/api';

export interface BudgetsResponse {
  data: IBudget[];
  spent: CategorySpent;
}

export interface BudgetCardProps {
  budget: IBudget;
  spent: number;
  transactions: {
    name: string;
    amount: number;
    date: string;
    avatar: string;
  }[];
  onDelete: (budget: IBudget) => void;
}

export interface BudgetsSummaryProps {
  total: number;
  limit: number;
  budgets: IBudget[];
  spent: Record<string, { spent: number }>;
}

export interface BudgetInfoProps {
  maximum: number;
  spent: number;
  remaining: number;
  progress: number;
  theme: string;
}

export interface BudgetLatestTransactionsProps {
  transactions: {
    avatar: string;
    name: string;
    amount: number;
    date: string;
  }[];
  category: string;
}

export interface BudgetListItemProps {
  category: string;
  theme: string;
  spent: number;
  maximum: number;
}

export interface BudgetsListProps {
  budgets: IBudget[];
  spentData: CategorySpent;
  onDelete: (budget: IBudget) => void;
}

export interface ModalState {
  type: 'delete' | null;
  budget: IBudget | null;
}
