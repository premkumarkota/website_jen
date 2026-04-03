"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const solutions = [
  {
    label: "HRMS",
    title: "Human Resource Management",
    desc: "Payroll, attendance, leave, and employee lifecycle — all automated.",
    href: "/products/hrms",
    color: "#7C3AED",
    bg: "#F5F3FF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <defs><linearGradient id="n-hrms" x1="0" y1="0" x2="22" y2="22"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#6D28D9"/></linearGradient></defs>
        <circle cx="11" cy="8" r="3.5" fill="url(#n-hrms)"/>
        <path d="M4 19c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="url(#n-hrms)" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="18" cy="8" r="2.5" fill="url(#n-hrms)" fillOpacity="0.45"/>
        <path d="M18 15.5c0-2.21-1.12-4.16-2.8-5.32" stroke="url(#n-hrms)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
      </svg>
    ),
  },
  {
    label: "PMS",
    title: "Project Management",
    desc: "Kanban, sprints, timelines, and resource planning in one view.",
    href: "/products/pms",
    color: "#0284C7",
    bg: "#F0F9FF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <defs><linearGradient id="n-pms" x1="0" y1="0" x2="22" y2="22"><stop stopColor="#7DD3FC"/><stop offset="1" stopColor="#0284C7"/></linearGradient></defs>
        <rect x="3" y="15" width="4" height="5" rx="1" fill="url(#n-pms)" fillOpacity="0.6"/>
        <rect x="9" y="10" width="4" height="10" rx="1" fill="url(#n-pms)" fillOpacity="0.85"/>
        <rect x="15" y="4" width="4" height="16" rx="1" fill="url(#n-pms)"/>
      </svg>
    ),
  },
  {
    label: "Accounting",
    title: "Financial Accounting",
    desc: "Invoices, expenses, GST reports, and real-time P&L consolidated.",
    href: "/products/accounting",
    color: "#059669",
    bg: "#ECFDF5",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <defs><linearGradient id="n-acc" x1="0" y1="4" x2="22" y2="18"><stop stopColor="#6EE7B7"/><stop offset="1" stopColor="#059669"/></linearGradient></defs>
        <path d="M3 16l4.5-4.5 3.5 3.5 4-5.5 4 3" stroke="url(#n-acc)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7.5" cy="11.5" r="1.5" fill="url(#n-acc)"/>
        <circle cx="11" cy="15" r="1.5" fill="url(#n-acc)" fillOpacity="0.7"/>
        <circle cx="15" cy="9.5" r="1.5" fill="url(#n-acc)" fillOpacity="0.85"/>
      </svg>
    ),
  },
  {
    label: "Inventory",
    title: "Inventory Management",
    desc: "Real-time stock levels, auto-replenishment, and multi-warehouse control.",
    href: "/products/inventory",
    color: "#D97706",
    bg: "#FFFBEB",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <defs><linearGradient id="n-inv" x1="0" y1="0" x2="22" y2="22"><stop stopColor="#FCD34D"/><stop offset="1" stopColor="#D97706"/></linearGradient></defs>
        <path d="M11 2L20 6.5v9L11 20 2 15.5v-9L11 2z" fill="url(#n-inv)" fillOpacity="0.12" stroke="url(#n-inv)" strokeWidth="1.4"/>
        <path d="M11 2l9 4.5-9 4.5-9-4.5L11 2z" fill="url(#n-inv)" fillOpacity="0.3"/>
        <path d="M11 11v9M2 6.5l9 4.5M20 6.5l-9 4.5" stroke="url(#n-inv)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"/>
      </svg>
    ),
  },
];

