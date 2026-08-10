"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const LAST_UPDATED = "August 10, 2026";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: [
      "These Terms of Service (“Terms”) govern your access to and use of the ERP platform, websites, applications, and related services (collectively, the “Services”) provided by Jenveda Technologies Private Limited (“JenVeda”, “we”, “us”, or “our”).",
      "By accessing or using the Services, you agree to be bound by these Terms. If you are using the Services on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Eligibility",
    body: [
      "You must provide accurate and complete information when creating an account and keep it up to date. You are responsible for safeguarding your login credentials and for all activity that occurs under your account. Notify us immediately of any unauthorised use.",
    ],
  },
  {
    id: "use-of-services",
    title: "Acceptable Use",
    body: ["You agree to use the Services lawfully and responsibly. You must not:"],
    list: [
      { k: "Misuse the platform", v: "Interfere with, disrupt, or attempt to gain unauthorised access to the Services." },
      { k: "Infringe rights", v: "Upload content that violates intellectual property, privacy, or other rights." },
      { k: "Unlawful activity", v: "Use the Services for fraudulent, harmful, or illegal purposes." },
      { k: "Reverse engineer", v: "Copy, decompile, or resell any part of the platform without permission." },
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions & Payments",
    body: [
      "Certain features are offered on a subscription basis. Fees, billing cycles, and plan details are as described at the time of purchase. Unless stated otherwise, subscriptions renew automatically, and fees are non-refundable except where required by law. We may revise pricing with reasonable prior notice.",
    ],
  },
  {
    id: "customer-data",
    title: "Your Data & Content",
    body: [
      "You retain all rights to the business and personal data you enter into the Services (“Customer Data”). You grant us a limited licence to process Customer Data solely to provide and improve the Services. Our handling of personal data is described in our Privacy Policy.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: [
      "The Services, including all software, designs, trademarks, and content provided by JenVeda, are owned by JenVeda or its licensors and are protected by applicable laws. These Terms do not grant you any right to our intellectual property except the limited right to use the Services as permitted here.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    body: [
      "The Services may integrate with third-party tools and platforms (such as WhatsApp Business, payment providers, and analytics services). Your use of those services is governed by their own terms, and we are not responsible for their availability, content, or practices.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimers & Limitation of Liability",
    body: [
      "The Services are provided on an “as is” and “as available” basis without warranties of any kind, to the fullest extent permitted by law. To the maximum extent permitted, JenVeda shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services.",
    ],
  },
  {
    id: "termination",
    title: "Suspension & Termination",
    body: [
      "You may stop using the Services at any time. We may suspend or terminate your access if you breach these Terms or use the Services in a way that risks harm to us, other users, or third parties. Upon termination, your right to use the Services ceases, subject to any data-retention obligations described in our Privacy Policy.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. When we make material changes, we will update the “Last updated” date above and, where appropriate, notify you. Your continued use of the Services after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have questions about these Terms, please get in touch — we’re happy to help.",
    ],
  },
];

export default function TermsClient() {
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
          <div className="absolute right-[6%] top-[20%] h-[440px] w-[440px] rounded-full bg-blue-200/30 blur-[100px]" />
        </motion.div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="tag-pill">The Fine Print</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="text-fluid-h1 mt-8 font-black tracking-tight text-slate-900"
          >
            Terms of <span className="gradient-text">Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500"
          >
            These terms set out the rules for using JenVeda — what you can expect
            from us, and what we ask of you in return.
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
                href="/privacy"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-violet-600"
              >
                Read our Privacy Policy
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
