"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────
   INDUSTRY DATA
───────────────────────────────────────── */
const industries = [
  {
    id: "auto",
    label: "Automobile Dealerships",
    shortLabel: "Auto Dealerships",
    color: "#7C3AED",
    lightBg: "#F5F3FF",
    borderColor: "rgba(124,58,237,0.2)",
    tagline: "One system for every branch. Every team. Every approval.",
    headline: "Stop managing 5 branches with 5 different WhatsApp groups.",
    headlineParts: [
      { text: "Stop managing 5 branches ", highlight: false },
      { text: "with 5 different WhatsApp groups.", highlight: true },
    ],
    subtext:
      "When your showroom staff, service center, and back-office all work from the same system — approvals happen in hours, not days. And you always know who's in, who's out, and what's pending.",
    painPoints: [
      "Leave requests go through managers on WhatsApp — nothing is tracked",
      "Payroll is different across branches — finance scrambles every month",
      "No visibility on who's actually on the floor on a given day",
      "Expense approvals pile up because no one has a clear process",
    ],
    outcomes: [
      {
        icon: "🏢",
        title: "Branch-wise HR & Payroll",
        desc: "Each location runs on the same process. Payroll is consolidated at the top, split cleanly by branch.",
      },
      {
        icon: "✅",
        title: "Centralized Approval Workflows",
        desc: "Leave, expenses, and advances follow a defined path — no approvals lost in chat threads.",
      },
      {
        icon: "📍",
        title: "Live Attendance Across Locations",
        desc: "Managers see real-time headcount per branch. Mobile check-in means no manual registers.",
      },
      {
        icon: "📊",
        title: "Unified Reporting for Owners",
        desc: "One dashboard. All branches. Know your payroll cost, headcount, and pending tasks without calling anyone.",
      },
    ],
    proof: "Lakshmi Toyota, a multi-location dealership, runs attendance and payroll across branches on JenVeda.",
  },
  {
    id: "sme",
    label: "SMEs & MSMEs",
    shortLabel: "SMEs & MSMEs",
    color: "#059669",
    lightBg: "#ECFDF5",
    borderColor: "rgba(5,150,105,0.2)",
    tagline: "Structure your business. Without the enterprise price tag.",
    headline: "You shouldn't need a consultant to know if payroll went out correctly.",
    headlineParts: [
      { text: "You shouldn't need a consultant to know if ", highlight: false },
      { text: "payroll went out correctly.", highlight: true },
    ],
    subtext:
      "Most small businesses outgrow spreadsheets before they find the right software. JenVeda gives you the controls and visibility of a large company — at a cost that makes sense for a growing one.",
    painPoints: [
      "Salary calculations done manually every month — errors slip through",
      "No proper record of who took leave or when — disputes arise",
      "GST invoices created in Excel — filing becomes stressful",
      "Owner is the approver for everything — business stalls when you're busy",
    ],
    outcomes: [
      {
        icon: "💰",
        title: "Payroll Without Monthly Stress",
        desc: "Configure salary structures once. Every month, run payroll in minutes. Payslips go out automatically.",
      },
      {
        icon: "📋",
        title: "Processes That Run Without You",
        desc: "Leave approvals, expense claims, attendance — your team follows a defined workflow. You just oversee.",
      },
      {
        icon: "🧾",
        title: "GST-Ready Accounting",
        desc: "Raise invoices, track purchases, and generate reports that your CA can actually use — without re-entering anything.",
      },
      {
        icon: "📈",
        title: "Reports When You Need Them",
        desc: "P&L, receivables, payroll cost — available instantly. Make decisions with real data, not gut feel.",
      },
    ],
    proof: "3T Infotech and MVR Constructions run their HR and accounting on JenVeda — without a dedicated finance team.",
  },
  {
    id: "education",
    label: "Education",
    shortLabel: "Education",
    color: "#0284C7",
    lightBg: "#F0F9FF",
    borderColor: "rgba(2,132,199,0.2)",
    tagline: "Staff administration that actually supports how schools work.",
    headline: "Your teaching staff and admin staff have different rules. Your HR system should too.",
    headlineParts: [
      { text: "Your teaching staff and admin staff have different rules. ", highlight: false },
      { text: "Your HR system should too.", highlight: true },
    ],
    subtext:
      "Educational institutions run on consistency — the same salary going out on the same date, the right staff available during exam season, leave policies that are fair and visible to everyone. JenVeda is built to handle all of it without manual intervention.",
    painPoints: [
      "Teaching and non-teaching staff have different leave and pay structures",
      "Attendance during exam season needs careful control — no easy way to manage it",
      "Salary with DA, TA, HRA components is calculated manually every month",
      "Staff policies exist on paper but no one follows a consistent process",
    ],
    outcomes: [
      {
        icon: "👩‍🏫",
        title: "Separate Staff Configurations",
        desc: "Teaching, non-teaching, and contract staff each have their own leave types, payroll structure, and policies.",
      },
      {
        icon: "📅",
        title: "Leave Control During Critical Periods",
        desc: "Block leave requests during exams or peak periods. Managers approve based on availability — no conflicts.",
      },
      {
        icon: "💼",
        title: "Structured Payroll with All Components",
        desc: "Basic, DA, TA, HRA, PF — configured once. Salary runs on time, every month, without manual calculation.",
      },
      {
        icon: "📢",
        title: "Policy Visibility for All Staff",
        desc: "Every employee can see their leave balance, payslip, and entitlements. No more HR queries for basic information.",
      },
    ],
    proof: "Mallareddy group runs staff HR and payroll across multiple institutions on JenVeda.",
  },
  {
    id: "enterprise",
    label: "Multi-branch Enterprises",
    shortLabel: "Enterprises",
    color: "#D97706",
    lightBg: "#FFFBEB",
    borderColor: "rgba(217,119,6,0.2)",
    tagline: "Headquarters sees everything. Branches stay in their lane.",
    headline: "If every branch runs differently, you don't have a company — you have five small businesses.",
    headlineParts: [
      { text: "If every branch runs differently, you don't have a company — ", highlight: false },
      { text: "you have five small businesses.", highlight: true },
    ],
    subtext:
      "Growing enterprises need standardized operations across every location. JenVeda gives leadership real-time visibility across the entire organization while keeping branch managers focused only on what's theirs.",
    painPoints: [
      "Each branch manager maintains their own attendance records — data is inconsistent",
      "Month-end reporting takes days because data comes in from different sources",
      "Approvals and policies are not followed uniformly across locations",
      "Senior management has no visibility until the monthly review meeting",
    ],
    outcomes: [
      {
        icon: "🖥️",
        title: "Centralized Command, Local Execution",
        desc: "Head office sees all branches in one dashboard. Branch managers only access their own data. Clear boundaries, full visibility.",
      },
      {
        icon: "🔄",
        title: "Standardized Workflows Across Branches",
        desc: "Same leave process, same payroll rules, same approval flow — everywhere. No branch runs on its own system.",
      },
      {
        icon: "⚡",
        title: "Real-time Data, Not Month-end Surprises",
        desc: "Payroll costs, headcount, pending approvals — live across all locations. Know before it becomes a problem.",
      },
      {
        icon: "🔐",
        title: "Role-based Access for Every Level",
        desc: "Define exactly who can see and approve what. Branch manager, regional head, CFO — each has the right access.",
      },
    ],
    proof: "Multi-location businesses trust JenVeda to standardize HR and operations across all their branches.",
  },
];

