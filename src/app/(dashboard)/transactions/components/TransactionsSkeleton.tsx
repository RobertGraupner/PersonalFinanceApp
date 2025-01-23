export function TransactionsSkeleton() {
  return (
    <table className="w-full">
      {/* Skeleton for table headers */}
      <thead>
        <tr className="hidden border-b border-grey100 sm:table-row">
          <th className="w-[40%] px-1 py-4">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </th>
          <th className="w-[25%] px-1 py-4">
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

      {/* Skeleton for table rows */}
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={`row-${i}`} className="border-b border-grey100">
            <td className="w-[40%] py-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100 sm:hidden" />
                </div>
              </div>
            </td>

            <td className="hidden w-[25%] py-4 sm:table-cell">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </td>

            <td className="hidden w-[25%] py-4 sm:table-cell">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </td>

            <td className="w-[10%] py-4">
              <div className="flex flex-col items-end gap-2">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-100 sm:hidden" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
