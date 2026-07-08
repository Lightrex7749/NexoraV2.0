import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from 'react-fast-marquee';
import { ArrowUpRight, Sparkles, Check, ChevronDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { MagneticButton, GlassCard, Overline, SectionLabel } from '../components/ui/primitives';
import { PRICING, FAQ, SUCCESS_STORIES } from '../mock/data';

gsap.registerPlugin(ScrollTrigger);

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

const JOURNEY = [
  { step: '01', label: 'Idea', body: 'Capture the raw signal. Nexora structures it into a testable thesis.' },
  { step: '02', label: 'Validation', body: 'AI validates the wedge, market, and moat — with a score you can defend.' },
  { step: '03', label: 'MVP', body: 'Roadmap the smallest thing that ships. Then ship it.' },
  { step: '04', label: 'Launch', body: 'Distribute through your Nexora network of founders, mentors, and press.' },
  { step: '05', label: 'Growth', body: 'Insights, hiring, and mentors calibrated to the exact stage you\'re in.' },
  { step: '06', label: 'Funding', body: 'Warm intros to verified investors already tracking your space.' },
];

export default function Landing() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <MarqueeStrip />
      <Journey />
      <FeatureBento />
      <HowItWorks />
      <TestimonialsSection />
      <FaqSection />
      <FinalCTA />
    </>
  );
}

