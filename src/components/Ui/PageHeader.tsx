import { AddEntityButton } from '@/components/Ui/AddEntityButton';
import type { PageHeaderProps } from '@/types/ui';

export function PageHeader({
  title,
  addButtonLabel,
  onAddClick,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-preset-1">{title}</h1>
      <AddEntityButton onClick={onAddClick} label={addButtonLabel} />
    </div>
  );
}