const navLinks = [
  { label: "Home",         href: "/" },
  { label: "Why JenVeda",  href: "/why-jenveda" },
  { label: "Industries",   href: "/industries" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [open,      setOpen]      = useState(false);   // Solutions dropdown
  const [mobile,    setMobile]    = useState(false);
  const pathname = usePathname();
  const dropRef  = useRef<HTMLDivElement>(null);
  const btnRef   = useRef<HTMLButtonElement>(null);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); setMobile(false); }, [pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropRef.current  && !dropRef.current.contains(e.target as Node) &&
        btnRef.current   && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isActive = pathname.startsWith("/products/");

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || open || mobile ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled || open || mobile ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || open || mobile ? "blur(20px)" : "none",
          borderBottom: scrolled || open || mobile ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          boxShadow: scrolled || open || mobile ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <nav
          className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3.5"
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center flex-shrink-0">
            <div className="relative h-10 w-[138px] transition-opacity duration-200 group-hover:opacity-80">
              <Image src="/jenveda%20logo%201.png" alt="JenVeda" fill sizes="138px" className="object-contain object-left" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {/* Regular links */}
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="relative block px-3.5 py-2 text-[13.5px] font-semibold group"
                    style={{ color: active ? "#6D28D9" : "#475569" }}
                  >
                    {/* Hover background pill */}
                    <motion.span
                      className="absolute inset-0 rounded-xl"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: active ? "rgba(109,40,217,0.08)" : "rgba(0,0,0,0.05)" }}
                    />
                    {/* Active underline */}
                    {active && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full"
                        style={{ background: "var(--gradient-1)" }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative transition-colors duration-150 group-hover:text-slate-900" style={{ color: active ? "#6D28D9" : undefined }}>
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}

            {/* Solutions trigger */}
            <li className="relative">
              <button
                ref={btnRef}
                onClick={() => setOpen((v) => !v)}
                className="relative flex items-center gap-1.5 px-3.5 py-2 text-[13.5px] font-semibold group"
                style={{ color: open || isActive ? "#6D28D9" : "#475569" }}
              >
                <motion.span
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: open || isActive ? "rgba(109,40,217,0.08)" : "rgba(0,0,0,0.05)" }}
                />
                <span className="relative transition-colors duration-150 group-hover:text-slate-900">Solutions</span>
                <motion.svg
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="relative"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
            </li>
          </ul>

          {/* Right CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="https://login.jenveda.net/"
              className="relative px-4 py-2 text-[13px] font-semibold text-slate-600 group"
            >
              <motion.span
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0, scale: 0.85 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: "rgba(0,0,0,0.05)" }}
              />
              <span className="relative transition-colors duration-150 group-hover:text-violet-600">Sign In</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6D28D9, #4F46E5)" }}
            >
              Talk to Sales
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: "rgba(109,40,217,0.07)" }}
            onClick={() => setMobile(!mobile)}
          >
            <div className="flex w-4 flex-col gap-[5px]">
              <span className={`block h-[1.5px] rounded bg-slate-700 transition-all duration-300 ${mobile ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] rounded bg-slate-700 transition-all duration-300 ${mobile ? "opacity-0" : ""}`} />
              <span className={`block h-[1.5px] rounded bg-slate-700 transition-all duration-300 ${mobile ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </div>
          </button>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease }}
                className="absolute left-0 right-0 top-full overflow-hidden bg-white border-t border-slate-100 p-3 shadow-lg md:hidden"
              >
                <div className="flex flex-col gap-0.5">
                  {navLinks.map((l) => (
                    <Link key={l.label} href={l.href} className="block rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50" onClick={() => setMobile(false)}>
                      {l.label}
                    </Link>
                  ))}
                  <p className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-slate-400">Solutions</p>
                  {solutions.map((s) => (
                    <Link key={s.label} href={s.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700" onClick={() => setMobile(false)}>
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      {s.label}
                    </Link>
                  ))}
                  <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-100">
                    <Link href="https://login.jenveda.net/" className="rounded-xl border border-slate-200 py-2.5 text-center text-[13px] font-semibold text-slate-700">Sign In</Link>
                    <Link href="/contact" className="rounded-xl py-2.5 text-center text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #6D28D9, #4F46E5)" }}>Talk to Sales</Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>


      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(10,10,30,0.35)", backdropFilter: "blur(2px)" }}
          />
        )}
      </AnimatePresence>

      {/* ── Deel-style Mega Dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mega"
            ref={dropRef}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-x-0 top-[72px] z-50 mx-auto max-w-5xl px-4"
          >
            <div
              className="overflow-hidden rounded-2xl bg-white"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              {/* Header label */}
              <div className="flex items-center gap-2 border-b border-slate-100 px-7 py-3.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">What We Offer</span>
              </div>

              {/* Body */}
              <div className="flex">

                {/* Left: 2×2 solution cards */}
                <div className="flex-1 grid grid-cols-2 gap-1 p-4">
                  {solutions.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.06, ease }}
                    >
                      <Link
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-start gap-3.5 rounded-xl p-4 transition-all duration-200 hover:bg-slate-50"
                      >
                        {/* Icon box */}
                        <div
                          className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                          style={{ background: s.bg }}
                        >
                          {s.icon}
                        </div>

                        {/* Text */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-[13px] font-bold text-slate-800 group-hover:text-violet-700 transition-colors">
                              {s.title}
                            </p>
                          </div>
                          <p className="text-[11.5px] leading-snug text-slate-500">
                            {s.desc}
                          </p>
                        </div>

                        {/* Arrow */}
                        <svg
                          className="ml-auto mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                        >
                          <path d="M3 7h8M7.5 4l3 3-3 3" stroke={s.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Right: preview panel */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1, ease }}
                  className="w-[240px] flex-shrink-0 border-l border-slate-100 flex flex-col overflow-hidden"
                  style={{ background: "linear-gradient(160deg, #F5F3FF 0%, #EFF6FF 100%)" }}
                >
                  {/* Dashboard image */}
                  <div className="relative flex-1 overflow-hidden mx-4 mt-4 rounded-xl border border-white/60 shadow-md">
                    <Image
                      src="/jenveda_dashboard.png"
                      alt="JenVeda Platform Preview"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30" />
                  </div>

                  {/* Caption */}
                  <div className="px-4 py-4">
                    <p className="text-[12px] font-bold text-slate-800">JenVeda Platform</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      One login. Every module. Real-time data.
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-violet-600 hover:text-violet-800 transition-colors"
                    >
                      Request a demo
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2 5.5h7M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Bottom bar */}
              <div
                className="flex items-center gap-6 border-t border-slate-100 px-7 py-3.5"
                style={{ background: "#FAFAFA" }}
              >
                <Link href="/contact" onClick={() => setOpen(false)} className="text-[12px] font-semibold text-slate-600 hover:text-violet-600 transition-colors">
                  Book a Demo
                </Link>
                <div className="w-px h-3.5 bg-slate-200" />
                <Link href="/about" onClick={() => setOpen(false)} className="text-[12px] font-semibold text-slate-600 hover:text-violet-600 transition-colors">
                  About JenVeda
                </Link>
                <div className="w-px h-3.5 bg-slate-200" />
                <Link href="/contact" onClick={() => setOpen(false)} className="text-[12px] font-semibold text-slate-600 hover:text-violet-600 transition-colors">
                  Contact Sales
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
