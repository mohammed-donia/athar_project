import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  ListChecks,
  Activity as ActivityIcon,
  BarChart3,
  Settings as SettingsIcon,
  X,
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';

const navItems = [
  { to: '/',           label: 'الرئيسية',   icon: Home,         end: true },
  { to: '/trackers',   label: 'المتابعات',  icon: ListChecks },
  { to: '/activity',   label: 'النشاط',     icon: ActivityIcon },
  { to: '/statistics', label: 'الإحصائيات', icon: BarChart3 },
  { to: '/settings',   label: 'الإعدادات',  icon: SettingsIcon },
];

export function MobileDrawer() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);
  const location = useLocation();

  useEffect(() => {
    if (open) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        onClick={close}
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-white dark:bg-neutral-900 border-l z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="14" r="2.5" fill="white" opacity="0.5"/>
                <circle cx="10" cy="10" r="2.5" fill="white" opacity="0.75"/>
                <circle cx="15" cy="6" r="2.5" fill="white"/>
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold text-primary-700 dark:text-primary-400">
                أثر
              </div>
              <div className="text-[10px] text-neutral-500 -mt-0.5">
                سجّل حياتك
              </div>
            </div>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
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

        <div className="p-4 border-t text-center text-[10px] text-neutral-400">
          أثر · الإصدار 1.0.0
        </div>
      </aside>
    </>
  );
}