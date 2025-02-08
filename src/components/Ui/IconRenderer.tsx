import { CATEGORY_ICONS, CATEGORY_BG_COLORS } from '@/constants/transactions';
import type { IconRendererProps } from '@/types/ui';

export function IconRenderer({
  iconName,
  category,
  className,
}: IconRendererProps) {
  const IconComponent = CATEGORY_ICONS[iconName];

  if (category) {
    const bgColor =
      CATEGORY_BG_COLORS[category as keyof typeof CATEGORY_BG_COLORS] ||
      'bg-grey100';
    return (
      <div className={`h-10 w-10 rounded-full p-2 ${bgColor}`}>
        <IconComponent className={className} />
      </div>
    );
  }

  return <IconComponent className={className} />;
}
