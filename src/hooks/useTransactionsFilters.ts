import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';

import { DEFAULT_SORT, DEFAULT_CATEGORY } from '@/constants/transactions';

export function useTransactionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );

  // @note Function to update URL
  const updateUrl = useCallback(
    (params: URLSearchParams, method: 'push' | 'replace' = 'push') => {
      if (method === 'replace') {
        router.replace(`/transactions?${params.toString()}`);
      } else {
        router.push(`/transactions?${params.toString()}`);
      }
    },
    [router]
  );

  // @note Search with debounce
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
          params.set('search', value);
          params.set('page', '1');
        } else {
          params.delete('search');
        }

        updateUrl(params, 'replace');
      }, 300),
    [searchParams, updateUrl]
  );

  // @note Function to sort
  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    params.set('sort', value);

    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    updateUrl(params, 'replace');
  };

  // @note Function to filter by category
  const handleCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }

    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    updateUrl(params, 'replace');
  };

  return {
    searchValue,
    setSearchValue,
    debouncedSearch,
    handleSort,
    handleCategory,
    currentSort: searchParams.get('sort') || DEFAULT_SORT,
    currentCategory: searchParams.get('category') || DEFAULT_CATEGORY,
  };
}
