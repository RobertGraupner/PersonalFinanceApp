import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal } from '@/components/Ui/Modal';
import { Button } from '@/components/Ui/button';
import { AmountInput } from '@/components/Ui/AmountInput';
import { CategorySelect } from '@/components/Ui/CategorySelect';
import { NameInput } from '@/components/Ui/NameInput';
import { Checkbox } from '@/components/Ui/checkbox';
import { CATEGORY_OPTIONS } from '@/constants/transactions';
import type {
  TransactionFormModalProps,
  TransactionFormData,
} from '@/types/transactions';

export function TransactionFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  type,
  transaction,
}: TransactionFormModalProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: {
      name: transaction?.name || '',
      category: transaction?.category || 'General',
      amount: transaction?.amount
        ? Math.abs(transaction.amount).toString()
        : '',
      recurring: transaction?.recurring || false,
    },
  });

  const name = watch('name');

  useEffect(() => {
    if (!isOpen) {
      reset();
    } else {
      reset({
        name: transaction?.name || '',
        category: transaction?.category || 'General',
        amount: transaction?.amount
          ? Math.abs(transaction.amount).toString()
          : '',
        recurring: transaction?.recurring || false,
      });
    }
  }, [isOpen, transaction, reset]);

  const handleClose = () => {
    onClose();
  };

  const onFormSubmit = (data: TransactionFormData) => {
    onSubmit(data);
  };

  const title = type === 'add' ? 'Add Transaction' : 'Edit Transaction';
  const description =
    type === 'add'
      ? 'Add a new transaction to track your spending or income.'
      : 'Edit your transaction details.';
  const buttonText = type === 'add' ? 'Add Transaction' : 'Save Changes';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="">
          <NameInput
            label="Receiver / Sender"
            error={errors.name?.message}
            registration={register('name', {
              required: 'Name is required',
              maxLength: {
                value: 30,
                message: 'Name cannot exceed 30 characters',
              },
            })}
            value={name}
          />

          <div>
            <label className="text-preset-5 font-bold text-grey500">
              Category
            </label>
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <CategorySelect
                  options={CATEGORY_OPTIONS.filter(
                    (option) => option.value !== 'all'
                  )}
                  currentValue={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
          </div>

          <div className="mt-4">
            <AmountInput
              label="Amount"
              error={errors.amount?.message}
              registration={{
                ...register('amount', {
                  required: 'Amount is required',
                  validate: {
                    positive: (value) =>
                      Number(value) > 0 || 'Amount must be greater than 0',
                  },
                }),
              }}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="recurring"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recurring"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                  <label
                    htmlFor="recurring"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Recurring Transaction
                  </label>
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-grey900 px-6 py-4 text-preset-4 font-bold text-white"
          >
            {isLoading ? 'Processing...' : buttonText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
