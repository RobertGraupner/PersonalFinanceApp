// state messages
export type ViewType =
  | 'overview'
  | 'transactions'
  | 'budgets'
  | 'pots'
  | 'recurring';

// EmptyDataPage component
export interface EmptyDataPageProps {
  viewType: ViewType;
}
export interface EmptyDataText {
  title: string;
  description: string;
}

// ErrorPage component
export interface ErrorPageProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

// ColorBar component
export interface ColorBarProps {
  color: string;
  label: string;
  value: number;
}
