"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─────────────────────────────────────────
   FinanceGate — mobile-OTP registration wall for the free Finance Tools.
   Unlock is remembered in localStorage (phase 1). OTP is sent/verified via
   MSG91 through /api/otp/* (server-side). Phase 2: persist users in a DB.
───────────────────────────────────────── */

const ACCESS_KEY = "jv_ft_access";
const OTP_LENGTH = 6; // set to 4 if the MSG91 template sends a 4-digit OTP
const RESEND_SECONDS = 30;
const EASE = [0.22, 1, 0.36, 1] as const;

const perks = [
  "Cash Stuck — money trapped in DSO",
  "Profit Leakage — hidden margin loss",
  "Discount Audit — dealership abuse",
  "Tally Lag — stock & GST risk",
  "Working Capital — bank-limit risk",
];

export default function FinanceGate({ children }: { children: React.ReactNode }) {
  // { ready } guards against SSR flash; { unlocked } reflects stored access.
  const [gate, setGate] = useState({ ready: false, unlocked: false });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem(ACCESS_KEY) === "1";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
    setGate({ ready: true, unlocked: ok });
  }, []);

  const unlock = () => {
    localStorage.setItem(ACCESS_KEY, "1");
    setGate({ ready: true, unlocked: true });
  };

  if (!gate.ready) return null;
  if (gate.unlocked) return <>{children}</>;

  return (
    <>
      <LockedPreview onUnlock={() => setDismissed(false)} />
      <AnimatePresence>
        {!dismissed && <OtpModal onClose={() => setDismissed(true)} onVerified={unlock} />}
      </AnimatePresence>
    </>
  );
}

/* ── locked teaser shown behind / when the modal is dismissed ── */
function LockedPreview({ onUnlock }: { onUnlock: () => void }) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-white px-5 pt-32 pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(74,30,145,0.12), transparent 70%)" }}
      />
      <div className="relative max-w-lg text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: "linear-gradient(135deg,#4A1E91,#E92F8E)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 118 0v3" /></svg>
        </span>
        <h1 className="mt-6 text-[28px] font-extrabold tracking-tight text-[#1A1033] sm:text-[34px]">5 free finance calculators</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
          Find the cash hiding in your DSO, margins, discounts, stock and working capital. Verify your mobile once to unlock — free, no password.
        </p>
        <button
          onClick={onUnlock}
          className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(233,47,142,0.3)] transition-transform hover:-translate-y-0.5"
          style={{ background: "linear-gradient(90deg,#4A1E91,#E92F8E)" }}
        >
          Unlock free access
        </button>
      </div>
    </section>
  );
}

