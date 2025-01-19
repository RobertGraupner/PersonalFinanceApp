import type { ITransaction } from '@/lib/models/Transaction';

export interface TransactionsTableProps {
  transactions: ITransaction[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface TransactionItemProps {
  transaction: ITransaction;
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
