"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

type Feature = {
  title: string;
  description: string;
  items?: string[];
  icon?: React.ReactNode;
};

type ProductPageProps = {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  features: Feature[];
  ctaText?: string;
  accentColor: string;
};

export default function ProductPageLayout({
  badge,
  title,
  titleAccent,
  subtitle,
  description,
  features,
  ctaText = "Get Started Today",
  accentColor,
}: ProductPageProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">
        {/* Background Sophistication */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.08]"
            style={{
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
              filter: "blur(120px)"
            }}
          />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag-pill mx-auto mb-8"
          >
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-fluid-h1 font-black tracking-tight text-slate-900"
          >
            {title} <br />
            <span className="gradient-text">{titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-8 text-[22px] font-bold text-black max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 text-[19px] font-medium leading-relaxed text-black max-w-3xl mx-auto"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <Link href="/contact" className="btn-enterprise">
              Request Full Demo
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50">
              View All Modules
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Navigation / Interactive Showcase */}
      <section className="py-24 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Tab Sidebar */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">Key Capabilities</h2>
              {features.map((feature, i) => (
                <button
                  key={feature.title}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex items-center gap-4 rounded-2xl p-5 text-left transition-all duration-300 ${activeTab === i
                      ? "bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                      : "hover:bg-white/50"
                    }`}
                >
                  {activeTab === i && (
                    <motion.div
                      layoutId="active-light"
                      className="absolute left-0 w-1 h-8 rounded-full"
                      style={{ background: accentColor }}
                    />
                  )}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${activeTab === i ? "bg-violet-100 text-violet-600" : "bg-slate-100 text-slate-400"
                      }`}
                  >
                    <span className="text-[14px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className={`text-[17.5px] font-bold transition-colors ${activeTab === i ? "text-slate-900" : "text-slate-500"}`}>
                      {feature.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="flex-1 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease }}
                  className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-1">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight">{features[activeTab].title}</h4>
                      <p className="mt-6 text-[18px] leading-relaxed font-medium text-black">
                        {features[activeTab].description}
                      </p>

                      <div className="mt-10 space-y-4">
                        {features[activeTab].items?.map((item) => (
                          <div key={item} className="flex items-center gap-3 text-[16.5px] font-bold text-black">
                            <div className="h-5.5 w-5.5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 relative aspect-square md:aspect-auto md:h-[320px] rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center group">
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }} />
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Interface Preview Unavailable</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Empowering industry leaders with {title}</p>
          <div className="flex gap-10 grayscale opacity-40">
            <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Product Footer CTA */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl bg-slate-900 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(109,40,217,0.3) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative z-10">
            <h2 className="text-fluid-h2 text-white font-black">{ctaText}</h2>
            <p className="mt-8 text-slate-300 text-[20px] font-medium max-w-2xl mx-auto">
              Join 50+ enterprises leveraging JenVeda to drive operational efficiency and growth.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-enterprise">
                Book a Personalized Workshop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