/* ─────────────────────────────────────────
   PAIN POINT ITEM
───────────────────────────────────────── */
function PainItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M4 1v3M4 5.5v1" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </span>
      <span className="text-[17px] leading-relaxed font-medium text-black">{text}</span>
    </li>
  );
}

/* ─────────────────────────────────────────
   OUTCOME CARD
───────────────────────────────────────── */
function OutcomeCard({
  item,
  color,
  bg,
  i,
  inView,
}: {
  item: { icon: string; title: string; desc: string };
  color: string;
  bg: string;
  i: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
      className="p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-shadow duration-200"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
        style={{ background: bg }}
      >
        {item.icon}
      </div>
      <h4
        className="text-[18px] font-bold mb-2"
        style={{ color: "#0F172A" }}
      >
        {item.title}
      </h4>
      <p className="text-[16px] leading-relaxed font-medium text-black">{item.desc}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   INDUSTRY PANEL
───────────────────────────────────────── */
function IndustryPanel({ industry }: { industry: typeof industries[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-12">
      {/* Top: headline + pain points */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease }}
            className="text-[14px] font-bold uppercase tracking-[0.18em] mb-4"
            style={{ color: industry.color }}
          >
            {industry.tagline}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.06, ease }}
            className="text-2xl md:text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 mb-5"
          >
            {industry.headlineParts
              ? industry.headlineParts.map((part, i) =>
                  part.highlight ? (
                    <span
                      key={i}
                      style={{
                        background: "linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {part.text}
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )
              : industry.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease }}
            className="text-[19px] leading-relaxed font-medium text-black max-w-md"
          >
            {industry.subtext}
          </motion.p>

          {/* Proof line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22, ease }}
            className="mt-7 flex items-start gap-3 p-4 rounded-xl"
            style={{ background: industry.lightBg, border: `1px solid ${industry.borderColor}` }}
          >
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L10.06 5.67L14.72 6.35L11.36 9.62L12.12 14.26L8 12.1L3.88 14.26L4.64 9.62L1.28 6.35L5.94 5.67L8 1.5Z" fill={industry.color} fillOpacity="0.8"/>
            </svg>
            <p className="text-[15px] font-semibold leading-relaxed" style={{ color: industry.color }}>
              {industry.proof}
            </p>
          </motion.div>
        </div>

        {/* Right: pain points */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease }}
          className="p-6 rounded-2xl bg-slate-50 border border-slate-100"
        >
          <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-5">
            What we hear from {industry.shortLabel}
          </p>
          <ul className="flex flex-col gap-4">
            {industry.painPoints.map((p) => (
              <PainItem key={p} text={p} />
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom: outcome cards */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.18, ease }}
          className="text-[14px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-5"
        >
          How JenVeda helps
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {industry.outcomes.map((item, i) => (
            <OutcomeCard
              key={item.title}
              item={item}
              color={industry.color}
              bg={industry.lightBg}
              i={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function IndustriesClient() {
  const [active, setActive] = useState(0);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const industry = industries[active];

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-36 pb-20 px-6"
      >
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #6D28D9 0%, transparent 70%)", filter: "blur(100px)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(rgba(109,40,217,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="flex justify-center"
          >
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
              style={{
                background: "rgba(109,40,217,0.07)",
                border: "1px solid rgba(109,40,217,0.15)",
              }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, #7C3AED, #6366F1)" }}
              />
              <span className="gradient-text">
                Built for businesses where process clarity directly impacts growth.
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="text-fluid-h1 font-black tracking-tight text-slate-900"
          >
            Your industry has specific problems.
            <br />
            <span className="gradient-text">We know them.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="mt-6 text-[20px] font-medium leading-relaxed text-black max-w-2xl mx-auto"
          >
            Unclear approvals, inconsistent payroll, and no visibility on operations
            cost Indian businesses time and money every day. JenVeda is built
            specifically for the industries where structure matters most.
          </motion.p>
        </div>
      </section>

      {/* ── Industry Tabs ── */}
      <section className="sticky top-[72px] z-30 bg-white border-b border-slate-100 px-6"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max py-1">
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                onClick={() => setActive(i)}
                className="relative flex items-center gap-2.5 px-5 py-3.5 text-[13.5px] font-semibold transition-all duration-200 rounded-xl whitespace-nowrap"
                style={{
                  color: active === i ? ind.color : "#64748B",
                  background: active === i ? ind.lightBg : "transparent",
                }}
              >
                {/* Active underline */}
                {active === i && (
                  <motion.div
                    layoutId="industry-tab-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ background: ind.color }}
                    transition={{ duration: 0.25, ease }}
                  />
                )}

                {/* Icon */}
                <span className="text-base leading-none">
                  {ind.id === "auto"       ? "🚗"
                  : ind.id === "sme"       ? "🏭"
                  : ind.id === "education" ? "🎓"
                  :                          "🏢"}
                </span>
                {ind.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Content ── */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <IndustryPanel industry={industry} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Cross-industry module strip ── */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl px-8 py-7"
            style={{
              background: "linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 100%)",
              border: "1px solid rgba(109,40,217,0.12)",
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-violet-500 mb-2">
                  Every industry. Same four modules.
                </p>
                <h3 className="text-[20px] font-extrabold text-black mb-1">
                  HRMS · PMS · Accounting · Inventory
                </h3>
                <p className="text-[17px] font-medium text-black max-w-lg">
                  Regardless of your industry, JenVeda runs your people, projects, books,
                  and stock — from one login, with data that talks to each other.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #6D28D9, #4F46E5)", boxShadow: "0 4px 16px rgba(109,40,217,0.25)" }}
                >
                  Book a Free Demo
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/#products"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-[13.5px] font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200"
                >
                  Explore Modules
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Not sure if JenVeda fits your business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
            className="text-[19px] font-medium leading-relaxed text-black mb-8 max-w-xl mx-auto"
          >
            Tell us about your business in a 30-minute call. We'll show you
            exactly how JenVeda works for your specific team size, industry,
            and processes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.14, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6D28D9, #4F46E5)", boxShadow: "0 4px 20px rgba(109,40,217,0.3)" }}
            >
              Schedule a Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="text-[13px] text-slate-400">
              No pressure. No pitch deck. Just a real conversation.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
