# Notionへの取り込み手順

## 1. ZIPを展開
このフォルダ内のCSVとMarkdownをNotionに取り込みます。

## 2. まずMarkdownを取り込む
`00_ダッシュボード.md` をNotionにドラッグ&ドロップしてください。  
これを夏休み計画のトップページにします。

## 3. CSVをデータベースとして取り込む
以下のCSVをNotionへ順番にインポートしてください。

1. `01_日別プラン.csv`
2. `02_週間目標.csv`
3. `03_科目ロードマップ.csv`
4. `04_TOEIC対策.csv`

Notion上では、それぞれ「Database」として読み込まれます。

## 4. プロパティ型のおすすめ変更

### 01_日別プラン
- 日付：Date
- 区分：Select
- フェーズ：Select
- Focus：Select
- 午前 / 午後 / 夕方/夜 / TOEIC：Select または Text
- 時間(h)：Number
- 進捗：Select

進捗の選択肢：
- 完了
- 半分
- 未着手
- 調整

### 02_週間目標
- 週：TitleまたはText
- 達成率：NumberまたはText

### 03_科目ロードマップ
- 科目：Title
- 優先：Select
- 進捗：Select

## 5. おすすめビュー

### 日別プラン
- Table：全体確認
- Calendar：月間表示
- Board by フェーズ：フェーズ別
- Board by 進捗：完了・未着手管理
- Filter 今日：日付 is Today
- Filter 今週：日付 is This week

## 6. 使い方
毎日細かく書きすぎると運用が重くなるので、基本は「進捗」と「メモ」だけで十分です。

