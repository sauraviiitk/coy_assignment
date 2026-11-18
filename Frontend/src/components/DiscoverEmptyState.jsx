import React, { useState } from 'react';

export default function DiscoverEmptyState({ onRefresh, onFilterClick }) {
  const [mascotWobble, setMascotWobble] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleMascotClick = () => {
    setMascotWobble(true);
    setTimeout(() => setMascotWobble(false), 300);
  };

  const handleRefreshClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      onRefresh && onRefresh();
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-5 pt-1 select-none">
      {/* Sub-header bar for screen context */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-space-xs">
          <span className="font-headline-sm text-headline-sm text-on-surface">Discover</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-surface font-label-sm text-label-sm shadow-[1.5px_1.5px_0px_#1e1a24] border border-[#1e1a24]/30 font-bold">
            0 nearby
          </span>
        </div>
        <button 
          aria-label="Filters" 
          onClick={onFilterClick}
          className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer" 
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </div>

      {/* Center Graphic: Overlapping Tilted Neo-Brutalist Cards with Mascot */}
      <div className="relative w-full flex flex-col items-center justify-center pt-5 pb-2">
        {/* Background Card 1 (Peach/Tertiary tilt left) */}
        <div className="absolute w-56 h-40 rounded-lg bg-tertiary-fixed border-2 border-[#1e1a24] shadow-[3px_3px_0px_#1e1a24] -rotate-6 transform -translate-y-2 pointer-events-none"></div>
        {/* Background Card 2 (Lavender/Secondary tilt right) */}
        <div className="absolute w-56 h-40 rounded-lg bg-secondary-container border-2 border-[#1e1a24] shadow-[3px_3px_0px_#1e1a24] rotate-6 transform translate-y-1 pointer-events-none"></div>

        {/* Main Front Card (White Interactive Showcase Card) */}
        <div 
          id="mascot-card"
          onClick={handleMascotClick}
          className={`relative w-64 rounded-lg bg-surface-container-lowest p-space-md border-2 border-[#1e1a24] shadow-[4px_4px_0px_#1e1a24] flex flex-col items-center text-center z-10 transition-transform cursor-pointer select-none ${
            mascotWobble ? '-rotate-3 scale-105' : 'hover:scale-[1.02]'
          }`}
        >
          {/* Floating Sparkle Badges */}
          <div className="absolute -top-3 -right-2 bg-primary-container text-on-primary-container px-2.5 py-0.5 rounded-full font-label-sm text-label-sm shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] flex items-center gap-1 font-bold">
            <span>🎉 Coy</span>
          </div>
          
          <div className="absolute -bottom-2 -left-2 bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-label-sm text-label-sm shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] flex items-center gap-0.5 font-bold">
            <span className="material-symbols-outlined text-[13px] filled-icon">bolt</span>
            <span>All Caught Up</span>
          </div>

          {/* Mascot Graphic: Playful Cool Heart */}
          <div className="relative w-28 h-28 my-1 flex items-center justify-center">
            <svg className="w-full h-full drop-shadow-[2px_2px_0px_#1e1a24]" fill="none" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              {/* Heart Base */}
              <path d="M60 102 C60 102 14 74 14 42 C14 26 26 16 41 16 C51 16 57 21 60 26 C63 21 69 16 79 16 C94 16 106 26 106 42 C106 74 60 102 60 102 Z" fill="#e11568" stroke="#1e1a24" strokeWidth="2.5"></path>
              {/* Inner Cheek Highlights */}
              <circle cx="28" cy="50" fill="#fbdccc" opacity="0.9" r="6"></circle>
              <circle cx="92" cy="50" fill="#fbdccc" opacity="0.9" r="6"></circle>
              {/* Cool Retro Sunglasses */}
              <path d="M30 38 H54 L51 52 H33 L30 38 Z" fill="#1e1a24"></path>
              <path d="M66 38 H90 L87 52 H69 L66 38 Z" fill="#1e1a24"></path>
              {/* Sunglass bridge & frames */}
              <rect fill="#1e1a24" height="4" width="16" x="52" y="42"></rect>
              <line stroke="#1e1a24" strokeLinecap="round" strokeWidth="3" x1="24" x2="31" y1="41" y2="41"></line>
              <line stroke="#1e1a24" strokeLinecap="round" strokeWidth="3" x1="89" x2="96" y1="41" y2="41"></line>
              {/* Glare on glasses */}
              <line stroke="#ffffff" strokeLinecap="round" strokeWidth="2" x1="36" x2="40" y1="41" y2="49"></line>
              <line stroke="#ffffff" strokeLinecap="round" strokeWidth="2" x1="72" x2="76" y1="41" y2="49"></line>
              {/* Playful Winking Smile */}
              <path d="M49 63 C52 70 68 70 71 63" stroke="#1e1a24" strokeLinecap="round" strokeWidth="3.5"></path>
              {/* Tongue peeking out */}
              <path d="M57 67 C57 72 63 72 63 67 Z" fill="#fbdccc"></path>
              {/* Star sparkle accents */}
              <path d="M102 18 L104 23 L109 25 L104 27 L102 32 L100 27 L95 25 L100 23 Z" fill="#e6defd"></path>
              <path d="M12 62 L13 65 L16 66 L13 67 L12 70 L11 67 L8 66 L11 65 Z" fill="#fbdccc"></path>
            </svg>
          </div>
          <span className="font-label-md text-label-md text-on-surface mt-1 font-bold">
            Tap me for luck! ✨
          </span>
        </div>
      </div>

      {/* Heading and Subtitle */}
      <div className="flex flex-col items-center text-center space-y-1.5 px-space-sm">
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
          You've seen everyone!
        </h2>
        <p className="font-body-md text-body-md text-secondary max-w-xs mx-auto">
          New faces are coming soon. Expand your filters or check back in a little while for fresh connections.
        </p>
      </div>

      {/* Stats / Discovery Summary Widget */}
      <div className="rounded-lg bg-surface-container-lowest p-space-md shadow-[3px_3px_0px_#1e1a24] border-2 border-[#1e1a24] flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary-container text-[20px] filled-icon">insights</span>
            <span className="font-label-lg text-label-lg text-on-surface font-bold">Today's Discovery</span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded-full text-secondary font-medium border border-[#1e1a24]/20">
            Reset in 4h
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-1">
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center p-2.5 rounded-md bg-surface-container-low text-center shadow-[1.5px_1.5px_0px_#1e1a24] border border-[#1e1a24]">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">18</span>
            <span className="font-label-sm text-label-sm text-secondary leading-tight mt-0.5">Explored</span>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center p-2.5 rounded-md bg-tertiary-fixed text-center shadow-[1.5px_1.5px_0px_#1e1a24] border border-[#1e1a24]">
            <div className="flex items-center gap-0.5">
              <span className="font-headline-sm text-headline-sm text-on-tertiary-fixed font-bold">5</span>
              <span className="text-[13px]">❤️</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant leading-tight mt-0.5">Liked</span>
          </div>
          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center p-2.5 rounded-md bg-secondary-container text-center shadow-[1.5px_1.5px_0px_#1e1a24] border border-[#1e1a24]">
            <div className="flex items-center gap-0.5">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">1</span>
              <span className="text-[13px]">✨</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-secondary-container leading-tight mt-0.5">Mutual</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-space-sm pt-1">
        {/* Primary Refresh Button */}
        <button 
          id="refresh-btn"
          type="button"
          onClick={handleRefreshClick}
          className="w-full h-13 py-3.5 px-space-lg rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[4px_4px_0px_#1e1a24] border-2 border-[#1e1a24] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 group cursor-pointer hover:bg-[#d0105d]"
        >
          <span 
            id="refresh-icon"
            className={`material-symbols-outlined text-[20px] transition-transform duration-500 ${isRotating ? 'rotate-[360deg]' : ''}`}
          >
            sync
          </span>
          <span className="font-bold">Refresh discovery</span>
          <span className="text-base">🔄</span>
        </button>

        {/* Secondary Filter Button */}
        <button 
          type="button"
          onClick={onFilterClick}
          className="w-full h-13 py-3 px-space-lg rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-[3px_3px_0px_#1e1a24] border-2 border-[#1e1a24] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50"
        >
          <span className="material-symbols-outlined text-[20px] text-secondary">tune</span>
          <span className="font-bold">Adjust discovery filters</span>
          <span className="text-base">⚙️</span>
        </button>
      </div>

      {/* Bottom Tip Pill */}
      <div className="rounded-full bg-surface-container-high px-space-md py-2.5 shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] flex items-center gap-space-xs text-on-surface mt-1">
        <span className="text-base shrink-0">💡</span>
        <p className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
          <strong className="text-on-surface">Tip:</strong> Turning on mutual location gives 3x more matches!
        </p>
      </div>
    </div>
  );
}
