import { useQuery } from '@tanstack/react-query';
import type { RecurringResponse } from '@/types/api';
import type { ITransaction } from '@/lib/models/Transaction';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import type { TransactionWithStatus } from '@/types/transactions';

interface BillsAccumulator {
  paidBills: TransactionWithStatus[];
  upcomingBills: TransactionWithStatus[];
  dueSoonBills: TransactionWithStatus[];
}

function calculateTotal(bills: ITransaction[]): number {
  return Math.abs(bills.reduce((sum, t) => sum + t.amount, 0));
}

function createTransactionWithStatus(
  transaction: ITransaction,
  today: number,
  dueDate: Date
): TransactionWithStatus {
  const date = new Date(transaction.date);
  date.setHours(0, 0, 0, 0);

  return {
    ...transaction,
    status:
      date.getDate() <= new Date(today).getDate()
        ? 'paid'
        : date <= dueDate
          ? 'due'
          : 'upcoming',
  };
}

export function useRecurringBills() {
  const searchParams = useSearchParams();

  return useQuery<RecurringResponse>({
    queryKey: ['recurring-bills', searchParams.toString()],
    queryFn: async () => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('recurring', 'true');
      params.set('limit', '9999');

      const response = await fetch(`/api/transactions?${params.toString()}`);
      if (!response.ok) {
        throw new Error('An error occurred while fetching recurring bills');
      }
      const data = await response.json();

      const today = new Date().setHours(0, 0, 0, 0);
      const dueDate = new Date(today);
      dueDate.setDate(new Date(today).getDate() + 5);

      const transactions: ITransaction[] = data.data || [];
      const transactionsWithStatus = transactions.map((transaction) =>
        createTransactionWithStatus(transaction, today, dueDate)
      );

      const { paidBills, upcomingBills, dueSoonBills } =
        transactionsWithStatus.reduce(
          (acc, transaction) => {
            if (transaction.status === 'paid') {
              acc.paidBills.push(transaction);
            } else {
              acc.upcomingBills.push(transaction);
              if (transaction.status === 'due') {
                acc.dueSoonBills.push(transaction);
              }
            }
            return acc;
          },
          {
            paidBills: [],
            upcomingBills: [],
            dueSoonBills: [],
          } as BillsAccumulator
        );

      return {
        ...data,
        data: transactionsWithStatus,
        stats: {
          total: calculateTotal(transactions),
          summary: [
            {
              label: 'Paid Bills',
              count: paidBills.length,
              amount: calculateTotal(paidBills),
            },
            {
              label: 'Total Upcoming',
              count: upcomingBills.length,
              amount: calculateTotal(upcomingBills),
            },
            {
              label: 'Due Soon',
              count: dueSoonBills.length,
              amount: calculateTotal(dueSoonBills),
            },
          ],
        },
      };
    },
  });
}

// filters and search
export function useRecurringFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );

  const updateUrl = useCallback(
    (params: URLSearchParams) => {
      router.replace(`/recurring?${params.toString()}`);
    },
    [router]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
          params.set('search', value);
        } else {
          params.delete('search');
        }
        updateUrl(params);
      }, 300),
    [searchParams, updateUrl]
  );

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);

    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    updateUrl(params);
  };

  return {
    searchValue,
    setSearchValue,
    debouncedSearch,
    handleSort,
    currentSort: searchParams.get('sort') || 'latest',
  };
}
