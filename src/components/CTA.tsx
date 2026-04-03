"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/gsap";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const blob1Ref   = useRef<HTMLDivElement>(null);
  const blob2Ref   = useRef<HTMLDivElement>(null);
  const inViewRef  = useRef(null);
  const inView     = useInView(inViewRef, { once: true, margin: "-80px" });
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const { ScrollTrigger } = require("gsap/ScrollTrigger");
      gsap.to(blob1Ref.current, {
        yPercent: -30, xPercent: 8, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.6 },
      });
      gsap.to(blob2Ref.current, {
        yPercent: -20, xPercent: -6, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 relative overflow-hidden" style={{ background:"var(--bg-base)" }}>
      {/* Full-section subtle glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.04), transparent)" }}
      />
      <div className="absolute inset-0 grid-bg" />

      <div ref={inViewRef} className="max-w-5xl mx-auto relative">
        {/* Card */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background:"linear-gradient(135deg,#EFF6FF 0%,#EEF2FF 50%,#F0FDFA 100%)", border:"1px solid rgba(37,99,235,0.15)", boxShadow:"0 20px 60px rgba(37,99,235,0.1)" }}
        >
          {/* Top glow border */}
          <div className="absolute top-0 inset-x-0 h-px"
            style={{ background:"linear-gradient(90deg,transparent,rgba(37,99,235,0.4),rgba(79,70,229,0.35),transparent)" }}
          />

          {/* Parallax blobs inside card */}
          <div ref={blob1Ref} className="absolute -top-32 -right-32 w-80 h-80 rounded-full will-change-transform pointer-events-none"
            style={{ background:"radial-gradient(circle,rgba(37,99,235,0.12),transparent 70%)", filter:"blur(60px)" }}
          />
          <div ref={blob2Ref} className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full will-change-transform pointer-events-none"
            style={{ background:"radial-gradient(circle,rgba(79,70,229,0.1),transparent 70%)", filter:"blur(60px)" }}
          />

          {/* Grid inside card */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="relative px-8 md:px-16 py-18 text-center" style={{ padding:"4.5rem 4rem" }}>

            <motion.div
              initial={{ opacity:0, y:14 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.5, delay:0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-7"
              style={{ background:"rgba(37,99,235,0.07)", borderColor:"rgba(37,99,235,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color:"#2563EB" }}>Start Today, Free</span>
            </motion.div>

            <motion.h2
              initial={{ opacity:0, y:22 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.65, delay:0.18 }}
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight mb-5"
              style={{ color:"var(--text-1)" }}
            >
              See JenVeda Working{" "}
              <span className="gradient-text">for Your Business</span>
            </motion.h2>

            <motion.p
              initial={{ opacity:0, y:18 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.28 }}
              className="text-base mb-10 max-w-lg mx-auto"
              style={{ color:"var(--text-2)" }}
            >
              Join 500+ Indian businesses already saving time on payroll,
              accounts, and daily operations.
            </motion.p>

            {/* Email form */}
            <motion.form
              initial={{ opacity:0, y:18 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.38 }}
              onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              {submitted ? (
                <div className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-semibold"
                  style={{ background:"rgba(5,150,105,0.07)", borderColor:"rgba(5,150,105,0.2)", color:"#059669" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  We&apos;ll be in touch soon!
                </div>
              ) : (
                <>
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="flex-1 px-5 py-3.5 text-sm rounded-xl outline-none transition-all duration-200"
                    style={{
                      background:"rgba(255,255,255,0.8)", border:"1px solid rgba(0,0,0,0.12)",
                      color:"var(--text-1)", caretColor:"#2563EB",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
                  />
                  <button type="submit"
                    className="btn-primary group flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl whitespace-nowrap overflow-hidden"
                  >
                    <span className="relative z-10">Book My Free Demo</span>
                    <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </>
              )}
            </motion.form>

            <motion.p
              initial={{ opacity:0 }}
              animate={inView ? { opacity:1 } : {}}
              transition={{ duration:0.6, delay:0.5 }}
              className="mt-4 text-xs"
              style={{ color:"var(--text-3)" }}
            >
              No credit card · Free setup help · Cancel anytime
            </motion.p>

            {/* Divider */}
            <div className="my-12 h-px" style={{ background:"rgba(0,0,0,0.08)" }} />

            {/* Contact info */}
            <motion.div
              initial={{ opacity:0, y:14 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              {[
                { href:"tel:+917207776559", label:"(+91) 72077 76559",
                  icon:<path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> },
                { href:"mailto:Jenvedatech@gmail.com", label:"Jenvedatech@gmail.com",
                  icon:<path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
              ].map(item => (
                <a key={item.label} href={item.href}
                  className="flex items-center gap-2.5 text-sm transition-colors"
                  style={{ color:"var(--text-2)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#2563EB")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background:"rgba(37,99,235,0.08)", color:"#2563EB" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {item.icon}
                    </svg>
                  </div>
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-2.5 text-sm" style={{ color:"var(--text-2)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background:"rgba(37,99,235,0.08)", color:"#2563EB" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Hyderabad, Telangana
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
