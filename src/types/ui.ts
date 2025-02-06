import { ReactNode } from 'react';

// @note State messages types
export type ViewType =
  | 'overview'
  | 'transactions'
  | 'budgets'
  | 'pots'
  | 'recurring';

// @note EmptyDataPage component types
export interface EmptyDataPageProps {
  viewType: ViewType;
}
export interface EmptyDataText {
  title: string;
  description: string;
}

// @note ErrorPage component types
export interface ErrorPageProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

// @note ColorBar component types
export interface ColorBarProps {
  color: string;
  label: string;
  value: number;
}

// @note ContentCard component types
export interface ContentCardProps {
  children: ReactNode;
  className?: string;
}

// @note Search and filters types
export interface FilterOption {
  readonly value: string;
  readonly label: string;
}

export interface FilterPopoverProps {
  options: readonly FilterOption[];
  currentValue: string;
  onSelect: (value: string) => void;
  icon: string;
  iconAlt: string;
  label: string;
  translateX?: string;
}

export interface FilterSelectProps {
  options: readonly FilterOption[];
  currentValue: string;
  onSelect: (value: string) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// @note PageHeader component types
export interface PageHeaderProps {
  title: string;
  addButtonLabel: string;
  onAddClick: () => void;
}

// @note AddEntityButton component types
export interface AddEntityButtonProps {
  label: string;
  onClick: () => void;
}

// @note ItemHeader component types
export interface CardHeaderProps {
  name: string;
  theme: string;
  onEdit: () => void;
  onDelete: () => void;
  type: 'budget' | 'pot';
}

// @note SectionHeader component types
export interface SectionHeaderProps {
  title: string;
  linkHref?: string;
  linkText?: string;
  titleStyle?: string;
}

// @note Chart component types
export interface ChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  total: number;
  limit: number;
  className?: string;
}
