import { ContentCard } from '@/components/Ui/ContentCard';
import { PotProgress } from './PotProgress';
import { PotActions } from './PotActions';
import { CardHeader } from '@/components/Ui/CardHeader';
import { PotCardProps } from '@/types/pots';

export function PotCard({ pot, onAction }: PotCardProps) {
  return (
    <ContentCard className="flex flex-col gap-6 lg:p-6">
      <CardHeader
        name={pot.name}
        theme={pot.theme}
        type="pot"
        onEdit={() => onAction('edit', pot)}
        onDelete={() => onAction('delete', pot)}
      />
      <PotProgress pot={pot} />
      <PotActions pot={pot} onAction={onAction} />
    </ContentCard>
  );
}
