'use client';
import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import type { CharacterConfig } from '../types/character';
import { audio } from '../utils/audio';

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
  completedQuests: string[];
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
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  useEffect(() => {
    audio.enabled = sound;
    if (sound) {
      const startOnInteract = () => {
        audio.startBGM();
        window.removeEventListener('click', startOnInteract);
      };
      window.addEventListener('click', startOnInteract);
      audio.startBGM();
      return () => window.removeEventListener('click', startOnInteract);
    } else {
      audio.stopBGM();
    }
  }, [sound]);


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
          setCompletedQuests(data.stats.completedQuests || []);
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
      completedQuests,
      setProfile,
      setCharacter,
      toggleSound
    }),
    [profile, character, sound, level, xp, xpMax, crewCount, completedQuests, setProfile, toggleSound]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}




