/* ─────────────────────────────────────────
   Finance POV Lead-Gen Tools — pure domain logic.
   Framework-free so it can be unit-tested or reused (API, chatbot, etc).

   Five calculators, each: takes slider inputs → derives a "pain" number in ₹,
   shows the Jenveda-fixed value, and builds a pre-filled WhatsApp audit message.

   Formulas reverse-engineered 1:1 from the original POC artifact.
───────────────────────────────────────── */

import { WHATSAPP_NUMBER, formatInrCompact } from "@/lib/dso";

/* ---- display helpers ---------------------------------------------------- */
// Round to whole rupees before compacting so figures never show fractional paise.
const inr = (n: number) => formatInrCompact(Math.round(n));
const pct = (n: number) => `${n}%`;
const pct1 = (n: number) => `${n.toFixed(1)}%`;
const daysFmt = (n: number) => `${n} days`;
const hrsFmt = (n: number) => `${n}h`;
const plain = (n: number) => `${n}`;

/* ---- shared types ------------------------------------------------------- */
export type Tone = "neutral" | "bad" | "good" | "brand";
export type ChartUnit = "inr" | "hours";

export interface SliderDef {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  /** Formats the current value for the pill next to the slider. */
  fmt: (v: number) => string;
}

export interface ResultCard {
  label: string;
  value: string;
  sub?: string;
  tone: Tone;
}

export interface ToolResult {
  /** Big hero number + caption, e.g. "₹70.00L" / "stuck in market". */
  headline: { value: string; caption: string };
  /** Circular gauge: fill 0–100, center label, caption, danger = red. */
  gauge: { pct: number; label: string; sub: string; danger: boolean };
  cards: ResultCard[];
  /** Before/after bar chart. */
  chart: { unit: ChartUnit; bars: { name: string; value: number; highlight?: boolean }[] };
  /** 3-column comparison table. */
  table: { headers: [string, string, string]; rows: [string, string, string][] };
  /** "Jenveda Fix" mapping bullets. */
  fixes: { k: string; v: string }[];
  /** Warning/insight box text. */
  note: string;
  /** Sentence injected into the WhatsApp audit message. */
  summary: string;
}

export interface ToolDef {
  id: string;
  short: string;
  title: string;
  pain: string;
  icon: string;
  blurb: string;
  sliders: SliderDef[];
  defaults: Record<string, number>;
  compute: (s: Record<string, number>) => ToolResult;
}

/* ---- helpers ------------------------------------------------------------ */
const clampPct = (n: number) => Math.min(100, Math.max(4, n));

