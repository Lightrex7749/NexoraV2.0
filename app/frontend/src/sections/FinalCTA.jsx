import React, { useState } from 'react';
import axios from "axios";
import { toast } from "sonner";
import MagneticButton from "../components/MagneticButton";
import { SEC, NEWSLETTER } from "../constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await axios.post(`${API}/newsletter`, { email, source: "landing_final_cta" });
      const msg = res.data?.message || "You're in.";
      setStatus({ ok: true, msg });
      toast.success(msg);
      setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Try again.";
      setStatus({ ok: false, msg });
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="final-cta"
      data-testid={SEC.finalCta}
      className="relative py-32 md:py-56 bg-ink-950 overflow-hidden"
    >
      {/* Radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="radial-glow absolute -inset-40 animate-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0A0A0C_78%)]" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        <div className="text-xs uppercase tracking-[0.35em] text-emerald-400/90 mb-6">
          Start your journey
        </div>
        <h2 className="font-display font-semibold text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.9] max-w-4xl mx-auto">
          The next great company
          <br />
          <span className="gradient-text italic font-light">starts here.</span>
        </h2>
        <p className="mt-8 text-white/60 text-lg max-w-xl mx-auto font-light">
          Get early access, product updates, and one careful essay per month on building — no fluff, no spam.
        </p>

        <form
          data-testid={NEWSLETTER.form}
          onSubmit={onSubmit}
          className="mt-12 max-w-lg mx-auto glass-strong rounded-full p-1.5 flex items-center gap-2"
        >
          <input
            data-testid={NEWSLETTER.input}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourstartup.com"
            className="flex-1 bg-transparent px-5 py-2.5 text-white placeholder-white/35 focus:outline-none text-sm"
            disabled={loading}
          />
          <MagneticButton
            data-testid={NEWSLETTER.submit}
            variant="primary"
            className="px-6 py-3 text-sm"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending…" : "Join the beta"}
            <span aria-hidden="true">→</span>
          </MagneticButton>
        </form>
        {status && (
          <div
            data-testid={NEWSLETTER.status}
            className={`mt-4 text-sm ${status.ok ? "text-emerald-400" : "text-red-400"}`}
          >
            {status.msg}
          </div>
        )}

        <div className="mt-16 text-xs uppercase tracking-[0.3em] text-white/30">
          Trusted by 1,240+ founders · 380 mentors · 96 funds
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
 