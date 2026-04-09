"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const painPoints = [
  {
    stat: "73%",
    label: "of Indian MSMEs still run payroll manually",
    desc: "3–5 hours every month recalculating salaries, handling deductions, and hoping the numbers are right. One wrong formula costs more than the software ever would.",
    accentColor: "#DC2626",
    accentBg: "rgba(220,38,38,0.06)",
    accentBorder: "rgba(220,38,38,0.14)",
  },
  {
    stat: "4×",
    label: "more time lost to approval delays",
    desc: "Leave goes to a manager's WhatsApp. Expense claims sit in email. By the time someone acts, the employee is frustrated — and your data is already wrong.",
    accentColor: "#D97706",
    accentBg: "rgba(217,119,6,0.06)",
    accentBorder: "rgba(217,119,6,0.14)",
  },
  {
    stat: "₹0",
    label: "data-backed decisions made in real time",
    desc: "Most owners find out about last month's payroll cost during this month's review. Decisions made on stale data aren't decisions — they're guesses.",
    accentColor: "#0284C7",
    accentBg: "rgba(2,132,199,0.06)",
    accentBorder: "rgba(2,132,199,0.14)",
  },
];

const pillars = [
  {
    num: "01",
    title: "Policies configured once. Enforced always.",
    desc: "Define leave rules, salary structures, attendance policies, and approval hierarchies once. JenVeda enforces them automatically — no manual checking, no exceptions slipping through.",
    chips: ["Rule-based payroll deductions", "Auto leave balance tracking", "Approval chain enforcement", "Configurable salary components"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Every module. One login. Zero duplication.",
    desc: "HR, Payroll, Accounts, Inventory, and Projects all connected. Data entered once flows everywhere — no re-entering, no reconciliation, no version conflicts between departments.",
    chips: ["HR + Payroll unified", "GST-ready accounting", "Inventory with stock alerts", "Project cost tracking"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Built for how Indian businesses actually work.",
    desc: "Indian MSMEs don't run like Western enterprises. JenVeda is purpose-built for multi-branch teams, owner-led approvals, and full Indian payroll compliance — PF, ESI, TDS, GST.",
    chips: ["Indian payroll compliance", "GST & TDS filing-ready", "Multi-branch hierarchy", "Owner-controlled access"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Live data for every decision.",
    desc: "No waiting for month-end reports. Payroll costs, attendance, pending approvals, stock levels, and invoice status are available the moment you need them — on any device.",
    chips: ["Real-time dashboards", "Role-based access", "Mobile-first attendance", "Automated reports"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const comparisonRows = [
  { feature: "Payroll processing", bad: "Manual Excel, error-prone", good: "Automated, rule-based, error-free" },
  { feature: "Leave management", bad: "WhatsApp & paper registers", good: "Policy-enforced digital workflows" },
  { feature: "Multi-branch visibility", bad: "Phone calls & follow-up emails", good: "Live dashboard across all branches" },
  { feature: "GST compliance", bad: "CA rework every quarter", good: "GST-ready invoicing, built-in" },
  { feature: "Approvals", bad: "Lost in chat threads", good: "Defined chain, tracked & audited" },
  { feature: "Source of truth", bad: "5 spreadsheets, 3 inboxes", good: "One system, one login" },
  { feature: "Onboarding time", bad: "Weeks of training & setup", good: "Operational within days" },
  { feature: "Reporting", bad: "Manual compilation at month-end", good: "Instant, on-demand reports" },
];

const stats = [
  { value: "3×", label: "Faster payroll runs", sub: "vs manual calculation" },
  { value: "50+", label: "Businesses trust JenVeda", sub: "across India" },
  { value: "99.9%", label: "Guaranteed uptime SLA", sub: "always on, always reliable" },
  { value: "1 day", label: "Average onboarding", sub: "from signup to live" },
];

/* ─────────────────────────────────────────
   PILLAR CARD
───────────────────────────────────────── */
function PillarCard({ p, i }: { p: typeof pillars[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group p-8 rounded-2xl bg-white border border-slate-100 overflow-hidden cursor-default"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
    >
      {/* Top accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ background: "var(--gradient-1)" }}
      />

      {/* Number + Icon row */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-[11px] font-black tracking-[0.22em] text-slate-300 uppercase">{p.num}</span>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-violet-600 transition-colors duration-200"
          style={{ background: "rgba(109,40,217,0.06)", border: "1px solid rgba(109,40,217,0.1)" }}
        >
          {p.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[22px] font-black tracking-tight text-black leading-snug mb-3">
        {p.title}
      </h3>

      {/* Description */}
      <p className="text-[17px] leading-relaxed font-medium text-black mb-6">{p.desc}</p>

      {/* Chips */}
      <div className="flex flex-wrap gap-2.5">
        {p.chips.map(chip => (
          <span
            key={chip}
            className="inline-flex items-center gap-1.5 text-[14.5px] font-bold px-4 py-1.5 rounded-full"
            style={{ background: "rgba(109,40,217,0.06)", color: "#5B21B6", border: "1px solid rgba(109,40,217,0.12)" }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="#6D28D9" fillOpacity="0.5" />
            </svg>
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function WhyJenVedaClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const cmpRef = useRef(null);
  const cmpInView = useInView(cmpRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-white min-h-screen">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-36 pb-24 px-6"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[10%] w-[560px] h-[560px] rounded-full opacity-[0.055]"
            style={{ background: "radial-gradient(circle, #6D28D9 0%, transparent 70%)", filter: "blur(100px)" }}
          />
          <div className="absolute right-[5%] bottom-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #D1008F 0%, transparent 70%)", filter: "blur(90px)" }}
          />
          <div className="absolute inset-0 opacity-[0.022]"
            style={{ backgroundImage: "radial-gradient(rgba(109,40,217,0.6) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
              style={{ background: "rgba(109,40,217,0.07)", border: "1px solid rgba(109,40,217,0.15)" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full flex-shrink-0"
                style={{ background: "var(--gradient-1)" }}
              />
              <span className="gradient-text">Why JenVeda</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="text-fluid-h1 font-black tracking-tight text-slate-900"
          >
            Built to Drive Decisions.
            <br />
            <span className="gradient-text"> Not Just Display Data.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mt-7 text-[20px] font-medium leading-relaxed text-black max-w-2xl mx-auto"
          >
            JenVeda helps you instantly understand what improves after you switch
            — faster execution, better governance, and zero operational confusion.
          </motion.p>

          {/* Mini trust row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[14.5px] font-bold text-slate-400"
          >
            {["Trusted by 50+ Indian businesses", "GST & Compliance ready", "Setup in  a day"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="#6D28D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          PROBLEM — white section
      ══════════════════════════════ */}
      <section className="px-6 py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-14"
          >
            <p className="text-[11px] font-black tracking-[0.22em] uppercase text-slate-400 mb-4">The reality check</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              The hidden cost of <span className="gradient-text">staying manual</span>
            </h2>
            <p className="mt-4 text-[20px] font-medium text-black max-w-xl mx-auto leading-relaxed">
              Every month without the right system is a month of wasted hours,
              compounding errors, and decisions made too late.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.stat}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-8 rounded-2xl overflow-hidden"
                style={{ background: p.accentBg, border: `1px solid ${p.accentBorder}`, boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${p.accentColor}, transparent)` }}
                />
                <div
                  className="text-[3.5rem] font-black tracking-tight leading-none mb-3"
                  style={{ color: p.accentColor }}
                >
                  {p.stat}
                </div>
                <p className="text-[17.5px] font-extrabold text-black mb-3 leading-snug">{p.label}</p>
                <p className="text-[16px] font-medium leading-relaxed text-black/80">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PILLARS — the JenVeda way
      ══════════════════════════════ */}
      <section className="px-6 py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-14"
          >
            <span className="tag-pill mb-5 inline-block">The JenVeda Difference</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Four principles that make<br className="hidden md:block" />
                <span className="gradient-text"> JenVeda different.</span>
              </h2>
              <p className="text-[18px] text-black font-medium max-w-sm leading-relaxed md:text-right">
                Not just another ERP. A system designed to remove every friction point in how  businesses operate.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <PillarCard key={p.num} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════ */}
      <section ref={cmpRef} className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={cmpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-14"
          >
            <span className="tag-pill mb-5 inline-block">Side by side</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              JenVeda vs <span className="gradient-text">the old way</span>
            </h2>
            <p className="mt-4 text-[19px] text-black font-medium max-w-lg mx-auto">
              See exactly what changes when you move from scattered tools to a single connected platform.
            </p>
          </motion.div>

          {/* Table header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={cmpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="grid grid-cols-[1fr_1fr_1fr] gap-3 mb-3 px-4"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">What you're managing</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-400">Without JenVeda</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-500">With JenVeda</p>
            </div>
          </motion.div>

          {/* Rows */}
          <div className="flex flex-col gap-2">
            {comparisonRows.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -12 }}
                animate={cmpInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.05, ease }}
                className="grid grid-cols-[1fr_1fr_1fr] gap-3 items-center px-4 py-4 rounded-xl hover:bg-slate-50 transition-colors duration-150"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                {/* Feature label */}
                <p className="text-[16px] font-bold text-black">{row.feature}</p>

                {/* Traditional — bad */}
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[15.5px] font-medium text-black/60">{row.bad}</span>
                </div>

                {/* JenVeda — good */}
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M1.5 4.5l3 3 5-5.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[15.5px] font-bold text-black">{row.good}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          STATS — dark
      ══════════════════════════════ */}
      <section
        ref={statsRef}
        className="px-6 py-20 mx-6 mb-6 rounded-3xl border border-slate-100"
        style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 60%, #F0FDF4 100%)", boxShadow: "0 4px 32px rgba(109,40,217,0.06)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-center text-[11px] font-black uppercase tracking-[0.22em] text-slate-400 mb-14"
          >
            The difference in numbers
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09, ease }}
                className="flex flex-col items-center text-center"
              >
                <span className="text-[3.2rem] md:text-[3.6rem] font-black tracking-tight leading-none mb-3 gradient-text">
                  {s.value}
                </span>
                <p className="text-[17.5px] font-black text-black mb-1">{s.label}</p>
                <p className="text-[15px] font-bold text-slate-900">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="px-6 pt-16 pb-28">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center"
            style={{
              background: "linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 100%)",
              border: "1px solid rgba(109,40,217,0.12)",
              boxShadow: "0 16px 60px rgba(109,40,217,0.08)",
            }}
          >
            {/* Decorative gradient orb */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full opacity-[0.12] pointer-events-none"
              style={{ background: "radial-gradient(circle, #6D28D9 0%, transparent 70%)", filter: "blur(60px)" }}
            />

            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-400 mb-5">
              Ready to make the switch?
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              See JenVeda in action.{" "}
              <span className="gradient-text">In 30 minutes.</span>
            </h2>
            <p className="text-[16px] leading-relaxed text-slate-500 mb-9 max-w-md mx-auto">
              Book a free demo. We'll walk through your exact workflow and show you what changes — live, no slides.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #6D28D9, #4F46E5)",
                  boxShadow: "0 4px 24px rgba(109,40,217,0.35)",
                }}
              >
                Book a Free Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/industries"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-700 hover:border-violet-200 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200"
              >
                See Industries We Serve
              </Link>
            </div>
            <p className="mt-5 text-[12.5px] text-slate-400">
              No credit card · No obligation · Setup in under a day
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
