export function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="progress" aria-label={`進捗 ${pct}%`}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">{done} / {total}（{pct}%）</span>
    </div>
  );
}
