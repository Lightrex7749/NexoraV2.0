import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { SEC } from "../constants/testIds";

const features = [
  {
    tag: "AI · Validation",
    title: "Idea Validation",
    body: "Score, SWOT, market potential, competitors and risk — a structured second opinion in under a minute.",
    accent: "from-emerald-400/40 to-transparent",
  },
  {
    tag: "AI · Strategy",
    title: "Business Plan AI",
    body: "A full, exportable plan drafted in your voice. Versioned, editable and investor-ready.",
    accent: "from-amber-400/40 to-transparent",
  },
  {
    tag: "People",
    title: "Team Builder",
    body: "AI-matched co-founders and hires by skill vector similarity — not vibes, not luck.",
    accent: "from-emerald-500/40 to-transparent",
  },
  {
    tag: "Guidance",
    title: "Mentorship",
    body: "Warm intros to vetted mentors who've operated in your stage — plus notes, meetings and feedback logged in one place.",
    accent: "from-amber-500/40 to-transparent",
  },
  {
    tag: "Capital",
    title: "Investor Matching",
    body: "Discover, save and pipeline the right investors. From watching to term-sheet — a CRM that finally fits.",
    accent: "from-emerald-400/40 to-transparent",
  },
  {
    tag: "Signals",
    title: "Market Insights",
    body: "A personalised feed of grants, competitors and market moves — each with an AI-written reason it matters to you.",
    accent: "from-amber-400/40 to-transparent",
  },
];

const FeatureCard = ({ f, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const wrapperRef = useRef(null);

  const onMouseMove = (e) => {
    const el = wrapperRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      data-cursor="hover"
    >
      <div
        ref={wrapperRef}
        onMouseMove={onMouseMove}
        className="glass relative overflow-hidden rounded-2xl p-8 md:p-10 h-full min-h-[300px] flex flex-col justify-between"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06), transparent 40%), rgba(255,255,255,0.025)",
        }}
      >
        <div className={`absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-radial ${f.accent} blur-3xl opacity-70 pointer-events-none`} />
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/90 mb-4">{f.tag}</div>
          <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-tight">
            {f.title}
          </h3>
        </div>
        <p className="mt-6 text-white/60 text-sm md:text-base leading-relaxed max-w-md">{f.body}</p>
        <div className="mt-8 flex items-center gap-2 text-xs text-white/50 group-hover:text-emerald-400 transition-colors">
          <span>Explore</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.div>
  );
};

export const Features = () => (
  <section
    id="features"
    data-testid={SEC.features}
    className="relative py-32 md:py-48 bg-ink-900"
  >
    <div className="mx-auto max-w-[1240px] px-6">
      <div className="mb-20 md:mb-28 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">The suite</div>
        <h2 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
          Every tool a founder{" "}
          <span className="italic text-white/50 font-light">actually</span> needs.
        </h2>
        <p className="mt-8 text-lg text-white/50 max-w-xl font-light">
          Six deeply integrated modules that replace a spreadsheet, a Notion, a CRM and three group chats. All in one interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((f, i) => (
          <FeatureCard key={f.title} f={f} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;