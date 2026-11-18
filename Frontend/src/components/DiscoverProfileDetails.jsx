import React, { useState } from 'react';

export default function DiscoverProfileDetails({
  profile,
  onBack,
  onLike,
  onPass,
  onTriggerMatch
}) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [revealedHint, setRevealedHint] = useState(false);
  const [toast, setToast] = useState(null); // { title, desc, action }
  const [likedPrompts, setLikedPrompts] = useState({});

  if (!profile) return null;

  const totalPhotos = profile.photos ? profile.photos.length : 1;

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % totalPhotos);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const togglePromptLike = (index) => {
    setLikedPrompts((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSparkle = () => {
    setToast({
      title: "Coy Wink Sent! 😉",
      desc: `A subtle nudge was dropped in ${profile.name}'s secret radar.`,
      isMatchOpportunity: false
    });
  };

  const handleSendLike = () => {
    setToast({
      title: "Like Sent! ❤️",
      desc: `If ${profile.name} likes your Coy profile back, it's an instant reveal!`,
      isMatchOpportunity: true
    });
    onLike && onLike(profile);
  };

  const handleKeepExploring = () => {
    setToast(null);
    onBack && onBack();
  };

  const handleSimulateMatch = () => {
    setToast(null);
    onTriggerMatch && onTriggerMatch(profile);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-2">
      {/* Profile Photo Carousel Card */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container shadow-[3px_3px_0px_#1e1a24] mb-space-lg border-2 border-[#1e1a24]">
        {/* Carousel Track */}
        <div className="relative w-full aspect-[3/4] overflow-hidden select-none">
          <div 
            className="flex h-full transition-transform duration-300 ease-out" 
            style={{ 
              width: `${totalPhotos * 100}%`,
              transform: `translateX(-${(currentPhoto * 100) / totalPhotos}%)` 
            }}
          >
            {profile.photos.map((src, idx) => (
              <div 
                key={idx} 
                className="h-full relative" 
                style={{ width: `${100 / totalPhotos}%` }}
              >
                <img 
                  alt={`${profile.name} photo ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  src={src} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-black/25 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Touch Tap Zones for Story Carousel Navigation */}
          <div className="absolute inset-0 flex z-20">
            <button 
              type="button"
              aria-label="Previous photo" 
              className="w-1/2 h-full opacity-0 cursor-pointer" 
              onClick={prevPhoto}
            />
            <button 
              type="button"
              aria-label="Next photo" 
              className="w-1/2 h-full opacity-0 cursor-pointer" 
              onClick={nextPhoto}
            />
          </div>

          {/* Carousel Indicators (Stories style) */}
          <div className="absolute top-3 left-4 right-4 z-30 flex items-center gap-1.5 pointer-events-none">
            {profile.photos.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  idx === currentPhoto ? 'bg-surface-container-lowest' : 'bg-surface-container-lowest/40'
                }`}
              />
            ))}
          </div>

          {/* Top Overlay Controls */}
          <div className="absolute top-7 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm shadow-[1.5px_1.5px_0px_#1e1a24] flex items-center gap-1 border border-[#1e1a24]/20">
              <span className="material-symbols-outlined text-[14px] text-primary filled-icon">local_cafe</span>
              Coffee lover
            </span>
            <button 
              type="button"
              aria-label="Options"
              className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#1e1a24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer border border-[#1e1a24]/20"
            >
              <span className="material-symbols-outlined text-[18px]">more_horiz</span>
            </button>
          </div>

          {/* Quick Name Tag on Bottom of Card */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between pointer-events-none">
            <div>
              {profile.activeNow && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm mb-1 shadow-[1.5px_1.5px_0px_#1e1a24]">
                  Active now
                </span>
              )}
              <p className="font-headline-lg text-headline-lg text-surface-container-lowest drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center gap-1.5 font-extrabold">
                {profile.name}, {profile.age}
                <span className="material-symbols-outlined text-[22px] text-secondary-fixed filled-icon">verified</span>
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#1e1a24]">
              <span className="material-symbols-outlined text-[20px] text-primary filled-icon">favorite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-[3px_3px_0px_#1e1a24] mb-space-md flex flex-col gap-space-sm border-2 border-[#1e1a24]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px] text-primary filled-icon">location_on</span>
            <span>{profile.location}</span>
            <span className="w-1 h-1 rounded-full bg-outline mx-1"></span>
            <span className="text-primary font-bold">{profile.distance}</span>
          </div>
          {profile.mutualCircle && (
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-[1.5px_1.5px_0px_#1e1a24] border border-[#1e1a24]">
              Mutual Circle
            </span>
          )}
        </div>

        <p className="font-body-lg text-body-lg text-on-surface leading-snug">
          {profile.bio}
        </p>

        {/* Interest Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {profile.interests && profile.interests.map((tag, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shadow-[1.5px_1.5px_0px_#1e1a24] flex items-center gap-1 border border-[#1e1a24]"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Coy Secret / Mutual Vibe Card */}
      {profile.secretHint && (
        <div className="bg-primary-fixed rounded-2xl p-space-md shadow-[3px_3px_0px_#1e1a24] mb-space-md flex items-center gap-3 border-2 border-[#1e1a24]">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24]">
            <span className="material-symbols-outlined text-on-primary text-[20px]">lock</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-headline-sm text-headline-sm text-on-primary-fixed text-sm font-bold">
              Coy Secret Hint
            </h3>
            <p className={`font-body-sm text-body-sm text-on-primary-fixed-variant transition-all ${revealedHint ? 'font-medium' : 'blur-[3px] select-none'}`}>
              {profile.secretHint}
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setRevealedHint(true)}
            className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer ${
              revealedHint 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-container-lowest text-on-surface hover:bg-white'
            }`}
          >
            {revealedHint ? 'Revealed ✨' : 'Peek'}
          </button>
        </div>
      )}

      {/* Personality Prompts */}
      {profile.prompts && profile.prompts.map((prompt, index) => {
        const isLiked = likedPrompts[index];
        return (
          <div 
            key={index}
            className={`${prompt.bg || 'bg-surface-container'} rounded-2xl p-space-md shadow-[3px_3px_0px_#1e1a24] mb-space-md flex flex-col gap-2 relative overflow-hidden border-2 border-[#1e1a24]`}
          >
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">{prompt.icon}</span>
                {prompt.question}
              </span>
              <button 
                type="button"
                onClick={() => togglePromptLike(index)}
                className={`w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-[1.5px_1.5px_0px_#1e1a24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer border border-[#1e1a24] ${
                  isLiked ? 'text-primary' : 'text-[#817B8D]'
                }`}
              >
                <span className={`material-symbols-outlined text-[15px] ${isLiked ? 'filled-icon' : ''}`}>
                  favorite
                </span>
              </button>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">
              {prompt.answer}
            </p>
          </div>
        );
      })}

      {/* Sticky Bottom Neo-Brutalist Interaction Dock */}
      <div className="fixed bottom-4 left-0 right-0 max-w-[420px] mx-auto px-margin z-50 pointer-events-none">
        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-full p-2 shadow-[4px_4px_0px_#1e1a24] border-2 border-[#1e1a24] flex items-center justify-between gap-3 pointer-events-auto">
          {/* Pass Button */}
          <button 
            type="button"
            aria-label="Pass"
            onClick={onPass}
            className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-surface-container-high text-on-surface flex items-center justify-center shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px]">close</span>
          </button>

          {/* Super Coy Sparkle / Wink Button */}
          <button 
            type="button"
            aria-label="Super Coy Wink"
            onClick={handleSparkle}
            className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px] filled-icon">auto_awesome</span>
          </button>

          {/* Send Coy Like Button */}
          <button 
            type="button"
            onClick={handleSendLike}
            className="flex-1 h-13 min-h-[52px] rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-[3px_3px_0px_#1e1a24] border-2 border-[#1e1a24] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer hover:bg-[#a00047]"
          >
            <span>Send Like</span>
            <span className="material-symbols-outlined text-[20px] filled-icon">favorite</span>
          </button>
        </div>
      </div>

      {/* Mutual Match Celebration Toast / Mini Modal */}
      {toast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-margin bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[5px_5px_0px_#1e1a24] border-2 border-[#1e1a24] max-w-[340px] w-full flex flex-col items-center text-center gap-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center shadow-[3px_3px_0px_#1e1a24] border-2 border-[#1e1a24]">
              <span className="material-symbols-outlined text-primary text-[36px] filled-icon">favorite</span>
            </div>
            
            <h3 className="font-headline-lg text-headline-lg text-on-surface">
              {toast.title}
            </h3>
            
            <p className="font-body-md text-body-md text-on-surface-variant">
              {toast.desc}
            </p>

            <div className="flex flex-col gap-2 w-full mt-2">
              {toast.isMatchOpportunity && (
                <button 
                  type="button"
                  onClick={handleSimulateMatch}
                  className="w-full py-3 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-[3px_3px_0px_#1e1a24] border-2 border-[#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>See Match Screen! 🔥</span>
                </button>
              )}

              <button 
                type="button"
                onClick={handleKeepExploring}
                className="w-full py-3 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg shadow-[2px_2px_0px_#1e1a24] border border-[#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                Keep Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
