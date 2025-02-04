export const calculateBudgetMetrics = (maximum: number, spent: number) => {
  const remaining = Math.max(maximum - spent, 0);
  const progress = (spent / maximum) * 100;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return {
    remaining,
    progress: clampedProgress,
  };
};
