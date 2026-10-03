/* ─────────────────────────────────────────
   DSO (Days Sales Outstanding) — pure domain logic.
   Kept framework-free so it can be unit-tested or reused (API, chatbot, etc).
───────────────────────────────────────── */

export const WHATSAPP_NUMBER = "916304607113";
export const WHATSAPP_DISPLAY = "+91 6304607113";

/** Opportunity cost of idle receivables (annual). */
export const IDLE_CAPITAL_RATE = 0.12;
/** Upper bound used for the benchmark bar. */
export const BENCHMARK_DAYS = 90;

export interface DsoInputs {
  receivables: number;
  creditSales: number;
  days: number;
  supplierTerms: number;
}

export interface DsoResult {
  /** Days Sales Outstanding. */
  dso: number;
  /** DSO minus supplier terms — days you finance your clients. */
  gap: number;
  /** Annual cost of the trapped cash (₹). */
  loss: number;
}

export type DsoStatus = "HEALTHY" | "WARNING" | "SEVERE DEFICIT";

const finite = (n: number) => (Number.isFinite(n) ? n : 0);

export function calculateDso({ receivables, creditSales, days, supplierTerms }: DsoInputs): DsoResult {
  const sales = creditSales > 0 ? creditSales : 1;
  const period = days > 0 ? days : 1;
  const dso = (receivables / sales) * period;
  return {
    dso: finite(dso),
    gap: finite(dso - supplierTerms),
    loss: finite(receivables * IDLE_CAPITAL_RATE * (dso / BENCHMARK_DAYS)),
  };
}

export function dsoStatus(dso: number): DsoStatus {
  if (dso < 30) return "HEALTHY";
  if (dso <= 45) return "WARNING";
  return "SEVERE DEFICIT";
}

/** ₹ with Indian digit grouping, e.g. ₹10,00,000 */
export const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Compact ₹ — Cr / L / plain. */
export function formatInrCompact(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)}Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)}L`;
  return formatInr(n);
}

/** Value in lakhs, fixed decimals (no currency symbol). */
export const toLakhs = (n: number, digits = 2) => (n / 1e5).toFixed(digits);

export function whatsappAuditUrl(dsoDays: number, receivables: number, lossLakhs: string) {
  const text = `Hi JenVeda, my DSO is ${dsoDays} days, AR ${formatInr(receivables)}, losing ~₹${lossLakhs}L. Book my free audit for 40/40/20 rule.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
