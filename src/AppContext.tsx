import { createContext, useContext } from 'react';
import type { Progress } from './hooks/useProgress';

export type Settings = {
  voiceURI?: string;
  rate: number;
  showPinyin: boolean;
  tab: string;
};

export const defaultSettings: Settings = { rate: 0.9, showPinyin: true, tab: 'w1' };

type AppContextValue = {
  speak: (text: string, slow?: boolean) => void;
  settings: Settings;
  learned: Progress;
  toggleLearned: (id: string, value?: boolean) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppContext.Provider');
  return ctx;
}
