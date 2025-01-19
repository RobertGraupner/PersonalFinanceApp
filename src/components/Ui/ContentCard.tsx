import { ContentCardProps } from '@/types/ui';
import { cn } from '@/lib/utils/cn';

export function ContentCard({ children, className }: ContentCardProps) {
  return (
    <div className={cn('rounded-xl bg-white p-5 lg:p-8', className)}>
      {children}
    </div>
  );
}
