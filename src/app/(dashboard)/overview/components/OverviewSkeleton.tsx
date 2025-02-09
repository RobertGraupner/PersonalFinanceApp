'use client';

export function OverviewSkeleton() {
  return (
    <div className="space-y-8 p-4">
      {/* Skeleton for StatsCards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow"
          >
            <div className="mb-2 h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Skeleton for main Overview content */}
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="grid w-full auto-rows-min gap-6 xl:col-span-3">
          {/* Skeleton for PotsList */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          {/* Skeleton for TransactionsList */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 w-1/4 animate-pulse rounded bg-gray-100" />
                    <div className="mt-1 h-3 w-1/3 animate-pulse rounded bg-gray-100" />
                  </div>
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid auto-rows-[1fr_auto] gap-6 xl:col-span-2">
          {/* Skeleton for BudgetDiagram */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="relative mx-auto h-[240px] w-[240px] animate-pulse rounded-full bg-gray-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="h-4 w-24 rounded bg-gray-300" />
                <div className="h-3 w-16 rounded bg-gray-300" />
              </div>
            </div>
          </div>

          {/* Skeleton for RecurringList */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                  </div>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
