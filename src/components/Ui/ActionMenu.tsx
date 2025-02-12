import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { ActionMenuProps } from '@/types/ui';

export function ActionMenu({ onEdit, onDelete, type }: ActionMenuProps) {
  // add handlers to fix problem with pointer-events after modal close
  const handleDelete = () => {
    requestAnimationFrame(() => {
      onDelete();
    });
  };
  const handleEdit = () => {
    requestAnimationFrame(() => {
      onEdit();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="text-grey300"
          aria-label={`Open action menu for ${type}`}
        >
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col">
        <DropdownMenuItem
          onClick={handleEdit}
          className="cursor-pointer border-b border-grey100 text-preset-4 text-grey900"
          aria-label={`Edit ${type}`}
        >
          Edit {type}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="cursor-pointer text-preset-4 text-red"
          aria-label={`Delete ${type}`}
        >
          Delete {type}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
