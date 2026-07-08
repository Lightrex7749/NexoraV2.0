import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Lock, User, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { MagneticButton, GlassCard, Overline } from '../components/ui/primitives';
import { signIn } from '../lib/auth';

const DEMO_ROLES = ['Founder', 'Mentor', 'Investor', 'Team Member', 'Admin'];

export default function Login({ mode = 'signin' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('founder@nexora.co');
  const [password, setPassword] = useState('demo');
  const [role, setRole] = useState('Founder');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = mode === 'register';

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Email and password are required.'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = signIn({ name: isRegister ? name : email.split('@')[0], email, role });
      toast.success(`Welcome, ${user.name}. Launching Nexora…`);
      setLoading(false);
      const to = location.state?.from || '/app/dashboard';
      navigate(to, { replace: true });
    }, 700);
  };

  const demoIn = (r) => {
    setLoading(true);
    setTimeout(() => {
      signIn({ name: `${r} Demo`, email: `${r.toLowerCase()}@nexora.co`, role: r });
      toast.success(`Signed in as ${r}.`);
      navigate('/app/dashboard', { replace: true });
    }, 400);
  };

  return (
    <>
      <div className="min-h-screen relative pt-32 pb-24 px-6" data-testid={isRegister ? 'register-page' : 'login-page'}>
        <div className="aurora" />
        <div className="relative z-10 mx-auto max-w-lg">
          <Link to="/" className="flex items-center gap-2 mb-8 w-fit" data-testid="auth-logo-link">
            <span className="font-display text-2xl font-semibold tracking-tight">NEXORA</span>
          </Link>

          <Overline>{isRegister ? 'Create your account' : 'Sign in'}</Overline>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight mt-3 mb-3">
            {isRegister ? <>Start your <span className="gradient-text italic">journey.</span></> : <>Welcome <span className="gradient-text italic">back.</span></>}
          </h1>
          <p className="text-zinc-400 mb-10 max-w-sm">
            This is a mock sign-in. Any email / password unlocks the full demo experience.
          </p>

          <GlassCard className="p-8">
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={submit}
              className="space-y-4"
              data-testid="auth-form"
            >
              {isRegister && (
                <Field icon={User} value={name} onChange={setName} placeholder="Ava Mercer" label="Name" testId="auth-name" />
              )}
              <Field icon={Mail} type="email" value={email} onChange={setEmail} placeholder="you@founder.co" label="Email" testId="auth-email" />
              <Field icon={Lock} type="password" value={password} onChange={setPassword} placeholder="•••••••" label="Password" testId="auth-password" />

              {isRegister && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2 block">Role</label>
                  <div className="flex flex-wrap gap-2">
                    {DEMO_ROLES.map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`px-3 py-1.5 text-xs rounded-full transition-colors ${role === r ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'}`}
                        data-testid={`role-pill-${r.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <MagneticButton type="submit" data-testid="auth-submit" className="w-full">
                  {loading ? 'Please wait…' : (isRegister ? 'Create account' : 'Sign in')} <ArrowUpRight size={16} />
                </MagneticButton>
              </div>
            </motion.form>

            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Or try a demo role</div>
              <div className="flex flex-wrap gap-2">
                {DEMO_ROLES.map(r => (
                  <button
                    key={r}
                    onClick={() => demoIn(r)}
                    className="px-3 py-1.5 text-xs rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.06] transition-colors"
                    data-testid={`demo-${r.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {r} demo
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          <p className="text-sm text-zinc-500 text-center mt-8">
            {isRegister ? (
              <>Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300" data-testid="switch-to-signin">Sign in</Link></>
            ) : (
              <>New to Nexora? <Link to="/register" className="text-emerald-400 hover:text-emerald-300" data-testid="switch-to-register">Create an account</Link></>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

function Field({ icon: Icon, type = 'text', value, onChange, placeholder, label, testId }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2 block">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full pl-11 pr-4 py-3 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          data-testid={testId}
        />
      </div>
    </div>
  );
}
