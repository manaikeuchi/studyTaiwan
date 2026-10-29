import { useCallback, useEffect, useRef, useState } from 'react';

// 台湾の発音で読ませたいので zh-TW の音声を優先する。
// 使える音声は OS・ブラウザごとに違う（例: Windows の Microsoft Hanhan / Zhiwei、Chrome の Google 國語（臺灣））。
// Linux 版 Chrome は OS の speech-dispatcher に依存し、中国語音声がないことが多い。
export const isTaiwanVoice = (v: SpeechSynthesisVoice) => /zh[-_]TW/i.test(v.lang);
const isChineseVoice = (v: SpeechSynthesisVoice) => /^(zh|cmn)/i.test(v.lang);

export function useVoices() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  // 音声一覧は非同期に届くため、少し待ってから「見つからない」と判断する
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!supported) return;
    const update = () => {
      const all = speechSynthesis.getVoices();
      setVoices(all.filter(isChineseVoice));
      if (all.length > 0) setLoaded(true);
    };
    update();
    speechSynthesis.addEventListener('voiceschanged', update);
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', update);
      clearTimeout(timer);
    };
  }, [supported]);

  return { supported, voices, loaded };
}

export function pickVoice(voices: SpeechSynthesisVoice[], preferredURI?: string) {
  return (
    voices.find((v) => v.voiceURI === preferredURI) ??
    voices.find(isTaiwanVoice) ??
    voices[0]
  );
}

export function useSpeak(
  voice: SpeechSynthesisVoice | undefined,
  baseRate: number,
  onError: (message: string) => void,
) {
  // Chrome は再生中の utterance がGCされると音が途中で止まるので参照を保持しておく
  const current = useRef<SpeechSynthesisUtterance | null>(null);

  return useCallback(
    (text: string, slow = false) => {
      if (!('speechSynthesis' in window)) return;
      // 何も再生していない時に cancel() 直後に speak() すると Chrome で無音になることがある
      if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
      speechSynthesis.resume();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice?.lang ?? 'zh-TW';
      if (voice) u.voice = voice;
      u.rate = slow ? baseRate * 0.6 : baseRate;
      u.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        onError(`読み上げに失敗しました（${e.error}）。設定タブで音声を確認してください。`);
      };
      current.current = u;
      speechSynthesis.speak(u);
    },
    [voice, baseRate, onError],
  );
}
