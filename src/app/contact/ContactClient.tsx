"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.08 + i * 0.1, ease },
});

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative flex min-h-[52vh] items-center overflow-hidden"
        style={{ background: "#05071A" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 15% 50%, rgba(109,40,217,0.24) 0%, transparent 62%)," +
              "radial-gradient(ellipse 50% 40% at 90% 15%, rgba(209,0,143,0.12) 0%, transparent 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            className="mb-7 flex items-center gap-2 text-[12px] font-medium"
            style={{ color: "rgba(196,181,253,0.45)" }}
          >
            <Link href="/" className="transition-colors hover:text-violet-300">Home</Link>
            <span>/</span>
            <span style={{ color: "#C4B5FD" }}>Contact</span>
          </motion.div>

          <motion.div {...stagger(0)}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{
                background: "rgba(109,40,217,0.18)",
                border: "1px solid rgba(109,40,217,0.35)",
                color: "#C4B5FD",
              }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "#A78BFA" }} />
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            {...stagger(1)}
            className="mt-6 max-w-2xl text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] lg:text-[3.6rem]"
          >
            Let&apos;s build something{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #A78BFA 0%, #F472B6 52%, #60A5FA 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              great together.
            </span>
          </motion.h1>

          <motion.p
            {...stagger(2)}
            className="mt-5 max-w-[480px] text-[16px] leading-[1.8]"
            style={{ color: "rgba(196,181,253,0.6)" }}
          >
            Request a demo, ask a question, or talk to us about how JenVeda can
            transform your business operations.
          </motion.p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 xl:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">

            {/* LEFT — contact info */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <h2 className="text-[1.6rem] font-extrabold tracking-tight text-slate-900">
                  Contact Information
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
                  Reach us through any of these channels. We typically respond
                  within one business day.
                </p>
              </motion.div>

              {[
                {
                  delay: 0.1,
                  color: "#6D28D9",
                  bg: "rgba(109,40,217,0.08)",
                  label: "Phone",
                  value: "(+91) 72077 76559",
                  sub: "Mon – Sat, 9 AM – 6 PM IST",
                  href: "tel:+917207776559",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  ),
                },
                {
                  delay: 0.18,
                  color: "#D1008F",
                  bg: "rgba(209,0,143,0.07)",
                  label: "Email",
                  value: "Jenvedatech@gmail.com",
                  sub: "We reply within 24 hours",
                  href: "mailto:Jenvedatech@gmail.com",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  ),
                },
                {
                  delay: 0.26,
                  color: "#1D4ED8",
                  bg: "rgba(29,78,216,0.07)",
                  label: "Office",
                  value: "201, Padmaja Jansi Enclave",
                  sub: "KPHB, Hyderabad, Telangana 500072",
                  href: undefined,
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  ),
                },
              ].map(({ delay, color, bg, label, value, sub, href, icon }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay, ease }}
                  className="flex items-start gap-4 rounded-2xl p-5"
                  style={{ background: bg, border: `1px solid ${color}18` }}
                >
                  <div
                    className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${color}12`, color }}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      {icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="mt-0.5 block text-[15px] font-semibold text-slate-800 transition-colors hover:text-violet-700">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-[15px] font-semibold text-slate-800">{value}</p>
                    )}
                    <p className="mt-0.5 text-[13px] text-slate-400">{sub}</p>
                  </div>
                </motion.div>
              ))}

              {/* Products quick links */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.34, ease }}
                className="rounded-2xl border border-slate-100 p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">Our Products</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { label: "HRMS", href: "/products/hrms" },
                    { label: "PMS", href: "/products/pms" },
                    { label: "Accounting", href: "/products/accounting" },
                    { label: "Inventory", href: "/products/inventory" },
                  ].map((p) => (
                    <Link
                      key={p.label}
                      href={p.href}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-600 transition-all hover:bg-violet-50 hover:text-violet-700"
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gradient-1)" }} />
                      {p.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease }}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_48px_rgba(0,0,0,0.06)] md:p-10"
            >
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(5,150,105,0.08)", color: "#059669" }}
                  >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[1.4rem] font-bold text-slate-900">Message received!</h3>
                  <p className="mt-2 max-w-[300px] text-[14px] text-slate-400">
                    Thank you for reaching out. We&apos;ll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", message: "" }); }}
                    className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-[13px] font-medium text-slate-600 transition-all hover:border-violet-300 hover:text-violet-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-[1.25rem] font-bold text-slate-900">Send us a message</h3>
                  <p className="mt-1.5 text-[14px] text-slate-400">
                    Fill in the form and our team will be in touch shortly.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                        />
                      </div>
                      {/* Email */}
                      <div>
                        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme Pvt. Ltd."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your business and what you're looking for..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary group w-full inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[14px] font-semibold"
                    >
                      <span className="relative z-10">Send Message</span>
                      <svg
                        className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>

                    <p className="text-center text-[12px] text-slate-400">
                      No spam. We only use your info to respond to your inquiry.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
