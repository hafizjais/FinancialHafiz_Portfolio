/** Keeps digits only, without leading zeros, capped to a sane length. */
export function sanitizeAmount(raw: string, maxDigits = 9): string {
  return raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, maxDigits);
}

/** Groups thousands deterministically (avoids ICU differences between server and browsers). */
export function groupThousands(value: number | string): string {
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatRM(value: number): string {
  return `RM${groupThousands(Math.round(value))}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}
