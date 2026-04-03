"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const trustFactors = [
  {
    title: "SOC 2 Type II",
    desc: "Independently verified for data security, reliability, and confidentiality.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "ISO 27001",
    desc: "Globally recognised standard for keeping your business information safe.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "99.9% Uptime",
    desc: "Your system stays online so your team never hits a wall mid-workday.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "AES-256 Encryption",
    desc: "Your payroll, invoices, and employee data are encrypted — the same way banks protect your money.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const certs = ["SOC2", "GDPR", "ISO 27001"];

export default function SecurityCompliance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* ── Left column ── */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
            >
              <span className="tag-pill">Safe &amp; Reliable</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease }}
              className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900"
            >
              Your business data{" "}
              <span
                style={{
                  background: "var(--gradient-1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                is safe with us
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              className="mt-5 text-[15.5px] leading-relaxed text-slate-500 max-w-md"
            >
              We know trust takes time. JenVeda protects your payroll,
              invoices, and employee data with the same security used by
              banks — so you can focus on running your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.24, ease }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-slate-100" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Industry Certifications
              </p>
              <div className="h-px flex-1 bg-slate-100" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.32, ease }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {certs.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.36 + i * 0.07, ease }}
                  className="h-11 px-6 rounded-xl flex items-center justify-center transition-all duration-300 cursor-default hover:bg-violet-50 hover:border-violet-200"
                  style={{
                    background: "rgba(0,0,0,0.025)",
                    border: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <span className="font-bold text-[13px] text-slate-500">{c}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: cards ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trustFactors.map((fact, i) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50/80 cursor-default"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-violet-50 text-violet-600 mb-4">
                  {fact.icon}
                </div>
                <h3 className="text-[14px] font-bold text-slate-900 mb-1.5">{fact.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{fact.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
