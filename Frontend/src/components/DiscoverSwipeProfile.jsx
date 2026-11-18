import React, { useState, useRef } from 'react';

export default function DiscoverSwipeProfile({
  profile,
  onLike,
  onPass,
  onSuperlike,
  onViewDetails,
  onFilterClick,
  nearbyCount = 12
}) {
  const [stamp, setStamp] = useState(null); // 'like', 'pass', 'super'
  const [cardTransform, setCardTransform] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!profile) return null;

  const handleAction = (type) => {
    setStamp(type);
    if (type === 'like') {
      setCardTransform('rotate(6deg) translate(24px, -10px)');
      setTimeout(() => {
        setStamp(null);
        setCardTransform('');
        onLike && onLike(profile);
      }, 550);
    } else if (type === 'pass') {
      setCardTransform('rotate(-6deg) translate(-24px, -10px)');
      setTimeout(() => {
        setStamp(null);
        setCardTransform('');
        onPass && onPass(profile);
      }, 550);
    } else if (type === 'super') {
      setCardTransform('translateY(-20px) scale(1.03)');
      setTimeout(() => {
        setStamp(null);
        setCardTransform('');
        onSuperlike && onSuperlike(profile);
      }, 550);
    }
  };

  const handlePhotoCycle = (e) => {
    e.stopPropagation();
    if (profile.photos && profile.photos.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % profile.photos.length);
    }
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Discover Section Header */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-[#19151F] tracking-tight">
              Discover
            </h1>
            <p className="font-body-sm text-body-sm text-[#817B8D]">
              Someone new might be closer than you think.
            </p>
          </div>

          {/* Filter Button */}
          <button 
            aria-label="Filter preferences"
            onClick={onFilterClick}
            type="button"
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#19151F] shadow-[3px_3px_0px_#19151F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer border-2 border-[#19151F]"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
          </button>
        </div>

        {/* Micro Pill Sub-banner */}
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#E8E0FF] text-[#19151F] border-[1.5px] border-[#19151F] shadow-[2px_2px_0px_#19151F]">
          <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
          <span className="font-label-sm text-label-sm font-bold">Find your kind of connection</span>
        </div>
      </div>

      {/* Main Swipeable Profile Card Container */}
      <div className="relative w-full mx-auto select-none">
        {/* Background Card Tilt Stacks for Tactile Neo-Brutalist Depth */}
        <div className="absolute inset-0 bg-[#FFE0D0] rounded-[24px] border-2 border-[#19151F] transform rotate-1 translate-y-1 shadow-[3px_3px_0px_#19151F] -z-10"></div>
        <div className="absolute inset-0 bg-[#E8E0FF] rounded-[24px] border-2 border-[#19151F] transform -rotate-1 translate-y-0.5 -z-10"></div>

        {/* Active Card Surface */}
        <div 
          onClick={onViewDetails}
          style={{ transform: cardTransform }}
          className="relative bg-white rounded-[24px] border-2 border-[#19151F] shadow-[4px_4px_0px_#19151F] overflow-hidden flex flex-col transition-transform duration-200 cursor-pointer"
        >
          {/* Photo Container (65% visually weighted) */}
          <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden">
            <img 
              alt={`${profile.name} photo`} 
              className="w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
              src={profile.photos[photoIndex] || profile.photos[0]}
            />

            {/* Tap for next photo overlay helper */}
            <div 
              onClick={handlePhotoCycle} 
              className="absolute inset-0 z-10 cursor-pointer"
              title="Click photo to cycle images"
            />

            {/* Overlay Top Left: Status Pill */}
            {profile.status && (
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-[#E8E0FF] text-[#19151F] px-2.5 py-1 rounded-full border-[1.5px] border-[#19151F] shadow-[2px_2px_0px_#19151F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF347D] animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-extrabold">
                  {profile.status}
                </span>
              </div>
            )}

            {/* Overlay Top Right: Photo Counter */}
            {profile.photos && profile.photos.length > 1 && (
              <div className="absolute top-3 right-3 z-20 bg-[#19151F]/70 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full border border-white/30 text-label-sm font-label-sm">
                {photoIndex + 1}/{profile.photos.length}
              </div>
            )}

            {/* Dynamic Feedback Stamps */}
            <div 
              className={`absolute top-10 right-5 border-4 border-[#FF347D] bg-white/95 text-[#FF347D] px-4 py-1.5 rounded-xl font-display-lg-mobile text-headline-sm uppercase font-extrabold tracking-wider transform rotate-12 shadow-[3px_3px_0px_#19151F] pointer-events-none transition-opacity duration-150 z-30 ${
                stamp === 'like' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
              }`}
            >
              LIKE ❤️
            </div>

            <div 
              className={`absolute top-10 left-5 border-4 border-[#19151F] bg-white/95 text-[#19151F] px-4 py-1.5 rounded-xl font-display-lg-mobile text-headline-sm uppercase font-extrabold tracking-wider transform -rotate-12 shadow-[3px_3px_0px_#19151F] pointer-events-none transition-opacity duration-150 z-30 ${
                stamp === 'pass' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
              }`}
            >
              PASS ✕
            </div>

            <div 
              className={`absolute top-12 inset-x-0 mx-auto w-max border-4 border-amber-500 bg-white/95 text-amber-600 px-5 py-2 rounded-xl font-display-lg-mobile text-headline-sm uppercase font-extrabold tracking-wider shadow-[3px_3px_0px_#19151F] pointer-events-none transition-opacity duration-150 z-30 ${
                stamp === 'super' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
              }`}
            >
              SUPER ⭐
            </div>

            {/* Gradient Scrim with Location Info */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#19151F]/80 via-[#19151F]/30 to-transparent pt-8 pb-3 px-4 flex items-center gap-1.5 text-white z-20">
              <span className="material-symbols-outlined text-[18px] text-[#FFE0D0]">location_on</span>
              <span className="font-label-md text-label-md tracking-wide drop-shadow-sm font-semibold">
                {profile.location} • {profile.distance}
              </span>
            </div>
          </div>

          {/* Profile Information Body */}
          <div className="p-4 flex flex-col gap-3 bg-white">
            {/* Name, Age & Verified Tick */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-headline-md text-[#19151F] tracking-tight font-extrabold">
                  {profile.name}, {profile.age}
                </h2>
                {/* Verified Neo Badge */}
                <span className="w-6 h-6 rounded-full bg-[#FF347D] text-white flex items-center justify-center border-[1.5px] border-[#19151F] shadow-[1px_1px_0px_#19151F]">
                  <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                </span>
              </div>

              {/* Active Now Cue */}
              {profile.activeNow && (
                <div className="flex items-center text-primary-container text-label-sm font-label-sm gap-0.5">
                  <span className="material-symbols-outlined text-[18px] filled-icon">local_fire_department</span>
                  <span className="font-bold">Active now</span>
                </div>
              )}
            </div>

            {/* Bio Snippet */}
            <p className="font-body-md text-body-md text-[#19151F] leading-snug">
              {profile.bio}
            </p>

            {/* Interest Tags Container */}
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.interests && profile.interests.map((tag, idx) => (
                <span 
                  key={idx}
                  className={`px-3 py-1 rounded-full ${tag.bg || 'bg-[#E8E0FF]'} text-[#19151F] font-label-md text-label-md font-bold border-[1.5px] border-[#19151F] shadow-[2px_2px_0px_#19151F]`}
                >
                  {tag.icon} {tag.label}
                </span>
              ))}
            </div>

            {/* Tap Full Profile Hint */}
            <div className="flex items-center justify-center pt-2 gap-1 text-[#817B8D]">
              <span className="font-label-sm text-label-sm font-semibold">
                Tap to view full profile & prompts
              </span>
              <span className="material-symbols-outlined text-[16px] animate-bounce">
                arrow_downward
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="flex items-center justify-center gap-5 pt-2">
        {/* Pass Button (Left) */}
        <button 
          id="btn-pass"
          type="button"
          aria-label="Pass on profile"
          onClick={() => handleAction('pass')}
          className="w-14 h-14 rounded-full bg-white border-2 border-[#19151F] text-[#19151F] flex items-center justify-center shadow-[3px_3px_0px_#19151F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer hover:bg-gray-50"
        >
          <span className="material-symbols-outlined text-[28px] font-bold">close</span>
        </button>

        {/* Like Button (Center, Coy Pink Primary) */}
        <button 
          id="btn-like"
          type="button"
          aria-label="Like profile"
          onClick={() => handleAction('like')}
          className="w-[68px] h-[68px] rounded-full bg-[#FF347D] border-2 border-[#19151F] text-white flex items-center justify-center shadow-[4px_4px_0px_#19151F] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer hover:bg-[#e11568]"
        >
          <span className="material-symbols-outlined text-[34px] filled-icon">favorite</span>
        </button>

        {/* Super Like Button (Right, Soft Lavender) */}
        <button 
          id="btn-superlike"
          type="button"
          aria-label="Superlike profile"
          onClick={() => handleAction('super')}
          className="w-14 h-14 rounded-full bg-[#E8E0FF] border-2 border-[#19151F] text-[#19151F] flex items-center justify-center shadow-[3px_3px_0px_#19151F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer hover:bg-[#d8ccfa]"
        >
          <span className="material-symbols-outlined text-[26px] filled-icon">star</span>
        </button>
      </div>

      {/* Discovery Progress Count */}
      <div className="flex items-center justify-center gap-1.5 pt-1 text-center">
        <span className="text-label-sm font-label-sm text-[#817B8D] font-medium">
          🔥 {nearbyCount} people nearby discoverable today
        </span>
      </div>
    </div>
  );
}
