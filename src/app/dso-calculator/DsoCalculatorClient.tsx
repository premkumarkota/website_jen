"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BENCHMARK_DAYS,
  WHATSAPP_DISPLAY,
  calculateDso,
  dsoStatus,
  formatInr,
  formatInrCompact,
  toLakhs,
  whatsappAuditUrl,
  type DsoStatus,
} from "@/lib/dso";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const BRAND_GRADIENT = "linear-gradient(90deg,#4A1E91 0%, #E92F8E 100%)";
const QR_SRC = "/dso/whatsapp-audit-qr.png";
const MARK_SRC = "/dso/jenveda-mark.jpg";

const statusStyles: Record<DsoStatus, string> = {
  HEALTHY: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
  WARNING: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  "SEVERE DEFICIT": "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
};

const problems = [
  {
    tag: "PROBLEM #1",
    title: "Revenue on Paper ≠ Cash in Bank",
    desc: "Your P&L shows profit. But ₹18.4L sits in receivables for 67 days. GST paid, salaries paid, vendor due — all from your pocket.",
    accent: "#4A1E91",
  },
  {
    tag: "PROBLEM #2",
    title: "You're Their Interest-Free Bank",
    desc: "Client enjoys 60-day credit while you borrow at 12-14% to meet payroll. ₹10L trapped = ₹10,000/month in invisible interest you pay.",
    accent: "#E92F8E",
  },
  {
    tag: "SOLUTION",
    title: "Fix: 40/40/20 Rule",
    desc: "40% advance before work, 40% on milestone, 20% on delivery. DSO drops from 58 to 22 days. Cash unlocks in 24 hours, not 2 months.",
    accent: "#6D28D9",
  },
];

const pillars = [
  { n: "01", t: "Unlock in 24H", d: "Invoice discounting at 1.2%/mo. Convert that ₹10L receivable into ₹9.88L tomorrow. No collateral." },
  { n: "02", t: "Enforce Milestones", d: "We draft your 40/40/20 contract + payment reminders. Clients pay on time because system enforces, not you." },
  { n: "03", t: "DSO Command Center", d: "Live dashboard: who owes what, since when, follow-up script ready. WhatsApp alerts before due date." },
  { n: "04", t: "Recover Margin", d: "That 12% leakage becomes 12% profit. ₹1.2L saved per ₹10L per year funds your next machine, hire, inventory." },
];

const guarantees = ["Free 15-min Audit", "No collateral", "24-hr payout", "500+ MSMEs"];

const proofStats = [
  { k: "₹47Cr+", v: "Cash Unlocked" },
  { k: "22 days", v: "Avg DSO Reduction" },
  { k: "500+", v: "MSMEs Audited" },
  { k: "4.8/5", v: "Founder Rating" },
];

const inputCls =
  "w-full h-[48px] rounded-[12px] border border-[#EDE7F7] bg-white px-4 text-[15px] font-medium text-[#1A1033] outline-none focus:border-[#E92F8E] focus:ring-2 focus:ring-[#E92F8E]/15 transition-all";
const labelCls = "mb-1.5 block text-[11px] font-semibold tracking-[0.08em] text-[#8B8BA3] uppercase";

/* ─────────────────────────────────────────
   SMALL PIECES
───────────────────────────────────────── */
function NumberField({
  label,
  value,
  onChange,
  min,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={inputCls}
      />
    </label>
  );
}

