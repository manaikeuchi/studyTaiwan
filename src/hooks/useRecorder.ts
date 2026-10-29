import { useCallback, useEffect, useRef, useState } from 'react';

export const recorderSupported =
  typeof window !== 'undefined' && 'MediaRecorder' in window && !!navigator.mediaDevices?.getUserMedia;

/** 自分の声を録音してお手本と聞き比べる（音声はブラウザ内だけで扱い、どこにも送信しない） */
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  const start = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      setUrl(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })));
      setRecording(false);
    };
    recorder.current = rec;
    rec.start();
    setRecording(true);
  }, []);

  const stop = useCallback(() => recorder.current?.stop(), []);

  return { recording, url, start, stop };
}
