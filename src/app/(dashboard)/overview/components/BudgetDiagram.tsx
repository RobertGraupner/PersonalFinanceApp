import { ColorBar } from '@/components/Ui/ColorBar';
import { Chart } from '@/components/Ui/Chart';
import { BudgetDiagramProps } from '@/types/overview';
import { ContentCard } from '@/components/Ui/ContentCard';
import { SectionHeader } from '@/components/Ui/SectionHeader';

export function BudgetDiagram({ budgets, spent }: BudgetDiagramProps) {
  const totalLimit = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

  const totalSpent = budgets.reduce(
    (sum, budget) => sum + (spent[budget.category]?.spent || 0),
    0
  );

  const data = budgets.map((budget) => ({
    name: budget.category,
    value: budget.maximum,
    color: budget.theme,
  }));

  return (
    <ContentCard className="p-6 lg:p-6">
      <SectionHeader
        title="Budgets"
        linkHref="/budgets"
        linkText="See Details"
        titleStyle="text-preset-2"
      />
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 sm:flex-row">
        <Chart data={data} total={totalSpent} limit={totalLimit} />

        {/* Budget list with proper height handling */}
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-col sm:gap-4">
          {budgets.map((budget) => (
            <ColorBar
              key={budget._id}
              color={budget.theme}
              label={budget.category}
              value={budget.maximum}
            />
          ))}
        </div>
      </div>
    </ContentCard>
  );
}
