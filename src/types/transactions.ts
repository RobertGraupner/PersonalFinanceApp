import type {
  ITransaction,
  TransactionCategory,
} from '@/lib/models/Transaction';

export type TransactionWithStatus = ITransaction & {
  status?: 'paid' | 'due' | 'upcoming';
};

export interface TransactionsTableProps {
  transactions: ITransaction[];
  onAction: (type: 'edit' | 'delete', transaction: ITransaction) => void;
}

export interface RecurringTableProps {
  transactions: TransactionWithStatus[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface TransactionItemProps {
  transaction: ITransaction;
  onAction: (type: 'edit' | 'delete', transaction: ITransaction) => void;
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
  type: 'add' | 'edit';
  transaction?: ITransaction | null;
}

export type FormModalType = 'add' | 'edit';
export type DeleteModalType = 'delete';
export type ModalType = FormModalType | DeleteModalType;

export interface FormModalState {
  type: FormModalType;
  transaction: ITransaction | null;
}

export interface DeleteModalState {
  type: DeleteModalType;
  transaction: ITransaction;
}

export type ModalState =
  | {
      type: null;
      transaction: null;
    }
  | FormModalState
  | DeleteModalState;

export interface RecurringItemProps {
  transaction: TransactionWithStatus;
}
