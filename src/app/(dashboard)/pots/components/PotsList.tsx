import { PotCard } from './PotCard';
import { PotsListProps } from '@/types/pots';

export function PotsList({ pots, onAction }: PotsListProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {pots.map((pot) => (
        <PotCard
          key={pot._id}
          pot={pot}
          onAction={(type) => onAction(type, pot)}
        />
      ))}
    </div>
  );
}
