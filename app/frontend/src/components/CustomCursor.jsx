import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Detects hover on interactive elements to morph the cursor.
export const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dotX = useSpring(mx, { stiffness: 700, damping: 40, mass: 0.4 });
  const dotY = useSpring(my, { stiffness: 700, damping: 40, mass: 0.4 });
  const ringX = useSpring(mx, { stiffness: 180, damping: 20, mass: 0.7 });
  const ringY = useSpring(my, { stiffness: 180, damping: 20, mass: 0.7 });

  useEffect(() => {
    const touch = matchMedia("(hover: none), (pointer: coarse)").matches;
    if (touch) {
      setIsTouch(true);
      return;
    }

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const over = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const interactive = t.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']");
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("mouseover", over);
    };
  }, [mx, my, visible]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 8 : 6,
          height: hovering ? 8 : 6,
          background: "#F59E0B",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          borderColor: hovering ? "rgba(16,185,129,0.7)" : "rgba(255,255,255,0.35)",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          transition: "width 220ms ease, height 220ms ease, border-color 220ms ease",
        }}
      />
    </>
  );
};

export default CustomCursor;