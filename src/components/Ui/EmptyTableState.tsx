import { EmptyTableStateProps } from '@/types/ui';

export function EmptyTableState({
  title = 'No results found',
  description = 'Try changing the search criteria or filters',
}: EmptyTableStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-preset-3 font-bold text-grey900">{title}</p>
      <p className="mt-2 text-preset-4 text-grey500">{description}</p>
    </div>
  );
}
