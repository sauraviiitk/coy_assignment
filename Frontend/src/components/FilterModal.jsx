import React, { useState } from 'react';

export default function FilterModal({ isOpen, onClose, onApply }) {
  const [distance, setDistance] = useState(10);
  const [ageRange, setAgeRange] = useState([20, 26]);
  const [selectedInterests, setSelectedInterests] = useState(['Coffee', 'Music']);

  if (!isOpen) return null;

  const interestsList = ['Coffee', 'Music', 'Travel', 'Photography', 'Art', 'Reading', 'Cinema'];

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[420px] bg-surface rounded-t-[28px] sm:rounded-[28px] border-2 border-[#1e1a24] shadow-[6px_6px_0px_#1e1a24] p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#1e1a24]/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">tune</span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold">
              Discovery Filters
            </h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-lowest border border-[#1e1a24] flex items-center justify-center text-on-surface shadow-[1.5px_1.5px_0px_#1e1a24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Max Distance Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Maximum Distance</span>
            <span className="font-label-md text-label-md px-2.5 py-0.5 rounded-full bg-secondary-container border border-[#1e1a24] shadow-[1px_1px_0px_#1e1a24] font-bold">
              {distance} km
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={distance} 
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer h-2 bg-surface-container-highest rounded-lg appearance-none"
          />
        </div>

        {/* Age Range */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Age Range</span>
            <span className="font-label-md text-label-md px-2.5 py-0.5 rounded-full bg-tertiary-fixed border border-[#1e1a24] shadow-[1px_1px_0px_#1e1a24] font-bold">
              {ageRange[0]} - {ageRange[1]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="range" 
              min="18" 
              max="35" 
              value={ageRange[1]} 
              onChange={(e) => setAgeRange([18, Number(e.target.value)])}
              className="w-full accent-primary cursor-pointer h-2 bg-surface-container-highest rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Mutual Passions */}
        <div className="flex flex-col gap-2">
          <span className="font-label-lg text-label-lg font-bold text-on-surface">Shared Interests</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {interestsList.map((interest) => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full font-label-md text-label-md font-bold border-[1.5px] border-[#1e1a24] transition-all cursor-pointer ${
                    active 
                      ? 'bg-primary text-white shadow-[2px_2px_0px_#1e1a24]' 
                      : 'bg-white text-on-surface shadow-[1.5px_1.5px_0px_#1e1a24]'
                  }`}
                >
                  {interest} {active && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-surface-container-high border border-[#1e1a24] text-on-surface font-label-lg text-label-lg shadow-[2px_2px_0px_#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onApply && onApply({ distance, ageRange, selectedInterests });
              onClose();
            }}
            className="flex-1 py-3 rounded-full bg-primary-container text-on-primary-container border-2 border-[#1e1a24] font-label-lg text-label-lg font-bold shadow-[3px_3px_0px_#1e1a24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer hover:bg-[#d0105d]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
