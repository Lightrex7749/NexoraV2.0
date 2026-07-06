import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SEC } from "../constants/testIds";

const showcase = [
  {
    name: "Verdi",
    industry: "Climate SaaS",
    stage: "Series A · $8M",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWluaW1hbCUyMGRhc2hib2FyZCUyMHVpJTIwZGFyayUyMG1vZGV8ZW58MHx8fHwxNzgzMjM4NzU1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Northlark",
    industry: "Dev Tools",
    stage: "Seed · $2.4M",
    img: "https://images.unsplash.com/photo-1666027092835-7e668416b7c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbWluaW1hbCUyMGRhc2hib2FyZCUyMHVpJTIwZGFyayUyMG1vZGV8ZW58MHx8fHwxNzgzMjM4NzU1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Aureus",
    industry: "Fintech",
    stage: "Growth · $22M",
    img: "https://images.unsplash.com/photo-1548362851-ea052637ad64?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNpbmVtYXRpYyUyMGRhcmslMjBnbGFzcyUyMHRleHR1cmUlMjBlbWVyYWxkJTIwZ29sZHxlbnwwfHx8fDE3ODMyMzg3NTR8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Foundry Lane",
    industry: "Consumer Health",
    stage: "Series B · $34M",
    img: "https://images.unsplash.com/photo-1567919915541-dd35562ae895?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGNpbmVtYXRpYyUyMGRhcmslMjBnbGFzcyUyMHRleHR1cmUlMjBlbWVyYWxkJTIwZ29sZHxlbnwwfHx8fDE3ODMyMzg3NTR8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Otsuka Labs",
    industry: "Bio · Robotics",
    stage: "Seed · $3.8M",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzIzODc1NHww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Halcyon",
    industry: "AI Ops",
    stage: "Series A · $12M",
    img: "https://images.unsplash.com/photo-1542190891-2093d38760f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHw0fHxlZGl0b3JpYWwlMjBzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzIzODc1NHww&ixlib=rb-4.1.0&q=85",
  },
];

export const Showcase = () => {
  const trackRef = useRef(null);

  return (
    <section
      id="showcase"
      data-testid={SEC.showcase}
      className="relative py-32 md:py-48 bg-ink-900 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-6 mb-16 md:mb-24">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">Showcase</div>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] max-w-2xl">
            Companies built <span className="italic font-light text-white/50">on Nexora.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-xs">
            Drag to explore. Six founders. Six trajectories. One platform.
          </p>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        className="flex gap-6 md:gap-8 px-6 md:px-16 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -1400, right: 0 }}
        dragElastic={0.05}
        dragTransition={{ bounceStiffness: 140, bounceDamping: 22, power: 0.28 }}
      >
        {showcase.map((s, i) => (
          <div
            key={s.name}
            className="glass relative rounded-2xl overflow-hidden shrink-0 w-[280px] md:w-[420px] aspect-[4/5]"
            data-cursor="hover"
          >
            <img
              src={s.img}
              alt={s.name}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/90">{s.industry}</span>
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">0{i + 1}</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight">{s.name}</h3>
              <p className="text-sm text-white/60 mt-2">{s.stage}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Showcase;