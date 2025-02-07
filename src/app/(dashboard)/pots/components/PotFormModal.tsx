import { useEffect } from 'react';
import { THEME_OPTIONS } from '@/constants/theme';
import { useForm, Controller } from 'react-hook-form';
import { Modal } from '@/components/Ui/Modal';
import { Button } from '@/components/Ui/button';
import { PotFormModalProps, FormData } from '@/types/pots';
import { ThemeSelect } from '@/components/Ui/ThemeSelect';
import { AmountInput } from '@/components/Ui/AmountInput';
import { NameInput } from '@/components/Ui/NameInput';

export function PotFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  type,
  pot,
}: PotFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: pot?.name || '',
      target: pot?.target?.toString() || '',
      theme: pot?.theme || THEME_OPTIONS[0].value,
    },
  });

  const name = watch('name');

  // Reset form when modal is closed or pot changes
  useEffect(() => {
    if (!isOpen) {
      reset();
    } else {
      reset({
        name: pot?.name || '',
        target: pot?.target?.toString() || '',
        theme: pot?.theme || THEME_OPTIONS[0].value,
      });
    }
  }, [isOpen, pot, reset]);

  const handleClose = () => {
    onClose();
  };

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      target: Number(data.target),
    });
  };

  const title = type === 'add' ? 'Add Pot' : 'Edit Pot';
  const buttonText = type === 'add' ? 'Create Pot' : 'Save Changes';

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="">
          <NameInput
            label="Pot Name"
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
            <AmountInput
              label="Target"
              error={errors.target?.message}
              registration={register('target', {
                required: 'Target amount is required',
                validate: {
                  positive: (value) =>
                    Number(value) > 0 || 'Target must be greater than 0',
                },
              })}
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
