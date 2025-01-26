export const getDayWithSuffix = (date: Date): string => {
  const day = date.getDate();
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = day % 100;
  return day + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};
