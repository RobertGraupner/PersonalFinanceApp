import { Button } from '@/components/Ui/button';
import { PotActionsProps } from '@/types/pots';

export function PotActions({ onAction, pot }: PotActionsProps) {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => onAction('addMoney', pot)}
        className="h-full flex-1 rounded-lg bg-beige100 py-4 text-preset-4 font-bold text-grey900 hover:bg-white hover:outline hover:outline-1 hover:outline-beige500"
      >
        + Add Money
      </Button>
      <Button
        onClick={() => onAction('withdraw', pot)}
        className="h-full flex-1 rounded-lg bg-beige100 py-4 text-preset-4 font-bold text-grey900 hover:bg-white hover:outline hover:outline-1 hover:outline-beige500"
      >
        Withdraw
      </Button>
    </div>
  );
}
