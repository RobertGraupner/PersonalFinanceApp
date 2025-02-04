import { ContentCard } from '@/components/Ui/ContentCard';
import { CardHeader } from '@/components/Ui/CardHeader';
import { BudgetInfo } from './BudgetInfo';
import { BudgetLatestTransactions } from './BudgetLatestTransactions';
import type { BudgetCardProps } from '@/types/budgets';
import { calculateBudgetMetrics } from '@/lib/utils/calculateBudgetMetrics';

export function BudgetCard({ budget, spent, transactions }: BudgetCardProps) {
  const { remaining, progress } = calculateBudgetMetrics(budget.maximum, spent);

  return (
    <ContentCard className="flex flex-col gap-5">
      <CardHeader
        name={budget.category}
        theme={budget.theme}
        onActionClick={() => console.log('Action clicked')}
      />

      <BudgetInfo
        maximum={budget.maximum}
        spent={spent}
        remaining={remaining}
        progress={progress}
        theme={budget.theme}
      />

      <BudgetLatestTransactions
        transactions={transactions}
        category={budget.category}
      />
    </ContentCard>
  );
}
