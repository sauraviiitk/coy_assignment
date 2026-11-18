import React from 'react';
import logo from '../public/logo.png';

export default function Header({
  currentTab = 'discover',
  onTabChange,
  title,
  onBack,
  showBack = false,
  showTabs = true
}) {
  return (
    <header className="fixed top-0 w-full max-w-[420px] z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className={`flex flex-col justify-between px-margin ${showTabs ? 'h-28 py-space-sm' : 'h-16 py-2'}`}>
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-space-sm">
            {showBack && (
              <button
                onClick={onBack}
                aria-label="Back"
                className="w-11 h-11 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
            )}
            <img
              alt="Coy Logo"
              className="h-8 w-auto object-contain cursor-pointer"
              src={logo}
              onClick={() => onTabChange && onTabChange('discover')}
            />
            {title && (
              <h1 className="font-headline-sm text-headline-sm text-on-surface ml-1">
                {title}
              </h1>
            )}
          </div>

          <div className="flex items-center gap-space-sm">
            {!showBack && (
              <button
                aria-label="Settings"
                className="w-11 h-11 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[1px_1px_0px_#1e1a24]">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>

        {showTabs && (
          <div className="flex items-center justify-center pb-space-xs">
            <nav className="flex items-center p-space-xs rounded-full bg-surface-container-high">
              <button
                type="button"
                onClick={() => onTabChange && onTabChange('home')}
                className={`flex items-center gap-space-xs px-margin py-space-xs rounded-full font-label-md text-label-md transition-all cursor-pointer ${currentTab === 'home'
                  ? 'bg-secondary-container text-on-surface shadow-[2px_2px_0px_#1e1a24]'
                  : 'text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-primary-container inline-block"></span>
                <span>Home</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange && onTabChange('discover')}
                className={`flex items-center gap-space-xs px-margin py-space-xs rounded-full font-label-md text-label-md transition-all cursor-pointer ${currentTab === 'discover'
                  ? 'bg-secondary-container text-on-surface shadow-[2px_2px_0px_#1e1a24]'
                  : 'text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-primary-container inline-block"></span>
                <span>Discover</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
