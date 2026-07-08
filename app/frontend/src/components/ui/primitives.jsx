import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target;
      if (t.closest('a,button,[data-cursor="hover"]')) setHover(true);
      else setHover(false);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{ scale: hover ? 2.4 : 1, opacity: hover ? 0.4 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-8 h-8 rounded-full border border-white/60"
          style={{ mixBlendMode: 'difference' }}
        />
      </motion.div>
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ mixBlendMode: 'difference' }} />
      </motion.div>
    </>
  );
}

export function Grain() {
  return <div className="grain" aria-hidden />;
}

export function MagneticButton({ children, className = '', href, onClick, variant = 'primary', 'data-testid': testId, type = 'button' }) {
  const base = 'relative inline-flex items-center justify-center px-8 py-4 rounded-full font-medium tracking-tight overflow-hidden group transition-all duration-300 hover:scale-[1.02]';
  const styles = variant === 'primary'
    ? 'bg-accent-gradient text-black shadow-glow-emerald hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]'
    : variant === 'ghost'
      ? 'bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08]'
      : 'bg-white text-black';

  const inner = (
    <span
      className={`${base} ${styles} ${className}`}
      data-testid={testId}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </span>
  );

  if (href) return <a href={href} onClick={onClick} className="inline-block">{inner}</a>;
  return <button type={type} onClick={onClick} className="inline-block">{inner}</button>;
}

export function GlassCard({ children, className = '', contentClassName = '', ...props }) {
  return (
    <div
      className={`glass relative overflow-hidden ${className}`}
      {...props}
    >
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export function Overline({ children, className = '' }) {
  return (
    <span className={`text-xs font-bold tracking-[0.2em] uppercase text-emerald-500 ${className}`}>
      {children}
    </span>
  );
}

export function SectionLabel({ number, title }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xs font-mono text-emerald-500">[{number}]</span>
      <div className="divider-line flex-1 max-w-[80px]" />
      <Overline>{title}</Overline>
    </div>
  );
}
