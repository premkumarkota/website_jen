const items = [
  "HRMS", "✦", "Project Management", "✦",
  "Accounting", "✦", "Inventory", "✦", "JenSuite ERP", "✦",
  "Cloud Native", "✦", "SaaS Platform", "✦", "Mobile App", "✦",
];

function Track({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`flex gap-10 whitespace-nowrap ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
      {doubled.map((item, i) => (
        <span key={i}
          className={`text-sm font-semibold tracking-[0.15em] uppercase flex-shrink-0`}
          style={{ color: item === "✦" ? "var(--accent-1)" : "var(--text-3)" }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative py-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.06), rgba(209,0,143,0.04), rgba(29,78,216,0.04))" }}
    >
      {/* Section dividers */}
      <div className="absolute top-0 inset-x-0 section-divider" />
      <div className="absolute bottom-0 inset-x-0 section-divider" />

      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }}
      />

      <div className="flex overflow-hidden gap-10">
        <Track />
      </div>
    </div>
  );
}
