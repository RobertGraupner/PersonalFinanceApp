import { IPot } from '@/lib/models/Pot';
import { ContentCard } from '@/components/Ui/ContentCard';
import { PotProgress } from './PotProgress';
import { PotActions } from './PotActions';
import { CardHeader } from '@/components/Ui/CardHeader';
interface PotCardProps {
  pot: IPot;
}

export function PotCard({ pot }: PotCardProps) {
  return (
    <ContentCard className="flex flex-col gap-6 lg:p-6">
      <CardHeader
        name={pot.name}
        theme={pot.theme}
        onActionClick={() => console.log('Action clicked')}
      />
      <PotProgress pot={pot} />
      <PotActions potId={pot._id} />
    </ContentCard>
  );
}
