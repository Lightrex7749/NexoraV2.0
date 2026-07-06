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
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const innerX = useTransform(sx, (v) => v * 0.35);
  const innerY = useTransform(sy, (v) => v * 0.35);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    const strength = 0.35;
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses =
    "relative inline-flex items-center justify-center overflow-hidden select-none whitespace-nowrap rounded-full px-8 py-4 text-sm font-medium tracking-wide font-sans transition-colors";

  const styleVariants = {
    primary:
      "text-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-500 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_18px_60px_-10px_rgba(245,158,11,0.55)]",
    ghost:
      "text-white/90 bg-white/[0.03] border border-white/15 hover:bg-white/[0.06] hover:border-white/25",
  };

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${baseClasses} ${styleVariants[variant]} ${className}`}
      {...rest}
    >
      <motion.span
        style={{ x: innerX, y: innerY }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
      {/* Specular sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
          transform: "translateX(-30%)",
          animation: "shimmer 2.4s ease-in-out infinite",
        }}
      />
    </Comp>
  );
};

export default MagneticButton;