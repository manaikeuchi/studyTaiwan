import { useCallback, useEffect, useState } from 'react';
import { load, save, STORAGE_KEYS } from '../storage';

export type Progress = Record<string, true>;

export function useProgress() {
  const [learned, setLearned] = useState<Progress>(() => load<Progress>(STORAGE_KEYS.progress, {}));

  useEffect(() => save(STORAGE_KEYS.progress, learned), [learned]);

  const toggle = useCallback((id: string, value?: boolean) => {
    setLearned((prev) => {
      const next = { ...prev };
      if (value ?? !prev[id]) next[id] = true;
      else delete next[id];
      return next;
    });
  }, []);

  const reset = useCallback(() => setLearned({}), []);

  return { learned, toggle, reset };
}
