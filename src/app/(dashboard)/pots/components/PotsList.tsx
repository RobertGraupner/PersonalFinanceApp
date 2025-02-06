import { IPot } from '@/lib/models/Pot';
import { PotCard } from './PotCard';

interface PotsListProps {
  pots: IPot[];
  onDelete: (pot: IPot) => void;
}

export function PotsList({ pots, onDelete }: PotsListProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {pots.map((pot) => (
        <PotCard key={pot._id} pot={pot} onDelete={onDelete} />
      ))}
    </div>
  );
}
