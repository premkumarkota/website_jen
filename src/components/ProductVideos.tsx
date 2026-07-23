"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  category: "hrms" | "pms" | "accounting" | "inventory";
  duration: string;
  description: string;
  thumbnail: string;
  badge: string;
}

const CATEGORIES = [
  { key: "hrms", num: "01", label: "HRMS" },
  { key: "pms", num: "02", label: "PMS" },
  { key: "accounting", num: "03", label: "Accounting" },
  { key: "inventory", num: "04", label: "Inventory" },
] as const;

const VIDEOS: Video[] = [
  // 01 HRMS
  {
    id: "v1",
    youtubeId: "iJrieUMmcw4",
    title: "Human Resource Management & Employee Lifecycle",
    category: "hrms",
    duration: "3:40",
    description: "End-to-end HR automation — from onboarding to exit with real-time org chart visibility and employee self-service.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "01 HRMS • Overview",
  },
  {
    id: "v2",
    youtubeId: "iJrieUMmcw4",
    title: "Automated Payroll & Statutory Tax Compliance",
    category: "hrms",
    duration: "3:15",
    description: "Compute PF, ESI, TDS, and generate pay slips for 500+ employees in under 2 minutes with automated recalculations.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "01 HRMS • Payroll",
  },
  {
    id: "v3",
    youtubeId: "iJrieUMmcw4",
    title: "Leave, Shift Roster & Geofenced Mobile Attendance",
    category: "hrms",
    duration: "2:45",
    description: "Real-time field employee tracking, instant shift roster updates, and automated leave request management.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "01 HRMS • Attendance",
  },

  // 02 PMS
  {
    id: "v4",
    youtubeId: "iJrieUMmcw4",
    title: "Ship Faster: Kanban, List & Timeline Project Views",
    category: "pms",
    duration: "4:15",
    description: "Complete project lifecycle from kickoff to delivery. Kanban boards, sprint planning, and real-time progress visibility.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "02 PMS • Workflows",
  },
  {
    id: "v5",
    youtubeId: "iJrieUMmcw4",
    title: "Sprint Planning & Backlog Management",
    category: "pms",
    duration: "3:30",
    description: "Plan sprints, prioritize backlog items, assign story points, and track velocity across engineering & product teams.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "02 PMS • Sprints",
  },
  {
    id: "v6",
    youtubeId: "iJrieUMmcw4",
    title: "Resource Allocation, Milestones & Critical Path",
    category: "pms",
    duration: "3:10",
    description: "Balance team utilization, monitor project budgets, manage milestones, dependencies, and client portal progress.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "02 PMS • Resources",
  },

  // 03 Accounting
  {
    id: "v7",
    youtubeId: "iJrieUMmcw4",
    title: "GST Invoicing, Billing & E-Way Bills",
    category: "accounting",
    duration: "5:02",
    description: "Generate GST-ready E-invoices, manage collections, and automate tax filings with zero manual data entry errors.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "03 Accounting • Invoicing",
  },
  {
    id: "v8",
    youtubeId: "iJrieUMmcw4",
    title: "Expense Approvals, Purchase Orders & Vendor Payments",
    category: "accounting",
    duration: "3:55",
    description: "Streamline purchase order approvals, vendor payouts, expense tracking, and real-time ledger postings.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "03 Accounting • Expenses",
  },
  {
    id: "v9",
    youtubeId: "iJrieUMmcw4",
    title: "Real-time P&L, Balance Sheet & Cash Flow Analytics",
    category: "accounting",
    duration: "4:20",
    description: "Close financial books faster with automated statement reconciliation and instant profit & loss reporting.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "03 Accounting • Financials",
  },

  // 04 Inventory
  {
    id: "v10",
    youtubeId: "iJrieUMmcw4",
    title: "Multi-Warehouse Stock Tracking & Transfers",
    category: "inventory",
    duration: "2:50",
    description: "Zero stockouts. Zero guesswork. Real-time stock visibility across every warehouse location and store branch.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "04 Inventory • Stock",
  },
  {
    id: "v11",
    youtubeId: "iJrieUMmcw4",
    title: "Automated Replenishment & Reorder Triggers",
    category: "inventory",
    duration: "3:20",
    description: "Set minimum threshold levels and automatically trigger purchase orders before stock runs out.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "04 Inventory • Replenishment",
  },
  {
    id: "v12",
    youtubeId: "iJrieUMmcw4",
    title: "Batch, Serial & Expiry Date Management",
    category: "inventory",
    duration: "3:05",
    description: "Full barcode scanning support for batch tracking, expiration alerts, stock audits, and inventory valuation.",
    thumbnail: "https://img.youtube.com/vi/iJrieUMmcw4/maxresdefault.jpg",
    badge: "04 Inventory • Batching",
  },
];

