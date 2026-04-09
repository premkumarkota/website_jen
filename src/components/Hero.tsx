"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import ParallaxSection, {
  ParallaxBackground,
  ParallaxLayer,
} from "@/components/ParallaxSection";

const ease = [0.22, 1, 0.36, 1] as const;

const clients = [
  { src: "/lakshmi_toyota.jpg", alt: "Lakshmi Toyota" },
  { src: "/mallareddy.jpg", alt: "Mallareddy" },
  { src: "/mvr_constructions.jpeg", alt: "MVR Constructions" },
  { src: "/santhosh_maruthi.jpeg", alt: "Santhosh Maruthi" },
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── GSAP: content fades + scales out on scroll (Apple effect) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-content", {
        opacity: 0,
        y: -40,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "20% top",
          end: "80% top",
          scrub: 1.2,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <ParallaxSection
      id="home"
      className="flex min-h-[100dvh] items-center bg-white"
    >
      {(scrollYProgress) => (
        <>
          {/* ── LAYER 1 (deepest): parallax background image ── */}
          {/* Moves at 25% of scroll speed — slowest, furthest back */}
          <ParallaxBackground
            src="/parallax_background_image.png"
            speed={0.25}
            overlayOpacity={0.72}
            scrollYProgress={scrollYProgress}
          />

          {/* ── LAYER 2 (mid): gradient blobs ── */}
          {/* Moves at 50% of scroll speed — between bg and fg */}
          <ParallaxLayer
            speed={0.5}
            scrollYProgress={scrollYProgress}
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div
              className="absolute left-[5%] top-[15%] h-[480px] w-[480px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 70%)",
                filter: "blur(90px)",
              }}
            />
            <div
              className="absolute right-[10%] bottom-[20%] h-[360px] w-[360px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(209,0,143,0.06) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.28]"
              style={{
                backgroundImage: "radial-gradient(rgba(109,40,217,0.18) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </ParallaxLayer>

          {/* ── LAYER 3 (foreground): hero content ── */}
          {/* Stays at normal scroll speed — closest to viewer */}
          <div
            ref={contentRef}
            className="hero-content relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 md:pt-36 lg:pt-40"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="mx-auto max-w-3xl text-center lg:max-w-5xl">
              <div className="flex flex-col items-center">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <div
                    className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold sm:mb-7 sm:px-3.5 sm:text-[12px]"
                    style={{
                      background: "rgba(109,40,217,0.07)",
                      border: "1px solid rgba(109,40,217,0.15)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full flex-shrink-0"
                      style={{ background: "var(--gradient-1)" }}
                    />
                    <span className="gradient-text">The Modern ERP for Growing Businesses</span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1, ease }}
                  className="text-center text-[2.35rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-slate-900 sm:text-[3.25rem] lg:text-[3.8rem] xl:text-[4.15rem]"
                  style={{ textWrap: "balance" }}
                >
                  Run Your Business
                  <br />
                  <span className="gradient-text block lg:whitespace-nowrap">with Clarity, Control, and Confidence.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                  className="mt-5 max-w-[34rem] px-1 text-center text-[17px] font-medium leading-relaxed text-black sm:mt-6 sm:text-[20px]"
                  style={{ textWrap: "balance" }}
                >
                  JenVeda handles your HR, payroll, accounts, and inventory — so
                  you spend less time chasing data and more time growing your business.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.3, ease }}
                  className="mt-9 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4"
                >
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg sm:w-auto"
                    style={{
                      background: "linear-gradient(135deg, #6D28D9, #4F46E5)",
                      boxShadow: "0 4px 20px rgba(109,40,217,0.3)",
                    }}
                  >
                    Book a Free Demo
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7.5 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link
                    href="#products"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3 text-[15px] font-semibold text-slate-700 backdrop-blur-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 sm:w-auto"
                  >
                    See What&apos;s Inside
                  </Link>
                </motion.div>

                {/* Trust bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease }}
                  className="mt-10 flex w-full flex-col items-center gap-3"
                >
                  <p className="px-2 text-center text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 sm:text-[14px]">
                    Trusted by 50+ Indian businesses
                  </p>
                  <div className="grid w-full max-w-[18rem] grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center">
                    {clients.map((c) => (
                      <div
                        key={c.alt}
                        className="relative h-14 w-full overflow-hidden rounded-lg grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 sm:h-16 sm:w-32"
                      >
                        <Image src={c.src} alt={c.alt} fill sizes="(max-width: 640px) 40vw, 128px" className="object-contain" />
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </>
      )}
    </ParallaxSection>
  );
}
