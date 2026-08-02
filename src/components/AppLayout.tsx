import {
  BarChart3,
  Bell,
  Bot,
  CalendarClock,
  FileText,
  History,
  LayoutDashboard,
  ListChecks,
  Moon,
  Search,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

const mainNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/plans', label: 'Projects', icon: FileText },
  { to: '/planner', label: 'Templates', icon: CalendarClock },
  { to: '/plans', label: 'Roadmaps', icon: SlidersHorizontal },
  { to: '/plans', label: 'Tasks', icon: ListChecks },
  { to: '/plans', label: 'Risks', icon: ShieldAlert },
  { to: '/dashboard', label: 'Analytics', icon: BarChart3 },
  { to: '/plans', label: 'History', icon: History },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <aside className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#030817]/94 backdrop-blur-xl lg:inset-y-0 lg:right-auto lg:w-[290px] lg:border-b-0 lg:border-r">
        <div className="flex h-20 items-center justify-between px-5 lg:h-24">
          <BrandLogo />
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-2 lg:overflow-visible">
          {mainNav.map((item, index) => (
            <NavLink
              key={`${item.to}-${item.label}-${index}`}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex min-h-12 shrink-0 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/25 lg:w-full',
                  isActive ? 'border-fuchsia-400/45 bg-gradient-to-r from-[#6d4cff]/50 to-[#ec4899]/20 text-white shadow-[0_0_38px_rgba(124,58,237,0.24)]' : 'border-transparent text-white/62 hover:bg-white/[0.055] hover:text-white',
                ].join(' ')
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mx-5 mt-5 hidden lg:block">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/38">Tools</div>
          <NavLink to="/planner" className="flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold text-white/68 transition hover:bg-white/[0.055] hover:text-white">
            <Sparkles size={18} className="text-[#b879ff]" />
            AI Assistant
            <span className="ml-auto rounded-lg bg-[#7c3aed]/35 px-2 py-1 text-xs text-[#d7b6ff]">New</span>
          </NavLink>
        </div>

        <div className="mx-4 mt-8 hidden rounded-2xl border border-fuchsia-400/25 bg-gradient-to-br from-[#6d4cff]/20 to-[#ff7a2f]/12 p-5 shadow-[0_0_50px_rgba(124,58,237,0.16)] lg:block">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#7c3aed]/35 text-[#d7b6ff] shadow-[0_0_40px_rgba(124,58,237,0.44)]">
            <Bot size={25} />
          </div>
          <h3 className="mt-5 font-bold">Upgrade to Pro</h3>
          <p className="mt-2 text-sm leading-6 text-white/58">Unlock advanced AI insights, unlimited projects and more.</p>
          <button className="neon-button mt-5 w-full">Upgrade Now</button>
        </div>

        <div className="absolute bottom-5 left-4 right-4 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 lg:flex">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#6d4cff] to-[#ff7a2f] font-black">C</div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">Chandan</div>
            <div className="text-xs text-white/40">Pro Plan</div>
          </div>
          <Settings size={17} className="ml-auto text-white/40" />
        </div>
      </aside>

      <main className="px-4 pb-10 pt-28 lg:ml-[290px] lg:px-8 lg:pt-6">
        <div className="mx-auto max-w-[1550px]">
          <div className="mb-7 hidden items-center justify-between gap-5 lg:flex">
            <div className="relative mx-auto w-full max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-12 pr-16 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400/50" placeholder="Search projects, tasks, docs..." />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-white/[0.08] px-2 py-1 text-xs text-white/50">Ctrl K</kbd>
            </div>
            <div className="flex gap-3">
              {[Sparkles, Bell, Moon].map((Icon, index) => (
                <button key={index} className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.045] text-white/70 transition hover:border-fuchsia-400/35 hover:text-white" aria-label="Toolbar action">
                  <Icon size={19} />
                </button>
              ))}
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
