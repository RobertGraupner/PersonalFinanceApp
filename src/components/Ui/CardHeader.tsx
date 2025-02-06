import { ActionMenu } from '@/components/Ui/ActionMenu';
import type { CardHeaderProps } from '@/types/ui';

export function CardHeader({
  name,
  theme,
  onEdit,
  onDelete,
  type,
}: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: theme }}
        />
        <h3 className="text-preset-2 text-grey900">{name}</h3>
      </div>
      <ActionMenu onEdit={onEdit} onDelete={onDelete} type={type} />
    </div>
  );
}
