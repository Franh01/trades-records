/**
 * Formats a price value into a string representation in the currency format of 'USD' with no decimal places.
 *
 * @param {number} price - The price value to be formatted.
 * @return {string} The formatted price string.
 */
export default function usePricingFormatter(price: number): string {
  const ars = Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  })

  if (price === 0) {
    return '-'
  }

  return ars.format(price)
}
