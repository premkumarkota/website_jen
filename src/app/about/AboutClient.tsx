"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 px-6 md:px-12">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 pointer-events-none opacity-40">
           <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-violet-100/50 rounded-full blur-[100px]" />
           <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[80px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="tag-pill">Defining the Standard</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="text-fluid-h1 mt-8 font-black tracking-tight text-slate-900"
            >
              Enterprise Excellence <br />
              <span className="gradient-text">Engineered by JenVeda</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-8 text-xl text-slate-500 leading-relaxed max-w-xl"
            >
              JenVeda was founded on a simple premise: that complex enterprise 
              management should be intuitive, unified, and infinitely scalable.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2, ease }}
               className="mt-12 flex flex-wrap gap-5"
            >
               <Link href="/contact" className="btn-enterprise">Partner With Us</Link>
               <Link href="/#features" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-violet-600 transition-colors">
                  Explore Capabilities
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
               </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
             <div className="aspect-square relative rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl">
                <Image 
                  src="/hero_office.jpg" 
                  alt="JenVeda Corporate Hub" 
                  fill 
                  className="object-cover" 
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
             </div>
             
             {/* Floating Trust Card */}
             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-50 max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                   <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Authority</p>
                      <p className="text-lg font-black text-slate-900">100% Reliable</p>
                   </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">Engineered for absolute performance and zero-downtime operations.</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
               <span className="tag-pill">Internal Culture</span>
               <h2 className="text-fluid-h2 mt-6 font-black tracking-tight text-slate-900">
                  Driven by <br />
                  <span className="gradient-text">Core Values</span>
               </h2>
               <p className="mt-6 text-slate-500 leading-relaxed">
                  We don&apos;t just build software; we build the foundations upon which our 
                  clients grow their legacies.
               </p>
            </div>
            
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
               {[
                 { title: "Innovation", desc: "Constant iteration on our core engine to stay ahead of market shifts." },
                 { title: "Integrity", desc: "Absolute transparency in our SLA and data management policies." },
                 { title: "Precision", desc: "Every line of code is optimized for enterprise-scale performance." },
                 { title: "Support", desc: "World-class engineering support available 24/7 for every partner." }
               ].map((v, i) => (
                 <motion.div 
                    key={v.title}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                 >
                    <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
                    <p className="mt-4 text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[48px] bg-[#020410] p-12 md:p-24 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
           <div className="relative z-10">
              <h2 className="text-fluid-h2 font-black text-white">Join the Next Generation of SaaS</h2>
              <p className="mt-8 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                 Schedule a consultative session with our solutions architects to see how 
                 JenVeda can transform your organizational workflow.
              </p>
              <div className="mt-12 flex justify-center gap-6">
                 <Link href="/contact" className="btn-enterprise">Schedule Consultation</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
