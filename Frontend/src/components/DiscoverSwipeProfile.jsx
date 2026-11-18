import React, { useEffect, useRef, useState } from 'react';

export default function DiscoverSwipeProfile({
  profile,
  onLike,
  onPass,
  onViewDetails,
  onViewMatches,
  onFilterClick,
  nearbyCount = 0,
  matchCount = 0
}) {
  const [stamp, setStamp] = useState(null); // 'like', 'pass', 'super'
  const [cardTransform, setCardTransform] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStart = useRef(null);
  const isAnimating = useRef(false);
  const ignoreNextClick = useRef(false);

  useEffect(() => {
    setPhotoIndex(0);
  }, [profile?.id]);

  if (!profile) return null;

  const finishSwipe = (type, offset = 0) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsDragging(false);
    setStamp(type);
    const direction = type === 'like' ? 1 : -1;
    const startOffset = offset || direction * 24;
    const endOffset = direction * Math.max(420, Math.abs(startOffset) + 280);
    setCardTransform(`translate(${endOffset}px, -20px) rotate(${direction * 12}deg)`);
    window.setTimeout(() => {
      setStamp(null);
      setCardTransform('');
      setIsDragging(false);
      isAnimating.current = false;
      (type === 'like' ? onLike : onPass)?.(profile);
    }, 320);
  };

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event) => {
    if (!pointerStart.current || isAnimating.current) return;
    const offset = event.clientX - pointerStart.current.x;
    if (Math.abs(offset) < 6) return;
    if (!isDragging) {
      event.currentTarget.setPointerCapture?.(event.pointerId);
      setIsDragging(true);
    }
    setCardTransform(`translate(${offset}px, 0) rotate(${offset * 0.04}deg)`);
    setStamp(offset > 35 ? 'like' : offset < -35 ? 'pass' : null);
  };

  const handlePointerUp = (event) => {
    if (!pointerStart.current) return;
    const offset = event.clientX - pointerStart.current.x;
    pointerStart.current = null;
    if (Math.abs(offset) >= 100) {
      ignoreNextClick.current = true;
      window.setTimeout(() => {
        ignoreNextClick.current = false;
      }, 0);
      finishSwipe(offset > 0 ? 'like' : 'pass', offset);
    } else {
      setCardTransform('');
      setStamp(null);
      setIsDragging(false);
    }
  };

  const handlePointerCancel = () => {
    pointerStart.current = null;
    setCardTransform('');
    setStamp(null);
    setIsDragging(false);
  };

  const handleCardClick = () => {
    if (ignoreNextClick.current || isAnimating.current) {
      ignoreNextClick.current = false;
      return;
    }
    onViewDetails?.();
  };

  const handlePhotoCycle = (e) => {
    e.stopPropagation();
    if (profile.photos && profile.photos.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % profile.photos.length);
    }
  };

  return (
    <div className="flex flex-col w-full pb-36 space-y-4">
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
            <p className="font-label-sm text-label-sm text-[#817B8D]">
              Swipe right to like or left to pass · {nearbyCount} {nearbyCount === 1 ? 'profile' : 'profiles'} left.
            </p>
          </div>

          {/* Filter Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onViewMatches}
              aria-label={`View matches, ${matchCount}`}
              className="h-11 px-3 rounded-full bg-white flex items-center gap-1.5 text-[#19151F] shadow-[3px_3px_0px_#19151F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer border-2 border-[#19151F]"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              <span className="font-label-sm text-label-sm font-bold">{matchCount}</span>
            </button>
            <button
              aria-label="Filter preferences"
              onClick={onFilterClick}
              type="button"
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#19151F] shadow-[3px_3px_0px_#19151F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer border-2 border-[#19151F]"
            >
              <span className="material-symbols-outlined text-[22px]">tune</span>
            </button>
          </div>
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
          onClick={handleCardClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ transform: cardTransform }}
          className={`relative bg-white rounded-[24px] border-2 border-[#19151F] shadow-[4px_4px_0px_#19151F] overflow-hidden flex flex-col touch-pan-y ${isDragging ? 'transition-none' : 'transition-transform duration-300'} cursor-pointer`}
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
              <div
                aria-label={`Photo ${photoIndex + 1} of ${profile.photos.length}`}
                className="absolute top-3 right-3 z-20 bg-[#19151F]/70 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full border border-white/30 text-label-sm font-label-sm"
              >
                Photo {photoIndex + 1}/{profile.photos.length}
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
      <div className="fixed bottom-28 left-0 right-0 z-40 mx-auto flex w-full max-w-[420px] items-center justify-center gap-5 px-margin">
        {/* Pass Button (Left) */}
        <button 
          id="btn-pass"
          type="button"
          aria-label="Pass on profile"
          onClick={() => finishSwipe('pass')}
          disabled={isAnimating.current}
          className="w-14 h-14 rounded-full bg-white border-2 border-[#19151F] text-[#19151F] flex items-center justify-center shadow-[3px_3px_0px_#19151F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer hover:bg-gray-50"
        >
          <span className="material-symbols-outlined text-[28px] font-bold">close</span>
        </button>

        {/* Like Button (Center, Coy Pink Primary) */}
        <button 
          id="btn-like"
          type="button"
          aria-label="Like profile"
          onClick={() => finishSwipe('like')}
          disabled={isAnimating.current}
          className="w-[68px] h-[68px] rounded-full bg-[#FF347D] border-2 border-[#19151F] text-white flex items-center justify-center shadow-[4px_4px_0px_#19151F] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer hover:bg-[#e11568]"
        >
          <span className="material-symbols-outlined text-[34px] filled-icon">favorite</span>
        </button>

      </div>

    </div>
  );
}
