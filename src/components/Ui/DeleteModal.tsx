import { Button } from '@/components/Ui/button';
import { Modal } from '@/components/Ui/Modal';
import { DeleteModalProps } from '@/types/ui';

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
  isDeleting,
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete '${itemName}'?`}
      description={`Are you sure you want to delete this ${itemType}? This action cannot be reversed, and all the data inside it will be removed forever.`}
    >
      <div className="flex flex-col gap-5">
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isDeleting}
          className="text-reset-4 h-full w-full rounded-lg bg-red px-6 py-4 font-bold text-white focus-visible:ring-0 sm:w-auto"
        >
          {isDeleting ? 'Deleting...' : 'Yes, Confirm Deletion'}
        </Button>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isDeleting}
          className="h-full w-full rounded-lg px-6 py-4 text-preset-4 text-grey900 focus-visible:ring-0 sm:w-auto"
        >
          No, I want to go back
        </Button>
      </div>
    </Modal>
  );
}
