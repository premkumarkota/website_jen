"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const ease = [0.22, 1, 0.36, 1] as const;

const clients = [
  { src: "/lakshmi_toyota.jpg",     alt: "Lakshmi Toyota"     },
  { src: "/mallareddy.jpg",         alt: "Mallareddy"         },
  { src: "/mvr_constructions.jpeg", alt: "MVR Constructions"  },
  { src: "/3t_infotech.jpeg",       alt: "3T Infotech"        },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blob parallax
      gsap.to(".hero-blob", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Apple effect: hero content fades + scales down as you scroll away
      gsap.to(".hero-content", {
        opacity: 0,
        y: -40,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "80% top",
          scrub: 1.2,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-white"
    >
      {/* Background blobs */}
      <div className="hero-blob pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[5%] top-[15%] h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.09) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
        <div
          className="absolute right-[10%] bottom-[20%] h-[360px] w-[360px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(109,40,217,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-16 md:pt-36 lg:pt-40" style={{ willChange: "transform, opacity" }}>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] xl:gap-16">

          {/* ── LEFT ── */}
          <div className="flex flex-col items-start">

            {/* Announcement badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <div
                className="mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                style={{
                  background: "rgba(109,40,217,0.07)",
                  border: "1px solid rgba(109,40,217,0.15)",
                  color: "#6D28D9",
                }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
                Enterprise-Grade Cloud ERP · Now Available
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
              className="text-[2.8rem] font-extrabold leading-[1.12] tracking-[-0.025em] text-slate-900 sm:text-[3.4rem] lg:text-[4rem]"
            >
              Run Your Entire{" "}
              <br className="hidden sm:block" />
              Business on{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One Platform
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-slate-500"
            >
              JenVeda unifies HRMS, Project Management, Accounting, and Inventory
              into one intelligent ERP — giving your team real-time visibility
              and the tools to scale with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #6D28D9, #4F46E5)",
                  boxShadow: "0 4px 20px rgba(109,40,217,0.3)",
                }}
              >
                Request a Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="#products"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-semibold text-slate-700 transition-all duration-200 hover:border-violet-200 hover:text-violet-700 hover:bg-violet-50"
              >
                Explore Modules
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-10 flex flex-col gap-3"
            >
              <p className="text-[12px] font-semibold uppercase tracking-widest text-slate-400">
                Trusted by leading businesses
              </p>
              <div className="flex items-center gap-2">
                {clients.map((c) => (
                  <div
                    key={c.alt}
                    className="h-16 w-32 relative flex-shrink-0 overflow-hidden rounded-lg grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  >
                    <Image src={c.src} alt={c.alt} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Dashboard ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main window */}
            <div
              className="relative overflow-hidden rounded-2xl bg-white"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 32px 80px -12px rgba(15,23,42,0.14), 0 4px 16px -4px rgba(0,0,0,0.06)",
              }}
            >
              {/* Chrome bar */}
              <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div
                  className="ml-2 flex h-5 flex-1 max-w-[180px] items-center gap-1.5 rounded-md px-2.5"
                  style={{ background: "rgba(0,0,0,0.05)" }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <span className="text-[9px] text-slate-400 font-medium">app.jenveda.net</span>
                </div>
              </div>

              {/* Dashboard screenshot */}
              <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ minHeight: 340 }}>
                <Image
                  src="/jenveda_dashboard.png"
                  alt="JenVeda Dashboard"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom fade */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>

            {/* Float badge — left */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-[22%] rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                  <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Efficiency</p>
                  <p className="text-[15px] font-extrabold text-slate-900">+42.8%</p>
                </div>
              </div>
            </motion.div>

            {/* Float badge — right */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-8 bottom-[22%] rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                  <svg className="h-4 w-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Automation</p>
                  <p className="text-[15px] font-extrabold text-slate-900">Scale ×5</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative ring */}
            <div
              className="absolute -inset-4 -z-10 rounded-3xl opacity-30"
              style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, transparent 70%)" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
