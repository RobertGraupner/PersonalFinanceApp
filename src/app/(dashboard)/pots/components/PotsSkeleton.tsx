export function PotsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 rounded-xl bg-white p-5 lg:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
            </div>
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-2 w-full animate-pulse rounded-full bg-gray-100" />
          </div>

          {/* Amount */}
          <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />

          {/* Actions */}
          <div className="flex gap-4">
            <div className="h-9 w-full animate-pulse rounded-md bg-gray-100" />
            <div className="h-9 w-full animate-pulse rounded-md bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
