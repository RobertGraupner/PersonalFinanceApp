import { QueryClient } from '@tanstack/react-query';

export const invalidateQueriesAfterMutation = async (
  queryClient: QueryClient
) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ['transactions'],
      refetchType: 'all',
    }),
    queryClient.invalidateQueries({
      queryKey: ['overview'],
      refetchType: 'all',
    }),
    queryClient.invalidateQueries({
      queryKey: ['budgets'],
      refetchType: 'all',
    }),
    queryClient.invalidateQueries({
      queryKey: ['recurring'],
      refetchType: 'all',
    }),
  ]);
};
