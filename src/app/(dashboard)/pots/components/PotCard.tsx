import { IPot } from '@/lib/models/Pot';
import { ContentCard } from '@/components/Ui/ContentCard';
import { PotProgress } from './PotProgress';
import { PotActions } from './PotActions';
import { PotHeader } from './PotHeader';
interface PotCardProps {
  pot: IPot;
}

export function PotCard({ pot }: PotCardProps) {
  return (
    <ContentCard className="flex flex-col gap-6 lg:p-6">
      <PotHeader pot={pot} />
      <PotProgress pot={pot} />
      <PotActions potId={pot._id} />
    </ContentCard>
  );
}
