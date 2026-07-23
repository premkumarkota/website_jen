"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const clients = [
  { name: "Varahi Silks", src: "/vaarahi_logo.webp", industry: "Retail & Textiles", desc: "Premium silk sarees & traditional wear brand trusted across Telangana." },
  { name: "Malla Reddy University", src: "/mallareddy.jpg", industry: "Education", desc: "One of Hyderabad's leading private universities with 15,000+ students." },
  { name: "Srividya Schools", src: "/srividya.png", industry: "Education", desc: "Top-rated K-12 school chain known for academic excellence." },
  { name: "Santhosh Maruti", src: "/santhosh_maruthi.jpeg", industry: "Automotive", desc: "Authorized Maruti Suzuki dealership with multi-city operations." },
  { name: "Prithvi Toyota", src: "/prithvi_toyota.jpeg", industry: "Automotive", desc: "Trusted Toyota dealership delivering world-class service." },
  { name: "Lakshmi Toyota", src: "/lakshmi_toyota.jpg", industry: "Automotive", desc: "Premier Toyota dealer with sales, service, and spare parts." },
  { name: "Sai Balaji Techno Services", src: "/sai_balaji_techno_services.png", industry: "Technology", desc: "IT services & staffing solutions for enterprise clients." },
  { name: "M V R Constructions", src: "/mvr_constructions.jpeg", industry: "Infrastructure", desc: "Leading construction firm delivering residential & commercial projects." },
  { name: "Elite Post Tensions", src: "/elite_post_tensions.png", industry: "Infrastructure", desc: "Specialized post-tensioning solutions for modern construction." },
  { name: "Pixelin Sciences", src: "/pixelin.jpeg", industry: "Technology", desc: "Digital solutions company focused on product design & development." },
  { name: "3T Infotech", src: "/3t_infotech.jpeg", industry: "Technology", desc: "Enterprise IT consulting and managed services provider." },
];

const industryColors: Record<string, string> = {
  "Retail & Textiles": "#D1008F",
  Education: "#6D28D9",
  Automotive: "#1D4ED8",
  Technology: "#8B5CF6",
  Infrastructure: "#312E81",
};

