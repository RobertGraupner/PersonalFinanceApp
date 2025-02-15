import * as Icons from 'lucide-react';

export const DEFAULT_SORT = 'latest' as const;
export const DEFAULT_CATEGORY = 'all' as const;

export const CATEGORY_ICONS = {
  // Income
  Salary: Icons.Wallet,
  Transfer: Icons.ArrowLeftRight,
  Refund: Icons.RotateCcw,
  Investment: Icons.TrendingUp,
  // Expenses
  Entertainment: Icons.Gamepad,
  Bills: Icons.Receipt,
  Groceries: Icons.ShoppingCart,
  'Dining Out': Icons.UtensilsCrossed,
  Transportation: Icons.Car,
  'Personal Care': Icons.Heart,
  Education: Icons.GraduationCap,
  Lifestyle: Icons.Smile,
  Shopping: Icons.ShoppingBag,
  General: Icons.CircleDollarSign,
};

export const CATEGORY_BG_COLORS = {
  Salary: 'bg-green',
  Transfer: 'bg-yellow',
  Refund: 'bg-cyan',
  Investment: 'bg-navy',
  Entertainment: 'bg-purple',
  Bills: 'bg-purple2',
  Groceries: 'bg-brown',
  'Dining Out': 'bg-magenta',
  Transportation: 'bg-blue',
  'Personal Care': 'bg-navyGrey',
  Education: 'bg-armyGreen',
  Lifestyle: 'bg-gold',
  Shopping: 'bg-orange',
  General: 'bg-turquoise',
};

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
  { value: 'Salary', label: 'Salary' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'Refund', label: 'Refund' },
  { value: 'Investment', label: 'Investment' },
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

export const INCOME_CATEGORIES = ['Salary', 'Transfer', 'Refund', 'Investment'];

export const TABLE_COLUMNS = [
  { key: 'receiverSender', label: 'Receiver / Sender' },
  { key: 'category', label: 'Category' },
  { key: 'date', label: 'Transaction date' },
  { key: 'amount', label: 'Amount' },
  { key: 'edit', label: '' },
] as const;

export const RECURRING_TABLE_COLUMNS = [
  { key: 'title', label: 'Bill Title' },
  { key: 'date', label: 'Due Date' },
  { key: 'amount', label: 'Amount' },
] as const;
