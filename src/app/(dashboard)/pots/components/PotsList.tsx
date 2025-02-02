import { IPot } from '@/lib/models/Pot';
import { PotCard } from './PotCard';

interface PotsListProps {
  pots: IPot[];
}

export function PotsList({ pots }: PotsListProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {pots.map((pot) => (
        <PotCard key={pot._id} pot={pot} />
      ))}
    </div>
  );
}
