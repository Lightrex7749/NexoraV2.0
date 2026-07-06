import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import { HERO } from "../constants/testIds";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINE_1 = "From Idea";
const HEADLINE_LINE_2 = "to Impact.";

const SplitLine = ({ text, delay = 0 }) => {
  const chars = text.split("");
  return (
    <span className="inline-block overflow-hidden">
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: delay + i * 0.03, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
};

export const Hero = () => {
  const bgRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      data-testid={HERO.root}
      className="relative min-h-[100svh] w-full overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Animated mesh gradient */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <div className="mesh-hero absolute -inset-24 animate-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0C_75%)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-white/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Ecosystem for founders — v1.0
        </motion.div>

        <h1
          data-testid={HERO.headline}
          className="font-display font-semibold text-[clamp(3rem,10vw,10rem)] leading-[0.88] tracking-[-0.04em] max-w-[16ch]"
        >
          <SplitLine text={HEADLINE_LINE_1} delay={0.15} />
          <br />
          <span className="gradient-text italic font-light">
            <SplitLine text={HEADLINE_LINE_2} delay={0.55} />
          </span>
        </h1>

        <motion.p
          data-testid={HERO.subhead}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 max-w-xl text-lg md:text-xl font-light text-white/60 leading-relaxed"
        >
          Nexora is the AI-powered operating system for the next generation of founders — validation, planning, team, mentors and capital, all under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton data-testid={HERO.ctaPrimary} href="#final-cta" variant="primary">
            Launch your journey
            <span aria-hidden="true">→</span>
          </MagneticButton>
          <MagneticButton data-testid={HERO.ctaSecondary} href="#journey" variant="ghost">
            Watch the process
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl"
        >
          {[
            ["1,240+", "Startups launched"],
            ["380", "Active mentors"],
            ["$54M", "Capital matched"],
            ["94%", "Founder retention"],
          ].map(([stat, label]) => (
            <div key={label}>
              <div className="font-display text-3xl md:text-4xl font-medium text-white/90">{stat}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/40">
        <span>Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;