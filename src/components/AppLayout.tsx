import { LayoutDashboard, ListChecks, PencilLine } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/planner', label: 'Planner', icon: PencilLine },
  { to: '/plans', label: 'Plans', icon: ListChecks },
];

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-x-0 top-0 z-20 border-b border-line bg-white/95 backdrop-blur md:inset-y-0 md:right-auto md:w-64 md:border-b-0 md:border-r">
        <div className="flex h-16 items-center justify-between px-5 md:h-20">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-ink text-sm font-bold text-white shadow-soft">
              P
            </div>
            <div>
              <div className="text-xl font-semibold tracking-normal">
                Plan<span className="text-coral">it</span>
              </div>
              <div className="hidden text-xs text-stone-500 md:block">Project planning workspace</div>
            </div>
          </div>
        </div>
        <nav className="flex gap-1 px-3 pb-3 md:block md:space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'flex h-10 flex-1 items-center gap-2 rounded-md px-3 text-sm font-medium transition md:flex-none',
                  isActive ? 'bg-ink text-white' : 'text-stone-600 hover:bg-panel hover:text-ink',
                ].join(' ')
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="px-4 pb-10 pt-32 md:ml-64 md:px-8 md:pt-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
