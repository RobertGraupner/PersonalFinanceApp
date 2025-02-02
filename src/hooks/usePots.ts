import { useQuery } from '@tanstack/react-query';
import type { PotsResponse } from '@/types/api';

export function usePots() {
  return useQuery<PotsResponse>({
    queryKey: ['pots'],
    queryFn: async () => {
      const response = await fetch('/api/pots');
      if (!response.ok) {
        throw new Error('An error occurred while fetching pots');
      }
      return response.json();
    },
  });
}
