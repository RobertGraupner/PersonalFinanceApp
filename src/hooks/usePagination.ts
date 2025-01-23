import { useSearchParams, useRouter } from 'next/navigation';

export function usePagination() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    router.push(`/transactions?${params.toString()}`);
  };

  return { handlePageChange };
}
