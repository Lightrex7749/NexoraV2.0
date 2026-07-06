import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { SectionLabel, MagneticButton } from '../components/ui/primitives';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      toast.success(res.data.message);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const input = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors';

  return (
    <div className="pt-40 pb-32 px-6" data-testid="contact-page">
      <div className="mx-auto max-w-3xl">
        <SectionLabel number="00" title="Contact" />
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9] mb-8">
          Let's <span className="gradient-text italic">talk.</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-16 max-w-xl">Whether you're a founder, mentor, investor, or press — we read everything.</p>

        <form onSubmit={submit} className="space-y-4" data-testid="contact-form">
          <input required placeholder="Your name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="contact-name" />
          <input required type="email" placeholder="Email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="contact-email" />
          <textarea required placeholder="How can we help?" rows="5" className={input} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} data-testid="contact-message" />
          <div className="pt-4">
            <MagneticButton type="submit" data-testid="contact-submit">{loading ? 'Sending…' : 'Send message →'}</MagneticButton>
          </div>
        </form>
      </div>
    </div>
  );
}
