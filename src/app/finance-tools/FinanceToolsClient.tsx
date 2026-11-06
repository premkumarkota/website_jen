"use client";
import { useMemo, useState } from "react";
import {
  FINANCE_TOOLS,
  whatsappToolUrl,
  type ChartUnit,
  type ResultCard,
  type SliderDef,
  type ToolDef,
} from "@/lib/financeTools";
import { WHATSAPP_DISPLAY, formatInrCompact } from "@/lib/dso";

/* ─── brand tokens (match /dso-calculator) ─────────────── */
const BRAND = "linear-gradient(90deg,#4A1E91 0%, #E92F8E 100%)";
const GOOD = "linear-gradient(90deg,#10B981,#34D399)";
const BAD = "linear-gradient(90deg,#DC2626,#E92F8E)";

/* ─── per-tool accent colors for the 5 selector cards ─────
   All 5 carry a soft colored fill; the active one lifts into a stronger
   tint + colored ring + top bar so it's clearly highlighted. Kept light
   on purpose (no heavy dark cards). */
type Accent = {
  bar: string; // solid/gradient used for the icon badge + top strip
  solid: string; // ring + active subtitle
  softBg: string; // resting fill
  softBorder: string; // resting border
  activeBg: string; // active fill
  shadow: string; // active shadow color
  title: string; // active title
  badgeBg: string;
  badgeText: string;
};
const TOOL_ACCENTS: Record<string, Accent> = {
  "cash-stuck": {
    bar: "linear-gradient(135deg,#7C3AED,#6D28D9)", solid: "#6D28D9",
    softBg: "#FAF7FF", softBorder: "#ECE3FB", activeBg: "linear-gradient(135deg,#F1E9FF,#FBF8FF)",
    shadow: "rgba(109,40,217,0.22)", title: "#4A1E91", badgeBg: "#F0E7FF", badgeText: "#6D28D9",
  },
  "profit-leakage": {
    bar: "linear-gradient(135deg,#F2529F,#DB2777)", solid: "#DB2777",
    softBg: "#FFF6FB", softBorder: "#FBD9EC", activeBg: "linear-gradient(135deg,#FFE6F2,#FFF6FB)",
    shadow: "rgba(233,47,142,0.22)", title: "#BE185D", badgeBg: "#FDE7F2", badgeText: "#DB2777",
  },
  "discount-audit": {
    bar: "linear-gradient(135deg,#FB923C,#EA580C)", solid: "#EA580C",
    softBg: "#FFF9F3", softBorder: "#FBE2CC", activeBg: "linear-gradient(135deg,#FFEEDD,#FFF9F3)",
    shadow: "rgba(234,88,12,0.22)", title: "#C2410C", badgeBg: "#FDEBD8", badgeText: "#C2410C",
  },
  "tally-lag": {
    bar: "linear-gradient(135deg,#22B8D9,#0891B2)", solid: "#0891B2",
    softBg: "#F2FCFE", softBorder: "#CDEFF5", activeBg: "linear-gradient(135deg,#DBF5FB,#F2FCFE)",
    shadow: "rgba(8,145,178,0.22)", title: "#0E7490", badgeBg: "#DBF4FA", badgeText: "#0E7490",
  },
  "working-capital": {
    bar: "linear-gradient(135deg,#34D399,#059669)", solid: "#059669",
    softBg: "#F2FDF8", softBorder: "#C8EEDC", activeBg: "linear-gradient(135deg,#D7F7E8,#F2FDF8)",
    shadow: "rgba(5,150,105,0.22)", title: "#047857", badgeBg: "#D6F5E5", badgeText: "#047857",
  },
};
const FALLBACK_ACCENT: Accent = TOOL_ACCENTS["cash-stuck"];

const toneStyles: Record<ResultCard["tone"], { box: string; value: string; label: string; dot: string }> = {
  neutral: { box: "bg-white border-[#ECE7F6]", value: "text-[#1A1033]", label: "text-[#9B8BC7]", dot: "#C4B5FD" },
  bad: { box: "bg-[#FEF2F3] border-[#FBD5D8]", value: "text-[#DC2626]", label: "text-[#B91C1C]", dot: "#F87171" },
  good: { box: "bg-[#ECFDF5] border-[#A7F3D0]", value: "text-[#059669]", label: "text-[#047857]", dot: "#34D399" },
  brand: { box: "bg-[#FBF2FF] border-[#ECD2F7]", value: "text-[#6D28D9]", label: "text-[#9333EA]", dot: "#C026D3" },
};

/* ─── chart value formatting ───────────────────────────── */
const chartLabel = (unit: ChartUnit, v: number) =>
  unit === "hours" ? (v < 1 ? "<1h" : `${v}h`) : formatInrCompact(v);

