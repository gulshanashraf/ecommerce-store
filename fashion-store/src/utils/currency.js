/**
 * Formats a numeric amount as Pakistani Rupees, e.g. formatPKR(2499) -> "Rs. 2,499"
 * Never render raw numbers or $ in the UI — always pass prices through this.
 */
export function formatPKR(amount) {
  const value = Number(amount);
  if (Number.isNaN(value)) return "Rs. 0";
  const rounded = Math.round(value);
  return `Rs. ${rounded.toLocaleString("en-PK")}`;
}