function IntroLoader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('nexora_intro')) { setGone(true); return; }
    const t = setTimeout(() => { setGone(true); sessionStorage.setItem('nexora_intro', '1'); }, 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[200] bg-ink-950 flex items-center justify-center"
          data-testid="intro-loader"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: '-0.04em' }}
            animate={{ opacity: 1, letterSpacing: '0em' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="font-display text-6xl md:text-8xl font-semibold gradient-text"
          >
            NEXORA
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const headline = 'From Idea to Impact.';
  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 flex flex-col justify-center overflow-hidden" data-testid="hero-section">
      <div className="aurora" />
      <div className="mx-auto max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass !bg-white/[0.03] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-300">Season 01 — Now onboarding founders</span>
          </span>
        </motion.div>

        <h1 className="font-display font-semibold tracking-tighter leading-[0.9] text-[13vw] md:text-[9vw] lg:text-[7.5rem]" data-testid="hero-headline">
          <SplitReveal text="From" delay={0.5} />{' '}
          <SplitReveal text="Idea" delay={0.7} className="gradient-text" />{' '}
          <span className="italic text-stroke">to</span>{' '}
          <SplitReveal text="Impact." delay={1.0} />
        </h1>

        <div className="mt-10 grid md:grid-cols-2 gap-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-lg"
            data-testid="hero-subheadline"
          >
            Nexora is the AI-native operating layer for founders. Validate an idea, plan the business,
            build the team, and get in front of the right investors — inside one calm, cinematic surface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:justify-end"
          >
            <MagneticButton href="/register" data-testid="hero-cta-primary">
              Launch Nexora <ArrowUpRight size={18} />
            </MagneticButton>
            <MagneticButton href="#journey" variant="ghost" data-testid="hero-cta-secondary">
              See the journey
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/[0.06] pt-10"
        >
          {[
            ['1,200+', 'Founders onboarded'],
            ['$48M', 'Raised through Nexora'],
            ['4.2×', 'Faster to MVP'],
            ['96%', 'Would recommend'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl md:text-5xl font-medium tracking-tight">{n}</div>
              <div className="text-xs mt-2 text-zinc-500 uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SplitReveal({ text, delay = 0, className = '' }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + i * 0.03, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="inline-block"
          style={{ transformOrigin: '50% 100%' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
}

function MarqueeStrip() {
  const items = ['BUILT FOR FOUNDERS', 'MENTORS', 'INVESTORS', 'SCALABLE AI', 'AGENTIC PLANNING', 'WARM INTROS', 'GLOBAL NETWORK'];
  return (
    <section className="py-16 border-y border-white/[0.06]" data-testid="marquee-strip">
      <Marquee gradient={false} speed={40}>
        {items.concat(items).map((t, i) => (
          <span key={i} className="mx-12 font-display text-6xl md:text-8xl font-semibold tracking-tighter text-stroke">
            {t} <span className="text-emerald-500 mx-4">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function Journey() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;
    
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;
      
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={containerRef} className="relative overflow-hidden h-screen flex flex-col" data-testid="journey-section">
      <div className="pt-12 md:pt-20 px-6 md:px-12 z-10 shrink-0">
        <SectionLabel number="02" title="The Journey" />
        <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-xl">
          Six stages. <span className="gradient-text">One surface.</span>
        </h2>
      </div>

      <div className="flex-1 relative mt-8 md:mt-12 w-full">
        <div ref={trackRef} className="absolute top-0 left-0 h-full flex items-center gap-8 pl-[10vw] pr-[10vw]">
          {JOURNEY.map((j, i) => (
            <div key={j.step} className="min-w-[75vw] md:min-w-[40vw] h-[380px] md:h-[450px]">
            <GlassCard className="h-full p-10 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-emerald-500 mb-6">{j.step}</div>
                <div className="font-display text-6xl md:text-8xl font-medium tracking-tighter">{j.label}</div>
              </div>
              <div className="max-w-sm">
                <p className="text-zinc-400 text-lg leading-relaxed">{j.body}</p>
                <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
                  <div className="h-px bg-white/[0.1] flex-1" />
                  <span>{i + 1} / {JOURNEY.length}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { title: 'AI Idea Validation', body: 'Score every idea across wedge, market, timing, moat, and risk. Get a SWOT and prescriptive next steps.', tag: 'AI', span: 'md:col-span-2', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800' },
  { title: 'Business Plan Generator', body: 'Draft investor-grade plans in minutes. Export to PDF, version every iteration.', tag: 'AI' },
  { title: 'Roadmap Planner', body: 'Milestones, tasks, dependencies — auto-scoped for your stage.', tag: 'AI' },
  { title: 'Team Builder', body: 'AI-matched co-founders and hires based on skill vector similarity.', tag: 'People' },
  { title: 'Mentorship & Investors', body: 'Verified network. Warm intros. Real pipelines. Zero cold outreach.', tag: 'Network', span: 'md:col-span-2', img: 'https://images.unsplash.com/photo-1666027092835-7e668416b7c8?w=800' },
  { title: 'Market Insights Feed', body: 'A calm, personal feed — accelerators, grants, thesis reports, hiring trends.', tag: 'Insights' },
];

function FeatureBento() {
  return (
    <section className="py-32 px-6" data-testid="features-section">
      <div className="mx-auto max-w-7xl">
        <SectionLabel number="03" title="The Suite" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-2xl">
            Every founder tool, <span className="gradient-text italic">calmly composed.</span>
          </h2>
          <p className="text-zinc-400 max-w-sm text-lg leading-relaxed">
            No more 12-tab founder chaos. Nexora unifies the operator layer that used to live across Notion, Slack, LinkedIn, and 8 spreadsheets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.05, duration: 0.7 }}
              className={f.span || ''}
            >
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <Overline>{f.tag}</Overline>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-4">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.body}</p>
                {f.img && (
                  <div className="mt-8 rounded-xl overflow-hidden border border-white/[0.06]">
                    <img src={f.img} alt="" className="w-full h-48 object-cover opacity-60 group-hover:opacity-90 transition-opacity" />
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Bring the raw signal.', body: 'A sentence is enough. Nexora structures it into a testable thesis, a wedge, and a first-week plan.' },
    { n: '02', title: 'Compress the noise.', body: 'Our insights engine watches your industry, stage, and interests — and only surfaces what should change your week.' },
    { n: '03', title: 'Compound the network.', body: 'Every conversation, mentor note, and investor signal accrues into a calibrated launch surface.' },
  ];
  return (
    <section className="py-32 px-6" data-testid="how-it-works">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16">
        <div className="md:sticky md:top-32 self-start">
          <SectionLabel number="04" title="How it works" />
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight leading-none">
            The architecture <br /> of <span className="gradient-text italic">impact.</span>
          </h2>
          <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-md">
            Nexora is opinionated where it needs to be, and quiet everywhere else. The result is a founder cockpit that feels less like software — and more like clarity.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map(s => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="font-mono text-xs text-emerald-500 mb-6">{s.n}</div>
              <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-4">{s.title}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">{s.body}</p>
              <div className="divider-line mt-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-32 px-6" data-testid="testimonials-section">
      <div className="mx-auto max-w-7xl">
        <SectionLabel number="05" title="Founders on Nexora" />
        <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-16 max-w-2xl">
          Trusted by teams turning ideas <span className="gradient-text italic">into companies.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {SUCCESS_STORIES.map((s, i) => (
            <GlassCard key={s.name} className="p-8 flex flex-col">
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={12} className="fill-amber-500 text-amber-500" />)}
              </div>
              <p className="font-display text-xl leading-snug tracking-tight text-white mb-8">
                "{s.quote}"
              </p>
              <div className="mt-auto">
                <div className="text-sm font-medium">{s.founder}</div>
                <div className="text-xs text-zinc-500">{s.name}</div>
                <div className="mt-3 text-xs text-emerald-500 font-mono">{s.metric}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState(true);
  return (
    <section className="py-32 px-6" data-testid="pricing-section">
      <div className="mx-auto max-w-7xl">
        <SectionLabel number="06" title="Pricing" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-2xl">
            Simple pricing. <span className="italic gradient-text">Compounding value.</span>
          </h2>
          <div className="flex items-center gap-3 glass !bg-white/[0.03] p-1.5 rounded-full">
            <button onClick={() => setYearly(false)} className={`px-4 py-2 rounded-full text-sm transition-colors ${!yearly ? 'bg-white text-black' : 'text-zinc-400'}`} data-testid="billing-monthly">Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-4 py-2 rounded-full text-sm transition-colors ${yearly ? 'bg-white text-black' : 'text-zinc-400'}`} data-testid="billing-yearly">Yearly <span className="text-emerald-500 ml-1">-20%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PRICING.map(p => (
            <GlassCard key={p.name} className={`p-8 flex flex-col ${p.highlighted ? 'ring-1 ring-emerald-500/30 shadow-glow-emerald' : ''}`}>
              {p.highlighted && (
                <div className="absolute top-6 right-6 text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-accent-gradient px-3 py-1 rounded-full">Most loved</div>
              )}
              <h3 className="font-display text-2xl font-medium mb-2">{p.name}</h3>
              <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">{p.description}</p>
              <div className="flex items-end gap-2 mb-8">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={yearly ? 'y' : 'm'}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-6xl font-semibold tracking-tighter"
                  >
                    ${yearly ? p.yearly : p.monthly}
                  </motion.span>
                </AnimatePresence>
                <span className="text-zinc-500 mb-2 text-sm">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <MagneticButton
                href="/register"
                variant={p.highlighted ? 'primary' : 'ghost'}
                data-testid={`pricing-cta-${p.name.toLowerCase()}`}
              >
                {p.cta}
              </MagneticButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-32 px-6" data-testid="faq-section">
      <div className="mx-auto max-w-4xl">
        <SectionLabel number="07" title="Frequently asked" />
        <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-16">
          Curious minds, <span className="gradient-text italic">welcomed.</span>
        </h2>

        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <div key={f.q} className="border-b border-white/[0.06]" data-testid={`faq-item-${i}`}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="font-display text-xl md:text-2xl font-medium tracking-tight group-hover:text-emerald-400 transition-colors">
                  {f.q}
                </span>
                <ChevronDown size={20} className={`transition-transform text-zinc-400 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-zinc-400 text-lg leading-relaxed max-w-3xl">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter`, { email, source: 'landing' });
      toast.success(res.data.message);
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-40 px-6 overflow-hidden" data-testid="final-cta">
      <div className="aurora" />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <SectionLabel number="08" title="The invitation" />
        <h2 className="font-display text-5xl md:text-8xl font-semibold tracking-tighter leading-[0.9] mb-8">
          Start your <br /> <span className="gradient-text italic">journey.</span>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12">
          Join founders, mentors, and investors already building the next decade inside Nexora.
        </p>

        <form onSubmit={submit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mb-10" data-testid="newsletter-form">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@founder.co"
            className="flex-1 glass !rounded-full px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
            data-testid="newsletter-input"
          />
          <MagneticButton type="submit" data-testid="newsletter-submit">
            {loading ? 'Sending…' : 'Get access'} <ArrowUpRight size={16} />
          </MagneticButton>
        </form>

        <MagneticButton href="/register" variant="ghost" data-testid="final-launch-btn">
          Or launch the demo →
        </MagneticButton>
      </div>
    </section>
  );
}
