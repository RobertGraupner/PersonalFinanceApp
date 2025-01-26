import { formatCurrency } from '@/lib/utils/formatCurrency';
import Image from 'next/image';
import type { TotalBillsCardProps } from '@/types/transactions';

export function TotalBillsCard({ total }: TotalBillsCardProps) {
  return (
    <div className="flex flex-col items-start gap-8 rounded-xl bg-grey900 p-6 text-white">
      <div className="flex h-10 w-10 items-center justify-center">
        <Image
          src="/images/icon-recurring-bills.svg"
          alt="Recurring bills icon"
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-preset-4">Total Bills</p>
        <p className="text-preset-1">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}
