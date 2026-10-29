import { useState } from 'react';
import { useApp } from '../AppContext';
import { weekItems } from '../data';
import type { Week } from '../types';
import { Flashcards } from './Flashcards';
import { ItemCard } from './ItemCard';
import { ProgressBar } from './ProgressBar';

export function WeekView({ week }: { week: Week }) {
  const { learned } = useApp();
  const [mode, setMode] = useState<'list' | 'flash'>('list');
  const items = weekItems(week);

  return (
    <section>
      <header className="week-header">
        <h2>{week.label}：{week.title}</h2>
        <p className="goal">🎯 {week.goal}</p>
        <ProgressBar done={items.filter((i) => learned[i.id]).length} total={items.length} />
        <details className="tips">
          <summary>今週のポイント</summary>
          <ul>{week.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </details>
      </header>

      <div className="mode-switch" role="tablist">
        <button type="button" role="tab" aria-selected={mode === 'list'} onClick={() => setMode('list')}>📖 一覧で学ぶ</button>
        <button type="button" role="tab" aria-selected={mode === 'flash'} onClick={() => setMode('flash')}>🃏 フラッシュカード</button>
      </div>

      {mode === 'flash' ? (
        <Flashcards items={items} />
      ) : (
        week.lessons.map((lesson) => (
          <section key={lesson.id} className="lesson">
            <h3>
              <span className="days">{lesson.days}</span>
              {lesson.title}
              <span className="lesson-count">
                {lesson.items.filter((i) => learned[i.id]).length}/{lesson.items.length}
              </span>
            </h3>
            <p className="lesson-goal">{lesson.goal}</p>
            <ul className="cards">
              {lesson.items.map((item) => <ItemCard key={item.id} item={item} />)}
            </ul>
          </section>
        ))
      )}
    </section>
  );
}
