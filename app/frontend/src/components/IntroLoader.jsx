import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "nexora_intro_played_v1";

export const IntroLoader = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(KEY) !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch (e) { /* ignore */ }
      setShow(false);
    }, 1800);
    return () => clearTimeout(t);
  }, [show]);

  const letters = "NEXORA".split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950"
          data-testid="intro-loader"
        >
          <div className="grain absolute inset-0 opacity-[0.08] pointer-events-none" />
          <div className="relative flex items-baseline">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-semibold text-6xl md:text-8xl tracking-tighter leading-none inline-block"
                style={{
                  color: i === 3 ? "#F59E0B" : "#FAFAFA",
                }}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] uppercase text-white/40 font-sans"
          >
            From Idea to Impact
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;