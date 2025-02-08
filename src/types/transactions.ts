import type {
  ITransaction,
  TransactionCategory,
} from '@/lib/models/Transaction';

export type TransactionWithStatus = ITransaction & {
  status?: 'paid' | 'due' | 'upcoming';
};

export interface TransactionsTableProps {
  transactions: TransactionWithStatus[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface TransactionItemProps {
  transaction: TransactionWithStatus;
}

export interface PageButtonProps {
  onClick: () => void;
  disabled?: boolean;
  direction: 'prev' | 'next';
}

export interface PageNumberProps {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
}

export interface PageInputProps {
  totalPages: number;
  onSubmit: (page: number) => void;
  onClose: () => void;
}

export interface TotalBillsCardProps {
  total: number;
}

export interface SummaryCardProps {
  items: {
    label: string;
    count: number;
    amount: number;
  }[];
}

export interface TransactionFormData {
  name: string;
  category: TransactionCategory;
  amount: string;
  recurring: boolean;
}

export interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => void;
  isLoading: boolean;
}
