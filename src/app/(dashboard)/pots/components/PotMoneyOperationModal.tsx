import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/Ui/Modal';
import { Button } from '@/components/Ui/button';
import { AmountInput } from '@/components/Ui/AmountInput';
import { MoneyOperationModalProps } from '@/types/pots';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { PotModalProgress } from './PotModalProgress';

interface FormData {
  amount: string;
}

export function PotMoneyOperationModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
  type,
  pot,
  userBalance,
}: MoneyOperationModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const currentAmount = watch('amount');
  const numericAmount = parseFloat(currentAmount) || 0;
  const currentTotal = pot?.total || 0;
  const targetAmount = pot?.target || 1;

  const baseProgressPercentage = (currentTotal / targetAmount) * 100;
  const progressWidth =
    type === 'addMoney'
      ? ((currentTotal + numericAmount) / targetAmount) * 100
      : ((currentTotal - numericAmount) / targetAmount) * 100;

  const changeWidth = Math.abs(progressWidth - baseProgressPercentage);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onFormSubmit = (data: FormData) => {
    onConfirm(Number(data.amount));
  };

  const title =
    type === 'addMoney'
      ? `Add to '${pot?.name}'`
      : `Withdraw from '${pot?.name}'`;
  const description =
    type === 'addMoney'
      ? 'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.'
      : 'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.';
  const buttonText = type === 'addMoney' ? 'Add Money' : 'Withdraw';
  const label = type === 'addMoney' ? 'Amount to Add' : 'Amount to Withdraw';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-preset-5 text-grey500">New Amount</span>
            <span className="text-preset-4 font-bold text-grey900">
              {formatCurrency(
                type === 'addMoney'
                  ? currentTotal + numericAmount
                  : currentTotal - numericAmount
              )}
            </span>
          </div>
          <PotModalProgress
            baseProgressPercentage={baseProgressPercentage}
            progressWidth={progressWidth}
            changeWidth={changeWidth}
            type={type}
            numericAmount={numericAmount}
          />

          <div className="mt-1 text-right text-preset-5 text-grey500">
            Target of {formatCurrency(targetAmount)}
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <AmountInput
            label={label}
            error={errors.amount?.message}
            registration={{
              ...register('amount', {
                required: 'Amount is required',
                validate: {
                  positive: (value) =>
                    parseFloat(value) > 0 || 'Amount must be greater than 0',
                  maxWithdraw: (value) =>
                    type !== 'withdraw' ||
                    parseFloat(value) <= currentTotal ||
                    'Cannot withdraw more than available in pot',
                  maxDeposit: (value) =>
                    type !== 'addMoney' ||
                    parseFloat(value) <= userBalance ||
                    'Cannot add more than available in your balance',
                },
              }),
            }}
          />

          <Button
            type="submit"
            disabled={isProcessing}
            className="mt-6 w-full rounded-lg bg-grey900 px-6 py-4 text-preset-4 font-bold text-white"
          >
            {isProcessing ? 'Processing...' : buttonText}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
