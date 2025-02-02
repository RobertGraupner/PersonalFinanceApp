import type { ITransaction } from '@/lib/models/Transaction';
import type { IPot } from '@/lib/models/Pot';
import type { TransactionCategory } from '@/lib/models/Transaction';

export interface QueryParams {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  sort?: 'latest' | 'oldest' | 'a-z' | 'z-a' | 'highest' | 'lowest';
  recurring?: boolean;
  startDate?: string;
  endDate?: string;
  aggregate?: boolean;
}

export interface TransactionQuery {
  userId: string;
  category?: string;
  name?: { $regex: string; $options: string };
  recurring?: boolean;
  date?: {
    $gte: Date;
    $lte: Date;
  };
}

export interface SortQuery {
  [key: string]: 1 | -1;
}

export interface PaginationResponse {
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
}

export interface RecurringStats {
  total: number;
  summary: Array<{
    label: string;
    count: number;
    amount: number;
  }>;
}

export interface RecurringResponse extends ApiResponse<ITransaction[]> {
  stats: RecurringStats;
}

export interface PotsResponse extends ApiResponse<IPot[]> {
  data: IPot[];
}

export interface ApiResponse<T> {
  data?: T;
  pagination?: PaginationResponse;
  error?: string;
}

export interface MoneyOperation {
  amount: number;
  operation: 'add' | 'withdraw';
}

export interface CategorySpentData {
  spent: number;
  transactions: ITransaction[];
}

export type CategorySpent = Partial<
  Record<TransactionCategory, CategorySpentData>
>;
