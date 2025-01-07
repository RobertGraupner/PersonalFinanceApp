export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}
