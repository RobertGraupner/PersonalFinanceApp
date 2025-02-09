import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal } from '@/components/Ui/Modal';
import { Button } from '@/components/Ui/button';
import { AmountInput } from '@/components/Ui/AmountInput';
import { CategorySelect } from '@/components/Ui/CategorySelect';
import { ThemeSelect } from '@/components/Ui/ThemeSelect';
import { THEME_OPTIONS } from '@/constants/theme';
import { CATEGORY_OPTIONS } from '@/constants/transactions';
import type {
  BudgetFormData,
  BudgetFormModalProps,
  FormData,
} from '@/types/budgets';

export function BudgetFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  type,
  budget,
}: BudgetFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      category: budget?.category || 'General',
      maximum: budget?.maximum?.toString() || '',
      theme: budget?.theme || THEME_OPTIONS[0].value,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    } else {
      reset({
        category: budget?.category || 'General',
        maximum: budget?.maximum?.toString() || '',
        theme: budget?.theme || THEME_OPTIONS[0].value,
      });
    }
  }, [isOpen, budget, reset]);

  const handleClose = () => {
    onClose();
  };

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      maximum: Number(data.maximum),
    } as BudgetFormData);
  };

  const title = type === 'add' ? 'Add Budget' : 'Edit Budget';
  const description =
    type === 'add'
      ? 'Choose a category to set a spending budget. These categories can help you monitor spending.'
      : 'As your budgets change, feel free to update your spending limits.';
  const buttonText = type === 'add' ? 'Create Budget' : 'Save Changes';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div>
          <div className="mb-5">
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
                    (option) =>
                      ![
                        'all',
                        'Salary',
                        'Refund',
                        'Investment',
                        'Transfer',
                      ].includes(option.value)
                  )}
                  currentValue={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <AmountInput
              label="Maximum Amount"
              error={errors.maximum?.message}
              registration={{
                ...control.register('maximum', {
                  required: 'Maximum amount is required',
                  validate: {
                    positive: (value) =>
                      Number(value) > 0 || 'Maximum must be greater than 0',
                  },
                }),
              }}
            />
          </div>

          <div>
            <label className="text-preset-5 font-bold text-grey500">
              Theme
            </label>
            <Controller
              control={control}
              name="theme"
              rules={{ required: true }}
              render={({ field }) => (
                <ThemeSelect
                  options={THEME_OPTIONS}
                  currentValue={field.value}
                  onSelect={field.onChange}
                />
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
