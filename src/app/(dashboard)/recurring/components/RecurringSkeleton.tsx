export function RecurringSkeleton() {
  return (
    <div className="space-y-6">
      <h1 className="text-preset-1">Recurring Bills</h1>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="grid w-full auto-rows-min gap-6 md:grid-cols-2 xl:grid-cols-1">
          {/* Total Bills Card Skeleton */}
          <div className="flex flex-col items-start gap-8 rounded-xl bg-white p-6">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            <div className="flex w-full flex-col gap-2">
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Summary Card Skeleton */}
          <div className="flex w-full flex-col items-start gap-5 rounded-xl bg-white p-6">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="w-full space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-grey100 pb-3 last:border-0 last:pb-0"
                >
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="xl:col-span-2">
          <div className="rounded-xl bg-white p-6">
            <table className="w-full">
              <thead>
                <tr className="hidden border-b border-grey100 sm:table-row">
                  <th className="w-[40%] px-1 py-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  </th>
                  <th className="w-[25%] px-1 py-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  </th>
                  <th className="w-[10%] px-1 py-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, i) => (
                  <tr key={i} className="border-b border-grey100">
                    <td className="w-[40%] py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                      </div>
                    </td>
                    <td className="hidden w-[25%] py-4 sm:table-cell">
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    </td>
                    <td className="w-[10%] py-4">
                      <div className="flex flex-col items-end gap-2">
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
