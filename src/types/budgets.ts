import type { IBudget } from '@/lib/models/Budget';
import type { CategorySpent } from '@/types/api';
import { TransactionCategory } from '@/lib/models/Transaction';

export type FormModalType = 'add' | 'edit';
export type DeleteModalType = 'delete';
export type ModalType = FormModalType | DeleteModalType;

export interface BaseModalState {
  type: ModalType;
  budget: IBudget | null;
}

export interface FormModalState {
  type: FormModalType;
  budget: IBudget | null;
}

export interface DeleteModalState {
  type: DeleteModalType;
  budget: IBudget;
}

export type ModalState =
  | {
      type: null;
      budget: null;
    }
  | FormModalState
  | DeleteModalState;

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
  onAction: (type: 'delete' | 'edit', budget: IBudget) => void;
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
  onAction: (type: 'delete' | 'edit', budget: IBudget) => void;
}

export interface BudgetFormData {
  category: TransactionCategory;
  maximum: number;
  theme: string;
}

export interface FormData {
  category: string;
  maximum: string;
  theme: string;
}

export interface BudgetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BudgetFormData) => void;
  isLoading: boolean;
  type: 'add' | 'edit';
  budget: IBudget | null;
}
