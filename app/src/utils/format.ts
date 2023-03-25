export const formatPrice = (value?: number) =>
  value && value < 0
    ? `($${(-value || 0).toFixed(2)})`
    : `$${(value || 0).toFixed(2)}`;

export const performanceFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

export const conversionFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}%`;
