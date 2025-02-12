'use client';

import { useEffect } from 'react';
import { useTransactionFilters } from '@/hooks/useTransactionsFilters';
import { FilterInput } from '@/components/Ui/FilterInput';
import { FilterPopover } from '@/components/Ui/FilterPopover';
import { FilterSelect } from '@/components/Ui/FilterSelect';

import { SORT_OPTIONS, CATEGORY_OPTIONS } from '@/constants/transactions';

export function TransactionsHeader() {
  // all sort and category options are moved to custom hook
  const {
    searchValue,
    setSearchValue,
    debouncedSearch,
    handleSort,
    handleCategory,
    currentSort,
    currentCategory,
  } = useTransactionFilters();

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  return (
    <div className="mb-6 flex flex-row justify-between gap-4 lg:items-center">
      {/* Desktop and mobile view */}
      <div className="w-[160px] xl:w-[320px]">
        <FilterInput
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search transaction"
        />
      </div>

      {/* Mobile view */}
      <div className="flex items-center justify-end gap-3 lg:hidden">
        <FilterPopover
          options={SORT_OPTIONS}
          currentValue={currentSort}
          onSelect={handleSort}
          icon="/images/icon-sort-mobile.svg"
          iconAlt="Sort"
          label="Sort by"
        />

        <FilterPopover
          options={CATEGORY_OPTIONS}
          currentValue={currentCategory}
          onSelect={handleCategory}
          icon="/images/icon-filter-mobile.svg"
          iconAlt="Filter"
          label="Filter"
          translateX="-translate-x-[50px]"
        />
      </div>

      {/* Desktop view */}
      <div className="hidden items-center gap-3 lg:flex">
        <FilterSelect
          options={SORT_OPTIONS}
          currentValue={currentSort}
          onSelect={handleSort}
          label="Sort by"
          aria-label="Sort by"
        />

        <FilterSelect
          options={CATEGORY_OPTIONS}
          currentValue={currentCategory}
          onSelect={handleCategory}
          label="Category"
          aria-label="Category"
        />
      </div>
    </div>
  );
}
