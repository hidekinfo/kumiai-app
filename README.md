# 組合員専用アプリ

組合員向けのURLリンク集PWAです。iPhoneとAndroidのブラウザから開き、ホーム画面に追加して使う想定の静的サイトです。

## ファイル構成

- `index.html`: 画面本体
- `styles.css`: スマホ向けの見た目
- `app.js`: `links.json`を読み込んでボタンを表示
- `links.json`: ボタン名とURLの設定
- `manifest.json`: PWA用のアプリ情報
- `service-worker.js`: オフライン表示用の基本キャッシュ
- `icons/`: ロゴ画像とホーム画面用アイコン

## リンクの変更方法

`links.json`を編集します。上から順番にボタンが表示されます。

```json
[
  {
    "label": "ボタンに表示する名前",
    "url": "https://example.com/"
  }
]
```

項目を増やす場合は、同じ形で追加してください。URLは`https://`から始まる外部リンクを指定します。

## 公開方法

### GitHub Pages

1. このフォルダの中身をGitHubリポジトリにアップロードします。
2. GitHubのリポジトリ画面で「Settings」を開きます。
3. 「Pages」を開き、公開元を`main`ブランチのルートにします。
4. 表示されたURLをスマホで開きます。

### Netlify

1. Netlifyで新しいサイトを作成します。
2. このフォルダをドラッグ&ドロップ、またはGitHubリポジトリと連携します。
3. ビルド設定は不要です。公開フォルダはルートのままで使えます。

### Vercel

1. Vercelで新しいプロジェクトを作成します。
2. GitHubリポジトリを連携します。
3. フレームワーク設定は「Other」のままで公開できます。

## スマホのホーム画面に追加

iPhoneではSafariで公開URLを開き、共有ボタンから「ホーム画面に追加」を選びます。

AndroidではChromeで公開URLを開き、メニューから「ホーム画面に追加」または「アプリをインストール」を選びます。

PWAとして使うには、公開先が`https://`である必要があります。GitHub Pages、Netlify、VercelはいずれもHTTPSで公開できます。
