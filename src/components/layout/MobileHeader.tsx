import { Menu } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';

export function MobileHeader() {
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);

  return (
    <header className="lg:hidden sticky top-0 inset-x-0 z-30 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b">
      <div className="flex items-center justify-between px-4 h-14">
        <button
          onClick={toggleMobileMenu}
          className="p-2 -mr-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="فتح القائمة"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="14" r="2.5" fill="white" opacity="0.5"/>
              <circle cx="10" cy="10" r="2.5" fill="white" opacity="0.75"/>
              <circle cx="15" cy="6" r="2.5" fill="white"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-primary-700 dark:text-primary-400">
            أثر
          </span>
        </div>

        <div className="w-9" />
      </div>
    </header>
  );
}