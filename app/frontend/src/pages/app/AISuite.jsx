import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { BUSINESS_PLAN_SECTIONS, ROADMAP } from '../../mock/data';

const TABS = [
  { id: 'validation', label: 'Idea Validation' },
  { id: 'plan', label: 'Business Plan' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'recommend', label: 'Recommendations' },
];

export default function AISuite() {
  const [tab, setTab] = useState('validation');
  const [status, setStatus] = useState('idle'); // idle | running | done
  const [idea, setIdea] = useState('An agentic checkout assistant for mid-market Shopify brands.');
  const [validationData, setValidationData] = useState(null);

  const run = async () => {
    if (!idea || idea.trim().length < 10) {
      toast.error("Please enter a more detailed idea.");
      return;
    }
    setStatus('running');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/validate-idea`, { idea });
      setValidationData(res.data.data);
      setStatus('done');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "AI Validation Failed");
      setStatus('idle');
    }
  };

  return (
    <div className="space-y-6" data-testid="ai-suite">
      <div>
        <Overline>AI Suite</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your always-on <span className="gradient-text italic">operator.</span></h1>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setStatus('idle'); }} className={`px-4 py-2 text-sm rounded-full ${tab === t.id ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`} data-testid={`ai-tab-${t.id}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'validation' && (
        <GlassCard className="p-8">
          <Overline>Prompt</Overline>
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows="3" className="w-full mt-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-emerald-500/50" data-testid="idea-input" />
          <div className="mt-4">
            <MagneticButton onClick={run} data-testid="run-validation-btn">
              {status === 'running' ? <><Loader2 size={16} className="animate-spin" /> Analyzing…</> : <><Sparkles size={16} /> Run Validation</>}
            </MagneticButton>
          </div>

          <AnimatePresence>
            {status === 'done' && validationData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-6">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Score</div>
                    <div className="font-display text-7xl font-semibold gradient-text tracking-tighter">{validationData.score}</div>
                  </div>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(validationData.swot || {}).map(([k, v]) => (
                    <div key={k} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">{k}</div>
                      <ul className="space-y-2">
                        {v.map(x => <li key={x} className="text-sm text-zinc-300">• {x}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">Risks</div>
                  <div className="space-y-2">
                    {(validationData.risks || []).map(r => (
                      <div key={r.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${r.level === 'High' ? 'bg-red-500/20 text-red-400' : r.level === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{r.level}</span>
                        <span className="text-sm text-zinc-300">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">Suggestions</div>
                  <ul className="space-y-2">
                    {(validationData.suggestions || []).map(x => <li key={x} className="text-sm text-zinc-300 flex items-start gap-2"><span className="text-emerald-500 mt-0.5">→</span>{x}</li>)}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      )}

      {tab === 'plan' && (
        <GlassCard className="p-8">
          <h2 className="font-display text-2xl font-medium mb-6">Business Plan — v2</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {BUSINESS_PLAN_SECTIONS.map(sec => (
              <div key={sec.title} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-sm font-bold text-emerald-400 mb-2">{sec.title}</div>
                <p className="text-sm text-zinc-400 leading-relaxed">{sec.body}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {tab === 'roadmap' && (
        <GlassCard className="p-8">
          <h2 className="font-display text-2xl font-medium mb-6">Roadmap 2026</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROADMAP.map(r => (
              <div key={r.quarter} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">{r.quarter}</div>
                <div className="text-sm font-medium mb-3">{r.title}</div>
                <ul className="space-y-2">
                  {r.milestones.map(m => <li key={m} className="text-xs text-zinc-400 flex items-start gap-2"><span className="text-emerald-500 mt-0.5">◆</span>{m}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {tab === 'recommend' && (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { type: 'Mentor', name: 'Marcus Wei', why: 'Payments expertise matches your ICP.' },
            { type: 'Investor', name: 'Elena Rossi', why: 'Northlight leads agentic-commerce deals.' },
            { type: 'Grant', name: 'EU Deep-tech Seed', why: 'Fits your stage and industry (AI Commerce).' },
            { type: 'Event', name: 'Founders Studio Berlin', why: '3 investors on your radar attending.' },
            { type: 'Resource', name: 'Series-A Playbook 2026', why: 'You marked Funding as your next milestone.' },
            { type: 'Hire', name: 'Jonas Berg', why: 'ML engineer, 92% skill overlap with your open role.' },
          ].map(r => (
            <GlassCard key={r.name} className="p-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-3">{r.type}</div>
              <div className="font-display text-lg font-medium mb-3">{r.name}</div>
              <p className="text-xs text-zinc-400">{r.why}</p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
