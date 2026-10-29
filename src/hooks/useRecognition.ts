import { useCallback, useRef, useState } from 'react';

// Web Speech API の音声認識は TypeScript の標準型に含まれないので最低限だけ定義する。
type RecognitionResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type RecognitionErrorEvent = { error: string };
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  abort(): void;
}
type RecognitionCtor = new () => SpeechRecognitionLike;

const Recognition: RecognitionCtor | undefined =
  typeof window === 'undefined'
    ? undefined
    : ((window as unknown as Record<string, RecognitionCtor | undefined>).SpeechRecognition ??
      (window as unknown as Record<string, RecognitionCtor | undefined>).webkitSpeechRecognition);

export const recognitionSupported = Boolean(Recognition);

const normalize = (s: string) => s.replace(/[\s\p{P}]/gu, '');

/** 認識結果がお手本の何文字分を含むか（最長共通部分列）で 0〜100 の一致率を出す */
export function matchScore(target: string, heard: string): number {
  const a = [...normalize(target)];
  const b = [...normalize(heard)];
  if (a.length === 0) return 0;
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return Math.round((dp[a.length][b.length] / Math.max(a.length, b.length)) * 100);
}

export type RecognitionState =
  | { status: 'idle' }
  | { status: 'listening' }
  | { status: 'done'; heard: string[]; score: number }
  | { status: 'error'; message: string };

const errorMessages: Record<string, string> = {
  'not-allowed': 'マイクの使用が許可されていません。ブラウザの設定を確認してください。',
  'no-speech': '音声が聞き取れませんでした。もう一度どうぞ。',
  network: 'ネットワークエラーです（音声認識はオンラインが必要です）。',
};

export function useRecognition(target: string) {
  const [state, setState] = useState<RecognitionState>({ status: 'idle' });
  const ref = useRef<SpeechRecognitionLike | null>(null);

  const start = useCallback(() => {
    if (!Recognition) return;
    ref.current?.abort();
    const rec = new Recognition();
    rec.lang = 'zh-TW';
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (e) => {
      const heard = Array.from(e.results[0] ?? []).map((r) => r.transcript);
      const score = Math.max(0, ...heard.map((h) => matchScore(target, h)));
      setState({ status: 'done', heard, score });
    };
    rec.onerror = (e) =>
      setState({ status: 'error', message: errorMessages[e.error] ?? `認識エラー: ${e.error}` });
    rec.onend = () => setState((s) => (s.status === 'listening' ? { status: 'idle' } : s));
    ref.current = rec;
    setState({ status: 'listening' });
    rec.start();
  }, [target]);

  return { state, start };
}
