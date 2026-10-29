# 台湾華語 30日プラン

台湾の取引先とのビジネス（特に工場建設プロジェクト）に向けて、台湾華語を1か月で「挨拶 → ビジネス基本 → 建設用語 → 会話」と段階的に学ぶWebアプリです。

| 週 | テーマ | ゴール |
| --- | --- | --- |
| 1週目 | 発音の基礎と挨拶・自己紹介 | 声調を聞き分け、名刺交換までこなせる |
| 2週目 | 日時・組織・会議のビジネス基本 | 日程調整と会議の基本語彙が分かる |
| 3週目 | 工場建設の専門語彙 | 工程会議・現場の用語が聞き取れる |
| 4週目 | 会話の実践（会議・現場・会食） | 進捗確認や聞き返しができる |

## 機能

- 週ごとのタブ、Day ごとのレッスン
- ▶ 読み上げ（台湾 zh-TW の音声を優先）／🐢 ゆっくり再生
- 🎤 発音チェック（音声認識で一致率を表示、Chrome / Edge）
- ⏺ 録音してお手本と聞き比べ
- 🃏 フラッシュカード（未習得のみ出題）
- 「覚えた」の進捗をブラウザに保存
- 台湾特有の語彙・読み方に「台湾」バッジ

## 開発

Node.js 22.12 以上が必要です（Vite 8 の要件。`.nvmrc` 参照）。

```bash
npm install
npm run dev        # http://localhost:5173/studyTaiwan/ で起動
npm test           # 教材データのチェック
npm run build      # 本番ビルド（dist/）
```

## 単語・フレーズの追加

`src/data/week1.ts` 〜 `week4.ts` に追記するだけです。

```ts
{ id: 'w3-hanjie', hanzi: '焊接', pinyin: 'hànjiē', ja: '溶接', tw: false, note: '任意のメモ' },
```

- `id` は **一度公開したら変えない**（「覚えた」の記録の保存キーです）
- `hanzi` は繁体字、`pinyin` は声調記号付き
- 追加後に `npm test` を実行すると、ID重複・声調記号漏れ・簡体字混入をチェックします

## デプロイ

`main` に push すると GitHub Actions がテスト → ビルド → GitHub Pages へ公開します。
初回のみ、GitHub のリポジトリ設定 **Settings → Pages → Source** を「GitHub Actions」にしてください。

公開URL: `https://<GitHubユーザー名>.github.io/studyTaiwan/`

運用・保守の詳しい注意点は [docs/OPERATIONS.md](docs/OPERATIONS.md) を参照してください。
