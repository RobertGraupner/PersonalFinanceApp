import { IPot } from '@/lib/models/Pot';

interface PotHeaderProps {
  pot: IPot;
}

export function PotHeader({ pot }: PotHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: pot.theme }}
        />
        <h3 className="text-preset-2 text-grey900">{pot.name}</h3>
      </div>
      <button className="text-bold pb-2 text-xl text-grey300">&#8230;</button>
    </div>
  );
}
