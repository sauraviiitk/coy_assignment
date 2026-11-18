import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DiscoverSwipeProfile from './components/DiscoverSwipeProfile';
import DiscoverProfileDetails from './components/DiscoverProfileDetails';
import DiscoverItsAMatch from './components/DiscoverItsAMatch';
import DiscoverEmptyState from './components/DiscoverEmptyState';
import DiscoverMatches from './components/DiscoverMatches';
import FilterModal from './components/FilterModal';
import { getFeed, getMatches, recordSwipe } from './api/discovery';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeScreen, setActiveScreen] = useState('swipe');
  const [currentTab, setCurrentTab] = useState('discover');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [lastMatchedProfile, setLastMatchedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const activeProfile = profiles[0];

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setApiError('');
    try {
      const [feed, mutualMatches] = await Promise.all([getFeed(), getMatches()]);
      setProfiles(feed);
      setMatches(mutualMatches);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSwipe = async (profile, action) => {
    setApiError('');
    try {
      const result = await recordSwipe(profile.id, action);
      setProfiles((currentProfiles) => currentProfiles.filter((item) => item.id !== profile.id));

      if (result.matchCreated && result.match) {
        setLastMatchedProfile(result.match);
        setActiveScreen('match');
      } else {
        setActiveScreen('swipe');
      }

      try {
        setMatches(await getMatches());
      } catch (error) {
        setApiError(`Your swipe was saved, but matches could not be refreshed: ${error.message}`);
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab === 'discover') {
      setActiveScreen('swipe');
    }
  };

  const handleKeepDiscovering = async () => {
    setActiveScreen('swipe');
    await loadData();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-start text-on-surface antialiased selection:bg-primary-container selection:text-white">
      <div className="w-full max-w-[420px] min-h-screen relative flex flex-col bg-surface shadow-2xl">
        {activeScreen === 'details' ? (
          <Header
            showBack
            showTabs={false}
            title="Profile Details"
            onBack={() => setActiveScreen('swipe')}
            onTabChange={handleTabChange}
          />
        ) : activeScreen === 'match' ? (
          <Header
            showBack
            showTabs={false}
            title="It’s a Match"
            onBack={() => setActiveScreen('swipe')}
            onTabChange={handleTabChange}
          />
        ) : activeScreen === 'matches' ? (
          <Header
            showBack
            showTabs={false}
            title="Matches"
            onBack={() => setActiveScreen('swipe')}
            onTabChange={handleTabChange}
          />
        ) : (
          <Header
            currentTab={currentTab}
            showTabs
            onTabChange={handleTabChange}
          />
        )}

        <main className={`flex-1 flex flex-col px-margin ${
          activeScreen === 'details' || activeScreen === 'match' || activeScreen === 'matches'
            ? 'pt-20 pb-16'
            : 'pt-32 pb-24'
        }`}>
          {apiError && currentTab !== 'home' && (
            <div
              role="alert"
              className="mb-4 rounded-xl border-2 border-[#19151F] bg-[#FFE0D0] p-3 text-sm text-[#19151F]"
            >
              <p>{apiError}</p>
              <button
                type="button"
                onClick={loadData}
                className="mt-2 font-bold underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {currentTab === 'home' ? (
            <div className="flex-1" aria-label="Home" />
          ) : isLoading ? (
            <div className="flex flex-1 items-center justify-center" role="status">
              Loading discovery…
            </div>
          ) : activeScreen === 'details' ? (
            <DiscoverProfileDetails
              profile={activeProfile}
              onBack={() => setActiveScreen('swipe')}
              onLike={(profile) => handleSwipe(profile, 'like')}
              onPass={(profile) => handleSwipe(profile, 'pass')}
            />
          ) : activeScreen === 'match' ? (
            <DiscoverItsAMatch
              profile={lastMatchedProfile}
              onKeepDiscovering={handleKeepDiscovering}
              onSendMessage={(message) => console.log('Message sent to match:', message)}
            />
          ) : activeScreen === 'matches' ? (
            <DiscoverMatches
              matches={matches}
              onDiscover={() => setActiveScreen('swipe')}
            />
          ) : activeProfile ? (
            <DiscoverSwipeProfile
              profile={activeProfile}
              onLike={(profile) => handleSwipe(profile, 'like')}
              onPass={(profile) => handleSwipe(profile, 'pass')}
              onViewDetails={() => setActiveScreen('details')}
              onViewMatches={() => setActiveScreen('matches')}
              onFilterClick={() => setIsFilterOpen(true)}
              nearbyCount={profiles.length}
              matchCount={matches.length}
            />
          ) : (
            <DiscoverEmptyState
              onRefresh={loadData}
              onFilterClick={() => setIsFilterOpen(true)}
            />
          )}
        </main>

        {activeScreen !== 'details' && activeScreen !== 'match' && activeScreen !== 'matches' && (
          <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
        )}

        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={(filters) => {
            console.log('Applied filters:', filters);
          }}
        />
      </div>
    </div>
  );
}
