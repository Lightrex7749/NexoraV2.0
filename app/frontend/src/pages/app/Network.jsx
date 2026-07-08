import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Search, ShieldCheck, MapPin, Loader2, Check } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
export default function Network() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [role, setRole] = useState('All');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState({});
  const roles = ['All', 'Founder', 'Mentor', 'Investor', 'Team Member'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`);
        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleConnect = async (targetId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/connect/${targetId}`);
      if (res.data.success) {
        setConnections({ ...connections, [targetId]: true });
        toast.success("Connection request sent!");
      }
    } catch (err) {
      console.error("Failed to connect:", err);
      toast.error(err.response?.data?.detail || "Failed to connect");
    }
  };

  const filtered = users.filter(p => {
    const filterRole = role === 'Team Member' ? 'user' : role.toLowerCase();
    return (role === 'All' || (p.role && p.role.toLowerCase() === filterRole)) &&
           (q === '' || p.name?.toLowerCase().includes(q.toLowerCase()) || p.industry?.toLowerCase().includes(q.toLowerCase()));
  });

  return (
    <div className="space-y-6" data-testid="network-page">
      <div>
        <Overline>Network</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">The <span className="gradient-text italic">right</span> people.</h1>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, industry…" className="w-full glass !rounded-full py-3 pl-10 pr-4 text-sm placeholder:text-zinc-500 focus:outline-none" data-testid="network-search" />
        </div>
        <div className="flex items-center gap-2">
          {roles.map(r => (
            <button key={r} onClick={() => setRole(r)} className={`px-3 py-1.5 text-xs rounded-full ${role === r ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>{r}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <GlassCard key={p.id} className="p-6 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
              <div>
                <div className="flex items-start gap-4 mb-3">
                  <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/[0.05]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <div className="font-display text-lg font-medium">{p.name}</div>
                      {p.verified && <ShieldCheck size={14} className="text-emerald-500" />}
                    </div>
                    <div className="text-sm font-semibold text-zinc-300 mt-1">{p.role}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{p.firm}</div>
                  </div>
                </div>
                
                {p.bio && <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">{p.bio}</p>}

                {p.workExperience && p.workExperience.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-500/70 mb-2">Experience</div>
                    {p.workExperience.slice(0, 2).map((exp, i) => (
                      <div key={i} className="flex flex-col border-l border-white/[0.1] pl-3 py-1">
                        <span className="text-xs font-medium text-zinc-200">{exp.role}</span>
                        <span className="text-[11px] text-zinc-500">{exp.company}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6 mt-4"><MapPin size={12} /> {p.location} • {p.industry}</div>
              </div>

              <div className="flex gap-2 mt-auto">
                {connections[p.id] ? (
                  <button disabled className="px-4 py-2 text-xs flex-1 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center gap-2 font-medium">
                    <Check size={14} /> Pending
                  </button>
                ) : (
                  <MagneticButton variant="ghost" className="!px-4 !py-2 text-xs flex-1 border border-white/[0.1]" onClick={() => handleConnect(p.id)}>Connect</MagneticButton>
                )}
                <MagneticButton className="!px-4 !py-2 text-xs flex-1" onClick={() => navigate('/app/chat')}>Message</MagneticButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
