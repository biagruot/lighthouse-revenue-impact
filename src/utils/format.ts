/**
 * Formats a number as currency using the browser's locale
 * 
 * @param amount - The numeric amount to format
 * @param currencyCode - ISO 4217 currency code (e.g., 'USD', 'EUR')
 * @returns Formatted currency string (e.g., '$1,234.56')
 */
export function formatCurrency(amount: number, currencyCode: string = "USD"): string {
  return new Intl.NumberFormat(undefined, { 
    style: "currency", 
    currency: currencyCode 
  }).format(amount || 0);
}
