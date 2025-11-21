# Stripe Customer Insights App

Stripe Dashboard内で直接利用できる、顧客の支払いインサイトと分析を提供するStripe Appです。

## 機能

- 📊 **顧客分析**: すべての顧客の支払い履歴とインサイトを表示
- 💰 **支払い追跡**: 各顧客の総支払額を確認
- 🔍 **高度なフィルタリング**: メール、名前、会社名で顧客を検索
- 📈 **ソート機能**: 様々な指標で顧客をソート（支払額、日付など）
- ⚡ **リアルタイムデータ**: Stripe APIから直接最新の顧客データを取得
- 🎯 **Dashboard統合**: Stripe Dashboardとのネイティブ統合

## 技術スタック

- **フレームワーク**: Stripe Apps Platform (UI Extensions)
- **言語**: TypeScript
- **UIライブラリ**: Stripe UI Extension SDK
- **API**: Stripe API (Customers, Charges)

## 必要要件

- Node.js >= 18.0.0
- APIアクセス可能なStripeアカウント
- Stripe Apps CLI

## インストール

### 1. Stripe Apps CLIのインストール

```bash
npm install -g @stripe/stripe-apps-cli
```

### 2. 依存関係のインストール

```bash
cd stripe-app
npm install
```

### 3. Stripeで認証

```bash
stripe login
```

## 開発

### 開発サーバーの起動

```bash
npm start
# または
stripe apps start
```

これにより以下が実行されます：
1. ウォッチモードでアプリをビルド
2. ローカル開発サーバーを起動
3. Stripe Dashboard（テストモード）でアプリを開く

### 本番ビルド

```bash
npm run build
```

## プロジェクト構造

```
stripe-app/
├── stripe-app.json       # アプリマニフェスト
├── package.json          # 依存関係
├── tsconfig.json         # TypeScript設定
├── icon.svg              # アプリアイコン
├── src/
│   ├── views/
│   │   └── CustomerInsights.tsx    # メインビューコンポーネント
│   ├── components/
│   │   ├── CustomerTable.tsx       # 顧客テーブルコンポーネント
│   │   └── FilterBar.tsx           # フィルターバーコンポーネント
│   ├── hooks/
│   │   └── useCustomerData.ts      # データ取得用カスタムフック
│   └── types/
│       └── customer.ts             # TypeScript型定義
└── README.md
```

## 使い方

インストール後、Customer InsightsアプリはあなたのStripe Dashboardに表示されます：

1. Stripe Dashboardにアクセス
2. Appsセクションで「Customer Insights」を探す
3. クリックしてアプリを開く
4. 支払いインサイト付きの顧客データを表示
5. フィルターを使用して特定の顧客を検索
6. カラムヘッダーをクリックしてデータをソート

### 詳細機能

#### 顧客テーブル
- **Email**: 顧客のメールアドレス
- **Company**: メタデータからの会社名
- **Name**: 顧客名
- **Customer Source**: メタデータからのソース追跡
- **Amount Paid**: 総支払額（USD）
- **Created**: 顧客作成日
- **Last Order Date**: 最新の請求日
- **Last Order Status**: 最新の請求ステータス
- **Last Ordered Item**: 最新の請求説明

#### フィルタリング
- 顧客メールで検索
- 顧客名で検索
- 会社名で検索
- フィルターは組み合わせて使用可能（AND条件）

#### ソート
- 任意のカラムヘッダーをクリックしてソート
- 再度クリックするとソート方向が反転
- ソートインジケーターで現在のソート列と方向を表示

## デプロイ

### Stripeへアップロード

```bash
stripe apps upload
```

### Stripe App Marketplaceに申請（オプション）

```bash
stripe apps submit
```

## 権限

このアプリは以下のStripe権限が必要です：

- `customer_read`: 顧客データの読み取り
- `charge_read`: 支払い請求の読み取り
- `payment_intent_read`: 決済意図情報へのアクセス

## レガシー版との比較

### 旧アーキテクチャ（NestJS + React）
- 別途バックエンドサーバー（NestJS）が必要
- 独立したホスティングインフラが必要
- 認証とセキュリティの手動管理
- より高い運用コスト

### 新アーキテクチャ（Stripe Apps）
- ✅ バックエンドサーバー不要
- ✅ Stripeがホスティング（インフラコストゼロ）
- ✅ Stripe管理の認証とセキュリティ
- ✅ Stripe Dashboardとのネイティブ統合
- ✅ 自動アップデートとスケーリング

## 移行メモ

このStripe Appは、オリジナルのNestJS + Reactアプリケーションを完全に書き直したものです：

**主な変更点:**
- NestJSバックエンドを完全削除
- React BootstrapからStripe UI Toolkitへ移行
- Charges APIから直接Stripe SDK使用へ変更
- カスタムAPIエンドポイントを削除
- Stripe Dashboardとのネイティブ統合を追加

**保持された機能:**
- すべての元の顧客フィルタリング機能
- ソート機能
- 支払いインサイトと分析
- 顧客メタデータサポート

## トラブルシューティング

### アプリがDashboardで読み込まれない
- テストモードになっているか確認
- `stripe apps start`が実行中か確認
- Stripe CLIが認証されているか確認

### データが表示されない
- `stripe-app.json`のStripe API権限を確認
- テストアカウントに顧客が存在するか確認
- ブラウザコンソールでエラーを確認

### ビルドエラー
- `npm install`を実行してすべての依存関係がインストールされているか確認
- Node.jsのバージョンを確認（>= 18.0.0必須）
- TypeScript設定を確認

## ライセンス

MIT

## サポート

問題や質問がある場合：
- [Stripe Apps ドキュメント](https://stripe.com/docs/stripe-apps)を確認
- 実装の詳細についてはコードコメントを参照
- このリポジトリでIssueを開く

## 今後の拡張機能

将来のバージョンで実装可能な機能：
- 顧客セグメンテーションとコホート分析
- 収益分析チャート
- CSV出力機能
- 顧客生涯価値の計算
- 支払い方法インサイト
- 返金追跡
- サブスクリプション分析（Stripe Billing使用時）
