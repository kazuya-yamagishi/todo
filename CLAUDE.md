# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 開発サーバー起動（ホットリロードあり）
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動（build 後に実行）
```

テストフレームワーク・Linter は未導入。

## アーキテクチャ

Next.js 15 App Router 構成の最小 Todo アプリ。サーバーサイドロジックは一切なく、全データは `localStorage` にのみ保存される。

```
app/
  layout.tsx   # ルートレイアウト（globals.css を import するだけ）
  page.tsx     # アプリ全体（'use client' 単一コンポーネント）
  globals.css  # ダークテーマのスタイル定義
```

### page.tsx の構成

- **`IllustrationHero`** — ヘッダーに表示するインライン SVG（月の上で眠るねこ）
- **`IllustrationEmpty`** — タスクが 0 件のときに表示するインライン SVG（不思議そうなねこ）
- **`HomePage`** — Todo の状態管理と UI。`useState` / `useEffect` / `useRef` のみ使用

状態は `Todo[]`（`{ id: number; text: string; done: boolean }`）の配列で管理し、変更のたびに `localStorage.setItem('todos', ...)` で永続化する。

### スタイル

`globals.css` はすべてグローバルクラス名（CSS Modules 不使用）。ダークテーマ固定（`prefers-color-scheme` によるトグルなし）。

- 背景色: `#0f0e1e`（深紺）
- カード背景: `#1e1b33`
- アクセント: `#a78bfa` / `#7c3aed`（紫系）
- アニメーション: `.hero-illustration` に `float` キーフレーム、`.todo-item` に `slideIn` キーフレームを適用
