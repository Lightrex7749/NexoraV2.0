import React from "react";
import Marquee from "react-fast-marquee";
import { SEC } from "../constants/testIds";

const items = [
  "BUILT FOR FOUNDERS",
  "TRUSTED BY MENTORS",
  "PICKED BY INVESTORS",
  "SCALABLE AI",
  "FROM IDEA TO IMPACT",
  "AWARD-WINNING DESIGN",
];

export const MarqueeStrip = () => (
  <section
    data-testid={SEC.marquee}
    className="relative py-10 md:py-16 border-y border-white/[0.06] bg-ink-900"
  >
    <Marquee gradient={false} speed={45} pauseOnHover={false} autoFill>
      {items.map((t, i) => (
        <span
          key={i}
          className="mx-8 md:mx-14 font-display font-semibold uppercase tracking-tighter text-4xl md:text-7xl text-stroke inline-flex items-center gap-8 md:gap-14"
        >
          {t}
          <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-br from-emerald-400 to-amber-500" />
        </span>
      ))}
    </Marquee>
  </section>
);

export default MarqueeStrip;