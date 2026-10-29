import { useState } from 'react';
import { recognitionSupported, useRecognition } from '../hooks/useRecognition';
import { recorderSupported, useRecorder } from '../hooks/useRecorder';

function scoreLabel(score: number) {
  if (score >= 90) return { text: 'ばっちり！', cls: 'good' };
  if (score >= 60) return { text: 'おしい！', cls: 'ok' };
  return { text: 'もう一回', cls: 'bad' };
}

export function PronunciationCheck({ target }: { target: string }) {
  const { state, start } = useRecognition(target);
  const recorder = useRecorder();
  const [recError, setRecError] = useState<string | null>(null);

  const startRecording = () => {
    setRecError(null);
    recorder.start().catch(() => setRecError('マイクを使用できませんでした。'));
  };

  return (
    <div className="check">
      <div className="check-buttons">
        {recognitionSupported && (
          <button type="button" onClick={start} disabled={state.status === 'listening'}>
            {state.status === 'listening' ? '🎙 聞き取り中…' : '🎤 発音チェック'}
          </button>
        )}
        {recorderSupported && (
          <button
            type="button"
            className={recorder.recording ? 'recording' : ''}
            onClick={recorder.recording ? recorder.stop : startRecording}
          >
            {recorder.recording ? '⏹ 録音停止' : '⏺ 録音'}
          </button>
        )}
      </div>

      {state.status === 'done' && (
        <p className="check-result">
          <span className={`score ${scoreLabel(state.score).cls}`}>
            {state.score}% {scoreLabel(state.score).text}
          </span>
          <span className="heard">認識結果: {state.heard[0] || '（なし）'}</span>
        </p>
      )}
      {state.status === 'error' && <p className="check-error">{state.message}</p>}
      {recError && <p className="check-error">{recError}</p>}
      {recorder.url && !recorder.recording && (
        <audio className="playback" controls src={recorder.url} />
      )}
    </div>
  );
}
