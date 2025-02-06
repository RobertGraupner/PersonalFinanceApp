export function BudgetsSkeleton() {
  return (
    <div className="grid animate-pulse gap-6 lg:grid-cols-5">
      {/* Budgets Summary Skeleton */}
      <div className="lg:col-span-2">
        <div className="space-y-6 rounded-lg bg-white p-6 shadow">
          <div className="relative mx-auto h-[240px] w-[240px] rounded-full bg-gray-200">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="h-4 w-24 rounded bg-gray-300" />
              <div className="h-3 w-16 rounded bg-gray-300" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-1 bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Cards */}
      <div className="space-y-6 lg:col-span-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-6 rounded-lg bg-white p-6 shadow">
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="h-6 w-24 rounded bg-gray-200" />
              </div>
              <div className="h-6 w-6 rounded bg-gray-200" />
            </div>
            {/* Budget Info */}
            <div className="space-y-4">
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-8 w-full rounded bg-gray-200" />
              <div className="flex items-center">
                <div className="flex flex-1 items-center gap-4">
                  <div className="h-[43px] w-1 rounded bg-gray-200" />
                  <div className="space-y-1">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-4">
                  <div className="h-[43px] w-1 rounded bg-gray-200" />
                  <div className="space-y-1">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
            {/* Latest Transactions */}
            <div className="space-y-4 rounded bg-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
              <div className="space-y-3">
                {[...Array(2)].map((_, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between border-b border-gray-300 py-2 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-gray-200" />
                      <div className="h-4 w-20 rounded bg-gray-200" />
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="h-4 w-16 rounded bg-gray-200" />
                      <div className="h-3 w-12 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
