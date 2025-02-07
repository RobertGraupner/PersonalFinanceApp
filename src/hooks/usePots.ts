import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type { PotsResponse } from '@/types/api';
import { IPot } from '@/lib/models/Pot';

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

export function useAddPot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pot: Partial<IPot>) => {
      const response = await fetch('/api/pots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pot),
      });
      if (!response.ok) throw new Error('Failed to add pot');
      return response.json();
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

export function useEditPot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...pot }: Partial<IPot> & { id: string }) => {
      const response = await fetch(`/api/pots/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pot),
      });
      if (!response.ok) throw new Error('Failed to edit pot');
      return response.json();
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
