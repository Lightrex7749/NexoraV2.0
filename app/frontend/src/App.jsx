import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { Toaster } from 'sonner';
import { CustomCursor, Grain } from './components/ui/primitives';
import { PublicNavbar, PublicFooter } from './components/ui/nav';
import AppShell from './components/ui/AppShell';
import { isAuthed } from './lib/auth';

// Public pages
import Landing from './pages/Landing';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Showcase from './pages/Showcase';
import Events from './pages/Events';
import SuccessStories from './pages/SuccessStories';
import FAQPage from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';

// App pages
import Dashboard from './pages/app/Dashboard';
import Startups from './pages/app/Startups';
import StartupDetail from './pages/app/StartupDetail';
import Network from './pages/app/Network';
import Community from './pages/app/Community';
import Chat from './pages/app/Chat';
import Team from './pages/app/Team';
import Insights from './pages/app/Insights';
import AISuite from './pages/app/AISuite';
import MentorStudio from './pages/app/MentorStudio';
import InvestorDesk from './pages/app/InvestorDesk';
import AdminConsole from './pages/app/AdminConsole';
import Profile from './pages/app/Profile';
import Settings from './pages/app/Settings';
import Notifications from './pages/app/Notifications';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function PublicLayout() {
  useEffect(() => {
    document.body.classList.add('public-page');
    return () => document.body.classList.remove('public-page');
  }, []);

  return (
    <>
      <CustomCursor />
      <PublicNavbar />
      <Outlet />
      <PublicFooter />
    </>
  );
}

function AuthLayout() {
  // Bare layout for login/register — no navbar/footer clutter
  return <Outlet />;
}

function RequireAuth() {
  const location = useLocation();
  if (!isAuthed()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <AppShell />;
}

function LenisRoot({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let rafId;
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisRoot>
        <div className="relative bg-ink-950 min-h-screen">
        <Grain />
        <Toaster theme="dark" position="bottom-right" richColors />
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/events" element={<Events />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login mode="signin" />} />
            <Route path="/register" element={<Login mode="register" />} />
          </Route>

          <Route path="/app" element={<RequireAuth />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="startups" element={<Startups />} />
          <Route path="startups/:id" element={<StartupDetail />} />
          <Route path="network" element={<Network />} />
          <Route path="community" element={<Community />} />
          <Route path="chat" element={<Chat />} />
          <Route path="team" element={<Team />} />
          <Route path="insights" element={<Insights />} />
          <Route path="ai" element={<AISuite />} />
          <Route path="mentor" element={<MentorStudio />} />
          <Route path="investor" element={<InvestorDesk />} />
          <Route path="admin" element={<AdminConsole />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
      </LenisRoot>
    </BrowserRouter>
  );
}
