import React, { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV } from "../constants/testIds";

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (y > prev && y > 160) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    // Ensure section jumps work when Lenis is running
    const handler = (e) => {
      const a = e.target.closest?.("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <motion.header
      data-testid={NAV.root}
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] w-[min(1180px,calc(100%-24px))]"
    >
      <div
        className={`flex items-center justify-between rounded-full px-5 md:px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "glass-strong shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <a
          href="#top"
          data-testid={NAV.logo}
          className="flex items-center gap-2 font-display text-xl font-semibold tracking-tighter"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)]" />
          Nexora
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70 font-sans">
          <a data-testid={NAV.linkFeatures} href="#features" className="hover:text-white transition-colors">Features</a>
          <a data-testid={NAV.linkJourney} href="#journey" className="hover:text-white transition-colors">Journey</a>
          <a data-testid={NAV.linkPricing} href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a data-testid={NAV.linkFaq} href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <a
          data-testid={NAV.cta}
          href="#final-cta"
          className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Start free
          <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </motion.header>
  );
};

export default Navbar;