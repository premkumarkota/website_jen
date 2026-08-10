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
        <defs><linearGradient id="n-hrms" x1="0" y1="0" x2="22" y2="22"><stop stopColor="#A78BFA" /><stop offset="1" stopColor="#6D28D9" /></linearGradient></defs>
        <circle cx="11" cy="8" r="3.5" fill="url(#n-hrms)" />
        <path d="M4 19c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="url(#n-hrms)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18" cy="8" r="2.5" fill="url(#n-hrms)" fillOpacity="0.45" />
        <path d="M18 15.5c0-2.21-1.12-4.16-2.8-5.32" stroke="url(#n-hrms)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
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
        <defs><linearGradient id="n-pms" x1="0" y1="0" x2="22" y2="22"><stop stopColor="#7DD3FC" /><stop offset="1" stopColor="#0284C7" /></linearGradient></defs>
        <rect x="3" y="15" width="4" height="5" rx="1" fill="url(#n-pms)" fillOpacity="0.6" />
        <rect x="9" y="10" width="4" height="10" rx="1" fill="url(#n-pms)" fillOpacity="0.85" />
        <rect x="15" y="4" width="4" height="16" rx="1" fill="url(#n-pms)" />
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
        <defs><linearGradient id="n-acc" x1="0" y1="4" x2="22" y2="18"><stop stopColor="#6EE7B7" /><stop offset="1" stopColor="#059669" /></linearGradient></defs>
        <path d="M3 16l4.5-4.5 3.5 3.5 4-5.5 4 3" stroke="url(#n-acc)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7.5" cy="11.5" r="1.5" fill="url(#n-acc)" />
        <circle cx="11" cy="15" r="1.5" fill="url(#n-acc)" fillOpacity="0.7" />
        <circle cx="15" cy="9.5" r="1.5" fill="url(#n-acc)" fillOpacity="0.85" />
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
        <defs><linearGradient id="n-inv" x1="0" y1="0" x2="22" y2="22"><stop stopColor="#FCD34D" /><stop offset="1" stopColor="#D97706" /></linearGradient></defs>
        <path d="M11 2L20 6.5v9L11 20 2 15.5v-9L11 2z" fill="url(#n-inv)" fillOpacity="0.12" stroke="url(#n-inv)" strokeWidth="1.4" />
        <path d="M11 2l9 4.5-9 4.5-9-4.5L11 2z" fill="url(#n-inv)" fillOpacity="0.3" />
        <path d="M11 11v9M2 6.5l9 4.5M20 6.5l-9 4.5" stroke="url(#n-inv)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      </svg>
    ),
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Why JenVeda", href: "/why-jenveda" },
  { label: "Serving Industries", href: "/industries" },
  { label: "Videos", href: "/#videos" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy", desc: "How we collect & protect your data." },
  { label: "Terms of Service", href: "/terms", desc: "The rules for using JenVeda." },
  { label: "Data Deletion", href: "/data-deletion", desc: "Request removal of your data." },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);   // Solutions dropdown
  const [legalOpen, setLegalOpen] = useState(false); // Legal dropdown
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const dropRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const legalDropRef = useRef<HTMLDivElement>(null);
  const legalBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); setLegalOpen(false); setMobile(false); }, [pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropRef.current && !dropRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
      if (
        legalDropRef.current && !legalDropRef.current.contains(e.target as Node) &&
        legalBtnRef.current && !legalBtnRef.current.contains(e.target as Node)
      ) {
        setLegalOpen(false);
      }
    };
    if (open || legalOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, legalOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setLegalOpen(false); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isActive = pathname.startsWith("/products/");
  const isLegalActive = legalLinks.some((l) => l.href === pathname);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const isCurrentHome = pathname === "/" || pathname === "";
      const isTargetHome = path === "/" || path === "";

      if (isCurrentHome && isTargetHome) {
        e.preventDefault();
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          if (typeof window !== "undefined" && (window as any).lenis) {
            (window as any).lenis.scrollTo(targetEl, { offset: -80 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
        if (typeof window !== "undefined" && window.history) {
          window.history.replaceState(null, "", pathname);
        }
        setMobile(false);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || open || legalOpen || mobile ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled || open || legalOpen || mobile ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || open || legalOpen || mobile ? "blur(20px)" : "none",
          borderBottom: scrolled || open || legalOpen || mobile ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          boxShadow: scrolled || open || legalOpen || mobile ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <nav
          className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3.5"
        >
          {/* Logo + Tagline */}
          <div className="flex flex-col flex-shrink-0">
            <Link href="/" className="group flex items-center">
              <div className="relative h-12 w-[165px] transition-opacity duration-200 group-hover:opacity-80">
                <Image src="/Jenveda%20Colored%20logo.png" alt="JenVeda" fill sizes="165px" className="object-contain object-left" priority />
              </div>
            </Link>
            <div
              style={{
                marginTop: "3px",
                display: "flex",
                alignItems: "center",
                gap: "0px",
                lineHeight: 1,
              }}
            >
              {[
                { word: "Clarity", color: "#0F172A", delay: 0.2 },
                { word: "Confidence", color: "#0F172A", delay: 0.5 },
                { word: "Speed", color: "#0F172A", delay: 0.8 },
              ].map((item, i) => (
                <span key={item.word} style={{ display: "inline-flex", alignItems: "center" }}>
                  {i > 0 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.35, scale: 1 }}
                      transition={{ duration: 0.3, delay: item.delay - 0.15, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        fontSize: "8px",
                        color: "#94A3B8",
                        padding: "0 5px",
                        display: "inline-block",
                      }}
                    >
                      •
                    </motion.span>
                  )}
                  <motion.span
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: item.delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 900,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase" as const,
                      fontFamily: "'Outfit', sans-serif",
                      color: item.color,
                      display: "inline-block",
                    }}
                  >
                    {item.word}
                  </motion.span>
                </span>
              ))}
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {/* Regular links */}
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="relative block whitespace-nowrap px-3.5 py-2 text-[15.5px] font-bold group"
                    style={{ color: active ? "#6D28D9" : "#1e293b" }}
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
                onClick={() => { setOpen((v) => !v); setLegalOpen(false); }}
                className="relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-[15.5px] font-bold group"
                style={{ color: open || isActive ? "#6D28D9" : "#1e293b" }}
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

            {/* Legal trigger */}
            <li className="relative">
              <button
                ref={legalBtnRef}
                onClick={() => { setLegalOpen((v) => !v); setOpen(false); }}
                className="relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-[15.5px] font-bold group"
                style={{ color: legalOpen || isLegalActive ? "#6D28D9" : "#1e293b" }}
              >
                <motion.span
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: legalOpen || isLegalActive ? "rgba(109,40,217,0.08)" : "rgba(0,0,0,0.05)" }}
                />
                <span className="relative transition-colors duration-150 group-hover:text-slate-900">Legal</span>
                <motion.svg
                  animate={{ rotate: legalOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="relative"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {/* Legal dropdown */}
              <AnimatePresence>
                {legalOpen && (
                  <motion.div
                    ref={legalDropRef}
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.22, ease }}
                    className="absolute right-0 top-full mt-3 w-[300px] origin-top-right overflow-hidden rounded-2xl bg-white"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 60px rgba(0,0,0,0.14), 0 4px 14px rgba(0,0,0,0.06)" }}
                  >
                    <div className="border-b border-slate-100 px-5 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Legal & Policies</span>
                    </div>
                    <div className="p-2">
                      {legalLinks.map((l, i) => {
                        const active = pathname === l.href;
                        return (
                          <motion.div
                            key={l.href}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.04 + i * 0.05, ease }}
                          >
                            <Link
                              href={l.href}
                              onClick={() => setLegalOpen(false)}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                            >
                              <span
                                className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors"
                                style={{ background: active ? "#6D28D9" : "#CBD5E1" }}
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-[13.5px] font-bold transition-colors group-hover:text-violet-700"
                                  style={{ color: active ? "#6D28D9" : "#1e293b" }}
                                >
                                  {l.label}
                                </p>
                                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-500">{l.desc}</p>
                              </div>
                              <svg
                                className="ml-auto mt-1 flex-shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                width="14" height="14" viewBox="0 0 14 14" fill="none"
                              >
                                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="#6D28D9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Right CTAs */}
          <div className="hidden items-center gap-2.5 xl:flex">
            {/* Sign In — ghost button */}
            <Link
              href="https://login.jenveda.net/"
              className="relative px-4 py-2 text-[14px] font-semibold rounded-xl border transition-all duration-200 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700"
              style={{
                color: "#1e293b",
                borderColor: "rgba(15,23,42,0.15)",
                background: "transparent",
              }}
            >
              Sign In
            </Link>

            {/* Talk to Sales — pill primary CTA */}
            <motion.div
              className="rounded-full"
              whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(109,40,217,0.35)" }}
              whileTap={{ y: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-[14px] font-bold text-white transition-all duration-300"
              >
                {/* Gradient Background */}
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 transition-all duration-500 group-hover:scale-105"></span>

                {/* Shine Effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/20 blur-md rotate-12 translate-x-0 group-hover:translate-x-[250%] transition-all duration-700"></span>
                </span>

                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-1.5 transition-all duration-300 group-hover:translate-x-1">
                  Talk to Sales
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Hamburger */}
          <button
            className="flex xl:hidden items-center justify-center w-9 h-9 rounded-xl"
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
                className="absolute left-0 right-0 top-full overflow-hidden bg-white border-t border-slate-100 p-3 shadow-lg xl:hidden"
              >
                <div className="flex flex-col gap-0.5">
                  {navLinks.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="block rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                      onClick={(e) => {
                        handleNavClick(e, l.href);
                        setMobile(false);
                      }}
                    >
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
                  <p className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-slate-400">Legal</p>
                  {legalLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700" onClick={() => setMobile(false)}>
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      {l.label}
                    </Link>
                  ))}
                  <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-100">
                    <Link href="https://login.jenveda.net/" className="rounded-xl border border-slate-200 py-2.5 text-center text-[13px] font-semibold text-slate-700 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-all duration-200">Sign In</Link>
                    <Link href="/contact" className="group relative overflow-hidden rounded-full py-2.5 text-center text-[13px] font-bold text-white transition-all duration-300 shadow-md">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 transition-all duration-500 group-hover:scale-105"></span>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                        <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/20 blur-md rotate-12 translate-x-0 group-hover:translate-x-[250%] transition-all duration-700"></span>
                      </span>
                      <span className="relative z-10 flex items-center justify-center gap-2 transition-all duration-300 group-hover:translate-x-1">
                        Talk to Sales
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
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
                          <path d="M3 7h8M7.5 4l3 3-3 3" stroke={s.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
                        <path d="M2 5.5h7M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
