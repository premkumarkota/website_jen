"use client";
import { useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────
   SPRING CONFIG — smooth but snappy, no jank
───────────────────────────────────────────────────────── */
const SPRING = { stiffness: 80, damping: 20, restDelta: 0.001 } as const;

/* ─────────────────────────────────────────────────────────
   HOOK — derive a springified Y translate from scroll progress
   speed: 0 = static, 1 = moves at full scroll speed
───────────────────────────────────────────────────────── */
export function useParallaxY(
  scrollYProgress: MotionValue<number>,
  speed = 0.3,
  range = 300          // max pixel travel (responsive: keep small)
): MotionValue<number> {
  const raw = useTransform(scrollYProgress, [0, 1], [0, range * speed]);
  return useSpring(raw, SPRING);
}

/* ─────────────────────────────────────────────────────────
   PARALLAX BACKGROUND — fixed-size image layer
   Moves slower than scroll → depth illusion
───────────────────────────────────────────────────────── */
interface ParallaxBgProps {
  src: string;
  alt?: string;
  speed?: number;         // 0.2 = moves 20% of scroll range
  overlayOpacity?: number;
  scrollYProgress: MotionValue<number>;
}

export function ParallaxBackground({
  src,
  alt = "",
  speed = 0.25,
  overlayOpacity = 0.55,
  scrollYProgress,
}: ParallaxBgProps) {
  const y = useParallaxY(scrollYProgress, speed, 320);

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 -z-20 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Background image — slightly oversized so parallax never reveals edges */}
      <motion.div
        className="absolute inset-0 scale-[1.18] origin-center"
        style={{ y, willChange: "transform" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Gradient overlay — keeps text readable */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(255,255,255,${overlayOpacity}) 0%,
            rgba(255,255,255,${overlayOpacity - 0.05}) 60%,
            rgba(255,255,255,${overlayOpacity + 0.1}) 100%
          )`,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   PARALLAX LAYER — mid-layer (blobs, decorations)
   Moves at medium speed between bg and fg
───────────────────────────────────────────────────────── */
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  scrollYProgress: MotionValue<number>;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  scrollYProgress,
}: ParallaxLayerProps) {
  const y = useParallaxY(scrollYProgress, speed, 200);

  return (
    <motion.div
      className={className}
      style={{ y, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   PARALLAX SECTION — root wrapper
   Tracks scroll progress, provides scrollYProgress ref
   via render prop so children can opt-in to parallax
───────────────────────────────────────────────────────── */
interface ParallaxSectionProps {
  children: (scrollYProgress: MotionValue<number>) => ReactNode;
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  className = "",
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = element top hits viewport top, 1 = element bottom hits viewport top
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      {children(scrollYProgress)}
    </section>
  );
}
