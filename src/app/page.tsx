import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Clients from "@/components/Clients";
import ERPSolution from "@/components/ERPSolution";
import Features from "@/components/Features";
import SecurityCompliance from "@/components/SecurityCompliance";
import CTA from "@/components/CTA";
import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  return (
    <>
      {/* Hero is always visible — no reveal wrapper */}
      <Hero />

      {/* Every subsequent section rises up into view as you scroll */}
      <SectionReveal><StatsBar /></SectionReveal>
      <SectionReveal><Clients /></SectionReveal>
      <SectionReveal><ERPSolution /></SectionReveal>
      <SectionReveal><Features /></SectionReveal>
      <SectionReveal><SecurityCompliance /></SectionReveal>
      <SectionReveal><CTA /></SectionReveal>
    </>
  );
}
