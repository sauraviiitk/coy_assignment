import React from 'react';

export default function DiscoverMatches({ matches, onDiscover }) {
  return (
    <section className="flex flex-col w-full gap-4 pt-2">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-[#19151F] tracking-tight">
          Your matches
        </h1>
        <p className="font-body-sm text-body-sm text-[#817B8D]">
          Only mutual likes appear here.
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="rounded-2xl bg-white border-2 border-[#19151F] p-6 text-center shadow-[3px_3px_0px_#19151F]">
          <p className="font-headline-sm text-headline-sm text-[#19151F]">No mutual matches yet</p>
          <p className="font-body-sm text-body-sm text-[#817B8D] mt-1">
            Keep discovering. When you both like each other, you’ll find the match here.
          </p>
          <button
            type="button"
            onClick={onDiscover}
            className="mt-4 px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md font-bold border-2 border-[#19151F] shadow-[2px_2px_0px_#19151F] cursor-pointer"
          >
            Discover profiles
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {matches.map((profile) => (
            <li
              key={profile.id}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white border-2 border-[#19151F] shadow-[3px_3px_0px_#19151F]"
            >
              <img
                src={profile.photos?.[0]}
                alt={`${profile.name} profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#19151F]"
              />
              <div className="min-w-0">
                <h2 className="font-headline-sm text-headline-sm text-[#19151F] font-bold">
                  {profile.name}, {profile.age}
                </h2>
                <p className="font-body-sm text-body-sm text-[#817B8D] truncate">
                  {profile.location}
                </p>
                <p className="font-label-sm text-label-sm text-primary font-bold">It’s mutual ❤️</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
