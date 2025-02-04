import { ColorBar } from '@/components/Ui/ColorBar';
import { PotsListProps } from '@/types/overview';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { ContentCard } from '@/components/Ui/ContentCard';
import { SectionHeader } from '@/components/Ui/SectionHeader';
import Image from 'next/image';

export function PotsList({ pots }: PotsListProps) {
  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

  return (
    <ContentCard className="p-6 lg:p-6">
      <SectionHeader
        title="Pots"
        linkHref="/pots"
        linkText="See details"
        titleStyle="text-preset-2"
      />
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
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-preset-4 text-grey500">Total Saved</p>
            <p className="break-words text-preset-1 text-grey900">
              {formatCurrency(totalSaved)}
            </p>
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
    </ContentCard>
  );
}
