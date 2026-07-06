import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, FileText, Users, Sparkles, Loader2, Save, X } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { BUSINESS_PLAN_SECTIONS, ROADMAP } from '../../mock/data';

export default function StartupDetail() {
  const { id } = useParams();
  const [s, setS] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', tagline: '', stage: '' });

  // Apply State
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/startups/${id}`);
        setS(res.data.data);
        setEditForm({
          name: res.data.data.name,
          tagline: res.data.data.tagline,
          stage: res.data.data.stage
        });
      } catch (err) {
        console.error("Failed to fetch startup:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartup();
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/startups/${id}`, editForm);
      if (res.data.success) {
        setS({ ...s, ...editForm, stage: editForm.stage.charAt(0).toUpperCase() + editForm.stage.slice(1) });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to save startup:", error);
    }
  };

  const handleApply = () => {
    // Mock application success for now
    setHasApplied(true);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-emerald-500" /></div>;
  }

  if (!s) {
    return <div className="text-zinc-400">Startup not found.</div>;
  }

  return (
    <div className="space-y-8" data-testid="startup-detail">
      <Link to="/app/startups" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><ArrowLeft size={14} /> All startups</Link>

      <div className="flex items-start justify-between flex-wrap gap-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center font-display text-3xl font-semibold text-black">{s.logo}</div>
          <div>
            <Overline>{s.industry} • {s.stage}</Overline>
            <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">{s.name}</h1>
            <p className="text-zinc-400 mt-2 max-w-xl">{s.tagline}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <MagneticButton variant="ghost" onClick={() => setIsEditing(true)} data-testid="edit-startup">
            <FileText size={14} /> Edit
          </MagneticButton>
          <MagneticButton onClick={handleApply} disabled={hasApplied} data-testid="apply-startup">
            {hasApplied ? 'Applied ✓' : 'Apply for Project'}
          </MagneticButton>
        </div>
      </div>

      {isEditing && (
        <GlassCard className="p-6 border border-emerald-500/30">
          <div className="flex justify-between items-center mb-4">
            <Overline>Edit Startup</Overline>
            <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-white"><X size={16}/></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Name</label>
              <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Tagline</label>
              <input type="text" value={editForm.tagline} onChange={e => setEditForm({...editForm, tagline: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Stage</label>
              <select value={editForm.stage.toLowerCase()} onChange={e => setEditForm({...editForm, stage: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                <option value="idea">Idea</option>
                <option value="validation">Validation</option>
                <option value="growth">Growth</option>
                <option value="scale">Scale</option>
              </select>
            </div>
            <div className="flex justify-end pt-2">
              <MagneticButton onClick={handleSave}><Save size={14}/> Save Changes</MagneticButton>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className="p-6"><Overline>Stage</Overline><div className="font-display text-3xl mt-2">{s.stage}</div><div className="text-xs text-zinc-500 mt-1">Nexora incubation pipeline</div></GlassCard>
        <GlassCard className="p-6"><Overline>Progress</Overline><div className="font-display text-3xl mt-2">{s.progress}%</div><div className="h-1 rounded-full bg-white/[0.05] mt-3"><div className="h-full bg-accent-gradient rounded-full" style={{ width: `${s.progress}%` }} /></div></GlassCard>
        <GlassCard className="p-6"><Overline>Team</Overline><div className="font-display text-3xl mt-2">6</div><div className="text-xs text-zinc-500 mt-1">3 co-founders, 3 hires</div></GlassCard>
      </div>

      <GlassCard className="p-8">
        <Overline>Business Plan</Overline>
        <h2 className="font-display text-3xl font-medium tracking-tight mt-2 mb-8">The full plan.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {BUSINESS_PLAN_SECTIONS.map(sec => (
            <div key={sec.title} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-sm font-bold text-emerald-400 mb-2">{sec.title}</div>
              <p className="text-sm text-zinc-400 leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <Overline>Roadmap</Overline>
        <h2 className="font-display text-3xl font-medium tracking-tight mt-2 mb-8">Milestones.</h2>
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
    </div>
  );
}
