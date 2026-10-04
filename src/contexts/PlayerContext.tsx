'use client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CharacterConfig } from '../types/character';

export interface PlayerProfile {
  name: string;
  explorerName: string;
  email: string;
  college: string;
  branch: string;
  gradYear: string;
}

interface PlayerContextValue extends PlayerProfile {
  character: CharacterConfig;
  sound: boolean;
  level: number;
  xp: number;
  xpMax: number;
  crewCount: number;
  setProfile: (p: Partial<PlayerProfile>) => void;
  setCharacter: (c: CharacterConfig) => void;
  toggleSound: () => void;
}

export const DEFAULT_CHARACTER: CharacterConfig = {
  skin: 1,
  hair: 'bob',
  hairColor: 1,
  face: 'blush',
  eyes: 'round',
  outfit: 'jacket',
  outfitColor: 0,
  accessory: 'headphones',
  effect: 'aura'
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: {children: React.ReactNode;}) {
  const [profile, setProfileState] = useState<PlayerProfile>({
    name: 'Srinidhi Rao',
    explorerName: 'SRINIDHI',
    email: 'srinidhi@pes.edu',
    college: 'PES University',
    branch: 'Computer Science',
    gradYear: '2026'
  });
  const [character, setCharacter] = useState<CharacterConfig>(DEFAULT_CHARACTER);
  const [sound, setSound] = useState(true);

  const setProfile = useCallback((p: Partial<PlayerProfile>) => setProfileState((prev) => ({ ...prev, ...p })), []);
  const toggleSound = useCallback(() => setSound((s) => !s), []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      ...profile,
      character,
      sound,
      level: 1,
      xp: 100,
      xpMax: 250,
      crewCount: 3,
      setProfile,
      setCharacter,
      toggleSound
    }),
    [profile, character, sound, setProfile, toggleSound]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}

