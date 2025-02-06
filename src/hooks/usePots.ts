import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
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

export function useDeletePot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (potId: string) => {
      const response = await fetch(`/api/pots/${potId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete pot');
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['pots'],
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: ['overview'],
          refetchType: 'all',
        }),
      ]);
    },
  });
}
