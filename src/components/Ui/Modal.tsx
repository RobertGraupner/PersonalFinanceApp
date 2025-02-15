import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/Ui/dialog';

import { ModalProps } from '@/types/ui';
import { cn } from '@/lib/utils/cn';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  description = '',
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  // This is a workaround to prevent the modal from being focused when it is closed
  useEffect(() => {
    if (
      !isOpen &&
      contentRef.current &&
      contentRef.current.contains(document.activeElement)
    ) {
      (document.activeElement as HTMLElement).blur();
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && contentRef.current?.contains(document.activeElement)) {
          (document.activeElement as HTMLElement).blur();
        }
        onClose();
      }}
    >
      <DialogContent
        ref={contentRef}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[560px] sm:rounded-lg',
          '[&>button]:right-6 [&>button]:top-6 [&>button]:rounded-full [&>button]:border [&>button]:border-grey500 [&>button]:p-[2px] sm:[&>button]:top-7 sm:[&>button]:p-1'
        )}
        inert={!isOpen}
      >
        <DialogHeader className="gap-5 space-y-0 text-left">
          <DialogTitle className="text-preset-2 text-grey900 sm:text-preset-1">
            {title}
          </DialogTitle>
          <DialogDescription className="text-preset-4 text-grey500">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
