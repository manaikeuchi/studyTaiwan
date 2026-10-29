// localStorage はプライベートブラウズ等で例外を投げることがあるので必ずここを経由する。
// キーに v1 を付けているのは、将来データ形式を変えた時に移行処理を書けるようにするため。
export const STORAGE_KEYS = {
  progress: 'studyTaiwan.progress.v1',
  settings: 'studyTaiwan.settings.v1',
} as const;

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 保存できなくてもアプリは動かす
  }
}
