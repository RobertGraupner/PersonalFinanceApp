export interface QueryParams {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  sort?: 'latest' | 'oldest' | 'a-z' | 'z-a' | 'highest' | 'lowest';
  recurring?: boolean;
}

export interface TransactionQuery {
  userId: string;
  category?: string;
  name?: { $regex: string; $options: string };
  recurring?: boolean;
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

export interface ApiResponse<T> {
  data?: T;
  pagination?: PaginationResponse;
  error?: string;
}

export interface MoneyOperation {
  amount: number;
  operation: 'add' | 'withdraw';
}