/* ── 3D Tilt Card ── */
function ClientCard({
  client,
  index,
  onSelect,
}: {
  client: (typeof clients)[number];
  index: number;
  onSelect: (i: number, rect: DOMRect) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 250, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const handleClick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    onSelect(index, el.getBoundingClientRect());
  }, [index, onSelect]);

  const accent = industryColors[client.industry] || "#6D28D9";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[800px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.95 }}
        className="group relative cursor-pointer rounded-2xl p-5 will-change-transform"
        role="button"
        tabIndex={0}
      >
        {/* Base card bg — no border by default */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        />

        {/* Gradient border — only on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            padding: "1.5px",
            background: "linear-gradient(135deg, #6D28D9, #D1008F, #1D4ED8)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            borderRadius: "1rem",
          }}
        />

        {/* Hover glow that follows cursor */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle 120px at ${x}% ${y}%, ${accent}14, transparent 70%)`
            ),
          }}
        />

        {/* Hover shadow glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 12px 40px ${accent}12, 0 4px 12px rgba(0,0,0,0.03)`,
          }}
        />

        {/* Shine sweep on hover */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        >
          <div
            className="absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 60%)",
              animation: "shine-sweep 1.5s ease-in-out",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative" style={{ transform: "translateZ(20px)" }}>
          <div
            className="mb-3 flex h-20 items-center justify-center rounded-xl bg-white/60 overflow-hidden transition-all duration-500 group-hover:bg-white"
          >
            <Image
              src={client.src}
              alt={`${client.name} logo`}
              width={120}
              height={54}
              className="h-auto max-h-12 w-auto object-contain grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
            />
          </div>
          <p
            className="text-center text-xs font-semibold leading-5 tracking-[0.02em] line-clamp-2 transition-colors duration-300"
            style={{ color: "var(--text-2)" }}
          >
            {client.name}
          </p>
          <div className="flex justify-center mt-2">
            <span
              className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
              style={{ background: `${accent}10`, color: accent }}
            >
              {client.industry}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Expanded Modal ── */
function ExpandedCard({
  client,
  originRect,
  onClose,
}: {
  client: (typeof clients)[number];
  originRect: DOMRect;
  onClose: () => void;
}) {
  const accent = industryColors[client.industry] || "#6D28D9";
  const modules = ["HRMS", "PMS", "Accounting", "Inventory"];

  // Calculate transform origin from card center
  const originX = originRect.left + originRect.width / 2;
  const originY = originRect.top + originRect.height / 2;
  const vpW = typeof window !== "undefined" ? window.innerWidth : 1920;
  const vpH = typeof window !== "undefined" ? window.innerHeight : 1080;
  const originPctX = (originX / vpW) * 100;
  const originPctY = (originY / vpH) * 100;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="fixed inset-0 z-[100] cursor-pointer"
        style={{
          background: "rgba(10,10,30,0.45)",
          backdropFilter: "blur(16px) saturate(1.6)",
          WebkitBackdropFilter: "blur(16px) saturate(1.6)",
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.65, y: 10 }}
          transition={{
            type: "spring" as const,
            stiffness: 350,
            damping: 32,
            mass: 0.8,
          }}
          style={{
            transformOrigin: `${originPctX}% ${originPctY}%`,
          }}
          className="pointer-events-auto relative w-full max-w-lg rounded-3xl overflow-hidden"
        >
          {/* Card bg with layered shadows */}
          <div
            className="absolute inset-0"
            style={{
              background: "#fff",
              boxShadow: `
                0 0 0 1px ${accent}15,
                0 24px 80px -12px rgba(0,0,0,0.15),
                0 48px 120px -24px ${accent}20,
                0 2px 6px rgba(0,0,0,0.04)
              `,
            }}
          />

          {/* Animated gradient border top */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[3px] origin-left"
            style={{
              background: `linear-gradient(90deg, ${accent}, #D1008F, #1D4ED8)`,
            }}
          />

          {/* Inner glow */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${accent}08, transparent)`,
            }}
          />

          <div className="relative p-8 md:p-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 400,
                    damping: 24,
                    delay: 0.1,
                  }}
                  className="w-[72px] h-[72px] rounded-2xl border-2 flex items-center justify-center bg-white overflow-hidden flex-shrink-0"
                  style={{
                    borderColor: `${accent}20`,
                    boxShadow: `0 8px 24px ${accent}10`,
                  }}
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={200}
                    height={90}
                    className="h-auto max-h-12 w-auto object-contain"
                  />
                </motion.div>
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl font-bold tracking-tight"
                    style={{ color: "var(--text-1)" }}
                  >
                    {client.name}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-1.5 inline-flex items-center gap-1.5"
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-pulse-soft"
                      style={{ background: accent }}
                    />
                    <span className="text-xs font-semibold tracking-wide" style={{ color: accent }}>
                      {client.industry}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:rotate-90 flex-shrink-0"
                style={{ color: "var(--text-3)" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="h-px mb-7 origin-left"
              style={{ background: "rgba(0,0,0,0.06)" }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] leading-[1.75] mb-8"
              style={{ color: "var(--text-2)" }}
            >
              {client.desc}
            </motion.p>

            {/* Modules */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4"
                style={{ color: "var(--text-3)" }}
              >
                Modules Deployed
              </p>
              <div className="flex flex-wrap gap-2.5">
                {modules.map((mod, i) => (
                  <motion.span
                    key={mod}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 400,
                      damping: 22,
                      delay: 0.35 + i * 0.06,
                    }}
                    className="px-4 py-2 rounded-xl text-[12px] font-semibold cursor-default transition-all duration-300 hover:scale-105"
                    style={{
                      background: `${accent}08`,
                      color: accent,
                      border: `1px solid ${accent}15`,
                      boxShadow: `0 2px 8px ${accent}06`,
                    }}
                  >
                    {mod}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 pt-6"
              style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
            >
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                style={{ color: accent }}
              >
                Learn how we helped {client.name}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ── Main Section ── */
export default function Clients() {
  const [selected, setSelected] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const handleSelect = useCallback((index: number, rect: DOMRect) => {
    setOriginRect(rect);
    setSelected(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <section
      id="clients"
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "linear-gradient(180deg, var(--bg-surface), var(--bg-base))" }}
    >
      {/* Shine sweep & Marquee keyframes */}
      <style>{`
        @keyframes shine-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(109,40,217,0.10), rgba(209,0,143,0.06) 42%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <span className="tag-pill">Trusted Clients</span>
          <h2
            className="mt-5 text-4xl md:text-5xl font-extrabold tracking-[-0.03em]"
            style={{ color: "var(--text-1)" }}
          >
            Trusted by Industry Leaders
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base md:text-lg"
            style={{ color: "var(--text-2)" }}
          >
            Partnering with education, automotive, infrastructure, and enterprise brands.
          </p>
        </motion.div>

        {/* Horizontal Marquee Container */}
        <div 
          className="relative mt-12 flex overflow-hidden w-full"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div 
            className="flex w-max gap-4 hover:[animation-play-state:paused]"
            style={{ animation: 'scroll-x 60s linear infinite' }}
          >
            {/* Duplicate the list 4 times for infinite scroll on ultra-wide screens */}
            {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
              <div 
                key={`${client.name}-${index}`} 
                className="w-[200px] sm:w-[220px] md:w-[260px] shrink-0"
              >
                <ClientCard
                  client={client}
                  index={index % clients.length}
                  onSelect={handleSelect}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence mode="wait">
        {selected !== null && originRect && (
          <ExpandedCard
            key={selected}
            client={clients[selected]}
            originRect={originRect}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