function WhatsAppLink({ href, className, style, children }: {
  href: string;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function DsoCalculatorClient() {
  const [receivables, setReceivables] = useState(1_000_000);
  const [creditSales, setCreditSales] = useState(2_000_000);
  const [days, setDays] = useState(90);
  const [supplierTerms, setSupplierTerms] = useState(30);

  const result = useMemo(
    () => calculateDso({ receivables, creditSales, days, supplierTerms }),
    [receivables, creditSales, days, supplierTerms]
  );

  const dsoDays = Math.round(result.dso);
  const lossLakhs = toLakhs(result.loss);
  const status = dsoStatus(result.dso);
  const barMax = Math.max(result.dso, BENCHMARK_DAYS, 1);
  const dsoBarPct = Math.min(100, (result.dso / barMax) * 100);
  const benchmarkBarPct = (BENCHMARK_DAYS / barMax) * 100;
  const waUrl = whatsappAuditUrl(dsoDays, receivables, lossLakhs);

  return (
    <div className="dso-page bg-white text-[#5F5F76] antialiased selection:bg-[#E92F8E]/20">
      {/* ══════════════════════════════ HERO + CALCULATOR ══════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1160px] px-5 lg:px-6 pt-[112px] lg:pt-[128px] pb-14 lg:pb-[72px]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-12 items-start">
            {/* Left: pitch */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F3D6E6] bg-[#FFF0F7] px-3.5 py-[6px]">
                <span className="h-2 w-2 rounded-full bg-[#E92F8E] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.12em] text-[#E92F8E]">FREE TOOL • 500+ MSMEs</span>
              </div>
              <h1 className="mt-6 font-bold leading-[0.98] tracking-[-0.03em] text-[#4A1E91] text-[36px] sm:text-[44px] lg:text-[48px]">
                Find How Much Cash Is Trapped In Your Business
              </h1>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-[#5F5F76]">
                <span className="font-semibold text-[#1A1033]">50% of B2B failures aren&apos;t demand problems.</span>{" "}
                They&apos;re DSO problems. Calculate your Days Sales Outstanding in 30 seconds.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[560px]">
                <div className="rounded-[14px] border border-[#F1ECFA] bg-white px-4 py-3 shadow-[0_4px_20px_rgba(74,30,145,0.06)]">
                  <div className="text-[11px] font-semibold tracking-wide text-[#9B8BC7] uppercase">Loss Formula</div>
                  <div className="dso-display mt-1 font-semibold text-[14px] text-[#1A1033]">₹10L trapped = ₹1.2L lost/year</div>
                  <div className="mt-1 text-[12px] text-[#5F5F76]">12% idle capital cost + stress</div>
                </div>
                <div className="rounded-[14px] border border-[#FCE7E9] bg-white px-4 py-3 shadow-[0_4px_20px_rgba(233,47,142,0.06)]">
                  <div className="text-[11px] font-semibold tracking-wide text-[#E92F8E] uppercase">Red Flag</div>
                  <div className="dso-display mt-1 font-semibold text-[14px] text-[#1A1033]">DSO &gt;45 + Supplier 30 = Severe deficit</div>
                  <div className="mt-1 text-[12px] text-[#5F5F76]">You&apos;re funding clients for free</div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["R", "A", "M"].map((initial) => (
                    <div
                      key={initial}
                      className="h-8 w-8 rounded-full border-2 border-white bg-[#F7F3FC] flex items-center justify-center text-[11px] font-bold text-[#4A1E91] shadow-sm"
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div className="text-[13px] leading-[1.3]">
                  <span className="font-semibold text-[#1A1033]">Trusted by 500+ MSME founders</span>
                  <br />
                  <span className="text-[#8B8BA3]">Avg. DSO reduced 22 days in 90 days</span>
                </div>
              </div>

              {/* Mobile-only QR */}
              <div className="mt-8 flex lg:hidden items-center gap-4 rounded-[16px] border border-[#F1ECFA] bg-[#FBF8FF] p-3">
                <Image src={QR_SRC} alt="Scan QR" width={72} height={72} className="w-[72px] h-[72px] rounded-[8px] bg-white p-1" />
                <div>
                  <div className="text-[12px] font-bold tracking-wide text-[#4A1E91]">SCAN TO CALCULATE</div>
                  <div className="dso-display text-[15px] font-semibold text-[#1A1033]">{WHATSAPP_DISPLAY}</div>
                  <div className="text-[12px] text-[#8B8BA3]">WhatsApp your DSO snapshot</div>
                </div>
              </div>
            </div>

            {/* Right: calculator card */}
            <div className="relative">
              <div className="rounded-[20px] border border-[#F1ECFA] bg-white p-5 sm:p-6 shadow-[0_20px_60px_rgba(74,30,145,0.10),0_2px_12px_rgba(74,30,145,0.06)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="dso-display text-[18px] font-bold text-[#1A1033]">DSO Calculator</div>
                    <div className="mt-1 text-[12px] font-medium text-[#8B8BA3]">Real-time • No email required</div>
                  </div>
                  <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${statusStyles[status]}`}>
                    {status}
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <NumberField label="Total Accounts Receivable ₹" value={receivables} onChange={setReceivables} min={0} step={50000} />
                  <NumberField label="Total Credit Sales ₹" value={creditSales} onChange={setCreditSales} min={1} step={50000} />
                  <div className="grid grid-cols-2 gap-3">
                    <NumberField label="Number of Days" value={days} onChange={setDays} min={1} />
                    <NumberField label="Supplier Terms (Days)" value={supplierTerms} onChange={setSupplierTerms} min={0} />
                  </div>
                </div>

                {/* Results */}
                <div className="mt-6 rounded-[16px] bg-[#FBF8FF] border border-[#F1ECFA] p-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-[12px] bg-white border border-[#F1ECFA] p-3 text-center">
                      <div className="text-[10px] font-semibold tracking-wide text-[#9B8BC7] uppercase">Your DSO</div>
                      <div
                        className="dso-display mt-1 text-[22px] font-extrabold tracking-tight"
                        style={{
                          background: "linear-gradient(90deg,#4A1E91,#E92F8E)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {result.dso.toFixed(1)} days
                      </div>
                    </div>
                    <div className="rounded-[12px] bg-white border border-[#F1ECFA] p-3 text-center">
                      <div className="text-[10px] font-semibold tracking-wide text-[#9B8BC7] uppercase">Cash Gap</div>
                      <div className={`dso-display mt-1 text-[18px] font-bold ${result.gap > 0 ? "text-[#DC2626]" : "text-[#059669]"}`}>
                        {result.gap > 0 ? "+" : ""}
                        {result.gap.toFixed(1)}d
                      </div>
                      <div className="text-[10px] text-[#8B8BA3] mt-0.5">vs Supplier</div>
                    </div>
                    <div className="rounded-[12px] bg-white border border-[#F1ECFA] p-3 text-center">
                      <div className="text-[10px] font-semibold tracking-wide text-[#9B8BC7] uppercase">Annual Leak</div>
                      <div className="dso-display mt-1 text-[16px] font-bold text-[#1A1033]">₹{lossLakhs}L</div>
                      <div className="text-[10px] text-[#8B8BA3] mt-0.5">{formatInrCompact(result.loss)}/yr</div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-[#5F5F76]">Your DSO</span>
                        <span className="font-semibold text-[#1A1033]">{dsoDays}d</span>
                      </div>
                      <div className="mt-1.5 h-[10px] w-full rounded-full bg-[#F1ECFA] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${dsoBarPct}%`,
                            background:
                              result.dso > 45
                                ? "linear-gradient(90deg,#DC2626,#E92F8E)"
                                : "linear-gradient(90deg,#4A1E91,#8B5CF6)",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-[#5F5F76]">Healthy Benchmark</span>
                        <span className="font-semibold text-[#8B8BA3]">{BENCHMARK_DAYS} days max</span>
                      </div>
                      <div className="mt-1.5 h-[10px] w-full rounded-full bg-[#F1ECFA] overflow-hidden">
                        <div className="h-full rounded-full bg-[#E9E2F7] transition-all duration-500" style={{ width: `${benchmarkBarPct}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[10px] bg-white border border-dashed border-[#E9D9F3] px-3 py-2.5 text-[11px] leading-[1.5] text-[#5F5F76]">
                    <span className="font-semibold text-[#4A1E91]">Formula:</span> DSO = (AR ÷ Credit Sales) × Days • Gap = DSO − Supplier
                    Terms • Loss = AR ×12%×(DSO/90)
                  </div>
                </div>

                <WhatsAppLink
                  href={waUrl}
                  className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[14px] font-bold text-white shadow-[0_10px_30px_rgba(233,47,142,0.3)] hover:translate-y-[-1px] transition-all"
                  style={{ background: BRAND_GRADIENT }}
                >
                  <span>UNLOCK MY CASH ON WHATSAPP</span>
                  <span aria-hidden>→</span>
                </WhatsAppLink>

                <div className="mt-4 hidden lg:flex items-center gap-4 rounded-[14px] border border-[#F1ECFA] bg-white px-3 py-3">
                  <Image
                    src={QR_SRC}
                    alt="JenVeda QR"
                    width={72}
                    height={72}
                    className="w-[72px] h-[72px] rounded-[8px] object-contain bg-white border border-[#F1ECFA] p-1"
                  />
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold tracking-[0.12em] text-[#4A1E91]">SCAN TO CALCULATE</div>
                    <div className="dso-display mt-1 text-[13px] font-semibold text-[#1A1033]">{WHATSAPP_DISPLAY}</div>
                    <div className="mt-0.5 text-[11px] text-[#8B8BA3]">Instant DSO audit on WhatsApp</div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -z-10 -bottom-6 -right-6 h-[200px] w-[200px] rounded-full bg-[#F7F3FC] blur-[40px]" />
              <div className="pointer-events-none absolute -z-10 -top-6 -left-6 h-[160px] w-[160px] rounded-full bg-[#FFF0F7] blur-[30px]" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ WHY MSMEs STAY CASH-STARVED ══════════════════════════════ */}
      <section className="bg-[#F7F3FC]">
        <div className="mx-auto max-w-[1160px] px-5 lg:px-6 py-14 lg:py-[72px]">
          <div className="mx-auto max-w-[720px] text-center">
            <div className="inline-flex rounded-full bg-white border border-[#EDE7F7] px-3.5 py-1 text-[11px] font-bold tracking-[0.12em] text-[#4A1E91]">
              WHY MSMEs STAY CASH-STARVED
            </div>
            <h2 className="mt-4 font-bold text-[28px] sm:text-[32px] leading-[1.15] tracking-[-0.02em] text-[#4A1E91]">
              Invoice paid in 45 days? You paid your supplier in 15.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#5F5F76]">
              That 30-day gap is not accounting. It&apos;s a daily cash bleed that compounds into crores.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {problems.map((p) => (
              <div key={p.title} className="rounded-[20px] border border-[#EDE7F7] bg-white p-6 shadow-[0_8px_30px_rgba(74,30,145,0.06)]">
                <div
                  className="inline-flex rounded-full bg-[#FBF8FF] border border-[#F1ECFA] px-2.5 py-1 text-[10px] font-bold tracking-wide"
                  style={{ color: p.accent }}
                >
                  {p.tag}
                </div>
                <h3 className="mt-4 font-bold text-[18px] leading-[1.25] text-[#1A1033]">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#5F5F76]">{p.desc}</p>
                <div className="mt-5 h-[3px] w-[40px] rounded-full" style={{ background: p.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ THE JENVEDA SYSTEM ══════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1160px] px-5 lg:px-6 py-14 lg:py-[72px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-[560px]">
              <div className="inline-flex rounded-full bg-[#FFF0F7] border border-[#F3D6E6] px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-[#E92F8E]">
                THE JENVEDA SYSTEM
              </div>
              <h2 className="mt-4 font-bold text-[30px] leading-[1.15] tracking-[-0.02em] text-[#4A1E91]">
                Stop chasing payments. Start commanding cash.
              </h2>
            </div>
            <p className="max-w-[380px] text-[14px] leading-[1.6] text-[#5F5F76]">
              500+ MSMEs use this 4-pillar framework to cut DSO by 60% without losing a single client.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group rounded-[20px] border border-[#F1ECFA] bg-white p-6 hover:shadow-[0_12px_32px_rgba(74,30,145,0.08)] hover:border-[#E9D9F3] transition-all"
              >
                <div className="dso-display text-[32px] font-extrabold leading-none tracking-tight text-[#E92F8E]">{p.n}</div>
                <h3 className="mt-3 font-bold text-[16px] text-[#1A1033]">{p.t}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#5F5F76]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CTA ══════════════════════════════ */}
      <section className="bg-[#F7F3FC]">
        <div className="mx-auto max-w-[1160px] px-5 lg:px-6 py-14 lg:pb-[88px]">
          <div className="rounded-[28px] border border-[#EDE7F7] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(74,30,145,0.10)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center">
              <div>
                <h2 className="font-bold leading-[1.08] tracking-[-0.03em] text-[#4A1E91] text-[28px] sm:text-[34px] lg:text-[36px]">
                  That ₹10 Lakh Trapped? It&apos;s Your Next Machine. Your Next Hire.
                </h2>
                <p className="mt-4 text-[15px] leading-[1.6] text-[#5F5F76] max-w-[520px]">
                  Your DSO is <span className="font-bold text-[#1A1033]">{dsoDays} days</span>. You&apos;re losing{" "}
                  <span className="font-bold text-[#E92F8E]">₹{lossLakhs}L / year</span> on ₹{toLakhs(receivables, 1)}L AR. Let&apos;s fix it
                  in one call.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-[520px]">
                  {guarantees.map((g) => (
                    <div key={g} className="flex items-center gap-2 text-[13px] font-medium text-[#1A1033]">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A] text-[12px]">✓</span>
                      {g}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <WhatsAppLink
                    href={waUrl}
                    className="inline-flex h-[52px] items-center justify-center rounded-full px-7 text-[14px] font-bold text-white shadow-[0_12px_32px_rgba(233,47,142,0.28)] hover:translate-y-[-1px] transition-transform"
                    style={{ background: BRAND_GRADIENT }}
                  >
                    Book Free Audit on WhatsApp →
                  </WhatsAppLink>
                  <div className="inline-flex h-[52px] items-center rounded-full border border-[#EDE7F7] bg-[#FBF8FF] px-4 text-[13px] font-medium text-[#5F5F76]">
                    <span className="h-2 w-2 rounded-full bg-[#22C55E] mr-2 animate-pulse" />
                    Average reply in 4 minutes
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-[#F1ECFA] bg-[#FBF8FF] p-5 flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                  <Image src={MARK_SRC} alt="JenVeda" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                  <span className="dso-display font-bold text-[#4A1E91] text-[14px]">JenVeda • DSO Audit</span>
                </div>
                <Image
                  src={QR_SRC}
                  alt="Scan QR to audit"
                  width={180}
                  height={180}
                  className="mt-5 w-[180px] h-[180px] rounded-[16px] bg-white border border-[#F1ECFA] p-3 object-contain shadow-[0_8px_24px_rgba(74,30,145,0.08)]"
                />
                <div className="mt-4">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-[#9B8BC7] uppercase">Scan to Calculate on WhatsApp</div>
                  <div className="dso-display mt-1 font-bold text-[18px] text-[#1A1033] tracking-tight">{WHATSAPP_DISPLAY}</div>
                  <div className="mt-1 text-[12px] text-[#8B8BA3] leading-[1.4]">
                    Send your DSO: {dsoDays} days • AR {formatInr(receivables)}
                    <br />
                    We&apos;ll send the 40/40/20 fix in 15 mins
                  </div>
                </div>
                <div className="mt-4 w-full rounded-[12px] bg-white border border-[#F1ECFA] px-3 py-2.5 text-[11px] text-[#5F5F76] leading-[1.5]">
                  No spam. Just your DSO report + audit link.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {proofStats.map((s) => (
              <div key={s.k} className="rounded-[14px] bg-white border border-[#EDE7F7] px-4 py-3 flex items-baseline justify-between">
                <span className="dso-display font-bold text-[#4A1E91] text-[16px]">{s.k}</span>
                <span className="text-[11px] font-semibold tracking-wide text-[#8B8BA3] uppercase">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile WhatsApp FAB — stacked above the site chatbot button (bottom-right) */}
      <WhatsAppLink
        href={waUrl}
        className="lg:hidden fixed right-4 bottom-[88px] z-[45] inline-flex h-[54px] w-[54px] items-center justify-center rounded-full text-white shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
        style={{ background: "linear-gradient(135deg,#4A1E91,#E92F8E)" }}
      >
        <span className="sr-only">Chat on WhatsApp</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M19.5 3.5A10.4 10.4 0 0 0 3.2 17.8L2 22l4.3-1.1A10.4 10.4 0 0 0 19.5 3.5ZM12 20.2a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-2.6.7.7-2.5-.2-.3a8.4 8.4 0 1 1 6.7 3.5Zm4.6-6.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1-.2-.1-1-.4-1.8-1.1-.7-.6-1.1-1.3-1.2-1.5-.1-.2 0-.4.1-.5.1-.1.2-.3.3-.4 0-.1.1-.2 0-.4 0-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.2 1.4 2.2 3.5 3 .5.2.9.3 1.2.4.5.1 1 .1 1.3.1.4 0 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.1-.4-.2Z" />
        </svg>
      </WhatsAppLink>
    </div>
  );
}
