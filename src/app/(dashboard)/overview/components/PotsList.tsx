import { Card } from './Card';
import { ColorBar } from '@/components/Ui/ColorBar';
import { PotsListProps } from '@/types/overview';
import Image from 'next/image';

export function PotsList({ pots }: PotsListProps) {
  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

  return (
    <Card title="Pots" linkHref="/pots" linkText="See details">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Total Saved */}
        <div className="flex w-full min-w-40 items-center justify-start gap-4 rounded-lg bg-beige100 p-4 md:w-2/5">
          <div className="flex flex-shrink-0 items-center justify-center">
            <Image
              src="/images/icon-pot.svg"
              alt="Dollar"
              width={27}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-preset-4 text-grey500">Total Saved</p>
            <p className="text-preset-1 text-grey900">${totalSaved}</p>
          </div>
        </div>

        {/* Pots List */}
        <div className="grid w-full grid-cols-2 gap-4 md:w-3/5">
          {pots.map((pot) => (
            <ColorBar
              key={pot._id}
              color={pot.theme}
              label={pot.name}
              value={pot.total}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
