import { useState } from 'react';
import { useApp } from '../AppContext';
import type { Item } from '../types';
import { PronunciationCheck } from './PronunciationCheck';

export function ItemCard({ item }: { item: Item }) {
  const { speak, settings, learned, toggleLearned } = useApp();
  const [practice, setPractice] = useState(false);
  const done = Boolean(learned[item.id]);

  return (
    <li className={`card ${done ? 'done' : ''}`}>
      <div className="card-main">
        {item.speaker && <span className={`speaker speaker-${item.speaker}`}>{item.speaker}</span>}
        <div className="card-text">
          <p className="hanzi" lang="zh-TW">
            {item.hanzi}
            {item.tw && <span className="badge" title="台湾特有の語彙・読み方">台湾</span>}
          </p>
          {settings.showPinyin && <p className="pinyin">{item.pinyin}</p>}
          <p className="ja">{item.ja}</p>
          {item.note && <p className="note">💡 {item.note}</p>}
        </div>
      </div>

      <div className="card-actions">
        <button type="button" onClick={() => speak(item.hanzi)} aria-label="再生">▶ 再生</button>
        <button type="button" onClick={() => speak(item.hanzi, true)} aria-label="ゆっくり再生">🐢 ゆっくり</button>
        <button type="button" onClick={() => setPractice((p) => !p)} aria-expanded={practice}>
          🎤 練習
        </button>
        <label className="learned-toggle">
          <input type="checkbox" checked={done} onChange={() => toggleLearned(item.id)} />
          覚えた
        </label>
      </div>

      {practice && <PronunciationCheck target={item.hanzi} />}
    </li>
  );
}
