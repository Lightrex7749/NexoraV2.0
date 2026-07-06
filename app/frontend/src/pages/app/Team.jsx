import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Users, Plus, X, Loader2, Check } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
export default function Team() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isPosting, setIsPosting] = useState(false);
  const [postForm, setPostForm] = useState({ title: '', company: '', description: '', location: '', type: 'full-time' });

  const [applyingTo, setApplyingTo] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  const [appliedJobs, setAppliedJobs] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`);
        if (res.data.success) {
          setJobs(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handlePostRole = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`, postForm);
      if (res.data.success) {
        setJobs([
          { ...res.data.data, id: res.data.data._id, applicants: 0 },
          ...jobs
        ]);
        setIsPosting(false);
        setPostForm({ title: '', company: '', description: '', location: '', type: 'full-time' });
      }
    } catch (err) {
      console.error("Failed to post role:", err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${jobId}/apply`, { coverLetter });
      if (res.data.success) {
        setAppliedJobs({ ...appliedJobs, [jobId]: true });
        setApplyingTo(null);
        setCoverLetter('');

        // Optimistically update applicant count
        setJobs(jobs.map(j => j.id === jobId ? { ...j, applicants: (j.applicants || 0) + 1 } : j));
      }
    } catch (err) {
      console.error("Failed to apply:", err);
    }
  };
  return (
    <div className="space-y-6" data-testid="team-page">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>Team Builder</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Find your <span className="gradient-text italic">co-conspirators.</span></h1>
        </div>
        <MagneticButton onClick={() => setIsPosting(true)} data-testid="post-job-btn"><Plus size={16} className="mr-2"/> Post a role</MagneticButton>
      </div>

      {isPosting && (
        <GlassCard className="p-6 border border-emerald-500/30">
          <div className="flex justify-between items-center mb-4">
            <Overline>Post a New Role</Overline>
            <button onClick={() => setIsPosting(false)} className="text-zinc-400 hover:text-white"><X size={16}/></button>
          </div>
          <div className="space-y-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Job Title</label>
              <input type="text" value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Company / Startup</label>
              <input type="text" value={postForm.company} onChange={e => setPostForm({...postForm, company: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Location</label>
              <input type="text" value={postForm.location} onChange={e => setPostForm({...postForm, location: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Type</label>
              <select value={postForm.type} onChange={e => setPostForm({...postForm, type: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-400 block mb-1">Description</label>
              <textarea value={postForm.description} onChange={e => setPostForm({...postForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" rows={3}></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end pt-2">
              <MagneticButton onClick={handlePostRole}>Publish Role</MagneticButton>
            </div>
          </div>
        </GlassCard>
      )}

      {applyingTo && (
        <GlassCard className="p-6 border border-emerald-500/30">
          <div className="flex justify-between items-center mb-4">
            <Overline>Apply for {applyingTo.title}</Overline>
            <button onClick={() => setApplyingTo(null)} className="text-zinc-400 hover:text-white"><X size={16}/></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Cover Letter (Optional)</label>
              <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} placeholder="Why are you a great fit?" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" rows={4}></textarea>
            </div>
            <div className="flex justify-end pt-2 gap-4">
              <button onClick={() => setApplyingTo(null)} className="text-sm text-zinc-400 hover:text-white">Cancel</button>
              <MagneticButton onClick={() => handleApply(applyingTo.id)}>Submit Application</MagneticButton>
            </div>
          </div>
        </GlassCard>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {jobs.map(j => (
            <GlassCard key={j.id} className="p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-emerald-500 mb-1">{j.company || j.startup}</div>
                  <div className="font-display text-xl font-medium tracking-tight">{j.title}</div>
                </div>
                <div className="text-xs text-zinc-500 text-right">{j.applicants || 0} applicants</div>
              </div>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{j.description}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4 mt-auto">
                <span className="flex items-center gap-1"><MapPin size={12} /> {j.location}</span>
                <span className="uppercase tracking-widest">{j.type}</span>
              </div>
              {appliedJobs[j.id] ? (
                <button disabled className="px-4 py-2 text-xs w-full rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center gap-2 font-medium">
                  <Check size={14} /> Applied
                </button>
              ) : (
                <MagneticButton className="!px-4 !py-2 text-xs w-full" onClick={() => setApplyingTo(j)}>Apply →</MagneticButton>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
