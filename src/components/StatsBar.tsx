"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/gsap";

const stats = [
  { end: 500,  suffix: "+",  label: "Companies Onboarded",   color: "#6D28D9" },
  { end: 5,    suffix: "",   label: "Integrated Modules",    color: "#1D4ED8" },
  { end: 99.9, suffix: "%",  label: "Uptime SLA",            color: "#D1008F", decimals: 1 },
  { end: 24,   suffix: "/7", label: "Phone & Online Support", color: "#8B5CF6" },
  { end: 100,  suffix: "%",  label: "Cloud Native",           color: "#312E81" },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const triggered  = useRef(false);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || triggered.current) return;
    triggered.current = true;

    stats.forEach((s, i) => {
      const el = numRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: s.end,
        duration: 2.4,
        delay: i * 0.15,
        ease: "power2.out",
        onUpdate() {
          const v = s.decimals ? obj.val.toFixed(s.decimals) : Math.round(obj.val);
          el.textContent = `${v}${s.suffix}`;
        },
      });
    });
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--bg-base), var(--bg-surface))" }}
    >
      {/* Subtle blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.08), transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-bold tracking-[0.2em] uppercase mb-14"
          style={{ color: "var(--text-3)" }}
        >
          Trusted by businesses across industries
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Number with colored accent */}
              <div className="relative mb-2">
                <span
                  ref={el => { numRefs.current[i] = el; }}
                  className="text-5xl md:text-6xl font-extrabold tracking-tight"
                  style={{ color: s.color }}
                >
                  0{s.suffix}
                </span>
                {/* Glow under number on hover */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: s.color }}
                />
              </div>
              <span className="text-xs font-semibold mt-1" style={{ color: "var(--text-3)" }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
