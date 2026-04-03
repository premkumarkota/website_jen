"use client";
import Link from "next/link";
import Image from "next/image";

const products = [
  { label: "HRMS", href: "/products/hrms" },
  { label: "PMS", href: "/products/pms" },
  { label: "Accounting", href: "/products/accounting" },
  { label: "Inventory", href: "/products/inventory" },
];
const legal = ["Privacy Policy", "Support Policy", "Terms of Service"];

export default function Footer() {
  return (
    <footer className="relative border-t overflow-hidden" style={{ background: "var(--bg-surface)", borderColor: "rgba(0,0,0,0.08)" }}>
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(109,40,217,0.3),transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <Image
                src="/Jenveda%20Colored%20logo.png"
                alt="Jenveda Logo"
                width={150}
                height={44}
                className="object-contain object-left"
              />
              {/* Tagline */}
              <p
                className="footer-tagline"
                style={{
                  marginTop: "14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontFamily: "'Outfit', sans-serif",
                  background: "linear-gradient(90deg, #6D28D9 0%, #D1008F 40%, #1D4ED8 70%, #6D28D9 100%)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "footer-tagline-shimmer 4s linear infinite",
                }}
              >
                Clarity{" "}
                <span style={{ WebkitTextFillColor: "transparent", opacity: 0.55 }}>•</span>
                {" "}Confidence{" "}
                <span style={{ WebkitTextFillColor: "transparent", opacity: 0.55 }}>•</span>
                {" "}Speed
              </p>

              <style>{`
                @keyframes footer-tagline-shimmer {
                  0%   { background-position: 200% center; }
                  100% { background-position: -200% center; }
                }
              `}</style>
            </div>
            <p className="text-[17.5px] leading-relaxed max-w-sm mb-8" style={{ color: "#444" }}>
              JenVeda helps Indian MSMEs manage HR, payroll, accounts, and
              inventory — without the complexity. Built in Hyderabad, trusted
              across India.
            </p>
            <div className="text-[15.5px] space-y-1.5" style={{ color: "#444" }}>
              <p className="font-bold text-lg" style={{ color: "#333" }}>Jenveda Technologies Private Limited</p>
              <p>201, Padmaja Jansi Enclave, Opp. K.S Bakers,</p>
              <p>Bhagyanagar Colony, KPHB main road,</p>
              <p>Hyderabad, Telangana 500072</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[15px] font-black tracking-widest uppercase mb-7" style={{ color: "#333" }}>
              Products
            </h4>
            <ul className="space-y-4">
              {products.map(p => (
                <li key={p.label}>
                  <Link href={p.href}
                    className="text-[17px] font-medium transition-colors flex items-center gap-3 group hover:text-violet-600"
                    style={{ color: "#444" }}
                  >
                    <span className="w-1 h-1 rounded-full"
                      style={{ background: "#444" }}
                    />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[15px] font-black tracking-widest uppercase mb-7" style={{ color: "#333" }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+917207776559"
                  className="text-[17px] font-medium flex items-center gap-3 transition-colors hover:text-violet-600"
                  style={{ color: "#444" }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (+91) 72077 76559
                </a>
              </li>
              <li>
                <a href="mailto:contact@jenveda.com"
                  className="text-[17px] font-medium flex items-center gap-3 transition-colors hover:text-violet-600"
                  style={{ color: "#444" }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@jenveda.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <div className="flex flex-wrap gap-8">
            {legal.map(l => (
              <a key={l} href="#"
                className="text-[15px] font-medium transition-colors hover:text-violet-600"
                style={{ color: "#444" }}
              >
                {l}
              </a>
            ))}
          </div>
          <p className="text-[15px] font-medium" style={{ color: "#444" }}>
            © {new Date().getFullYear()} Jenveda Technologies. Designed by{" "}
            <span style={{ background: "var(--gradient-1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 800 }}>Jenveda Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
