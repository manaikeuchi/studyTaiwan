import { useMemo, useState } from 'react';
import { useApp } from '../AppContext';
import type { Item } from '../types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Flashcards({ items }: { items: Item[] }) {
  const { speak, learned, toggleLearned } = useApp();
  const [onlyUnlearned, setOnlyUnlearned] = useState(true);
  const [seed, setSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // 「覚えた」を押してもデッキが組み替わらないよう、learned はあえて依存配列に入れず開始時点の状態で固定する
  const deck = useMemo(() => shuffle(onlyUnlearned ? items.filter((i) => !learned[i.id]) : items), [items, onlyUnlearned, seed]);

  const restart = () => {
    setSeed((s) => s + 1);
    setIndex(0);
    setFlipped(false);
  };

  const next = (markLearned: boolean) => {
    toggleLearned(deck[index].id, markLearned);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  const card = deck[index];

  return (
    <div className="flash">
      <div className="flash-toolbar">
        <label>
          <input
            type="checkbox"
            checked={onlyUnlearned}
            onChange={(e) => { setOnlyUnlearned(e.target.checked); restart(); }}
          />
          まだ覚えていないものだけ
        </label>
        <button type="button" onClick={restart}>シャッフルしてやり直す</button>
      </div>

      {!card ? (
        <div className="flash-card flash-end">
          <p>{deck.length === 0 ? 'この週はすべて「覚えた」になっています 🎉' : `${deck.length}枚 おわり！おつかれさまでした 🎉`}</p>
          <button type="button" onClick={restart}>もう一度</button>
        </div>
      ) : (
        <>
          <p className="flash-count">{index + 1} / {deck.length}</p>
          <button
            type="button"
            className="flash-card"
            onClick={() => { if (!flipped) speak(card.hanzi); setFlipped((f) => !f); }}
          >
            <span className="flash-ja">{card.ja}</span>
            {flipped ? (
              <>
                <span className="hanzi" lang="zh-TW">{card.hanzi}</span>
                <span className="pinyin">{card.pinyin}</span>
              </>
            ) : (
              <span className="flash-hint">中国語で言ってみてから、タップして答え合わせ</span>
            )}
          </button>
          {flipped && (
            <div className="flash-actions">
              <button type="button" onClick={() => speak(card.hanzi)}>▶ もう一度聞く</button>
              <button type="button" className="secondary" onClick={() => next(false)}>まだ</button>
              <button type="button" className="primary" onClick={() => next(true)}>覚えた！</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
