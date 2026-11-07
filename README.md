# React Pokemon Zukan

ポケモン図鑑アプリです。PokeAPI から一覧データと詳細データを取得し、一覧画面と詳細画面を切り替えて表示できます。

## 概要

- React + TypeScript + Vite で構築
- React Router で一覧と詳細ページを切り替え
- TanStack Query で PokeAPI の取得とキャッシュを管理
- GitHub Pages で公開できるように HashRouter と base 設定を整備
- モバイルでも見やすいレイアウトに対応

## 公開URL

https://ktc26a31e0003-cmd.github.io/react-pokemon-zukan/

## 使用技術

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- PokeAPI

## ローカル起動

```bash
npm install
npm run dev
```

## 本番ビルド

```bash
npm run build
```

## 画面構成

- 一覧画面: ポケモンのカード一覧を表示
- 詳細画面: 画像・タイプ・高さ・重さ・種族値を表示
- 戻るリンク: 一覧画面へ戻れるように実装

## 補足

このアプリは GitHub Pages の公開形式に合わせて、URL に `#` を含むルーティングを採用しています。
