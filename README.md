# SNIFF^^COPY
https://sniffcopy.oruvanir.com

> AIにコードを貼る前に。Slackで送る前に。Gitにpushする前に。
> 
> Before you paste to AI. Before you send on Slack. Before you push to Git.

**APIキー・シークレット漏洩チェッカー / Secret Leak Detector**

コードや設定ファイルに混入したAPIキー・パスワード・シークレットを、ブラウザ完結で検出するツールです。入力したデータはサーバーに一切送信されません。

A browser-based tool to detect leaked API keys, passwords, and secrets in your code or config files. Zero data transmission — everything runs client-side.

---

## 使い方 / Usage

1. コード・`.env`・ログなどをテキストエリアに貼り付け、またはファイルをドロップ
2. 自動でスキャンされ、検出結果が右側に表示されます

---

1. Paste code, `.env` files, or logs into the text area, or drag & drop a file
2. Results appear instantly in the right panel

---

## 検出レベル / Detection Levels

| レベル / Level | 内容 / Description |
|---|---|
| 🔴 確定 / CONFIRMED | 既知のAPIキー形式（OpenAI, AWS, GitHub, Stripe など） |
| 🟠 要確認 / SUSPICIOUS | シークレット変数への実値代入（`password=`, `token=` など） |
| 🟡 疑わしい / HEURISTIC | 長いランダム文字列（汎用トークン等） |

## 対応サービス / Supported Services

OpenAI / Anthropic / AWS / GitHub / Google / Stripe / Slack / SendGrid / Hugging Face / Mailgun / Twilio / Firebase / JWT / Private Key Blocks

---

## 特徴 / Features

- **サーバー送信ゼロ** — 入力データは一切外部に送信されません
- **ファイルD&D対応** — ドラッグ&ドロップで即スキャン
- **リアルタイム検出** — 入力と同時にスキャンが走ります
- **ダークモード** — 目に優しい
- **開発者モード** — より技術的な表示に切り替え可能

---

- **Zero exfiltration** — your data never leaves the browser
- **Drag & drop** — drop any file for instant scanning
- **Real-time detection** — scans as you type
- **Dark mode** — easy on the eyes
- **Dev mode** — switch to technical display

---

## 開発者 / Author

[m4skedvanir](https://github.com/m4skedvanir-2)

---

> ブラウザ拡張機能はDOMを読める場合があります。信頼できる拡張機能のみを使用してください。
>
> Browser extensions may have DOM access. Use only trusted extensions.
