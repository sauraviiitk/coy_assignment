import React, { useState } from 'react';
import { CURRENT_USER } from '../data/profiles';

export default function DiscoverItsAMatch({
  profile,
  onKeepDiscovering,
  onSendMessage
}) {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!profile) return null;

  const handleFillPrompt = (text) => {
    setMessage(text);
  };

  const handleSend = () => {
    const textToSend = message.trim() || `👋 Hey ${profile.name}!`;
    setIsSent(true);
    setTimeout(() => {
      onSendMessage && onSendMessage(textToSend);
      onKeepDiscovering && onKeepDiscovering();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full relative pb-10 pt-2 overflow-hidden select-none">
      {/* Dynamic Confetti / Sparkle Canvas Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <svg className="w-full h-full opacity-60" fill="none" viewBox="0 0 380 700" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 40L49 52L61 56L49 60L45 72L41 60L29 56L41 52L45 40Z" fill="#e11568"></path>
          <path d="M330 65L333 74L342 77L333 80L330 89L327 80L318 77L327 74L330 65Z" fill="#b70052"></path>
          <path d="M32 230C36 220 50 220 54 230C58 240 72 240 76 230" stroke="#1e1a24" strokeLinecap="round" strokeWidth="2.5"></path>
          <circle cx="340" cy="210" fill="#ffd9df" r="8"></circle>
          <circle cx="340" cy="210" r="8" stroke="#1e1a24" strokeWidth="2"></circle>
          <path d="M70 360L73 367L80 370L73 373L70 380L67 373L60 370L67 367L70 360Z" fill="#e6defd"></path>
          <path d="M320 370C315 375 315 385 325 390C335 395 330 405 320 408" stroke="#e11568" strokeLinecap="round" strokeWidth="2.5"></path>
          <circle cx="48" cy="460" fill="#fbdccc" r="5"></circle>
          <circle cx="48" cy="460" r="5" stroke="#1e1a24" strokeWidth="1.5"></circle>
          <path d="M335 520L339 532L351 536L339 540L335 552L331 540L319 536L331 532L335 520Z" fill="#e11568"></path>
        </svg>
      </div>

      {/* Header Pill Badge */}
      <div className="relative z-10 flex flex-col items-center pt-2">
        <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container shadow-[2px_2px_0px_#1e1a24] border-[2px] border-on-surface transform -rotate-1">
          <span className="text-sm">🔥</span>
          <span className="font-label-md text-label-md tracking-wider uppercase font-bold">MUTUAL CRUSH</span>
        </div>

        {/* Match Celebration Headline */}
        <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface mt-3 text-center tracking-tight font-extrabold">
          It's a match!
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-[280px] mt-1">
          Looks like the feeling is mutual. You and <strong className="text-on-surface font-semibold">{profile.name}</strong> both liked each other!
        </p>
      </div>

      {/* Hero Overlapping Circles Visual */}
      <div className="relative z-10 flex items-center justify-center my-6 h-[130px]">
        {/* User Avatar (Left) */}
        <div className="relative w-[114px] h-[114px] rounded-full p-[2px] bg-surface-container-lowest border-[3px] border-on-surface shadow-[4px_4px_0px_#1e1a24] -mr-5 z-10 transition-transform active:scale-95">
          <div className="w-full h-full rounded-full overflow-hidden bg-secondary-container">
            <img 
              alt={CURRENT_USER.name} 
              className="w-full h-full object-cover" 
              src={CURRENT_USER.avatar} 
            />
          </div>
        </div>

        {/* Match Heart Pip Connector */}
        <div className="absolute z-30 w-11 h-11 rounded-full bg-primary-container border-[2px] border-on-surface shadow-[2px_2px_0px_#1e1a24] flex items-center justify-center animate-bounce">
          <span className="material-symbols-outlined text-on-primary text-[22px] filled-icon">favorite</span>
        </div>

        {/* Profile Avatar (Right) */}
        <div className="relative w-[114px] h-[114px] rounded-full p-[2px] bg-surface-container-lowest border-[3px] border-on-surface shadow-[4px_4px_0px_#1e1a24] -ml-5 z-20 transition-transform active:scale-95">
          <div className="w-full h-full rounded-full overflow-hidden bg-primary-fixed">
            <img 
              alt={profile.name} 
              className="w-full h-full object-cover" 
              src={profile.photos[0]} 
            />
          </div>
        </div>
      </div>

      {/* Interactive Icebreaker / Message Card */}
      <div className="relative z-10 bg-surface-container-lowest border-[2px] border-on-surface rounded-[22px] p-4 shadow-[4px_4px_0px_#1e1a24] flex flex-col gap-3">
        {/* Card Prompt Tag & Micro Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
            <span className="font-label-sm text-label-sm text-on-surface tracking-wider uppercase font-bold">
              Icebreaker Hint
            </span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold border border-on-surface/40">
            Jaipur • {profile.distance}
          </span>
        </div>

        {/* Quick Message Input Field */}
        <div className="relative w-full">
          <input 
            type="text"
            id="matchMessageInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Say something nice to ${profile.name}...`}
            className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md px-3.5 py-3 rounded-[16px] border-[2px] border-on-surface shadow-[2px_2px_0px_#1e1a24] focus:outline-none focus:border-primary-container focus:shadow-[3px_3px_0px_#e11568] transition-all pr-10"
          />
          {message.length > 0 && (
            <button 
              type="button"
              onClick={() => setMessage('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center transition-opacity hover:opacity-100 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* One-Tap Prompts List */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Tap to autofill:
          </span>
          
          {profile.icebreakers ? (
            profile.icebreakers.map((promptText, i) => (
              <button 
                key={i}
                type="button"
                onClick={() => handleFillPrompt(promptText)}
                className="w-full text-left bg-surface hover:bg-secondary-fixed/50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all p-2.5 rounded-[14px] border-[1.5px] border-on-surface shadow-[2px_2px_0px_#1e1a24] flex items-center gap-2 group cursor-pointer"
              >
                <span className={`w-6 h-6 rounded-full ${i === 0 ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-fixed text-on-tertiary-fixed'} flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {i === 0 ? 'local_cafe' : 'auto_awesome'}
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors truncate">
                  {promptText}
                </span>
              </button>
            ))
          ) : (
            <button 
              type="button"
              onClick={() => handleFillPrompt(`👋 Hey ${profile.name}! How's your day going?`)}
              className="w-full text-left bg-surface hover:bg-secondary-fixed/50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all p-2.5 rounded-[14px] border-[1.5px] border-on-surface shadow-[2px_2px_0px_#1e1a24] flex items-center gap-2 group cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[14px]">chat</span>
              </span>
              <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors truncate">
                👋 Hey {profile.name}! How's your day going?
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Primary and Secondary Actions */}
      <div className="relative z-10 flex flex-col gap-3 mt-5">
        {/* Primary Send CTA */}
        <button 
          id="sendMessageBtn"
          type="button"
          onClick={handleSend}
          disabled={isSent}
          className={`w-full py-3.5 px-6 rounded-full font-label-lg text-label-lg tracking-wide border-[2px] border-on-surface shadow-[4px_4px_0px_#1e1a24] hover:-translate-y-0.5 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isSent 
              ? 'bg-tertiary-fixed text-on-tertiary-fixed' 
              : 'bg-primary-container text-on-primary-container hover:bg-[#d0105d]'
          }`}
        >
          {isSent ? (
            <>
              <span>Sent! ✨</span>
              <span className="material-symbols-outlined text-[20px]">check</span>
            </>
          ) : (
            <>
              <span>Send a message</span>
              <span className="material-symbols-outlined text-[20px] filled-icon">chat_bubble</span>
            </>
          )}
        </button>

        {/* Secondary Keep Discovering CTA */}
        <button 
          type="button"
          onClick={onKeepDiscovering}
          className="w-full py-3 px-6 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg border-[2px] border-on-surface shadow-[3px_3px_0px_#1e1a24] hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">explore</span>
          <span>Keep discovering</span>
        </button>
      </div>

      {/* Match Info Subtle Badge */}
      <div className="relative z-10 flex items-center justify-center gap-2 mt-4 text-center">
        <span className="material-symbols-outlined text-[14px] text-outline">lock</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          Identities stay anonymous until you both choose to reveal!
        </span>
      </div>
    </div>
  );
}
