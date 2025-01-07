'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data are 'fresh' until mutation
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // Try 3 times in case of error
      retry: 3,
    },
  },
});

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
