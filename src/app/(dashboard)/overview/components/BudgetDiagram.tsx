import { Card } from './Card';
import { ColorBar } from '@/components/Ui/ColorBar';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { BudgetDiagramProps } from '@/types/overview';

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
    <Card title="Budgets" linkHref="/budgets" linkText="See Details">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 sm:flex-row">
        <div className="relative h-full w-full sm:h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="75%"
                paddingAngle={0}
                dataKey="value"
                strokeWidth={0}
                startAngle={180}
                endAngle={540}
              >
                {data.map((entry, index) => (
                  <Cell key={`inner-cell-${index}`} fill={`${entry.color}80`} />
                ))}
              </Pie>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="95%"
                paddingAngle={0}
                dataKey="value"
                strokeWidth={0}
                startAngle={180}
                endAngle={540}
              >
                {data.map((entry, index) => (
                  <Cell key={`outer-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="whitespace-nowrap text-preset-2">
              {formatCurrency(totalSpent)}
            </p>
            <p className="whitespace-nowrap text-preset-5 text-grey500">
              of {formatCurrency(totalLimit)} limit
            </p>
          </div>
        </div>

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
    </Card>
  );
}
