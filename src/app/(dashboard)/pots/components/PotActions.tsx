import { Button } from '@/components/Ui/button';

interface PotActionsProps {
  potId?: string;
}

export function PotActions({ potId }: PotActionsProps) {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => console.log('Add money to pot:', potId)}
        className="h-full flex-1 rounded-lg bg-beige100 py-4 text-preset-4 font-bold text-grey900 hover:bg-white hover:outline hover:outline-1 hover:outline-beige500"
      >
        + Add Money
      </Button>
      <Button
        onClick={() => console.log('Withdraw from pot:', potId)}
        className="h-full flex-1 rounded-lg bg-beige100 py-4 text-preset-4 font-bold text-grey900 hover:bg-white hover:outline hover:outline-1 hover:outline-beige500"
      >
        Withdraw
      </Button>
    </div>
  );
}
