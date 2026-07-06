import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEC } from "../constants/testIds";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    n: "01",
    label: "Idea",
    body: "Capture the raw insight. Sharpen the wedge. Nexora's AI stress-tests your thesis against the market in seconds.",
  },
  {
    n: "02",
    label: "Validation",
    body: "Score, SWOT, competitors and risk — a structured verdict, not a vibe check. Iterate with confidence.",
  },
  {
    n: "03",
    label: "MVP",
    body: "AI-drafted roadmap, milestone tracker and a matched co-founder pool. Ship the first cut, faster.",
  },
  {
    n: "04",
    label: "Launch",
    body: "A polished business plan, exportable pitch deck, and a warm intro to the mentors who've done it before.",
  },
  {
    n: "05",
    label: "Growth",
    body: "A personalised market intelligence feed. Signals, grants, accelerators — before the newsletter picks them up.",
  },
  {
    n: "06",
    label: "Funding",
    body: "Investor discovery, saved lists, meeting requests and a pipeline you can actually run. From cold to term-sheet.",
  },
];

export const Journey = () => {
  const wrap = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) return; // Fallback: vertical stack on mobile
      const distance = () => track.current.scrollWidth - window.innerWidth + 48;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      data-testid={SEC.journey}
      ref={wrap}
      className="relative bg-ink-900 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-6 pt-24 md:pt-32">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">The journey</div>
        <h2 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-3xl leading-[0.95]">
          Six stages.
          <br />
          <span className="text-white/50">One operating system.</span>
        </h2>
      </div>

      <div className="mt-16 md:mt-24 pb-24 md:pb-0 md:h-[80vh] md:flex md:items-center">
        <div
          ref={track}
          className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-24 md:w-max"
        >
          {stages.map((s, i) => (
            <article
              key={s.n}
              className="glass relative w-full md:w-[420px] shrink-0 rounded-2xl p-8 md:p-10 min-h-[360px] md:min-h-[420px] flex flex-col justify-between overflow-hidden group"
              data-cursor="hover"
            >
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <header className="flex items-baseline justify-between">
                <span className="font-display text-6xl md:text-7xl text-white/10 font-semibold">
                  {s.n}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Stage {i + 1}
                </span>
              </header>
              <div>
                <h3 className="font-display text-3xl md:text-4xl mb-4 tracking-tight">
                  {s.label}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">{s.body}</p>
              </div>
              <div className="mt-6 h-px bg-gradient-to-r from-emerald-400/60 via-amber-500/40 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;