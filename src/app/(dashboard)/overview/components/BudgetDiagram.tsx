import { Card } from './Card';
import { ColorBar } from '@/components/Ui/ColorBar';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { BudgetDiagramProps } from '@/types/overview';

export function BudgetDiagram({ budgets }: BudgetDiagramProps) {
  const totalLimit = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

  const data = budgets.map((budget) => ({
    name: budget.category,
    value: budget.maximum,
    color: budget.theme,
  }));

  return (
    <Card title="Budgets" linkHref="/budgets" linkText="See Details">
      <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-start">
        {/* Chart container with responsive dimensions and proper z-index */}
        <div className="relative w-full max-w-[40%] lg:max-w-[260px]">
          <div className="relative aspect-square w-full">
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
                    <Cell
                      key={`inner-cell-${index}`}
                      fill={`${entry.color}80`}
                    />
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
              <p className="whitespace-nowrap text-preset-1">
                {formatCurrency(338)}
              </p>
              <p className="whitespace-nowrap text-preset-5 text-grey500">
                of {formatCurrency(totalLimit)} limit
              </p>
            </div>
          </div>
        </div>

        {/* Budget list with proper height handling */}
        <div className="flex flex-1 flex-row gap-4 md:flex-col">
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
