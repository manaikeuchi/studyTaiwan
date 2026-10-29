import { useEffect, useMemo, useState } from 'react';
import { AppContext, defaultSettings, type Settings } from './AppContext';
import { ProgressBar } from './components/ProgressBar';
import { ReferenceView } from './components/ReferenceView';
import { SettingsView } from './components/SettingsView';
import { WeekView } from './components/WeekView';
import { allItems, weeks } from './data';
import { useProgress } from './hooks/useProgress';
import { pickVoice, useSpeak, useVoices } from './hooks/useSpeech';
import { load, save, STORAGE_KEYS } from './storage';

const extraTabs = [
  { id: 'ref', label: '参考情報' },
  { id: 'settings', label: '⚙ 設定' },
];

export default function App() {
  const [settings, setSettings] = useState<Settings>(() => load(STORAGE_KEYS.settings, defaultSettings));
  const { learned, toggle, reset } = useProgress();
  const { supported: ttsSupported, voices, loaded: voicesLoaded } = useVoices();
  const voice = pickVoice(voices, settings.voiceURI);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const speak = useSpeak(voice, settings.rate, setSpeechError);
  const noVoice = !ttsSupported || (voicesLoaded && voices.length === 0);

  useEffect(() => save(STORAGE_KEYS.settings, settings), [settings]);

  const update = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }));
  const ctx = useMemo(
    () => ({ speak, settings, learned, toggleLearned: toggle }),
    [speak, settings, learned, toggle],
  );

  const tabs = [...weeks.map((w) => ({ id: w.id, label: w.label })), ...extraTabs];
  // 保存されたタブが存在しない場合（週の構成を変えた時など）は1週目を表示
  const activeWeek =
    weeks.find((w) => w.id === settings.tab) ??
    (extraTabs.some((t) => t.id === settings.tab) ? undefined : weeks[0]);
  const totalDone = allItems.filter((i) => learned[i.id]).length;

  return (
    <AppContext.Provider value={ctx}>
      <header className="app-header">
        <h1>台湾華語 30日プラン <span lang="zh-TW">臺灣華語</span></h1>
        <ProgressBar done={totalDone} total={allItems.length} />
        <nav className="tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={(activeWeek?.id ?? settings.tab) === t.id}
              onClick={() => update({ tab: t.id })}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {(noVoice || speechError) && (
          <div className="banner" role="alert">
            <p>
              🔇 {speechError ?? 'このブラウザでは中国語の読み上げ音声が見つかりません。▶ を押しても音が出ない場合があります。'}
            </p>
            <button type="button" onClick={() => { setSpeechError(null); update({ tab: 'settings' }); }}>
              設定を確認
            </button>
          </div>
        )}
        {activeWeek && <WeekView key={activeWeek.id} week={activeWeek} />}
        {settings.tab === 'ref' && <ReferenceView />}
        {settings.tab === 'settings' && (
          <SettingsView
            voices={voices}
            ttsSupported={ttsSupported}
            currentVoice={voice}
            onChange={update}
            onResetProgress={reset}
          />
        )}
      </main>
    </AppContext.Provider>
  );
}
