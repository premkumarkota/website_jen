"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────
   PRODUCT UI MOCK-UPS
   Each renders a realistic mini-dashboard
───────────────────────────────────────── */

function HRMSMock() {
  const rows = [
    { init: "AS", name: "Arjun Sharma", role: "Sr. Engineer", dept: "Engineering", status: "active" },
    { init: "PR", name: "Priya Reddy", role: "Brand Manager", dept: "Marketing", status: "leave" },
    { init: "VS", name: "Vikram Singh", role: "Finance Lead", dept: "Finance", status: "active" },
    { init: "DM", name: "Divya Mehta", role: "Ops Manager", dept: "Operations", status: "active" },
    { init: "RG", name: "Rahul Gupta", role: "HR Specialist", dept: "HR", status: "active" },
  ];
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-10 flex-shrink-0 bg-slate-900 rounded-l-xl flex flex-col items-center py-4 gap-3">
        <div className="w-6 h-6 rounded-lg bg-violet-500 flex items-center justify-center mb-2">
          <span className="text-white font-black text-[9px]">J</span>
        </div>
        {["M", "E", "P", "L", "R"].map((l, i) => (
          <div key={l} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold cursor-pointer transition-colors ${i === 1 ? "bg-violet-600 text-white" : "text-slate-500 hover:text-slate-300"}`}>{l}</div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col bg-slate-50 rounded-r-xl overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
          <div>
            <p className="text-[11px] font-black text-slate-800">Employees</p>
            <p className="text-[9px] text-slate-400">1,248 total · 34 on leave</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-24 rounded-md bg-slate-100 flex items-center px-2 gap-1">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <span className="text-[8px] text-slate-400">Search...</span>
            </div>
            <div className="h-5 px-2 rounded-md bg-violet-600 flex items-center">
              <span className="text-[8px] font-bold text-white">+ Add</span>
            </div>
          </div>
        </div>
        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-px bg-slate-100 border-b border-slate-100">
          {[["1,248", "Total"], ["1,214", "Active"], ["34", "On Leave"], ["₹48L", "Payroll"]].map(([v, l]) => (
            <div key={l} className="bg-white px-3 py-2">
              <p className="text-[11px] font-black text-slate-800">{v}</p>
              <p className="text-[8px] text-slate-400">{l}</p>
            </div>
          ))}
        </div>
        {/* Table */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-4 px-3 py-1.5 border-b border-slate-100">
            {["Employee", "Department", "Role", "Status"].map(h => (
              <p key={h} className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{h}</p>
            ))}
          </div>
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-4 items-center px-3 py-2 border-b border-slate-50 hover:bg-white transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-[8px] font-black text-violet-700 flex-shrink-0">{r.init}</div>
                <span className="text-[9px] font-semibold text-slate-700 truncate">{r.name}</span>
              </div>
              <span className="text-[9px] text-slate-500">{r.dept}</span>
              <span className="text-[9px] text-slate-500">{r.role}</span>
              <span className={`inline-flex w-fit px-1.5 py-0.5 rounded-full text-[8px] font-bold ${r.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-500"}`}>
                {r.status === "active" ? "● Active" : "○ Leave"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PMSMock() {
  const cols = [
    { label: "Backlog", dot: "#94a3b8", cards: ["API Gateway Design", "DB Migration Plan", "Auth Flow Spec"] },
    { label: "In Progress", dot: "#6D28D9", cards: ["Dashboard Rebuild", "Mobile Responsive"] },
    { label: "Review", dot: "#f59e0b", cards: ["Notifications Module", "PDF Export"] },
    { label: "Done", dot: "#10b981", cards: ["Design System v2", "CI/CD Pipeline"] },
  ];
  return (
    <div className="flex h-full">
      <div className="w-10 flex-shrink-0 bg-slate-900 rounded-l-xl flex flex-col items-center py-4 gap-3">
        <div className="w-6 h-6 rounded-lg bg-violet-500 flex items-center justify-center mb-2">
          <span className="text-white font-black text-[9px]">J</span>
        </div>
        {["D", "P", "T", "G", "R"].map((l, i) => (
          <div key={l} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold cursor-pointer ${i === 1 ? "bg-violet-600 text-white" : "text-slate-500"}`}>{l}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col bg-slate-50 rounded-r-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
          <div>
            <p className="text-[11px] font-black text-slate-800">Q1 Sprint · 2026</p>
            <p className="text-[9px] text-slate-400">47 active projects</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-600">On Track · 89% tasks done</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-2 p-3 overflow-hidden">
          {cols.map((col) => (
            <div key={col.label} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.dot }} />
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider truncate">{col.label}</span>
                <span className="ml-auto text-[8px] text-slate-400">{col.cards.length}</span>
              </div>
              {col.cards.map((card) => (
                <div key={card} className="px-2.5 py-2 rounded-lg bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer hover:border-violet-200 transition-colors">
                  <p className="text-[9px] font-semibold text-slate-700 leading-snug">{card}</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-violet-100" />
                    <div className="h-1 flex-1 rounded-full bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountingMock() {
  const bars = [38, 55, 42, 70, 58, 80, 65, 78, 62, 88, 75, 96];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const invoices = [
    { id: "#1024", name: "Lakshmi Toyota", amount: "₹1,24,000", status: "paid" },
    { id: "#1025", name: "MVR Constructions", amount: "₹86,500", status: "pending" },
    { id: "#1026", name: "Prithvi Toyota", amount: "₹2,40,000", status: "paid" },
    { id: "#1027", name: "Elite Post Tensions", amount: "₹58,200", status: "overdue" },
  ];
  return (
    <div className="flex h-full">
      <div className="w-10 flex-shrink-0 bg-slate-900 rounded-l-xl flex flex-col items-center py-4 gap-3">
        <div className="w-6 h-6 rounded-lg bg-violet-500 flex items-center justify-center mb-2">
          <span className="text-white font-black text-[9px]">J</span>
        </div>
        {["D", "I", "E", "P", "R"].map((l, i) => (
          <div key={l} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold cursor-pointer ${i === 0 ? "bg-violet-600 text-white" : "text-slate-500"}`}>{l}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col bg-slate-50 rounded-r-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
          <div>
            <p className="text-[11px] font-black text-slate-800">Revenue Overview · FY 2025-26</p>
            <p className="text-[9px] text-slate-400">₹2.4Cr this month</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-emerald-50 text-emerald-600">↑ 18% vs last month</span>
        </div>
        {/* Chart */}
        <div className="px-4 pt-3 pb-2 bg-white border-b border-slate-100">
          <div className="flex items-end gap-1 h-14">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${(h / 100) * 48}px`,
                    background: i === 11 ? "#6D28D9" : `rgba(109,40,217,${0.1 + (h / 100) * 0.25})`,
                  }}
                />
                <span className="text-[6px] text-slate-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Invoice list */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-4 px-3 py-1.5 border-b border-slate-100">
            {["Invoice", "Client", "Amount", "Status"].map(h => (
              <p key={h} className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{h}</p>
            ))}
          </div>
          {invoices.map((inv) => (
            <div key={inv.id} className="grid grid-cols-4 items-center px-3 py-2 border-b border-slate-50 hover:bg-white transition-colors">
              <span className="text-[9px] font-bold text-violet-600">{inv.id}</span>
              <span className="text-[9px] text-slate-600 truncate">{inv.name}</span>
              <span className="text-[9px] font-black text-slate-800">{inv.amount}</span>
              <span className={`inline-flex w-fit px-1.5 py-0.5 rounded-full text-[8px] font-bold ${inv.status === "paid" ? "bg-emerald-50 text-emerald-600" :
                inv.status === "pending" ? "bg-amber-50 text-amber-500" :
                  "bg-red-50 text-red-500"
                }`}>{inv.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InventoryMock() {
  const items = [
    { name: "Raw Materials", pct: 78, units: "1,240", alert: false },
    { name: "Finished Goods", pct: 45, units: "890", alert: false },
    { name: "Spare Parts", pct: 18, units: "340", alert: true },
    { name: "Packaging Stock", pct: 62, units: "2,100", alert: false },
    { name: "WIP Components", pct: 12, units: "250", alert: true },
  ];
  return (
    <div className="flex h-full">
      <div className="w-10 flex-shrink-0 bg-slate-900 rounded-l-xl flex flex-col items-center py-4 gap-3">
        <div className="w-6 h-6 rounded-lg bg-violet-500 flex items-center justify-center mb-2">
          <span className="text-white font-black text-[9px]">J</span>
        </div>
        {["D", "S", "W", "O", "R"].map((l, i) => (
          <div key={l} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold cursor-pointer ${i === 1 ? "bg-violet-600 text-white" : "text-slate-500"}`}>{l}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col bg-slate-50 rounded-r-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
          <div>
            <p className="text-[11px] font-black text-slate-800">Stock Overview</p>
            <p className="text-[9px] text-slate-400">4,820 SKUs · 3 warehouse locations</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-red-50 text-red-500">⚠ 2 low stock alerts</span>
        </div>
        <div className="grid grid-cols-3 gap-px bg-slate-100 border-b border-slate-100">
          {[["4,820", "Total SKUs"], ["98.4%", "Fill Rate"], ["3", "Warehouses"]].map(([v, l]) => (
            <div key={l} className="bg-white px-3 py-2">
              <p className="text-[11px] font-black text-slate-800">{v}</p>
              <p className="text-[8px] text-slate-400">{l}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
          {items.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {item.alert && <span className="text-[9px] text-amber-500">⚠</span>}
                  <span className="text-[10px] font-semibold text-slate-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400">{item.units} units</span>
                  <span className={`text-[9px] font-bold ${item.alert ? "text-red-500" : "text-slate-600"}`}>{item.pct}%</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.1, ease }}
                  className="h-full rounded-full"
                  style={{ background: item.alert ? "#f59e0b" : item.pct > 50 ? "#6D28D9" : "rgba(109,40,217,0.5)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MODULE DATA
───────────────────────────────────────── */
const modules = [
  {
    id: "hrms",
    number: "01",
    tag: "HRMS",
    title: "Human Resource Management",
    headline: "Your people,\nperfectly managed.",
    desc: "End-to-end HR automation — from onboarding to exit. Give your HR team real-time visibility and give your employees a seamless self-service experience.",
    features: [
      "Employee lifecycle & org chart",
      "Automated payroll & tax compliance",
      "Leave, shift & attendance management",
      "Performance reviews & appraisals",
      "Role-based access & approvals",
    ],
    stat: "1,248",
    statLabel: "Employees Managed",
    href: "/products/hrms",
    mock: <HRMSMock />,
  },
  {
    id: "pms",
    number: "02",
    tag: "PMS",
    title: "Project Management",
    headline: "Ship faster.\nStay in control.",
    desc: "Complete project lifecycle from kickoff to delivery. Kanban boards, sprint planning, resource allocation, and real-time progress visibility — all in one view.",
    features: [
      "Kanban, list & timeline views",
      "Sprint planning & backlog management",
      "Resource allocation & utilization",
      "Milestones, dependencies & critical path",
      "Client portal & progress reporting",
    ],
    stat: "340+",
    statLabel: "Projects Delivered",
    href: "/products/pms",
    mock: <PMSMock />,
  },
  {
    id: "accounting",
    number: "03",
    tag: "Accounting",
    title: "Financial Accounting",
    headline: "Complete financial\nclarity, always.",
    desc: "A fully integrated finance suite — invoices, expenses, purchase orders, ledger, and P&L reports. Close books faster and make decisions backed by real data.",
    features: [
      "Invoicing, billing & collections",
      "Expense management & approvals",
      "Purchase orders & vendor payments",
      "GST-ready reports & tax filings",
      "Real-time P&L, balance sheet & cash flow",
    ],
    stat: "99.9%",
    statLabel: "Accuracy Rate",
    href: "/products/accounting",
    mock: <AccountingMock />,
  },
  {
    id: "inventory",
    number: "04",
    tag: "Inventory",
    title: "Inventory Management",
    headline: "Zero stockouts.\nZero guesswork.",
    desc: "Real-time stock visibility across every warehouse and location. Automated reorder triggers, batch tracking, and intelligent demand forecasting built in.",
    features: [
      "Multi-location stock tracking",
      "Automated replenishment triggers",
      "Batch, serial & expiry tracking",
      "Warehouse transfer management",
      "Demand forecasting & analytics",
    ],
    stat: "4,820",
    statLabel: "SKUs Tracked",
    href: "/products/inventory",
    mock: <InventoryMock />,
  },
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ERPSolution() {
  const [active, setActive] = useState(0);
  const inViewRef = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-60px" });
  const m = modules[active];

  // ── Horizontal scroll / swipe to switch modules ──
  const swipeCooldown = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleWheel = (e: WheelEvent) => {
      // Only respond to horizontal scroll (trackpad two-finger)
      if (Math.abs(e.deltaX) < 15 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      if (swipeCooldown.current) return;

      swipeCooldown.current = true;
      setTimeout(() => { swipeCooldown.current = false; }, 500);

      if (e.deltaX > 0) {
        // Swipe left → next module
        setActive((prev) => Math.min(prev + 1, modules.length - 1));
      } else {
        // Swipe right → previous module
        setActive((prev) => Math.max(prev - 1, 0));
      }
      e.preventDefault();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;

      // Only trigger if horizontal swipe is dominant and significant
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      if (swipeCooldown.current) return;

      swipeCooldown.current = true;
      setTimeout(() => { swipeCooldown.current = false; }, 500);

      if (dx < 0) {
        setActive((prev) => Math.min(prev + 1, modules.length - 1));
      } else {
        setActive((prev) => Math.max(prev - 1, 0));
      }
    };

    card.addEventListener("wheel", handleWheel, { passive: false });
    card.addEventListener("touchstart", handleTouchStart, { passive: true });
    card.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      card.removeEventListener("wheel", handleWheel);
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <section
      id="products"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Subtle bg texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(109,40,217,0.045) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute top-0 inset-x-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(109,40,217,0.18), transparent)"
      }} />

      <div ref={inViewRef} className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 mb-4 text-4xl md:text-[3.2rem] lg:text-[3.8rem] font-extrabold tracking-[-0.03em] leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            One Platform.
            <br />
            <span style={{
              background: "var(--gradient-1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              To Control Today - Scale Tomorrow.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14, ease }}
            className="max-w-xl mx-auto text-[20px] font-medium leading-relaxed text-black"
          >
            Four deeply integrated modules. Shared data layer. One login for your entire enterprise operation.
          </motion.p>
        </div>

        {/* ── Tab Navigation ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="flex justify-center mb-8"
        >
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-2xl"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {modules.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => setActive(i)}
                className="relative px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 flex items-center gap-2 z-10"
                style={{ color: active === i ? "white" : "var(--text-3)" }}
              >
                {active === i && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl z-[-1]"
                    style={{ background: "linear-gradient(135deg, #6D28D9, #4F46E5)" }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
                <span className="text-[13px] font-black opacity-60">{mod.number}</span>
                <span className="text-[15.5px] font-bold">{mod.tag}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Showcase Card ── */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          {/* Top gradient accent */}
          <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #6D28D9, #A855F7 50%, #6D28D9)" }} />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">

            {/* ── LEFT: Content ── */}
            <div className="lg:col-span-5 flex flex-col justify-between p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35, ease }}
                  className="flex flex-col flex-1"
                >
                  {/* Tag + number */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase"
                      style={{ background: "rgba(109,40,217,0.08)", color: "#6D28D9" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                      {m.tag}
                    </span>
                    <span className="text-[11px] font-black tracking-[0.25em] text-slate-200 select-none">
                      {m.number}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3
                    className="text-[2rem] lg:text-[2.2rem] font-extrabold leading-[1.15] tracking-tight mb-5 whitespace-pre-line"
                    style={{ color: "var(--text-1)" }}
                  >
                    {m.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[18px] font-medium leading-relaxed mb-8 text-black">
                    {m.desc}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-10 flex-1">
                    {m.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: fi * 0.06, ease }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(109,40,217,0.1)" }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="#6D28D9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[16.5px] font-bold text-black">{f}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Bottom row */}
                  <div
                    className="flex items-center justify-between pt-7"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div>
                      <p className="text-[1.6rem] font-black tabular-nums tracking-tight" style={{ color: "#6D28D9" }}>
                        {m.stat}
                      </p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text-3)" }}>
                        {m.statLabel}
                      </p>
                    </div>
                    <Link
                      href={m.href}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:gap-3"
                      style={{ background: "linear-gradient(135deg, #6D28D9, #4F46E5)" }}
                    >
                      Explore {m.tag}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7.5 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Product UI Mock ── */}
            <div className="lg:col-span-7 relative bg-slate-50/60 p-6 lg:p-8 flex flex-col">
              {/* Browser chrome */}
              <div
                className="flex-1 rounded-2xl overflow-hidden flex flex-col"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Chrome bar */}
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div
                    className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md"
                    style={{ background: "rgba(0,0,0,0.04)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span className="text-[9px] font-medium text-slate-400 select-none">
                      app.jenveda.net/{m.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {modules.map((mod, i) => (
                      <div
                        key={mod.id}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{ background: active === i ? "#6D28D9" : "rgba(0,0,0,0.12)" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Mock content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={m.id + "-mock"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease }}
                    className="flex-1 overflow-hidden"
                    style={{ minHeight: 0 }}
                  >
                    {m.mock}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Module switcher dots at bottom */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {modules.map((mod, i) => (
                  <button
                    key={mod.id}
                    onClick={() => setActive(i)}
                    className="transition-all duration-300"
                    style={{
                      width: active === i ? 24 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: active === i ? "#6D28D9" : "rgba(0,0,0,0.12)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="mt-4 relative rounded-2xl overflow-hidden px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "white",
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 20px 40px -12px rgba(15,23,42,0.06)",
          }}
        >
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400">Single Data Layer · Real-time Sync</span>
            </div>
            <p className="text-2xl md:text-[28px] font-black text-black tracking-tight leading-tight">
              All modules. One platform. Zero silos.
            </p>
            <p className="text-[17px] text-black font-medium mt-2 leading-relaxed">
              Changes in HRMS reflect instantly in Payroll. Inventory feeds directly into Accounting. Everything connected.
            </p>
          </div>

          <div className="relative flex items-center gap-2 flex-shrink-0">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 transition-all hover:text-violet-600"
                style={{
                  background: "rgba(15,23,42,0.03)",
                  border: "1px solid rgba(15,23,42,0.06)",
                }}
              >
                {mod.tag}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