/* ═══════════════════ small pieces ═══════════════════ */
function Gauge({ pct, label, sub, danger }: { pct: number; label: string; sub: string; danger: boolean }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative flex flex-col items-center">
      {/* soft glow behind the ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-[52px] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
        style={{ background: danger ? "rgba(220,38,38,0.28)" : "rgba(233,47,142,0.22)" }}
      />
      <div className="relative h-[148px] w-[148px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="gaugeBrand" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4A1E91" />
              <stop offset="100%" stopColor="#E92F8E" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r={r} fill="none" stroke="#F1ECFA" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={danger ? "#DC2626" : "url(#gaugeBrand)"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.16,1,.3,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span key={label} className="fin-pop text-[20px] font-bold tracking-tight text-[#1A1033]">{label}</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8B8BA3]">{sub}</span>
        </div>
      </div>
    </div>
  );
}

function BarChart({ bars, unit }: { bars: { name: string; value: number; highlight?: boolean }[]; unit: ChartUnit }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  const hasHighlight = bars.some((b) => b.highlight);
  return (
    <div className="space-y-3.5">
      {bars.map((b) => {
        const fill = b.highlight ? GOOD : hasHighlight ? BAD : BRAND;
        return (
          <div key={b.name}>
            <div className="mb-1.5 flex justify-between text-[11px] font-medium">
              <span className="flex items-center gap-1.5 text-[#5F5F76]">
                {b.highlight && (
                  <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#D1FAE5] text-[#059669]">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                )}
                {b.name}
              </span>
              <span className="font-bold text-[#1A1033]">{chartLabel(unit, b.value)}</span>
            </div>
            <div className="h-[13px] w-full overflow-hidden rounded-full bg-[#F1ECFA]">
              <div
                className="fin-bar-fill h-full rounded-full shadow-sm transition-all duration-500"
                style={{ width: `${Math.max(4, (b.value / max) * 100)}%`, background: fill }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Indian-grouped number for the field after commit (50,00,000 / 12.5 / 1.2). */
const fmtNum = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 3 });

