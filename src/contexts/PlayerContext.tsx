'use client';
import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
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
    name: 'GUEST',
    explorerName: 'GUEST',
    email: '',
    college: '',
    branch: '',
    gradYear: ''
  });
  
  const [character, setCharacter] = useState<CharacterConfig>(DEFAULT_CHARACTER);
  const [sound, setSound] = useState(true);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpMax, setXpMax] = useState(300);
  const [crewCount, setCrewCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('growthos_user_id');
        if (!userId) return;

        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) return;

        const { data } = await res.json();
        
        if (data.character) {
          setCharacter(data.character);
          setProfileState(prev => ({ ...prev, explorerName: data.character.displayName || data.name }));
        }

        if (data.stats) {
          setLevel(data.stats.level || 1);
          setXp(data.stats.totalXP || 0);
          if (data.stats.nextLevelXP) setXpMax(data.stats.nextLevelXP);
          setCrewCount(data.stats.crewCount || 0);
        }
        
        setProfileState(prev => ({
          ...prev,
          name: data.name || prev.name,
          email: data.email || prev.email,
          college: data.campus || prev.college,
          branch: data.branch || prev.branch,
          gradYear: String(data.gradYear || prev.gradYear)
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const setProfile = useCallback((p: Partial<PlayerProfile>) => setProfileState((prev) => ({ ...prev, ...p })), []);
  const toggleSound = useCallback(() => setSound((s) => !s), []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      ...profile,
      character,
      sound,
      level,
      xp,
      xpMax,
      crewCount,
      setProfile,
      setCharacter,
      toggleSound
    }),
    [profile, character, sound, level, xp, xpMax, crewCount, setProfile, toggleSound]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}

