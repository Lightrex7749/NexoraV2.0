import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/*
 * MagneticButton — a CTA that softly pulls toward the cursor within its bounds.
 * Variants: 'primary' (emerald→amber gradient) | 'ghost' (glass, white border).
 */
export const MagneticButton = ({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  ...rest
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center overflow-hidden select-none whitespace-nowrap rounded-full px-8 py-4 text-sm font-medium tracking-wide font-sans transition-all duration-300 hover:scale-[1.02]";

  const styleVariants = {
    primary:
      "text-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-500 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_18px_60px_-10px_rgba(245,158,11,0.55)]",
    ghost:
      "text-white/90 bg-white/[0.03] border border-white/15 hover:bg-white/[0.06] hover:border-white/25",
  };

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${styleVariants[variant]} ${className}`}
      {...rest}
    >
      <span
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </span>
    </Comp>
  );
};

export default MagneticButton;