function RangeSlider({ def, value, onChange }: { def: SliderDef; value: number; onChange: (v: number) => void }) {
  // Empty field shows the "Enter <label>" placeholder (no pre-filled count).
  // Typing drives the slider live; on blur the box normalises to the committed number.
  const [text, setText] = useState("");

  const parse = (raw: string): number | null => {
    const cleaned = raw.replace(/,/g, "").trim();
    if (cleaned === "") return null;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  };
  const clamp = (n: number) => Math.min(def.max, Math.max(def.min, n));

  const onType = (raw: string) => {
    setText(raw);
    const n = parse(raw);
    if (n !== null) onChange(clamp(n)); // live: moving the drag with every keystroke
  };

  const commit = (raw: string) => {
    const n = parse(raw);
    if (n === null) {
      setText(""); // invalid/empty → fall back to the label placeholder
      return;
    }
    const c = clamp(n);
    onChange(c);
    setText(fmtNum(c)); // keep the box in sync with the slider
  };

  // filled portion of the track (brand gradient up to the thumb, soft track after)
  const pct = Math.min(100, Math.max(0, ((value - def.min) / (def.max - def.min)) * 100));
  const trackFill = `linear-gradient(90deg,#4A1E91 0%, #E92F8E ${pct}%, #EDE6F7 ${pct}%, #EDE6F7 100%)`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[12px] font-semibold text-[#5F5F76]">{def.label}</label>
        <span
          key={def.fmt(value)}
          className="fin-pop rounded-full bg-[#F4ECFF] px-2.5 py-[3px] text-[12px] font-extrabold text-[#6D28D9]"
        >
          {def.fmt(value)}
        </span>
      </div>
      <input
        type="text"
        inputMode="decimal"
        value={text}
        placeholder={`Enter ${def.label}`}
        onChange={(e) => onType(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        className="mb-3 w-full rounded-[12px] border border-[#ECD9F7] bg-[#FBF5FF] px-4 py-2.5 text-[13px] font-semibold text-[#6D28D9] outline-none transition placeholder:font-medium placeholder:text-[#8B76B8] focus:border-[#E92F8E] focus:bg-white focus:ring-2 focus:ring-[#E92F8E]/20"
        aria-label={def.label}
      />
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="fin-range"
        style={{ background: trackFill }}
        aria-label={def.label}
      />
      <div className="mt-1.5 flex items-center justify-between text-[10px] font-medium text-[#B9B2CE]">
        <span>{def.fmt(def.min)}</span>
        <span>{def.fmt(def.max)}</span>
      </div>
    </div>
  );
}

/* ═══════════════════ active tool ═══════════════════ */
function ToolPanel({ tool }: { tool: ToolDef }) {
  const [state, setState] = useState<Record<string, number>>(() => ({ ...tool.defaults }));
  const result = useMemo(() => tool.compute(state), [tool, state]);
  const waUrl = whatsappToolUrl(`${tool.short} Calculator`, result.summary);

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      {/* LEFT — inputs + mapping */}
      <div className="space-y-5">
        <div className="rounded-[20px] border border-[#F1ECFA] bg-white p-5 shadow-[0_8px_30px_rgba(74,30,145,0.05)]">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6D28D9]">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-[#F0E7FF]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
            </span>
            Pain Inputs — Your Reality Today
          </div>
          <div className="space-y-5">
            {tool.sliders.map((def) => (
              <RangeSlider
                key={def.key}
                def={def}
                value={state[def.key]}
                onChange={(v) => setState((s) => ({ ...s, [def.key]: v }))}
              />
            ))}
          </div>
          <div className="mt-5 flex gap-2 rounded-[12px] border border-[#FFD8B8] bg-[#FFF4EC] p-3 text-[11.5px] leading-snug text-[#7A3A0A]">
            <span aria-hidden>⚠</span>
            <span>{result.note}</span>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#E7DEFB] bg-gradient-to-br from-[#FBF7FF] to-[#F2FBF5] p-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#6D28D9]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#6D28D9] text-[10px] text-white">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            Jenveda Fix
          </div>
          <div className="mt-3.5 space-y-2.5 text-[12.5px] leading-snug">
            {result.fixes.map((f) => (
              <div key={f.k} className="flex gap-2.5">
                <span className="mt-[1px] grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-full bg-[#DCFCE7] text-[#059669]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <span>
                  <b className="text-[#1A1033]">{f.k}:</b> <span className="text-[#5F5F76]">{f.v}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — impact */}
      <div className="space-y-5">
        <div className="rounded-[20px] border border-[#F1ECFA] bg-white p-5 shadow-[0_8px_30px_rgba(74,30,145,0.05)] sm:p-6">
          {/* impact reveal band */}
          <div className="relative overflow-hidden rounded-[18px] border border-[#F0E3FA] bg-gradient-to-br from-[#FBF4FF] via-white to-[#FFF3F9] p-5 sm:p-6">
            <div
              className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle,#F6B6DC,transparent 70%)" }}
            />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#E92F8E] shadow-sm ring-1 ring-[#F6D6E8]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E92F8E]" />
                  {tool.short} Impact
                </div>
                <h3
                  key={result.headline.value}
                  className="fin-pop mt-2 text-[36px] font-extrabold leading-none tracking-tight sm:text-[44px]"
                  style={{ background: BRAND, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {result.headline.value}
                </h3>
                <div className="mt-2 text-[13px] font-medium text-[#8B8BA3]">{result.headline.caption}</div>
              </div>
              <Gauge {...result.gauge} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {result.cards.map((card) => {
              const t = toneStyles[card.tone];
              return (
                <div key={card.label} className={`rounded-[14px] border p-4 transition-transform duration-200 hover:-translate-y-0.5 ${t.box}`}>
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${t.label}`}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.dot }} />
                    {card.label}
                  </div>
                  <div key={card.value} className={`fin-pop mt-1.5 text-[16px] font-bold ${t.value}`}>{card.value}</div>
                  {card.sub && <div className="mt-0.5 text-[11px] text-[#8B8BA3]">{card.sub}</div>}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <BarChart bars={result.chart.bars} unit={result.chart.unit} />
          </div>
        </div>

        {/* comparison table */}
        <div className="overflow-hidden rounded-[20px] border border-[#F1ECFA]">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#FBF8FF] p-3 text-[11px] font-bold uppercase tracking-widest text-[#8B8BA3]">
            <span>{result.table.headers[0]}</span>
            <span>{result.table.headers[1]}</span>
            <span className="text-[#6D28D9]">{result.table.headers[2]}</span>
          </div>
          {result.table.rows.map((row) => (
            <div key={row[0]} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[#F1ECFA] bg-white p-3 text-[13px] transition-colors last:border-0 hover:bg-[#FCFAFF]">
              <span className="font-medium text-[#1A1033]">{row[0]}</span>
              <span className="text-[#8B8BA3]">{row[1]}</span>
              <span className="font-bold text-[#6D28D9]">{row[2]}</span>
            </div>
          ))}
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fin-cta flex h-[54px] w-full items-center justify-between gap-2 rounded-full px-6 text-[14px] font-bold text-white shadow-[0_12px_32px_rgba(233,47,142,0.28)] transition-all hover:translate-y-[-1px] hover:shadow-[0_16px_40px_rgba(233,47,142,0.36)]"
          style={{ background: BRAND }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">↗</span>
            Get Your Detailed Finance Audit on WhatsApp
          </span>
          <span aria-hidden className="relative z-10">→</span>
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════ page ═══════════════════ */
export default function FinanceToolsClient() {
  const [activeId, setActiveId] = useState(FINANCE_TOOLS[0].id);
  const active = FINANCE_TOOLS.find((t) => t.id === activeId) ?? FINANCE_TOOLS[0];
  const activeIndex = FINANCE_TOOLS.findIndex((t) => t.id === active.id);

  return (
    <div className="fin-tools overflow-hidden bg-white text-[#5F5F76] antialiased selection:bg-[#E92F8E]/20">
      {/* floating hero glows */}
      <div className="fin-blob" style={{ top: 40, left: -80, width: 360, height: 360, background: "rgba(139,92,246,0.22)" }} />
      <div className="fin-blob" style={{ top: 120, right: -60, width: 320, height: 320, background: "rgba(233,47,142,0.16)", animationDelay: "-5s" }} />

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 pb-20 pt-[112px] lg:px-6 lg:pt-[128px]">
        {/* hero */}
        <div className="fin-rise inline-flex items-center gap-2 rounded-full border border-[#F3D6E6] bg-[#FFF0F7] px-3.5 py-[6px]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#E92F8E]" />
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#E92F8E]">5 FREE TOOLS • LIVE MATH</span>
        </div>
        <h1 className="fin-rise mt-6 max-w-[760px] text-[34px] font-bold leading-[1.02] tracking-[-0.03em] text-[#4A1E91] sm:text-[42px] lg:text-[48px]">
          Find the hidden cash your finance ignores
        </h1>
        <p className="fin-rise mt-4 max-w-[600px] text-[17px] leading-[1.6] text-[#5F5F76]">
          Five quick calculators expose a hidden cost — cash stuck in DSO, margin leakage, discount abuse, Tally lag and
          working-capital risk — then show how Jenveda&apos;s Tally API, WhatsApp, Role-based controls &amp; Cloud fix it.
          Real-time, no sign-up.
        </p>

        {/* tab selector */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {FINANCE_TOOLS.map((t) => {
            const on = t.id === active.id;
            const a = TOOL_ACCENTS[t.id] ?? FALLBACK_ACCENT;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className="group relative overflow-hidden rounded-[16px] border p-3.5 text-left transition-all duration-200 hover:-translate-y-[2px]"
                style={{
                  borderColor: on ? a.solid : a.softBorder,
                  background: on ? a.activeBg : a.softBg,
                  boxShadow: on ? `0 12px 26px ${a.shadow}` : "none",
                  transform: on ? "translateY(-2px)" : undefined,
                }}
              >
                {/* top accent strip — only on the active card */}
                <span
                  className="absolute inset-x-0 top-0 h-[3px] transition-opacity"
                  style={{ background: a.bar, opacity: on ? 1 : 0 }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full text-[14px] font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-110"
                    style={{ background: a.bar, transform: on ? "scale(1.08)" : undefined }}
                  >
                    {t.icon}
                  </span>
                  <span
                    className="rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em]"
                    style={{ background: a.badgeBg, color: a.badgeText }}
                  >
                    {t.pain}
                  </span>
                </div>
                <div
                  className="mt-3 text-[13px] font-bold leading-tight tracking-tight"
                  style={{ color: on ? a.title : "#1A1033" }}
                >
                  {t.short}
                </div>
                <div className="text-[11px]" style={{ color: on ? a.solid : "#8B8BA3" }}>
                  {t.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* active tool */}
        <div className="mt-8 rounded-[24px] border border-[#F1ECFA] bg-[#FDFCFF] p-4 shadow-[0_8px_32px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold text-white shadow-sm" style={{ background: BRAND }}>
              {activeIndex + 1}
            </div>
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#6D28D9]">
                Tool {activeIndex + 1} of 5 — {active.short}
              </div>
              <div className="-mt-0.5 text-[14px] font-semibold tracking-tight text-[#1A1033]">
                {active.title} — {active.blurb}
              </div>
            </div>
          </div>
          {/* key remounts the panel per tool so its input state re-initialises from that tool's defaults */}
          <ToolPanel key={active.id} tool={active} />
        </div>

        {/* footer strip */}
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { t: "Why this works", d: "Pain is quantified in ₹, not theory. A founder who sees ₹4.2L/month burning acts — action beats a brochure." },
            { t: "Jenveda core mapping", d: "Tally API = source of truth • WhatsApp = collection • Role-based = control • Audit = trust • Cloud = bank-ready." },
            { t: "What happens next", d: `Tap the WhatsApp button and your numbers reach our team on ${WHATSAPP_DISPLAY}. We send back a detailed, real audit — no spam.` },
          ].map((c) => (
            <div key={c.t} className="rounded-[16px] border border-[#F1ECFA] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ECD9F7] hover:shadow-[0_10px_30px_rgba(109,40,217,0.06)]">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#6D28D9]">{c.t}</div>
              <div className="mt-2 text-[12.5px] leading-snug text-[#5F5F76]">{c.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