/** Builds the pre-filled wa.me link for a tool's audit request. */
export function whatsappToolUrl(toolName: string, summary: string) {
  const text = `Hi Jenveda Team, I ran ${toolName}. ${summary} Please send my detailed Finance Audit.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ═════════════════════════════════════════════════════════════════════════
   TOOL 1 — Cash Stuck (Sales vs Bank)
════════════════════════════════════════════════════════════════════════ */
const cashStuck: ToolDef = {
  id: "cash-stuck",
  short: "Cash Stuck",
  title: "Sales vs Bank",
  pain: "42 DAYS DSO",
  icon: "₹",
  blurb: "Sales on paper ≠ cash in bank. See how many ₹ your DSO locks in the market.",
  sliders: [
    { key: "sales", label: "Monthly Sales", min: 500_000, max: 50_000_000, step: 100_000, fmt: inr },
    { key: "dso", label: "Avg Collection Days", min: 5, max: 90, step: 1, fmt: daysFmt },
    { key: "rate", label: "Loan / CC Interest %", min: 7, max: 18, step: 0.5, fmt: pct },
  ],
  defaults: { sales: 5_000_000, dso: 42, rate: 12 },
  compute: ({ sales, dso, rate }) => {
    const cash = (sales * dso) / 30; // stuck "Without"
    const cashJen = (sales * 9) / 30; // Jenveda target: 9-day DSO
    const reduction = cash - cashJen;
    const intNow = (cash * (rate / 100)) / 12;
    const intJen = (cashJen * (rate / 100)) / 12;
    const savings = (reduction * (rate / 100)) / 12;
    return {
      headline: { value: inr(cash), caption: "stuck in market" },
      gauge: {
        pct: clampPct((dso / 90) * 100),
        label: `${dso}d DSO`,
        sub: "Collection Health",
        danger: dso > 45,
      },
      cards: [
        { label: "Interest Loss / mo", value: inr(intNow), sub: "You pay this to bank", tone: "bad" },
        { label: "With Jenveda (9d)", value: inr(cashJen), sub: "Only 30% stuck", tone: "good" },
        { label: "Monthly Savings", value: inr(savings), sub: `→ ${inr(savings * 12)} / year`, tone: "brand" },
      ],
      chart: {
        unit: "inr",
        bars: [
          { name: "Without", value: cash },
          { name: "With Jenveda (9d)", value: cashJen, highlight: true },
        ],
      },
      table: {
        headers: ["Metric", "Without Jenveda", "With Jenveda"],
        rows: [
          ["DSO", `${dso} days`, "9 days"],
          ["Cash Stuck", inr(cash), inr(cashJen)],
          ["Interest Cost / Month", inr(intNow), inr(intJen)],
          ["Yearly Drain", inr(intNow * 12), inr(intJen * 12)],
        ],
      },
      fixes: [
        { k: "Tally + WhatsApp", v: "Invoice → Auto WhatsApp reminder with UPI link" },
        { k: "Role-based", v: "Collection person sees only his ledgers, daily target" },
        { k: "Audit + Cloud", v: "Every receipt logged, owner sees DSO live" },
      ],
      note: `Most businesses think sales = cash. With ${dso} days DSO, ${inr(cash)} is stuck in market. You pay interest on your own money.`,
      summary: `My cash stuck is ${inr(cash)} for ${dso} days DSO, losing ${inr(intNow)}/mo.`,
    };
  },
};

/* ═════════════════════════════════════════════════════════════════════════
   TOOL 2 — Profit Leakage (Hidden Leaks)
════════════════════════════════════════════════════════════════════════ */
const profitLeakage: ToolDef = {
  id: "profit-leakage",
  short: "Profit Leakage",
  title: "Hidden Leaks",
  pain: "SILENT DRAIN",
  icon: "◍",
  blurb: "Price variance, detention and OT quietly eat margin. Quantify the monthly leak.",
  sliders: [
    { key: "purchase", label: "Monthly Purchase", min: 500_000, max: 20_000_000, step: 100_000, fmt: inr },
    { key: "priceVar", label: "Price Variance %", min: 0, max: 5, step: 0.1, fmt: pct1 },
    { key: "detention", label: "Transport Detention / Mo", min: 0, max: 200_000, step: 5_000, fmt: inr },
    { key: "otExcess", label: "OT Excess / Mo", min: 0, max: 200_000, step: 5_000, fmt: inr },
  ],
  defaults: { purchase: 3_000_000, priceVar: 2, detention: 50_000, otExcess: 75_000 },
  compute: ({ purchase, priceVar, detention, otExcess }) => {
    const priceLeak = (purchase * priceVar) / 100;
    const monthly = priceLeak + detention + otExcess;
    const yearly = monthly * 12;
    const ratio = (monthly / (purchase || 1)) * 100;
    return {
      headline: { value: inr(monthly), caption: "leaking / month" },
      gauge: {
        pct: clampPct((ratio / 5) * 100),
        label: pct1(ratio),
        sub: "Leakage Ratio",
        danger: true,
      },
      cards: [
        { label: "Without Jenveda", value: `${inr(yearly)}/yr`, sub: "Lost silently", tone: "bad" },
        { label: "With Jenveda", value: `${inr(yearly * 0.15)}/yr`, sub: "85% saved", tone: "good" },
        { label: "ROI", value: "Payback in 18 days", sub: "Audit pays for itself", tone: "brand" },
      ],
      chart: {
        unit: "inr",
        bars: [
          { name: "Price Var", value: priceLeak },
          { name: "Detention", value: detention },
          { name: "OT Excess", value: otExcess },
        ],
      },
      table: {
        headers: ["Item", "Loss", "Jenveda Control"],
        rows: [
          ["Price Variance", inr(priceLeak), "Auto price compare + block"],
          ["Detention", inr(detention), "WhatsApp approval before pay"],
          ["OT Excess", inr(otExcess), "Role-based OT lock + alert"],
        ],
      },
      fixes: [
        { k: "Tally API + Audit Logs", v: "Every purchase price compared to last 3 orders, variance >1% flagged" },
        { k: "WhatsApp Alerts", v: "Detention bill auto alert to owner before payment" },
        { k: "Role-based", v: "OT approval only by owner, logged" },
      ],
      note: `No audit = leakage treated as cost. Tally entry ≠ physical verification. You lose ${inr(monthly)}/mo without knowing where.`,
      summary: `Leaking ${inr(monthly)}/mo (${inr(yearly)}/yr).`,
    };
  },
};

/* ═════════════════════════════════════════════════════════════════════════
   TOOL 3 — Discount Audit (Auto Dealership)
════════════════════════════════════════════════════════════════════════ */
const discountAudit: ToolDef = {
  id: "discount-audit",
  short: "Discount Audit",
  title: "Auto Dealership",
  pain: "DISCOUNT ABUSE",
  icon: "◐",
  blurb: "Unauthorized discounts bleed margin on every deal. See the monthly profit leak.",
  sliders: [
    { key: "sales", label: "Monthly Sales (Ex-showroom)", min: 2_000_000, max: 50_000_000, step: 100_000, fmt: inr },
    { key: "avgDisc", label: "Avg Discount %", min: 0, max: 10, step: 0.1, fmt: pct },
    { key: "unauthDisc", label: "Unauthorized Discount %", min: 0, max: 3, step: 0.1, fmt: pct },
    { key: "margin", label: "Gross Margin %", min: 3, max: 15, step: 0.5, fmt: pct },
  ],
  defaults: { sales: 10_000_000, avgDisc: 3, unauthDisc: 1.2, margin: 8 },
  compute: ({ sales, avgDisc, unauthDisc, margin }) => {
    const avgAmt = (sales * avgDisc) / 100;
    const unauthAmt = (sales * unauthDisc) / 100;
    const totalDisc = avgAmt + unauthAmt;
    const grossProfit = (sales * margin) / 100;
    const profitNow = grossProfit - unauthAmt;
    const profitJen = grossProfit - (sales * 0.2) / 100; // 0.2% cap
    const recoverable = unauthAmt - (sales * 0.2) / 100;
    return {
      headline: { value: inr(profitNow), caption: "profit / mo left" },
      gauge: {
        pct: clampPct((unauthDisc / 3) * 100),
        label: `${unauthDisc}% UA`,
        sub: "Discount Abuse",
        danger: unauthDisc > 1.5,
      },
      cards: [
        { label: "Total Discount Given", value: inr(totalDisc), sub: "Avg + Unauthorized", tone: "neutral" },
        { label: "Unauthorized Loss", value: `${inr(unauthAmt)}/mo`, sub: `${inr(unauthAmt * 12)}/yr`, tone: "bad" },
        { label: "Recoverable with Jenveda", value: `${inr(recoverable)}/mo`, sub: "With 0.2% cap", tone: "brand" },
      ],
      chart: {
        unit: "inr",
        bars: [
          { name: "Without", value: profitNow },
          { name: "With Jenveda", value: profitJen, highlight: true },
        ],
      },
      table: {
        headers: ["Metric", "Without", "With Jenveda"],
        rows: [
          ["Unauthorized Discount", `${unauthDisc}% = ${inr(unauthAmt)}`, `0.2% = ${inr((sales * 0.2) / 100)}`],
          ["Net Profit / Mo", inr(profitNow), inr(profitJen)],
          ["Yearly Profit Impact", inr(profitNow * 12), inr(profitJen * 12)],
        ],
      },
      fixes: [
        { k: "Role-based discount limits", v: "Sales exec 1%, TL 2%, Owner unlimited" },
        { k: "Approval workflow", v: "WhatsApp approval request with customer + chassis no" },
        { k: "Audit log", v: "Who gave what discount, when, why — immutable" },
      ],
      note: "Every 1% extra discount on ₹1Cr sale = ₹1L direct profit loss. Without role limits, the sales team gives away your margin to close deals.",
      summary: `Unauthorized discount loss ${inr(unauthAmt)}/mo, net profit ${inr(profitNow)}.`,
    };
  },
};

/* ═════════════════════════════════════════════════════════════════════════
   TOOL 4 — Tally Lag (Stock Mismatch)
════════════════════════════════════════════════════════════════════════ */
const tallyLag: ToolDef = {
  id: "tally-lag",
  short: "Tally Lag",
  title: "Stock Mismatch",
  pain: "12H DELAY",
  icon: "◑",
  blurb: "Manual Tally merging wastes hours and hides stock mismatch + GST penalty risk.",
  sliders: [
    { key: "branches", label: "No of Branches", min: 1, max: 20, step: 1, fmt: plain },
    { key: "hrsWeek", label: "Hours to Consolidate / Week", min: 2, max: 40, step: 1, fmt: hrsFmt },
    { key: "mismatch", label: "Stock Mismatch %", min: 0, max: 5, step: 0.1, fmt: pct },
    { key: "stockVal", label: "Monthly Stock Value", min: 1_000_000, max: 50_000_000, step: 500_000, fmt: inr },
  ],
  defaults: { branches: 5, hrsWeek: 12, mismatch: 1.5, stockVal: 8_000_000 },
  compute: ({ branches, hrsWeek, mismatch, stockVal }) => {
    const manHoursMo = branches * hrsWeek * 4;
    const manHoursYr = manHoursMo * 12;
    const valueAtRisk = (stockVal * mismatch) / 100;
    const gstRisk = valueAtRisk * 0.18;
    const fte = manHoursYr / 2080;
    return {
      headline: { value: inr(valueAtRisk), caption: "at risk" },
      gauge: {
        pct: clampPct((mismatch / 5) * 100),
        label: `${mismatch}% mismatch`,
        sub: "Stock Health",
        danger: mismatch > 2,
      },
      cards: [
        { label: "Time Wasted", value: `${manHoursMo}h/mo`, sub: `${manHoursYr}h/yr = ${fte.toFixed(1)} FTE`, tone: "neutral" },
        { label: "Value at Risk", value: inr(valueAtRisk), sub: `GST risk ${inr(gstRisk)}`, tone: "bad" },
        { label: "With Jenveda", value: "5 min sync", sub: "0% manual, alerts on", tone: "brand" },
      ],
      chart: {
        unit: "hours",
        bars: [
          { name: "Without", value: manHoursMo },
          { name: "With Jenveda", value: 2, highlight: true },
        ],
      },
      table: {
        headers: ["Metric", "Without", "With Jenveda"],
        rows: [
          ["Consolidation Time", `${manHoursMo}h/mo`, "5 mins auto"],
          ["Stock Mismatch Alert", "Month-end surprise", "Live WhatsApp alert"],
          ["GST Penalty Risk", inr(gstRisk), "Zero, real-time tally"],
        ],
      },
      fixes: [
        { k: "Real-time Tally Sync", v: "All branches → Cloud dashboard in 5 mins, no manual" },
        { k: "Multi-branch Cloud", v: "Stock + Sale + Purchase live, mismatch alert >0.5%" },
        { k: "Backups + Audit", v: "Daily Tally backup, stock edit log with user & IP" },
      ],
      note: `Your accountant spends ${manHoursMo}h/month just merging Tally. Meanwhile stock mismatch of ${mismatch}% hides theft & GST mismatch.`,
      summary: `Wasting ${manHoursMo}h/mo, ${inr(valueAtRisk)} at risk due to ${mismatch}% mismatch.`,
    };
  },
};

/* ═════════════════════════════════════════════════════════════════════════
   TOOL 5 — Working Capital (Bank Ready)
════════════════════════════════════════════════════════════════════════ */
const workingCapital: ToolDef = {
  id: "working-capital",
  short: "Working Capital",
  title: "Bank Ready",
  pain: "LIMIT RISK",
  icon: "◎",
  blurb: "Overdue receivables + slow stock statements block CC limits and invite bank queries.",
  sliders: [
    { key: "ccLimit", label: "CC Limit", min: 2_000_000, max: 50_000_000, step: 500_000, fmt: inr },
    { key: "ccRate", label: "CC Interest %", min: 7, max: 16, step: 0.25, fmt: pct },
    { key: "hrsStmt", label: "Hours to Prepare Stock Statement", min: 2, max: 40, step: 1, fmt: hrsFmt },
    { key: "overdue", label: "Overdue Receivables", min: 0, max: 10_000_000, step: 100_000, fmt: inr },
  ],
  defaults: { ccLimit: 10_000_000, ccRate: 11, hrsStmt: 16, overdue: 2_000_000 },
  compute: ({ ccLimit, ccRate, hrsStmt, overdue }) => {
    const extraInterestMo = (overdue * ccRate) / 100 / 12;
    const manHoursYr = hrsStmt * 12;
    const overduePct = (overdue / (ccLimit || 1)) * 100;
    const risk =
      overduePct > 20 ? "HIGH — Limit cut likely" : overduePct > 12 ? "MEDIUM — Bank query" : "LOW — Safe";
    return {
      headline: { value: `${inr(extraInterestMo)}/mo`, caption: "extra interest" },
      gauge: {
        pct: clampPct((overduePct / 30) * 100),
        label: `${overduePct.toFixed(0)}% blocked`,
        sub: "CC Health",
        danger: overduePct > 20,
      },
      cards: [
        { label: "Extra Interest", value: `${inr(extraInterestMo)}/mo`, sub: `${inr(extraInterestMo * 12)}/yr`, tone: "bad" },
        { label: "Man-Hours", value: `${manHoursYr}h/yr`, sub: `${(manHoursYr / 8).toFixed(0)} working days`, tone: "neutral" },
        { label: "With Jenveda", value: "1-click statement", sub: "2h → 5 mins", tone: "brand" },
      ],
      chart: {
        unit: "hours",
        bars: [
          { name: "Manual Prep", value: hrsStmt },
          { name: "Jenveda Auto", value: 0.1, highlight: true },
        ],
      },
      table: {
        headers: ["Metric", "Without", "With Jenveda"],
        rows: [
          ["Stock Statement", `${hrsStmt}h manual`, "5 mins auto PDF"],
          ["Overdue Tracking", "Excel, missed follow-ups", "Auto WhatsApp + dashboard"],
          ["Bank Risk", risk, "Green — Audit ready always"],
        ],
      },
      fixes: [
        { k: "Cloud Dashboard", v: "Stock statement auto-generated from Tally, bank-ready PDF" },
        { k: "Audit + Backups", v: "Every stock edit tracked, daily backup → no last-minute rush" },
        { k: "WhatsApp", v: "Overdue >30d auto-escalation to owner + collection person" },
      ],
      note: `Overdue ${inr(overdue)} blocks your CC drawing power. Bank sees poor stock statement = limit cut or extra 2% interest.`,
      summary: `CC ${inr(ccLimit)}, overdue ${inr(overdue)} (${overduePct.toFixed(1)}%), extra interest ${inr(extraInterestMo)}/mo.`,
    };
  },
};

export const FINANCE_TOOLS: ToolDef[] = [
  cashStuck,
  profitLeakage,
  discountAudit,
  tallyLag,
  workingCapital,
];
