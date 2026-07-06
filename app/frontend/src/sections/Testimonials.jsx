import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEC } from "../constants/testIds";

const quotes = [
  {
    body:
      "Nexora replaced four tools and about six weeks of stalling. We closed our seed the same quarter we ran validation.",
    name: "Amara Okafor",
    role: "Founder & CEO, Verdi",
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzIzODc1NHww&ixlib=rb-4.1.0&q=85",
  },
  {
    body:
      "The mentor match is uncanny. It felt like the algorithm had read my whole thesis and picked someone who'd already lived it.",
    name: "Kenji Sato",
    role: "Founder, Otsuka Labs",
    portrait:
      "https://images.unsplash.com/photo-1542190891-2093d38760f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHw0fHxlZGl0b3JpYWwlMjBzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzIzODc1NHww&ixlib=rb-4.1.0&q=85",
  },
  {
    body:
      "As an investor, this is the top of my funnel now. The pipeline is clean, the diligence surface is honest, and the founders arrive prepared.",
    name: "Priya Chandra",
    role: "General Partner, Halcyon Capital",
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzIzODc1NHww&ixlib=rb-4.1.0&q=85",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const q = quotes[i];

  return (
    <section
      id="testimonials"
      data-testid={SEC.testimonials}
      className="relative py-32 md:py-48 bg-ink-950"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">Field notes</div>
        <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] max-w-3xl mb-16 md:mb-24">
          Founders, mentors, investors — <span className="italic font-light text-white/50">on the record.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-20 items-center">
          <div className="relative min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={q.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-white/95 font-light"
              >
                <span className="text-emerald-400 mr-2">"</span>
                {q.body}
                <span className="text-amber-400 ml-2">"</span>
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={q.name + "-meta"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex items-center gap-4"
                >
                  <img src={q.portrait} alt={q.name} loading="lazy" className="h-12 w-12 rounded-full object-cover grayscale border border-white/10" />
                  <div>
                    <div className="font-medium text-white/90">{q.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">{q.role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex items-center gap-3">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  data-testid={`testimonial-dot-${idx}`}
                  aria-label={`Show testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all ${idx === i ? "w-10 bg-emerald-400" : "w-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* Card stack */}
          <div className="relative h-[420px] hidden md:block">
            {quotes.map((qq, idx) => {
              const offset = (idx - i + quotes.length) % quotes.length;
              return (
                <motion.div
                  key={qq.name}
                  animate={{
                    x: offset * 18,
                    y: offset * 18,
                    scale: 1 - offset * 0.05,
                    opacity: offset < 3 ? 1 - offset * 0.2 : 0,
                    zIndex: 10 - offset,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-2xl overflow-hidden glass"
                >
                  <img src={qq.portrait} alt="" className="h-full w-full object-cover grayscale opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/90">{qq.role.split(",")[1]?.trim() || "Nexora"}</div>
                    <div className="font-display text-2xl mt-1">{qq.name}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;