'use client';

import { useState } from 'react';
import { Navigation } from './_components/Navigation/Navigation';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-beige100">
      <div className="flex min-h-screen">
        {/* Navigation */}
        <Navigation
          isMinimized={isMinimized}
          onMinimize={() => setIsMinimized(!isMinimized)}
        />

        {/* Main content */}
        <div
          className={cn(
            'flex-1 transition-all duration-300',
            isMinimized && 'md:ml-20',
            'ml-0'
          )}
        >
          <main className="mx-auto max-w-[1140px] p-6 pb-20 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
