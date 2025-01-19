export const DEFAULT_SORT = 'latest' as const;
export const DEFAULT_CATEGORY = 'all' as const;

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
  { value: 'highest', label: 'Highest amount' },
  { value: 'lowest', label: 'Lowest amount' },
] as const;

export const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All categories' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Dining Out', label: 'Dining Out' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Personal Care', label: 'Personal Care' },
  { value: 'Education', label: 'Education' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'General', label: 'General' },
] as const;

export const TABLE_COLUMNS = [
  { key: 'receiverSender', label: 'Receiver / Sender' },
  { key: 'category', label: 'Category' },
  { key: 'date', label: 'Transaction date' },
  { key: 'amount', label: 'Amount' },
] as const;
