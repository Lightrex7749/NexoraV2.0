import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Filter, Loader2, Search, Heart, Share2, Check, MapPin, Sparkles, X } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';

export default function Startups() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sharedId, setSharedId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createBusy, setCreateBusy] = useState(false);
  const [createError, setCreateError] = useState('');
  const [newStartup, setNewStartup] = useState({
    name: '',
    idea: '',
    tagline: '',
    location: '',
    website: '',
    stage: 'idea'
  });

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/startups`);
        setStartups(res.data.data);
      } catch (err) {
        console.error("Failed to fetch startups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  const stages = ['All', 'Idea', 'Validation', 'Growth', 'Scale'];

  const filtered = startups.filter(s => {
    const matchStage = filter === 'All' ? true : s.stage?.toLowerCase() === filter.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        (s.tagline && s.tagline.toLowerCase().includes(search.toLowerCase()));
    return matchStage && matchSearch;
  });

  const handleLike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/community/like`, {
        targetId: id,
        targetType: 'Startup'
      });
      if (res.data.success) {
        setStartups(startups.map(s => {
          if (s.id === id) {
            return { ...s, likes: res.data.data.liked ? (s.likes || 0) + 1 : (s.likes || 0) - 1, userLiked: res.data.data.liked };
          }
          return s;
        }));
      }
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const handleShare = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/app/startups/${id}`);
    setSharedId(id);
    setTimeout(() => setSharedId(null), 2000);
  };

  const handleCreateStartup = async () => {
    setCreateError('');
    if (newStartup.name.trim().length < 2) {
      setCreateError('Startup name is required.');
      return;
    }
    if (newStartup.idea.trim().length < 10) {
      setCreateError('Please describe the startup idea in at least 10 characters.');
      return;
    }

    try {
      setCreateBusy(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/startups`, newStartup);
      if (res.data.success) {
        setStartups(prev => [res.data.data, ...prev]);
        setCreating(false);
        setNewStartup({ name: '', idea: '', tagline: '', location: '', website: '', stage: 'idea' });
        navigate(`/app/startups/${res.data.data.id}`);
      }
    } catch (err) {
      setCreateError(err.response?.data?.detail || 'Failed to create startup.');
    } finally {
      setCreateBusy(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="startups-page">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>Startups</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your ideas <span className="gradient-text italic">in motion.</span></h1>
        </div>
        <MagneticButton onClick={() => setCreating(true)} data-testid="new-startup-btn"><Plus size={16} /> New startup</MagneticButton>
      </div>

      {creating && (
        <GlassCard className="p-6 border border-emerald-500/30">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <Overline>Create startup</Overline>
              <h2 className="font-display text-2xl font-medium mt-2 flex items-center gap-2"><Sparkles className="text-emerald-500" size={18} /> AI evaluates the idea and generates hashtags</h2>
            </div>
            <button onClick={() => setCreating(false)} className="text-zinc-400 hover:text-white"><X size={16} /></button>
          </div>

          {createError && <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{createError}</div>}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Startup name</label>
              <input value={newStartup.name} onChange={(e) => setNewStartup(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" placeholder="Aether Labs" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Stage</label>
              <select value={newStartup.stage} onChange={(e) => setNewStartup(prev => ({ ...prev, stage: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                <option value="idea">Idea</option>
                <option value="validation">Validation</option>
                <option value="growth">Growth</option>
                <option value="scale">Scale</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-400 block mb-1">Idea</label>
              <textarea value={newStartup.idea} onChange={(e) => setNewStartup(prev => ({ ...prev, idea: e.target.value }))} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" placeholder="Describe the startup idea, target customer, and why it matters..." />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Tagline</label>
              <input value={newStartup.tagline} onChange={(e) => setNewStartup(prev => ({ ...prev, tagline: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" placeholder="Short positioning line" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Website</label>
              <input value={newStartup.website} onChange={(e) => setNewStartup(prev => ({ ...prev, website: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-400 block mb-1">Location</label>
              <input value={newStartup.location} onChange={(e) => setNewStartup(prev => ({ ...prev, location: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" placeholder="San Francisco, Remote, Berlin..." />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <MagneticButton variant="ghost" onClick={() => setCreating(false)}>Cancel</MagneticButton>
            <MagneticButton onClick={handleCreateStartup}>{createBusy ? 'Evaluating...' : 'Evaluate & Create'}</MagneticButton>
          </div>
        </GlassCard>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-zinc-500" />
          {stages.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${filter === s ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}
              data-testid={`filter-${s.toLowerCase()}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startups..."
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => (
            <div key={s.id} onClick={() => navigate(`/app/startups/${s.id}`)} className="cursor-pointer" data-testid={`startup-card-${s.id}`}>
              <GlassCard className="p-6 h-full hover:bg-white/[0.04] transition-colors relative flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center font-display text-xl font-semibold text-black">{s.logo}</div>
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${s.status === 'APPROVED' ? 'text-emerald-500' : 'text-amber-500'}`}>{s.status}</span>
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight mb-2">{s.name}</h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-2">{s.tagline}</p>
                {typeof s.aiScore === 'number' && (
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400">
                    <Sparkles size={11} /> AI score {s.aiScore}/100
                  </div>
                )}
                {s.location && <div className="mb-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-500 bg-white/[0.03] px-2.5 py-1 rounded-full"><MapPin size={11} /> {s.location}</div>}
                {s.hashtags?.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {s.hashtags.slice(0, 3).map(tag => <span key={tag} className="rounded-full bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400">{tag}</span>)}
                  </div>
                )}
                <div className="mt-auto mb-2 flex items-center justify-between text-xs text-zinc-500">
                  <span>{s.stage}</span><span>{s.progress}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden mb-4">
                  <div className="h-full bg-accent-gradient" style={{ width: `${s.progress}%` }} />
                </div>
                <div className="pt-4 border-t border-white/[0.05] flex items-center gap-6 text-xs text-zinc-500">
                  <button onClick={(e) => handleLike(e, s.id)} className={`flex items-center gap-1.5 transition-colors ${s.userLiked ? 'text-emerald-400' : 'hover:text-emerald-400'}`}>
                    <Heart size={14} className={s.userLiked ? 'fill-emerald-400' : ''} /> {s.likes || 0}
                  </button>
                  <button onClick={(e) => handleShare(e, s.id)} className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                    {sharedId === s.id ? <><Check size={14} className="text-emerald-400" /> Copied</> : <><Share2 size={14} /> Share</>}
                  </button>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