/* ── the registration modal ── */
function OtpModal({ onClose, onVerified }: { onClose: () => void; onVerified: () => void }) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resend, setResend] = useState(0);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resend <= 0) return;
    const t = setInterval(() => setResend((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [resend]);

  const validMobile = /^\d{10}$/.test(mobile);

  async function sendOtp() {
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!validMobile) return setError("Enter a valid 10-digit mobile number.");
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not send OTP.");
      setStep("otp");
      setResend(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      setTimeout(() => boxes.current[0]?.focus(), 60);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(code: string) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp: code, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Invalid OTP.");
      onVerified();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid or expired OTP.");
      setLoading(false);
    }
  }

  function setDigit(i: number, v: string) {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    setError("");
    if (d && i < OTP_LENGTH - 1) boxes.current[i + 1]?.focus();
    const joined = next.join("");
    if (joined.length === OTP_LENGTH && !next.includes("")) verifyOtp(joined);
  }

  function onKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[i] && i > 0) boxes.current[i - 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("").map((_, i) => text[i] ?? "");
    setOtp(next);
    if (text.length === OTP_LENGTH) verifyOtp(text);
    else boxes.current[text.length]?.focus();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[#0B1020]/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative grid w-full max-w-[900px] overflow-hidden rounded-[24px] bg-white shadow-[0_40px_120px_-30px_rgba(10,16,32,0.6)] md:grid-cols-[1fr_1.1fr]"
      >
        {/* left brand panel */}
        <div className="relative hidden flex-col justify-between p-8 text-white md:flex" style={{ background: "linear-gradient(150deg,#4A1E91 0%,#7C3AED 45%,#E92F8E 100%)" }}>
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold tracking-wide">JenVeda · Finance Tools</span>
            <h2 className="mt-6 text-[26px] font-extrabold leading-tight">Free calculators, unlocked in 20 seconds.</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/80">Verify your mobile once. No password, no spam — just the numbers that matter.</p>
          </div>
          <ul className="relative mt-8 space-y-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-white/90">
                <svg className="mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* right form panel */}
        <div className="relative p-7 sm:p-9">
          <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>

          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.div key="phone" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}>
                <h3 className="text-[22px] font-extrabold tracking-tight text-[#1A1033]">Get free access</h3>
                <p className="mt-1.5 text-[14px] text-slate-500">We&apos;ll send a one-time code to verify your mobile.</p>

                <label className="mt-6 block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Full name</span>
                  <input
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    placeholder="Rahul Sharma"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#E92F8E] focus:ring-2 focus:ring-[#E92F8E]/15"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Mobile number</span>
                  <div className="mt-1.5 flex items-center rounded-xl border border-slate-200 bg-white px-3 transition focus-within:border-[#E92F8E] focus-within:ring-2 focus-within:ring-[#E92F8E]/15">
                    <span className="pr-3 text-[15px] font-semibold text-slate-500">+91</span>
                    <span className="h-5 w-px bg-slate-200" />
                    <input
                      value={mobile}
                      onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
                      onKeyDown={(e) => { if (e.key === "Enter") sendOtp(); }}
                      inputMode="numeric"
                      placeholder="98765 43210"
                      className="w-full bg-transparent px-3 py-3 text-[15px] tracking-wide outline-none"
                    />
                  </div>
                </label>

                {error && <p className="mt-3 text-[13px] font-medium text-[#DC2626]">{error}</p>}

                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-bold text-white transition hover:brightness-105 disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg,#4A1E91,#E92F8E)" }}
                >
                  {loading ? <Spinner /> : "Send OTP"}
                </button>
                <p className="mt-3 text-center text-[11.5px] leading-snug text-slate-400">
                  By continuing you agree to receive a one-time verification SMS. The tools are free.
                </p>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}>
                <h3 className="text-[22px] font-extrabold tracking-tight text-[#1A1033]">Enter the code</h3>
                <p className="mt-1.5 text-[14px] text-slate-500">
                  Sent to <span className="font-semibold text-slate-700">+91 {mobile}</span>{" "}
                  <button onClick={() => { setStep("phone"); setError(""); }} className="font-semibold text-[#E92F8E] hover:underline">Change</button>
                </p>

                <div className="mt-6 flex gap-2.5" onPaste={onPaste}>
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { boxes.current[i] = el; }}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => onKey(i, e)}
                      inputMode="numeric"
                      maxLength={1}
                      className="h-14 w-full rounded-xl border border-slate-200 bg-white text-center text-[22px] font-bold text-[#1A1033] outline-none transition focus:border-[#E92F8E] focus:ring-2 focus:ring-[#E92F8E]/15"
                    />
                  ))}
                </div>

                {error && <p className="mt-3 text-[13px] font-medium text-[#DC2626]">{error}</p>}

                <button
                  onClick={() => verifyOtp(otp.join(""))}
                  disabled={loading || otp.includes("")}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-bold text-white transition hover:brightness-105 disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg,#4A1E91,#E92F8E)" }}
                >
                  {loading ? <Spinner /> : "Verify & unlock"}
                </button>

                <div className="mt-4 text-center text-[13px] text-slate-500">
                  {resend > 0 ? (
                    <span>Resend code in {resend}s</span>
                  ) : (
                    <button onClick={sendOtp} disabled={loading} className="font-semibold text-[#E92F8E] hover:underline disabled:opacity-60">Resend OTP</button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
