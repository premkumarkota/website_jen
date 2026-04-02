"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Gradient icons ── */
const ArchIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <defs>
      <linearGradient id="g-arch" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#6D28D9"/>
      </linearGradient>
    </defs>
    <rect x="2" y="15" width="6" height="9" rx="1.5" fill="url(#g-arch)" fillOpacity="0.6"/>
    <rect x="10" y="9" width="6" height="15" rx="1.5" fill="url(#g-arch)" fillOpacity="0.85"/>
    <rect x="18" y="4" width="6" height="20" rx="1.5" fill="url(#g-arch)"/>
  </svg>
);

const SecurityIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <defs>
      <linearGradient id="g-sec" x1="3" y1="2" x2="23" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C4B5FD"/><stop offset="1" stopColor="#6D28D9"/>
      </linearGradient>
    </defs>
    <path d="M13 2L4 6v7c0 5.25 3.85 10.15 9 11.35C18.15 23.15 22 18.25 22 13V6L13 2z" fill="url(#g-sec)" fillOpacity="0.15" stroke="url(#g-sec)" strokeWidth="1.4"/>
    <path d="M9 13l3 3 5-5" stroke="url(#g-sec)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ComplianceIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <defs>
      <linearGradient id="g-comp" x1="3" y1="3" x2="23" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DDD6FE"/><stop offset="1" stopColor="#6D28D9"/>
      </linearGradient>
    </defs>
    <circle cx="13" cy="13" r="10" fill="url(#g-comp)" fillOpacity="0.1" stroke="url(#g-comp)" strokeWidth="1.4"/>
    <circle cx="13" cy="13" r="5.5" fill="url(#g-comp)" fillOpacity="0.12"/>
    <path d="M9 13l3 3 5-5.5" stroke="url(#g-comp)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HRMIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <defs>
      <linearGradient id="g-hrm" x1="4" y1="4" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C4B5FD"/><stop offset="1" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <circle cx="13" cy="9" r="4" fill="url(#g-hrm)" fillOpacity="0.9"/>
    <path d="M5 23c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="url(#g-hrm)" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="21" cy="9" r="2.5" fill="url(#g-hrm)" fillOpacity="0.45"/>
    <path d="M21 18c0-2.5-1.2-4.7-3-6" stroke="url(#g-hrm)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <defs>
      <linearGradient id="g-ana" x1="3" y1="10" x2="23" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EDE9FE"/><stop offset="1" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M4 19l5-5 4 4 5-7 4 3" stroke="url(#g-ana)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="14" r="2" fill="url(#g-ana)"/>
    <circle cx="13" cy="18" r="2" fill="url(#g-ana)" fillOpacity="0.7"/>
    <circle cx="18" cy="11" r="2" fill="url(#g-ana)" fillOpacity="0.85"/>
    <circle cx="22" cy="14" r="2" fill="url(#g-ana)" fillOpacity="0.6"/>
  </svg>
);

const features = [
  {
    num: "01",
    icon: <ArchIcon />,
    title: "Unified SaaS Architecture",
    desc: "Zero-infrastructure deployment. Access your entire enterprise suite via browser — no installs, no servers, guaranteed uptime.",
    metric: "99.9%",
    metricLabel: "Uptime SLA",
    wide: true,
  },
  {
    num: "02",
    icon: <SecurityIcon />,
    title: "Enterprise Security",
    desc: "Bank-grade AES-256 encryption, SSO/SAML, and granular RBAC — security built to meet enterprise audit requirements.",
    metric: "SOC2",
    metricLabel: "Compliant ready",
    wide: false,
  },
  {
    num: "03",
    icon: <ComplianceIcon />,
    title: "Global Compliance",
    desc: "Automated GST, TDS, and multi-jurisdiction tax rules built directly into every workflow — nothing slips through.",
    metric: "12+",
    metricLabel: "Compliance frameworks",
    wide: false,
  },
  {
    num: "04",
    icon: <HRMIcon />,
    title: "Intelligent HRM",
    desc: "End-to-end people management — payroll automation, leave flows, performance cycles, and org hierarchy in one place.",
    metric: "1,248",
    metricLabel: "Employees managed",
    wide: false,
  },
  {
    num: "05",
    icon: <AnalyticsIcon />,
    title: "Real-time Analytics",
    desc: "Consolidated financial and operational dashboards with drill-down reports that give leadership instant clarity.",
    metric: "Live",
    metricLabel: "Data sync across modules",
    wide: false,
  },
];

function FeatureCard({ f, i, inView, colSpan }: {
  f: typeof features[0];
  i: number;
  inView: boolean;
  colSpan: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.08 + i * 0.1, ease }}
      className={`${colSpan}`}
    >
      <motion.div
        whileHover="hovered"
        initial="rest"
        className="group relative h-full rounded-2xl bg-white overflow-hidden cursor-default"
        style={{
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Sliding gradient backdrop on hover */}
        <motion.div
          variants={{
            rest: { opacity: 0, y: "100%" },
            hovered: { opacity: 1, y: "0%" },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(160deg, rgba(109,40,217,0.04) 0%, rgba(109,40,217,0.08) 100%)",
          }}
        />

        {/* Border glow on hover */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1.5px rgba(109,40,217,0.25)" }}
        />

        {/* Top accent line */}
        <motion.div
          variants={{
            rest: { scaleX: 0, opacity: 0 },
            hovered: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: "linear-gradient(90deg, #6D28D9, #A855F7, transparent)" }}
        />

        <div className="relative p-8 flex flex-col h-full">

          {/* Number watermark */}
          <motion.span
            variants={{
              rest:    { opacity: 0.04, scale: 1 },
              hovered: { opacity: 0.08, scale: 1.05 },
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-5 text-[4rem] font-black leading-none select-none pointer-events-none"
            style={{ color: "#6D28D9" }}
          >
            {f.num}
          </motion.span>

          {/* Icon */}
          <motion.div
            variants={{
              rest:    { scale: 1, rotate: 0, boxShadow: "0 0 0 0px rgba(109,40,217,0)" },
              hovered: { scale: 1.1, rotate: -4, boxShadow: "0 8px 24px rgba(109,40,217,0.18)" },
            }}
            transition={{ duration: 0.35, ease }}
            className="mb-7 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(109,40,217,0.07)",
              border: "1px solid rgba(109,40,217,0.12)",
            }}
          >
            {f.icon}
          </motion.div>

          {/* Text */}
          <div className="flex-1">
            <motion.h3
              variants={{
                rest:    { color: "#0F172A" },
                hovered: { color: "#5B21B6" },
              }}
              transition={{ duration: 0.25 }}
              className="text-[17px] font-bold leading-snug mb-3"
            >
              {f.title}
            </motion.h3>
            <p className="text-[13.5px] leading-relaxed" style={{ color: "#64748B" }}>
              {f.desc}
            </p>
          </div>

          {/* Metric row */}
          <div
            className="flex items-center justify-between mt-7 pt-5"
            style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                variants={{
                  rest:    { color: "#6D28D9" },
                  hovered: { color: "#5B21B6" },
                }}
                className="text-xl font-black tabular-nums"
              >
                {f.metric}
              </motion.span>
              <span className="text-[11px] font-medium" style={{ color: "#94A3B8" }}>
                {f.metricLabel}
              </span>
            </div>

            {/* Arrow that slides in */}
            <motion.div
              variants={{
                rest:    { opacity: 0, x: -8 },
                hovered: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.3, ease }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "rgba(109,40,217,0.1)" }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="#6D28D9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      className="relative overflow-hidden py-32 px-6"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(109,40,217,0.05), transparent 70%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(109,40,217,0.05) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }} />

      <div ref={ref} className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="tag-pill">Capabilities</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.12]"
              style={{ color: "var(--text-1)" }}
            >
              Built for the{" "}
              <span style={{
                background: "var(--gradient-1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Modern Enterprise
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="max-w-sm text-[15px] leading-relaxed md:text-right"
            style={{ color: "var(--text-3)" }}
          >
            A unified platform engineered to handle the complexity
            of high-growth companies with absolute reliability.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <FeatureCard f={features[0]} i={0} inView={inView} colSpan="md:col-span-7" />
          <FeatureCard f={features[1]} i={1} inView={inView} colSpan="md:col-span-5" />
          <FeatureCard f={features[2]} i={2} inView={inView} colSpan="md:col-span-4" />
          <FeatureCard f={features[3]} i={3} inView={inView} colSpan="md:col-span-4" />
          <FeatureCard f={features[4]} i={4} inView={inView} colSpan="md:col-span-4" />
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mt-3 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5 bg-white"
          style={{
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <p className="text-[14px] font-medium" style={{ color: "var(--text-3)" }}>
              Production tracking, field services &amp; AI forecasting modules coming soon.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6D28D9, #4F46E5)" }}
          >
            Explore Full Feature Set
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
