import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Briefcase, Folder, Link as LinkIcon, FileText, Loader2, Save, X, Upload } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { getUser } from '../../lib/auth';
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, docRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/documents`)
        ]);
        if (profRes.data.success) {
          setProfile(profRes.data.data);
          setEditForm(profRes.data.data);
        }
        if (docRes.data.success) {
          setDocuments(docRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile/documents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, editForm);
      if (res.data.success) {
        setProfile(res.data.data);
        localStorage.setItem('nexora_user', JSON.stringify({ ...(getUser() || {}), ...res.data.data, avatar: res.data.data.avatarUrl || res.data.data.avatar }));
        window.dispatchEvent(new Event('nexora-user-updated'));
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm(prev => ({ ...prev, avatarUrl: reader.result }));
      setUploadingAvatar(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingDoc(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const payload = {
          title: file.name,
          fileUrl: reader.result,
          type: 'other'
        };
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, payload);
        if (res.data.success) {
          setDocuments([...documents, res.data.data]);
        }
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploadingDoc(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-emerald-500" /></div>;
  }

  if (!profile) {
    return <div className="text-zinc-400">Profile not found.</div>;
  }

  return (
    <div className="space-y-6" data-testid="profile-page">
      <div className="flex items-start gap-6">
        <div className="relative">
          <img src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.name || 'User'}&background=random`} className="w-24 h-24 rounded-2xl object-cover" alt={profile.name} />
          {profile.avatarUrl && <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black rounded-full p-1"><Upload size={12} /></div>}
        </div>
        <div className="flex-1">
          <Overline>{profile.role}</Overline>
          <h1 className="font-display text-4xl font-medium tracking-tight mt-2">{profile.name}</h1>
          <p className="text-zinc-400 mt-1">{profile.headline || 'Add a headline'}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
            {profile.location && <span className="flex items-center gap-1"><MapPin size={12} /> {profile.location}</span>}
            {profile.location && profile.industry && <span>•</span>}
            {profile.industry && <span>{profile.industry}</span>}
          </div>
        </div>
        <MagneticButton variant="ghost" className="!px-4 !py-2 text-sm" onClick={() => setIsEditing(true)}>Edit profile</MagneticButton>
      </div>

      {isEditing && (
        <GlassCard className="p-6 border border-emerald-500/30">
          <div className="flex justify-between items-center mb-4">
            <Overline>Edit Profile</Overline>
            <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-white"><X size={16}/></button>
          </div>
          <div className="space-y-4 grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="relative">
                <img src={editForm.avatarUrl || profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.name || 'User'}&background=random`} alt={profile.name} className="w-20 h-20 rounded-2xl object-cover border border-white/10" />
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] text-sm text-white hover:bg-white/[0.08] transition-colors">
                {uploadingAvatar ? 'Uploading...' : <><Upload size={14} /> Upload new pfp</>}
                <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" disabled={uploadingAvatar} />
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-400 block mb-1">Headline</label>
              <input type="text" value={editForm.headline || ''} onChange={e => setEditForm({...editForm, headline: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Location</label>
              <input type="text" value={editForm.location || ''} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Industry</label>
              <input type="text" value={editForm.industry || ''} onChange={e => setEditForm({...editForm, industry: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-400 block mb-1">Bio</label>
              <textarea value={editForm.bio || ''} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" rows={3}></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end pt-2">
              <MagneticButton onClick={handleSave}><Save size={14}/> Save Profile</MagneticButton>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className="p-6"><Overline>Skills</Overline><div className="mt-3 flex flex-wrap gap-2">{(profile.skills || []).map(s => <span key={s} className="px-3 py-1 text-xs rounded-full bg-white/[0.04]">{s}</span>)}</div></GlassCard>
        <GlassCard className="p-6"><Overline>Interests</Overline><div className="mt-3 flex flex-wrap gap-2">{(profile.interests || []).map(r => <span key={r} className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400">{r}</span>)}</div></GlassCard>
        <GlassCard className="p-6"><Overline>Network</Overline><div className="font-display text-4xl mt-2">{profile.followers || 0}</div><div className="text-xs text-zinc-500 mt-1">followers • {profile.following || 0} following</div></GlassCard>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={16} className="text-emerald-500" />
            <Overline>Experience</Overline>
          </div>
          <div className="space-y-4">
            {profile.workExperience && profile.workExperience.length > 0 ? profile.workExperience.map((work, i) => (
              <div key={i} className="border-l-2 border-white/10 pl-4 py-1">
                <div className="font-medium text-sm">{work.role}</div>
                <div className="text-xs text-zinc-400">{work.company}</div>
                <p className="text-xs text-zinc-500 mt-1">{work.description}</p>
              </div>
            )) : <div className="text-xs text-zinc-500">No experience added.</div>}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Folder size={16} className="text-emerald-500" />
            <Overline>Projects</Overline>
          </div>
          <div className="space-y-4">
            {profile.projects && profile.projects.length > 0 ? profile.projects.map((proj, i) => (
              <div key={i} className="border border-white/5 bg-white/[0.02] p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-sm">{proj.name}</div>
                  {proj.url && <a href={proj.url} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-500"><LinkIcon size={12}/></a>}
                </div>
                <p className="text-xs text-zinc-500 mt-1">{proj.description}</p>
              </div>
            )) : <div className="text-xs text-zinc-500">No projects added.</div>}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-emerald-500" />
            <Overline>Documents Vault</Overline>
          </div>
          <div>
            <label className="cursor-pointer text-xs font-medium text-emerald-400 hover:text-emerald-300">
              {uploadingDoc ? 'Uploading...' : 'Upload Document'}
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt,image/*" disabled={uploadingDoc} />
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map(doc => (
            <div key={doc.id} className="border border-white/5 bg-white/[0.02] p-4 rounded-lg flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-sm font-medium truncate" title={doc.title}>{doc.title}</div>
                <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">{doc.type}</div>
              </div>
              <a href={doc.fileUrl} download={doc.title} className="text-zinc-500 hover:text-emerald-400 flex-shrink-0 ml-4">
                <LinkIcon size={14} />
              </a>
            </div>
          ))}
          {documents.length === 0 && (
            <div className="text-xs text-zinc-500 col-span-full">No documents uploaded yet.</div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
