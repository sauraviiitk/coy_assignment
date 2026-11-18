import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DiscoverSwipeProfile from './components/DiscoverSwipeProfile';
import DiscoverProfileDetails from './components/DiscoverProfileDetails';
import DiscoverItsAMatch from './components/DiscoverItsAMatch';
import DiscoverEmptyState from './components/DiscoverEmptyState';
import FilterModal from './components/FilterModal';
import { PROFILES_DATA } from './data/profiles';

export default function App() {
  const [profiles, setProfiles] = useState(PROFILES_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeScreen, setActiveScreen] = useState('swipe'); // 'swipe' | 'details' | 'match' | 'empty'
  const [currentTab, setCurrentTab] = useState('discover'); // 'discover' | 'home'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [lastMatchedProfile, setLastMatchedProfile] = useState(PROFILES_DATA[0]);

  const activeProfile = profiles[currentIndex];

  const handleLike = (profile) => {
    setLastMatchedProfile(profile);
    // If it's Aanya or any profile, transition to Match celebration screen!
    setActiveScreen('match');
  };

  const handlePass = (profile) => {
    if (currentIndex + 1 < profiles.length) {
      setCurrentIndex(currentIndex + 1);
      setActiveScreen('swipe');
    } else {
      setActiveScreen('empty');
    }
  };

  const handleSuperlike = (profile) => {
    setLastMatchedProfile(profile);
    setActiveScreen('match');
  };

  const handleRefresh = () => {
    setProfiles(PROFILES_DATA);
    setCurrentIndex(0);
    setActiveScreen('swipe');
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab === 'discover') {
      if (currentIndex >= profiles.length) {
        setActiveScreen('empty');
      } else {
        setActiveScreen('swipe');
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-start text-on-surface antialiased selection:bg-primary-container selection:text-white">
      {/* Top Component Quick-Nav / Stitch Screen Selector Pill Bar */}
      <div className="w-full max-w-[420px] px-3 pt-2 z-50">
        <div className="bg-[#1e1a24] text-white rounded-2xl p-1.5 flex items-center justify-between text-xs font-bold shadow-md border border-white/10">
          <span className="px-2 text-pink-400 uppercase tracking-wider text-[10px]">Stitch Screens:</span>
          <div className="flex gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => { setActiveScreen('swipe'); setCurrentTab('discover'); }}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                activeScreen === 'swipe' ? 'bg-[#FF347D] text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Swipe
            </button>
            <button
              type="button"
              onClick={() => { setActiveScreen('details'); setCurrentTab('discover'); }}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                activeScreen === 'details' ? 'bg-[#FF347D] text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => { setActiveScreen('match'); setCurrentTab('discover'); }}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                activeScreen === 'match' ? 'bg-[#FF347D] text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Match
            </button>
            <button
              type="button"
              onClick={() => { setActiveScreen('empty'); setCurrentTab('discover'); }}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                activeScreen === 'empty' ? 'bg-[#FF347D] text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Empty
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Mobile Container */}
      <div className="w-full max-w-[420px] min-h-screen relative flex flex-col bg-surface shadow-2xl">
        {/* Header based on current screen */}
        {activeScreen === 'details' ? (
          <Header
            showBack={true}
            showTabs={false}
            title="Crush Reveal Details"
            onBack={() => setActiveScreen('swipe')}
            onTabChange={handleTabChange}
          />
        ) : activeScreen === 'match' ? (
          <Header
            showBack={true}
            showTabs={false}
            title="Crush Reveal"
            onBack={() => setActiveScreen('swipe')}
            onTabChange={handleTabChange}
          />
        ) : (
          <Header
            currentTab={currentTab}
            showTabs={true}
            onTabChange={handleTabChange}
          />
        )}

        {/* Content Area */}
        <main className={`flex-1 flex flex-col px-margin ${
          activeScreen === 'details' || activeScreen === 'match' ? 'pt-20 pb-16' : 'pt-32 pb-24'
        }`}>
          {currentTab === 'home' ? (
            <div className="flex flex-col items-center justify-center flex-1 py-12 text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center border-2 border-[#1e1a24] shadow-[3px_3px_0px_#1e1a24]">
                <span className="material-symbols-outlined text-[36px] text-primary">forum</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold">Coy Home & Chats</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
                Your anonymous chats and secret reveals will appear here once matched.
              </p>
              <button
                type="button"
                onClick={() => handleTabChange('discover')}
                className="mt-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label-lg font-bold border-2 border-[#1e1a24] shadow-[3px_3px_0px_#1e1a24] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
              >
                Go to Discover
              </button>
            </div>
          ) : activeScreen === 'swipe' ? (
            activeProfile ? (
              <DiscoverSwipeProfile
                profile={activeProfile}
                onLike={handleLike}
                onPass={handlePass}
                onSuperlike={handleSuperlike}
                onViewDetails={() => setActiveScreen('details')}
                onFilterClick={() => setIsFilterOpen(true)}
                nearbyCount={profiles.length * 6}
              />
            ) : (
              <DiscoverEmptyState 
                onRefresh={handleRefresh}
                onFilterClick={() => setIsFilterOpen(true)}
              />
            )
          ) : activeScreen === 'details' ? (
            <DiscoverProfileDetails
              profile={activeProfile || lastMatchedProfile}
              onBack={() => setActiveScreen('swipe')}
              onLike={() => handleLike(activeProfile || lastMatchedProfile)}
              onPass={() => handlePass(activeProfile || lastMatchedProfile)}
              onTriggerMatch={() => setActiveScreen('match')}
            />
          ) : activeScreen === 'match' ? (
            <DiscoverItsAMatch
              profile={lastMatchedProfile || activeProfile}
              onKeepDiscovering={() => {
                if (currentIndex + 1 < profiles.length) {
                  setCurrentIndex(currentIndex + 1);
                  setActiveScreen('swipe');
                } else {
                  setActiveScreen('empty');
                }
              }}
              onSendMessage={(msg) => {
                console.log("Message sent to match:", msg);
              }}
            />
          ) : (
            <DiscoverEmptyState
              onRefresh={handleRefresh}
              onFilterClick={() => setIsFilterOpen(true)}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        {activeScreen !== 'details' && activeScreen !== 'match' && (
          <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
        )}

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={(filters) => {
            console.log("Applied filters:", filters);
          }}
        />
      </div>
    </div>
  );
}
