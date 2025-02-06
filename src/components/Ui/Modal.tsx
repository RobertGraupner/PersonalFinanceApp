import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/Ui/dialog';

import { ModalProps } from '@/types/ui';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  description,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px] [&>button]:right-6 [&>button]:top-6 [&>button]:rounded-full [&>button]:border [&>button]:border-grey500 [&>button]:p-[2px] sm:[&>button]:top-7 sm:[&>button]:p-1">
        <DialogHeader className="gap-5 space-y-0 text-left">
          <DialogTitle className="text-preset-2 text-grey900 sm:text-preset-1">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-preset-4 text-grey500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
