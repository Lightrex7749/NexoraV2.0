import React from "react";
import { motion } from "framer-motion";
import { SEC } from "../constants/testIds";

const steps = [
  {
    kicker: "Chapter one",
    title: "Bring the raw idea.",
    body: "Ten minutes with the AI. A ruthless read on your wedge, the customer, the moat, the gaps you haven't seen yet.",
    img: "https://images.unsplash.com/photo-1548362851-ea052637ad64?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNpbmVtYXRpYyUyMGRhcmslMjBnbGFzcyUyMHRleHR1cmUlMjBlbWVyYWxkJTIwZ29sZHxlbnwwfHx8fDE3ODMyMzg3NTR8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    kicker: "Chapter two",
    title: "Draft the plan.",
    body: "Executive summary. Market maths. Roadmap. Cap table. Pitch deck. Versioned, exportable and always in your voice.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWluaW1hbCUyMGRhc2hib2FyZCUyMHVpJTIwZGFyayUyMG1vZGV8ZW58MHx8fHwxNzgzMjM4NzU1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    kicker: "Chapter three",
    title: "Build the room.",
    body: "Co-founders, hires, mentors, angels — the ones who've been in your seat. Matched, not shuffled.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzIzODc1NHww&ixlib=rb-4.1.0&q=85",
  },
  {
    kicker: "Chapter four",
    title: "Ship — with signal.",
    body: "Launch with a personalised intelligence feed watching your market. Every notification is worth the interruption.",
    img: "https://images.unsplash.com/photo-1666027092835-7e668416b7c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbWluaW1hbCUyMGRhc2hib2FyZCUyMHVpJTIwZGFyayUyMG1vZGV8ZW58MHx8fHwxNzgzMjM4NzU1fDA&ixlib=rb-4.1.0&q=85",
  },
];

export const HowItWorks = () => (
  <section
    id="how"
    data-testid={SEC.how}
    className="relative py-32 md:py-48 bg-ink-950"
  >
    <div className="mx-auto max-w-[1240px] px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-24 relative">
        {/* Sticky left column */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">How it works</div>
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
            The architecture
            <br />
            <span className="italic font-light text-white/50">of impact.</span>
          </h2>
          <p className="mt-8 text-white/55 leading-relaxed max-w-sm">
            An editorial approach to building companies. Four movements, each one a compound step toward the next.
          </p>
        </div>

        {/* Scrolling right column */}
        <div className="space-y-32 md:space-y-48">
          {steps.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/10] mb-8 glass">
                <img
                  src={s.img}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover opacity-70 grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                <span className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.3em] text-white/70 font-medium">
                  {s.kicker}
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-4 max-w-lg">
                {s.title}
              </h3>
              <p className="text-white/60 text-lg font-light max-w-md leading-relaxed">{s.body}</p>
              <div className="mt-8 text-xs text-white/30 font-mono">— 0{i + 1} / 04</div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;