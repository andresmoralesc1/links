'use client';

import { profile } from '@/data/links';

export function Hero() {
  return (
    <header className="flex flex-col items-center text-center mb-6">
      <div className="relative w-24 h-24 mb-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-theme-3 to-accent p-[2px]"
        >
          <div className="w-full h-full rounded-full bg-secondary" />
        </div>
        <div className="absolute inset-[2px] rounded-full overflow-hidden">
          {/*
            Avatar sourced from /public/avatar.jpg. Gracefully hidden if the
            file is missing — no console error, no broken icon (the orange
            gradient ring stays as the placeholder).
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={profile.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-primary">
        {profile.name}
      </h1>
      <p className="mt-1 text-sm text-primary/60">{profile.bio}</p>
    </header>
  );
}
