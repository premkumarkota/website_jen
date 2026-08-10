"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const LAST_UPDATED = "August 10, 2026";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      "Jenveda Technologies Private Limited (“JenVeda”, “we”, “us”, or “our”) is committed to protecting the privacy of every business and individual who uses our ERP platform, websites, and related services (collectively, the “Services”).",
      "This Privacy Policy explains what information we collect, why we collect it, how we use and safeguard it, and the choices you have. By using our Services, you agree to the practices described here.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: [
      "We collect information you provide directly to us, information generated as you use the Services, and information from trusted third parties.",
    ],
    list: [
      { k: "Account & profile data", v: "Name, work email, phone number, company name, role, and login credentials." },
      { k: "Business & operational data", v: "HR, payroll, project, accounting, and inventory records you enter into the platform." },
      { k: "Usage data", v: "Device type, browser, IP address, pages visited, and feature interactions." },
      { k: "Communications", v: "Messages you send through contact forms, demo requests, and support channels." },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: ["We use the information we collect to operate, maintain, and improve the Services, including to:"],
    list: [
      { k: "Deliver the platform", v: "Provision your account, run modules, and process your business workflows." },
      { k: "Support & communication", v: "Respond to enquiries, provide support, and send service updates." },
      { k: "Security & compliance", v: "Detect fraud, prevent abuse, and meet legal and regulatory obligations." },
      { k: "Improve our product", v: "Understand usage patterns to build better features and experiences." },
    ],
  },
  {
    id: "data-sharing",
    title: "How We Share Information",
    body: [
      "We do not sell your personal or business data. We share information only in limited circumstances: with trusted service providers who process data on our behalf under strict confidentiality obligations, when required by law or a valid legal request, or during a business transfer such as a merger or acquisition — always subject to this Policy.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    body: [
      "We apply industry-standard technical and organisational safeguards — encryption in transit and at rest, role-based access controls, and continuous monitoring — to protect your data against unauthorised access, alteration, or disclosure. No method of transmission or storage is entirely secure, but we work continuously to strengthen our protections.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: [
      "We retain your information for as long as your account is active or as needed to provide the Services, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer required, we securely delete or anonymise it.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    body: ["Depending on your location, you may have the right to:"],
    list: [
      { k: "Access & portability", v: "Request a copy of the personal data we hold about you." },
      { k: "Correction", v: "Ask us to correct inaccurate or incomplete information." },
      { k: "Deletion", v: "Request deletion of your personal data, subject to legal limits." },
      { k: "Opt-out", v: "Unsubscribe from marketing communications at any time." },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    body: [
      "We use cookies and similar technologies to keep you signed in, remember preferences, and understand how the Services are used. You can control cookies through your browser settings; disabling some cookies may affect certain features of the platform.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. When we make material changes, we will update the “Last updated” date above and, where appropriate, notify you directly.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have questions about this Privacy Policy or how your data is handled, please reach out — we’re happy to help.",
    ],
  },
];

export default function PrivacyClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
            <span className="tag-pill">Your Trust, Protected</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="text-fluid-h1 mt-8 font-black tracking-tight text-slate-900"
          >
            Privacy <span className="gradient-text">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500"
          >
            Transparency is part of how we build. This policy explains what data
            JenVeda collects, how we use it, and the control you have over it.
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
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[240px_1fr]">
          {/* Sticky table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                On this page
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="relative rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors"
                    style={{
                      color: active === s.id ? "#6D28D9" : "#64748B",
                      background: active === s.id ? "rgba(109,40,217,0.07)" : "transparent",
                    }}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0 max-w-3xl">
            {sections.map((s, i) => (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease }}
                className="scroll-mt-28 border-t border-slate-100 py-10 first:border-t-0 first:pt-0"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[13px] font-black text-white"
                    style={{ background: "var(--gradient-1)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[26px] font-black tracking-tight text-slate-900">
                    {s.title}
                  </h2>
                </div>

                {s.body.map((p, j) => (
                  <p key={j} className="mb-4 text-[16.5px] leading-relaxed text-slate-600">
                    {p}
                  </p>
                ))}

                {s.list && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {s.list.map((item) => (
                      <li
                        key={item.k}
                        className="bento-item p-5"
                        style={{ borderRadius: "var(--radius-lg)" }}
                      >
                        <p className="mb-1 text-[14.5px] font-bold text-slate-900">{item.k}</p>
                        <p className="text-[14px] leading-relaxed text-slate-500">{item.v}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {s.id === "contact" && (
                  <div
                    className="glass-premium mt-6 rounded-2xl p-6"
                    style={{ background: "linear-gradient(160deg, #F5F3FF 0%, #EFF6FF 100%)" }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <a
                        href="mailto:contact@jenveda.com"
                        className="flex items-center gap-3 text-[15px] font-semibold text-slate-700 transition-colors hover:text-violet-700"
                      >
                        <svg className="h-5 w-5 flex-shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        contact@jenveda.com
                      </a>
                      <a
                        href="tel:+917207776559"
                        className="flex items-center gap-3 text-[15px] font-semibold text-slate-700 transition-colors hover:text-violet-700"
                      >
                        <svg className="h-5 w-5 flex-shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        (+91) 72077 76559
                      </a>
                    </div>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-slate-500">
                      Jenveda Technologies Private Limited &middot; 201, Padmaja Jansi
                      Enclave, KPHB main road, Hyderabad, Telangana 500072, India.
                    </p>
                  </div>
                )}
              </motion.article>
            ))}

            {/* CTA */}
            <div className="mt-14 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-10">
              <Link href="/contact" className="btn-enterprise"><span>Talk to Our Team</span></Link>
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
        </div>
      </section>
    </div>
  );
}