const YOUTUBE_CHANNEL_URL = "https://youtu.be/iJrieUMmcw4?si=4EVkST3gw1yqkvek";

export default function ProductVideos() {
  const [activeCategory, setActiveCategory] = useState<string>("hrms");
  const [selectedVideo, setSelectedVideo] = useState<Video>(VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const filteredVideos = VIDEOS.filter((v) => v.category === activeCategory);

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  return (
    <section id="videos" className="relative py-32 px-6 overflow-hidden text-slate-900" style={{ background: "var(--bg-base)" }}>
      {/* Apple Keynote Ambient Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(109,40,217,0.09), transparent), radial-gradient(ellipse 60% 50% at 85% 90%, rgba(209,0,143,0.06), transparent)"
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 font-heading">
              Experience JenVeda <br />
              <span className="gradient-text">in High Definition.</span>
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl text-base sm:text-lg leading-relaxed">
              Immersive feature walkthroughs, automated payroll workflows, and client success stories directly in your browser.
            </p>
          </div>

          {/* Premium YouTube Subscriber Button */}
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-900/25 hover:-translate-y-0.5 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-md">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.816zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <span className="tracking-tight">Subscribe on YouTube</span>
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 backdrop-blur-xl gap-1.5 shadow-inner">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    const matching = VIDEOS.find((v) => v.category === cat.key);
                    if (matching) {
                      setSelectedVideo(matching);
                      setIsPlaying(false);
                    }
                  }}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  <span className={`text-[11px] font-mono font-extrabold ${isActive ? "text-purple-200" : "text-purple-600"}`}>
                    {cat.num}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN INLINE THEATER PLAYER CARD (Plays Right In Place!) */}
        <div className="mb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVideo.id + (isPlaying ? "-playing" : "-thumbnail")}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[36px] overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950"
            >
              {isPlaying ? (
                /* INLINE YOUTUBE PLAYER */
                <div className="relative w-full h-full bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Floating Stop / Close Overlay Button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-slate-950/80 hover:bg-slate-950 backdrop-blur-xl border border-white/20 text-white text-xs font-extrabold transition-all shadow-xl flex items-center gap-2"
                  >
                    <span>✕ Stop Video</span>
                  </button>
                </div>
              ) : (
                /* THUMBNAIL COVER WITH INLINE PLAY ACTION */
                <div
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer"
                >
                  {/* Image Background */}
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                  {/* Frosted Glass Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-6 rounded-full bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/90 backdrop-blur-2xl border border-white/80 text-slate-900 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        <svg className="w-9 h-9 sm:w-11 sm:h-11 fill-slate-900 translate-x-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Floating Keynote Badge Overlay */}
                  <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                    <span className="px-4 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-xl border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-widest">
                      {selectedVideo.badge} • {selectedVideo.duration}
                    </span>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md leading-tight">
                        {selectedVideo.title}
                      </h3>
                      <p className="mt-2 text-slate-200 text-sm hidden sm:block line-clamp-2 drop-shadow-xs leading-relaxed">
                        {selectedVideo.description}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/95 text-slate-900 font-extrabold text-xs shadow-xl backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:scale-105">
                      Play Walkthrough Now ➔
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Video Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => {
            const isCurrentSelected = selectedVideo.id === video.id;
            return (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleSelectVideo(video)}
                className={`group relative bg-white rounded-[28px] overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-2 hover:shadow-2xl ${
                  isCurrentSelected
                    ? "border-purple-600 ring-2 ring-purple-600/30 shadow-xl shadow-purple-900/10"
                    : "border-slate-200/80 hover:border-purple-300 hover:shadow-purple-900/10"
                }`}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl ${
                      isCurrentSelected
                        ? "bg-purple-600 text-white border-purple-500"
                        : "bg-white/90 text-slate-900 border-white/80 group-hover:bg-white"
                    }`}>
                      <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
                    {video.duration}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 mb-1.5 block">
                      {video.badge}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 line-clamp-2 group-hover:text-purple-600 transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                    <span>{isCurrentSelected && isPlaying ? "Now Playing" : "Play In Place"}</span>
                    <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                      ➔
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
