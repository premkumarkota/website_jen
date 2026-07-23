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
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <rect x="4" y="7" width="16" height="10" rx="2" stroke="url(#cc-1)" strokeWidth="1.7" />
        <rect x="7" y="5" width="10" height="3" rx="1" fill="url(#cc-1)" fillOpacity="0.18" />
        <circle cx="12" cy="12" r="2.2" stroke="url(#cc-1)" strokeWidth="1.5" />
        <path d="M6.5 12H7M17 12h.5" stroke="url(#cc-1)" strokeWidth="1.5" strokeLinecap="round" />
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
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="7" stroke="url(#cc-2)" strokeWidth="1.7" />
        <path d="M12 8.5V12l2.6 2" stroke="url(#cc-2)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <path d="M8 6.5h8" stroke="url(#cc-3)" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10 4.5h4" stroke="url(#cc-3)" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7 17.5l10-10" stroke="url(#cc-3)" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10.2 18.2L5.8 13.8" stroke="url(#cc-3)" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M18.2 10.2l-4.4-4.4" stroke="url(#cc-3)" strokeWidth="1.7" strokeLinecap="round" />
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
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="1.8" stroke="url(#cc-4)" strokeWidth="1.5" />
        <circle cx="12" cy="5.5" r="1.8" stroke="url(#cc-4)" strokeWidth="1.5" />
        <circle cx="12" cy="18.5" r="1.8" stroke="url(#cc-4)" strokeWidth="1.5" />
        <circle cx="5.5" cy="12" r="1.8" stroke="url(#cc-4)" strokeWidth="1.5" />
        <circle cx="18.5" cy="12" r="1.8" stroke="url(#cc-4)" strokeWidth="1.5" />
        <circle cx="7.5" cy="7.5" r="1.6" stroke="url(#cc-4)" strokeWidth="1.4" />
        <circle cx="16.5" cy="7.5" r="1.6" stroke="url(#cc-4)" strokeWidth="1.4" />
        <path d="M12 7.3v2.9M12 13.8v2.4M7.3 12h2.9M13.8 12h2.4M8.7 8.7l1.8 1.8M15.3 8.7l-1.8 1.8" stroke="url(#cc-4)" strokeWidth="1.3" strokeLinecap="round" />
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
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <path d="M5 17l4-4 2.8 2.8L18.5 9" stroke="url(#cc-5)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5 9h3v3" stroke="url(#cc-5)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 19h14" stroke="url(#cc-5)" strokeWidth="1.5" strokeLinecap="round" />
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
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <path d="M12 4.5l1.4 3.6L17 9.5l-3.6 1.4L12 14.5l-1.4-3.6L7 9.5l3.6-1.4L12 4.5z" stroke="url(#cc-6)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M17.8 14.8l.8 2 .9.3-2 .8-.8 2-.8-2-2-.8 2-.3.8-2z" fill="url(#cc-6)" />
        <path d="M6.2 14.7l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5.5-1.2z" fill="url(#cc-6)" />
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
              /* ── Entrance stagger ── */
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.18 + i * 0.09,
                ease,
              }}
              /* ── Hover: card lift + shadow (transition lives inside whileHover) ── */
              whileHover={{
                y: -6,
                boxShadow:
                  "0 20px 48px -12px rgba(109,40,217,0.12), 0 8px 20px -6px rgba(15,23,42,0.08)",
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
              className="group relative rounded-2xl p-7"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                willChange: "transform",
              }}
            >
              {/* Purple tint overlay — fades in on hover via CSS transition */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(109,40,217,0.03) 0%, rgba(139,92,246,0.05) 100%)",
                }}
              />

              {/* Border highlight — fades in on hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 1.5px rgba(109,40,217,0.20)" }}
              />

              {/* Icon */}
              <motion.div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(109,40,217,0.08), rgba(139,92,246,0.06))",
                  border: "1px solid rgba(109,40,217,0.1)",
                }}
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0 6px 20px rgba(109,40,217,0.18)",
                  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                {cap.icon}
              </motion.div>

              {/* Title */}
              <h3 className="relative text-[20px] font-extrabold tracking-tight mb-3 leading-snug text-black">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="relative text-[17.5px] font-medium leading-relaxed text-black">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
