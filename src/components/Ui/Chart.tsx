import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { ChartProps } from '@/types/ui';
import { cn } from '@/lib/utils/cn';

export function Chart({ data, total, limit, className }: ChartProps) {
  return (
    <div className={cn('relative h-[240px] w-full', className)}>
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
        <p className="whitespace-nowrap text-preset-2 text-grey900">
          {formatCurrency(total)}
        </p>
        <p className="whitespace-nowrap text-preset-5 text-grey500">
          of {formatCurrency(limit)} limit
        </p>
      </div>
    </div>
  );
}
