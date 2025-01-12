import { ViewType, EmptyDataText } from '@/types/ui';

export const LOADING_TEXTS = [
  'Counting your virtual pennies... 🪙',
  'Teaching your money to multiply... 📚',
  'Asking your wallet what it had for breakfast... 🍳',
  'Negotiating with your savings... 🤝',
  'Chasing runaway expenses... 🏃‍♂️',
  'Giving your budget a pep talk... 💪',
  'Making your money work from home... 💼',
  'Calculating how many coffees until payday... ☕',
  'Checking if money really does grow on trees... 🌳',
  'Convincing your bills to be smaller... 📉',
] as const;

export const EMPTY_DATA_TEXTS: Record<ViewType, EmptyDataText> = {
  overview: {
    title: 'Your wallet is looking a bit lonely!',
    description:
      "Time to fill it with some financial magic! Add your first transaction, set a budget, or create a savings goal to get started. Don't worry, we'll help you keep track of every penny! 💰✨",
  },
  transactions: {
    title: 'No transactions yet!',
    description:
      "Your transaction history is as empty as a piggy bank on payday! Let's change that - start tracking your money moves! 🐷💫",
  },
  budgets: {
    title: 'Budget-free zone detected!',
    description:
      "Your money needs a game plan! Create your first budget and watch your savings grow. It's like a treasure map for your finances! 🗺️💎",
  },
  pots: {
    title: 'Your savings pots are waiting!',
    description:
      "Create your first savings pot and start working towards your goals. Whether it's a vacation, new gadget, or rainy day fund - we've got you covered! 🏺✨",
  },
  recurring: {
    title: 'No recurring bills found!',
    description:
      'Track your regular expenses and never miss a payment again. Add your first recurring bill and stay on top of your financial game! 📅💪',
  },
} as const;
