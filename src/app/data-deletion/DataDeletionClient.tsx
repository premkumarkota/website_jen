"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const LAST_UPDATED = "August 10, 2026";

const deletableData = [
  {
    k: "Account & profile",
    v: "Your account and profile information.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    ),
  },
  {
    k: "WhatsApp connection",
    v: "Your business's WhatsApp Business Account connection details — WhatsApp Business Account ID, phone number ID, and access token connected to JenVeda.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.5a8.5 8.5 0 10-7.4-4.3L3 21l4.9-1.5A8.5 8.5 0 0012 20.5z" />
    ),
  },
  {
    k: "Configuration & logs",
    v: "Related configuration and message logs.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    ),
  },
];

const steps = [
  {
    tag: "In-app",
    title: "Disconnect from Settings",
    body: "Go to Settings → WhatsApp Integration → Disconnect. This immediately removes your WhatsApp connection and deletes the stored access token.",
  },
  {
    tag: "By email",
    title: "Email our support team",
    body: "Send a request to contact@jenveda.com with your account / business identity and a request to delete your data.",
  },
];

const afterSteps = [
  "We delete the WhatsApp access token from our secure storage (Azure Key Vault) and remove your integration configuration.",
  "Non-sensitive audit / delivery records may be retained only as required by our retention policy.",
  "We complete deletion requests within 30 days.",
];

export default function DataDeletionClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="bg-white">
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden px-6 pt-36 pb-20 md:px-12 md:pt-44 md:pb-24"
      >
        <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <div className="mesh-bg absolute inset-0" />
          <div className="absolute left-[8%] top-[-5%] h-[520px] w-[520px] rounded-full bg-violet-200/40 blur-[110px]" />
          <div className="absolute right-[6%] top-[20%] h-[440px] w-[440px] rounded-full bg-pink-200/30 blur-[100px]" />
        </motion.div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="tag-pill">Your Data, Your Control</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="text-fluid-h1 mt-8 font-black tracking-tight text-slate-900"
          >
            Data Deletion <span className="gradient-text">Instructions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500"
          >
            Jenveda Technologies Private Limited (&ldquo;JenVeda&rdquo;) respects
            your right to control your data. This page explains how you or your
            business can request deletion of the data we hold.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-[13px] font-semibold text-slate-500 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Last updated: {LAST_UPDATED}
          </motion.div>
        </div>
      </section>

      {/* ─── Body ─── */}
      <section className="px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-3xl">

          {/* What data can be deleted */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[13px] font-black text-white"
                style={{ background: "var(--gradient-1)" }}
              >
                01
              </span>
              <h2 className="text-[26px] font-black tracking-tight text-slate-900">What data can be deleted</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {deletableData.map((d) => (
                <div key={d.k} className="bento-item p-5" style={{ borderRadius: "var(--radius-lg)" }}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.09), rgba(209,0,143,0.06))" }}
                  >
                    <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      {d.icon}
                    </svg>
                  </div>
                  <p className="mb-1 text-[15px] font-bold text-slate-900">{d.k}</p>
                  <p className="text-[13.5px] leading-relaxed text-slate-500">{d.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How to request deletion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mt-14 border-t border-slate-100 pt-14"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[13px] font-black text-white"
                style={{ background: "var(--gradient-1)" }}
              >
                02
              </span>
              <h2 className="text-[26px] font-black tracking-tight text-slate-900">How to request deletion</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <div key={s.title} className="bento-item flex flex-col p-6" style={{ borderRadius: "var(--radius-xl)" }}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-black text-white"
                      style={{ background: "var(--gradient-1)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="tag-pill">{s.tag}</span>
                  </div>
                  <p className="mb-2 text-[17px] font-bold text-slate-900">{s.title}</p>
                  <p className="text-[15px] leading-relaxed text-slate-500">
                    {s.tag === "By email" ? (
                      <>
                        Send a request to{" "}
                        <a href="mailto:contact@jenveda.com" className="font-semibold text-violet-600 hover:text-violet-800">
                          contact@jenveda.com
                        </a>{" "}
                        with your account / business identity and a request to delete your data.
                      </>
                    ) : (
                      s.body
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mt-14 border-t border-slate-100 pt-14"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[13px] font-black text-white"
                style={{ background: "var(--gradient-1)" }}
              >
                03
              </span>
              <h2 className="text-[26px] font-black tracking-tight text-slate-900">What happens next</h2>
            </div>
            <ul className="space-y-3">
              {afterSteps.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-relaxed text-slate-600">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="glass-premium mt-14 rounded-2xl p-6"
            style={{ background: "linear-gradient(160deg, #F5F3FF 0%, #EFF6FF 100%)" }}
          >
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Contact</p>
            <a
              href="mailto:contact@jenveda.com"
              className="flex items-center gap-3 text-[16px] font-semibold text-slate-700 transition-colors hover:text-violet-700"
            >
              <svg className="h-5 w-5 flex-shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@jenveda.com
            </a>
          </motion.div>

          {/* CTA */}
          <div className="mt-14 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-10">
            <Link href="/privacy" className="btn-enterprise"><span>Read our Privacy Policy</span></Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-violet-600"
            >
              Back to Home
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
