import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {
  Home,
  ListChecks,
  Activity as ActivityIcon,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';
import { QuickAddButton } from '../common/QuickAddButton';
import { Toaster } from '../common/Toaster';
import { MobileHeader } from './MobileHeader';
import { MobileDrawer } from './MobileDrawer';

const navItems = [
  { to: '/',           label: 'الرئيسية',   icon: Home,         end: true },
  { to: '/trackers',   label: 'المتابعات',  icon: ListChecks },
  { to: '/activity',   label: 'النشاط',     icon: ActivityIcon },
  { to: '/statistics', label: 'الإحصائيات', icon: BarChart3 },
  { to: '/settings',   label: 'الإعدادات',  icon: SettingsIcon },
];

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-l bg-white dark:bg-neutral-900 p-4 gap-1 sticky top-0 h-screen shrink-0">
        <div className="flex items-center gap-3 px-3 mb-8 mt-2">
          <Logo />
          <div>
            <div className="text-xl font-bold text-primary-700 dark:text-primary-400">
              أثر
            </div>
            <div className="text-[10px] text-neutral-500 -mt-0.5">
              سجّل حياتك
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <MobileHeader />

        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>

      <MobileDrawer />

      <QuickAddButton />

      <Toaster />
    </div>
  );
}

function Logo() {
  return (
    <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="14" r="2.5" fill="white" opacity="0.5"/>
        <circle cx="10" cy="10" r="2.5" fill="white" opacity="0.75"/>
        <circle cx="15" cy="6" r="2.5" fill="white"/>
      </svg>
    </div>
  );
}