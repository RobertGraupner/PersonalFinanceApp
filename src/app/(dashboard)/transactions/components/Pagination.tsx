import { useState, useCallback } from 'react';
import type { PaginationProps } from '@/types/transactions';
import { PageButton } from './PageButton';
import { PageNumber } from './PageNumber';
import { PageInput } from './PageInput';

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [onPageChange, totalPages]
  );

  const MobilePagination = () => (
    <div className="flex gap-2 sm:hidden">
      <PageNumber
        page={1}
        isActive={currentPage === 1}
        onClick={handlePageChange}
      />

      {isInputVisible ? (
        <PageInput
          totalPages={totalPages}
          onSubmit={handlePageChange}
          onClose={() => setIsInputVisible(false)}
        />
      ) : (
        <button
          onClick={() => setIsInputVisible(true)}
          className="h-10 w-10 rounded-lg border border-grey500 bg-white text-grey500"
          aria-label="Wybierz stronę"
        >
          ...
        </button>
      )}

      <PageNumber
        page={totalPages}
        isActive={currentPage === totalPages}
        onClick={handlePageChange}
      />
    </div>
  );

  const DesktopPagination = () => (
    <div className="hidden gap-2 sm:flex">
      {Array.from({ length: totalPages }, (_, i) => (
        <PageNumber
          key={i + 1}
          page={i + 1}
          isActive={currentPage === i + 1}
          onClick={handlePageChange}
        />
      ))}
    </div>
  );

  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex items-center justify-between"
      aria-label="Paginacja"
    >
      <PageButton
        direction="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div className="flex">
        <MobilePagination />
        <DesktopPagination />
      </div>

      <PageButton
        direction="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </nav>
  );
}
