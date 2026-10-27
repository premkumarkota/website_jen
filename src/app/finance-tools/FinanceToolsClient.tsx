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
const GOOD = "linear-gradient(90deg,#4A1E91,#8B5CF6)";
const BAD = "linear-gradient(90deg,#DC2626,#E92F8E)";

const toneStyles: Record<ResultCard["tone"], { box: string; value: string; label: string }> = {
  neutral: { box: "bg-white border-[#F1ECFA]", value: "text-[#1A1033]", label: "text-[#9B8BC7]" },
  bad: { box: "bg-[#FEF2F2] border-[#FECACA]", value: "text-[#DC2626]", label: "text-[#B91C1C]" },
  good: { box: "bg-[#ECFDF5] border-[#A7F3D0]", value: "text-[#059669]", label: "text-[#047857]" },
  brand: { box: "bg-[#FBF5FF] border-[#ECD9F7]", value: "text-[#6D28D9]", label: "text-[#7C3AED]" },
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
    <div className="flex flex-col items-center">
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
          <span className="text-[20px] font-bold tracking-tight text-[#1A1033]">{label}</span>
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
    <div className="space-y-3">
      {bars.map((b) => {
        const fill = b.highlight ? GOOD : hasHighlight ? BAD : BRAND;
        return (
          <div key={b.name}>
            <div className="mb-1 flex justify-between text-[11px] font-medium">
              <span className="text-[#5F5F76]">{b.name}</span>
              <span className="font-semibold text-[#1A1033]">{chartLabel(unit, b.value)}</span>
            </div>
            <div className="h-[12px] w-full overflow-hidden rounded-full bg-[#F1ECFA]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(4, (b.value / max) * 100)}%`, background: fill }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RangeSlider({ def, value, onChange }: { def: SliderDef; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-[#1A1033]">{def.label}</span>
        <span className="rounded-full border border-[#ECD9F7] bg-[#FBF5FF] px-2.5 py-1 text-[12.5px] font-bold text-[#6D28D9]">
          {def.fmt(value)}
        </span>
      </div>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#E92F8E]"
        aria-label={def.label}
      />
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
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6D28D9]">
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
          <div className="mt-5 rounded-[12px] border border-[#FFD8B8] bg-[#FFF4EC] p-3 text-[11.5px] leading-snug text-[#7A3A0A]">
            ⚠ {result.note}
          </div>
        </div>

        <div className="rounded-[20px] bg-[#1A1033] p-5 text-white">
          <div className="text-[11px] font-bold uppercase tracking-widest text-white/55">Jenveda Fix</div>
          <div className="mt-3 space-y-2.5 text-[12.5px] leading-snug">
            {result.fixes.map((f) => (
              <div key={f.k} className="flex gap-2">
                <span className="mt-[2px] text-[#E92F8E]">●</span>
                <span>
                  <b className="text-white">{f.k}:</b> <span className="text-white/75">{f.v}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — impact */}
      <div className="space-y-5">
        <div className="rounded-[20px] border border-[#F1ECFA] bg-white p-5 shadow-[0_8px_30px_rgba(74,30,145,0.05)] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#E92F8E]">{tool.short} Impact</div>
              <h3
                className="mt-1 text-[30px] font-extrabold tracking-tight"
                style={{ background: BRAND, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {result.headline.value}
              </h3>
              <div className="mt-1 text-[13px] text-[#8B8BA3]">{result.headline.caption}</div>
            </div>
            <Gauge {...result.gauge} />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {result.cards.map((card) => {
              const t = toneStyles[card.tone];
              return (
                <div key={card.label} className={`rounded-[14px] border p-4 ${t.box}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${t.label}`}>{card.label}</div>
                  <div className={`mt-1 text-[16px] font-bold ${t.value}`}>{card.value}</div>
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
            <div key={row[0]} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[#F1ECFA] p-3 text-[13px] last:border-0">
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
          className="flex h-[54px] w-full items-center justify-between gap-2 rounded-full px-6 text-[14px] font-bold text-white shadow-[0_12px_32px_rgba(233,47,142,0.28)] transition-all hover:translate-y-[-1px]"
          style={{ background: BRAND }}
        >
          <span className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">↗</span>
            Get Your Detailed Finance Audit on WhatsApp
          </span>
          <span aria-hidden>→</span>
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
    <div className="bg-white text-[#5F5F76] antialiased selection:bg-[#E92F8E]/20">
      <section className="mx-auto max-w-[1200px] px-5 pb-20 pt-[112px] lg:px-6 lg:pt-[128px]">
        {/* hero */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F3D6E6] bg-[#FFF0F7] px-3.5 py-[6px]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#E92F8E]" />
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#E92F8E]">5 FREE TOOLS • LIVE MATH</span>
        </div>
        <h1 className="mt-6 max-w-[760px] text-[34px] font-bold leading-[1.02] tracking-[-0.03em] text-[#4A1E91] sm:text-[42px] lg:text-[48px]">
          Find the hidden cash your finance ignores
        </h1>
        <p className="mt-4 max-w-[600px] text-[17px] leading-[1.6] text-[#5F5F76]">
          Five quick calculators expose a hidden cost — cash stuck in DSO, margin leakage, discount abuse, Tally lag and
          working-capital risk — then show how Jenveda&apos;s Tally API, WhatsApp, Role-based controls &amp; Cloud fix it.
          Real-time, no sign-up.
        </p>

        {/* tab selector */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {FINANCE_TOOLS.map((t) => {
            const on = t.id === active.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`rounded-[16px] border p-3.5 text-left transition-all ${
                  on
                    ? "border-transparent text-white shadow-[0_12px_28px_rgba(74,30,145,0.22)]"
                    : "border-[#F1ECFA] bg-white hover:border-[#E92F8E]/30 hover:shadow-sm"
                }`}
                style={on ? { background: BRAND } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full text-[13px] font-bold ${
                      on ? "bg-white/20 text-white" : "border border-[#F1ECFA] bg-[#FBF8FF] text-[#4A1E91]"
                    }`}
                  >
                    {t.icon}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] ${
                      on ? "bg-white/20 text-white" : "border border-[#FFD8B8] bg-[#FFF1E6] text-[#9A4A00]"
                    }`}
                  >
                    {t.pain}
                  </span>
                </div>
                <div className={`mt-3 text-[13px] font-bold leading-tight tracking-tight ${on ? "text-white" : "text-[#1A1033]"}`}>
                  {t.short}
                </div>
                <div className={`text-[11px] ${on ? "text-white/70" : "text-[#8B8BA3]"}`}>{t.title}</div>
              </button>
            );
          })}
        </div>

        {/* active tool */}
        <div className="mt-8 rounded-[24px] border border-[#F1ECFA] bg-[#FDFCFF] p-4 shadow-[0_8px_32px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: BRAND }}>
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
            <div key={c.t} className="rounded-[16px] border border-[#F1ECFA] bg-white p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#6D28D9]">{c.t}</div>
              <div className="mt-2 text-[12.5px] leading-snug text-[#5F5F76]">{c.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
