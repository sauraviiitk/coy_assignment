import React from 'react';

export default function BottomNav({ currentTab = 'discover', onTabChange }) {
  return (
    <nav className="fixed bottom-0 w-full max-w-[420px] z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_10px_rgba(0,0,0,0.04)] border-t border-[#1e1a24]/5">
      <div className="flex justify-around items-center h-20 px-margin">
        <button 
          type="button"
          onClick={() => onTabChange && onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all cursor-pointer ${
            currentTab === 'home' 
              ? 'text-primary font-bold' 
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className={`material-symbols-outlined text-[24px] ${currentTab === 'home' ? 'filled-icon' : ''}`}>
            home
          </span>
          <span className="font-label-sm text-label-sm mt-space-xs">Home</span>
        </button>

        <button 
          type="button"
          onClick={() => onTabChange && onTabChange('discover')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all cursor-pointer ${
            currentTab === 'discover' 
              ? 'text-primary-container font-bold' 
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className={`material-symbols-outlined text-[24px] ${currentTab === 'discover' ? 'filled-icon' : ''}`}>
            favorite
          </span>
          <span className="font-label-sm text-label-sm mt-space-xs">Discover</span>
        </button>
      </div>
    </nav>
  );
}
