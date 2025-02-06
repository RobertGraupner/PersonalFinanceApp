import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  type: 'budget' | 'pot';
}

export function ActionMenu({ onEdit, onDelete, type }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-grey300">
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="px-5 py-0">
        <DropdownMenuItem
          onClick={onEdit}
          className="border-b border-grey100 px-0 py-3 text-preset-4 text-grey900"
        >
          Edit {type}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="px-0 py-3 text-preset-4 text-red"
        >
          Delete {type}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
