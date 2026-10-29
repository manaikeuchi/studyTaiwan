import { useApp, type Settings } from '../AppContext';
import { recognitionSupported } from '../hooks/useRecognition';
import { recorderSupported } from '../hooks/useRecorder';
import { isTaiwanVoice } from '../hooks/useSpeech';

type Props = {
  voices: SpeechSynthesisVoice[];
  ttsSupported: boolean;
  currentVoice?: SpeechSynthesisVoice;
  onChange: (patch: Partial<Settings>) => void;
  onResetProgress: () => void;
};

export function SettingsView({ voices, ttsSupported, currentVoice, onChange, onResetProgress }: Props) {
  const { speak, settings } = useApp();
  const hasTaiwanVoice = voices.some(isTaiwanVoice);

  return (
    <section className="settings">
      <h2>設定</h2>

      <div className="setting">
        <h3>読み上げの声</h3>
        {!ttsSupported ? (
          <p className="warn">このブラウザは読み上げに対応していません。Chrome / Edge / Safari をお使いください。</p>
        ) : voices.length === 0 ? (
          <p className="warn">
            中国語の音声が見つかりません。OSの言語設定で「中国語（台湾）」の音声を追加してください。
            Linux 版の Chrome は台湾の音声をほぼ持っていないため、スマホ（iPhone / Android）や Windows・Mac のブラウザで開くのが確実です。
          </p>
        ) : (
          <>
            <select
              value={currentVoice?.voiceURI ?? ''}
              onChange={(e) => onChange({ voiceURI: e.target.value })}
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {isTaiwanVoice(v) ? '🇹🇼 ' : ''}{v.name}（{v.lang}）
                </option>
              ))}
            </select>
            {!hasTaiwanVoice && (
              <p className="warn">台湾（zh-TW）の音声がないため、他地域の中国語音声で代用しています。発音が少し異なります。</p>
            )}
          </>
        )}
      </div>

      <div className="setting">
        <h3>読み上げ速度：{settings.rate.toFixed(1)}</h3>
        <input
          type="range" min={0.5} max={1.3} step={0.1}
          value={settings.rate}
          onChange={(e) => onChange({ rate: Number(e.target.value) })}
        />
        <button type="button" onClick={() => speak('您好，很高興認識您。')}>▶ テスト再生</button>
      </div>

      <div className="setting">
        <h3>表示</h3>
        <label>
          <input
            type="checkbox"
            checked={settings.showPinyin}
            onChange={(e) => onChange({ showPinyin: e.target.checked })}
          />
          拼音（ピンイン）を表示する
        </label>
        <p className="hint">慣れてきたら非表示にして、漢字だけで読めるか試してみましょう。</p>
      </div>

      <div className="setting">
        <h3>このブラウザの対応状況</h3>
        <ul className="support">
          <li>{ttsSupported ? '✅' : '❌'} 読み上げ（音声合成）</li>
          <li>{recognitionSupported ? '✅' : '❌'} 発音チェック（音声認識）{!recognitionSupported && ' — Chrome / Edge で利用できます'}</li>
          <li>{recorderSupported ? '✅' : '❌'} 録音して聞き比べ</li>
        </ul>
        <p className="hint">
          発音チェックはブラウザの音声認識サービス（Chrome の場合 Google のサーバー）に音声が送られます。
          録音機能の音声は端末の外には送信されません。
        </p>
      </div>

      <div className="setting">
        <h3>学習記録</h3>
        <p className="hint">「覚えた」の記録はこのブラウザ内にのみ保存されます（別の端末とは共有されません）。</p>
        <button
          type="button"
          className="danger"
          onClick={() => { if (confirm('「覚えた」の記録をすべて消去します。よろしいですか？')) onResetProgress(); }}
        >
          記録をリセット
        </button>
      </div>
    </section>
  );
}
