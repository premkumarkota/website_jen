"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cc-1" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <circle cx="9" cy="7" r="4" stroke="url(#cc-1)" strokeWidth="1.6" />
        <path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2" stroke="url(#cc-1)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M19 8v6M16 11h6" stroke="url(#cc-1)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "One-click Payroll. Zero Confusion.",
    desc: "Run payroll with confidence using rule-driven automation for PF, ESI, LOP, claims, and deductions.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cc-2" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="7" height="18" rx="1.5" stroke="url(#cc-2)" strokeWidth="1.6" />
        <rect x="14" y="8" width="7" height="13" rx="1.5" stroke="url(#cc-2)" strokeWidth="1.6" />
        <rect x="14" y="3" width="7" height="3" rx="1" fill="url(#cc-2)" fillOpacity="0.4" />
        <path d="M5.5 8h2M5.5 11h2M5.5 14h2" stroke="url(#cc-2)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Attendance Without Disputes",
    desc: "Auto-mapped shifts, late-in logic, approvals, and attendance clarity that reduces HR friction instantly.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cc-3" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="url(#cc-3)" strokeWidth="1.6" />
        <path d="M9 12l2 2 4-4" stroke="url(#cc-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Compliance Built Into Workflow",
    desc: "Govern policies, salary components, and statutory logic through one predictable system.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cc-4" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="url(#cc-4)" strokeWidth="1.6" />
        <path d="M2 7h20" stroke="url(#cc-4)" strokeWidth="1.4" />
        <path d="M8 21h8M12 17v4" stroke="url(#cc-4)" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="5" y="10" width="4" height="4" rx="0.8" fill="url(#cc-4)" fillOpacity="0.25" />
        <rect x="11" y="10" width="4" height="4" rx="0.8" fill="url(#cc-4)" fillOpacity="0.15" />
      </svg>
    ),
    title: "Multi-Branch Control at Scale",
    desc: "Standardize HR and finance operations across branches, dealerships, campuses, and distributed teams.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cc-5" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#cc-5)" strokeWidth="1.6" />
        <path d="M3 9h18" stroke="url(#cc-5)" strokeWidth="1.4" />
        <path d="M9 9v12" stroke="url(#cc-5)" strokeWidth="1.4" />
        <rect x="11" y="12" width="7" height="3" rx="0.6" fill="url(#cc-5)" fillOpacity="0.3" />
        <rect x="11" y="17" width="5" height="2" rx="0.5" fill="url(#cc-5)" fillOpacity="0.15" />
      </svg>
    ),
    title: "ERP Visibility for Leadership",
    desc: "Bring HR, finance, operations, and approvals into one view so decisions move faster.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cc-6" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="url(#cc-6)" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" stroke="url(#cc-6)" strokeWidth="1.4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="url(#cc-6)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Layer for Smarter Action",
    desc: "Surface anomalies, suggest actions, and turn operational data into decisions through AI-assisted workflows.",
  },
];

export default function CoreCapabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(109,40,217,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto relative">
        {/* ── Header ── */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
          >
            <span className="tag-pill">Core Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 mb-5 text-4xl md:text-[3.2rem] lg:text-[3.8rem] font-extrabold tracking-[-0.03em] leading-[1.08]"
            style={{ color: "var(--text-1)" }}
          >
            Clarity First. {" "}
            <span
              style={{
                background: "var(--gradient-1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Everything Else Follows.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14, ease }}
            className="text-[21px] leading-relaxed font-medium text-black"
          >
            JenVeda helps you instantly understand what improves after you buy
            — faster execution, better governance, and zero operational confusion.
          </motion.p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.18 + i * 0.08,
                ease,
              }}
              className="group relative rounded-2xl p-7 transition-all duration-400"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "rgba(109,40,217,0.2)";
                el.style.boxShadow =
                  "0 24px 64px -16px rgba(15,23,42,0.1), 0 8px 24px -8px rgba(109,40,217,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(15,23,42,0.08)";
                el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.02)";
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(109,40,217,0.1), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(109,40,217,0.1)",
                }}
              >
                {cap.icon}
              </div>

              {/* Title */}
              <h3 className="text-[20px] font-extrabold tracking-tight mb-3 leading-snug text-black">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="text-[17.5px] font-medium leading-relaxed mb-6 text-black">
                {cap.desc}
              </p>


            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
