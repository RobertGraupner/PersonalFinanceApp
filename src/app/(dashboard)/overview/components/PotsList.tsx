import { Card } from './Card';
import { PotsListProps } from '@/types/overview';
import Image from 'next/image';

export function PotsList({ pots }: PotsListProps) {
  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

  return (
    <Card title="Pots" linkHref="/pots">
      <div className="flex gap-6">
        {/* Total Saved */}
        <div className="flex-shrink-0 space-y-2 rounded-lg bg-beige100 p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/dollar.svg"
              alt="Dollar"
              width={20}
              height={20}
            />
            <span className="text-sm text-grey500">Total Saved</span>
          </div>
          <p className="text-2xl font-bold">${totalSaved}</p>
        </div>

        {/* Pots List */}
        <div className="grid grid-cols-2 gap-4">
          {pots.map((pot) => (
            <div
              key={pot._id}
              className="flex items-center gap-2"
              style={{ color: pot.theme }}
            >
              <div
                className="h-4 w-1 rounded-full"
                style={{ backgroundColor: pot.theme }}
              />
              <div>
                <p className="text-sm">{pot.name}</p>
                <p className="font-bold">${pot.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
