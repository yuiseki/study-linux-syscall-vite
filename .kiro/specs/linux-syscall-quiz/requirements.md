# 要件定義書

## 概要

日本人ユーザーが「それっぽい英単語」を見て、どれがLinuxシステムコールかを当てるクイズゲームです。学習目的というより、スリルと演出重視の娯楽として設計されています。アカウント機能や同期機能は不要で、すべての状態はローカルストレージで管理されます。

## 用語集

- **Quiz_System**: Linuxシステムコールクイズゲームシステム
- **Local_Storage**: ブラウザのローカルストレージ機能
- **Question_Set**: 1つの正解と2つのダミーからなる三択問題
- **Syscall**: Linuxシステムコール（実在する関数）
- **Dummy_Option**: システムコールではないが、それらしく見える英単語
- **Game_Session**: スタートから結果表示までの1回のプレイ
- **Streak**: 連続正解数
- **Performance_Metrics**: 正解数、正答率、最大連続正解、解答時間などの成績指標

## 要件

### 要件1

**ユーザーストーリー:** ユーザーとして、三択クイズでLinuxシステムコールを当てるゲームをプレイしたい。そうすることで、エンターテイメントとしてシステムコールに親しむことができる。

#### 受け入れ基準

1. THE Quiz_System SHALL 三択形式で問題を表示する
2. WHEN ユーザーが選択肢をタップした時、THE Quiz_System SHALL 即座に正解・不正解を判定する
3. THE Quiz_System SHALL 各問題で1つの実在するLinuxシステムコールと2つのダミー選択肢を提供する
4. THE Quiz_System SHALL 選択肢の表示順序を毎問ランダムに変更する
5. THE Quiz_System SHALL デフォルトで10問を連続出題する

### 要件2

**ユーザーストーリー:** ユーザーとして、正解・不正解時に派手な演出を見たい。そうすることで、ゲームプレイにスリルと興奮を感じることができる。

#### 受け入れ基準

1. WHEN ユーザーが正解した時、THE Quiz_System SHALL コンフェッティ、花火パーティクル、"SUCCESS!"の大型表示を1.5秒以内に実行する
2. WHEN ユーザーが不正解した時、THE Quiz_System SHALL 画面シェイク、破片パーティクル、"MISS!"の赤系大型表示を1.5秒以内に実行する
3. THE Quiz_System SHALL 正解時に高揚系ジングル音を0.3〜0.7秒間再生する
4. THE Quiz_System SHALL 不正解時に短いブザー音を0.2〜0.5秒間再生する
5. THE Quiz_System SHALL 演出完了後1.0〜1.5秒で自動的に次の問題に遷移する

### 要件3

**ユーザーストーリー:** ユーザーとして、自分の成績を確認したい。そうすることで、プレイの成果を把握し、継続的な楽しみを得ることができる。

#### 受け入れ基準

1. THE Quiz_System SHALL Game_Session終了時に正解数、正答率、最大連続正解、平均解答時間を表示する
2. THE Quiz_System SHALL 通算プレイ数、通算正解数、最高ストリークをLocal_Storageに保存する
3. THE Quiz_System SHALL 成績画面で総合的な統計情報を表示する
4. THE Quiz_System SHALL ユーザーの解答時間を1問ごとに計測する
5. THE Quiz_System SHALL 連続正解数（ストリーク）をリアルタイムで更新する

### 要件4

**ユーザーストーリー:** ユーザーとして、ゲーム設定をカスタマイズしたい。そうすることで、自分の好みに合わせてゲーム体験を調整できる。

#### 受け入れ基準

1. THE Quiz_System SHALL 出題数を5問、10問、20問から選択可能にする
2. THE Quiz_System SHALL 難易度をEasy、Normal、Hardから選択可能にする
3. THE Quiz_System SHALL 演出強度を控えめ、標準、派手から選択可能にする
4. THE Quiz_System SHALL サウンドのON/OFF設定を提供する
5. WHERE ユーザーがデータリセットを選択した場合、THE Quiz_System SHALL 確認ダイアログ後にすべての進行状況を削除する

### 要件5

**ユーザーストーリー:** ユーザーとして、キーボードでゲームを操作したい。そうすることで、アクセシビリティを向上させ、快適にプレイできる。

#### 受け入れ基準

1. WHEN ユーザーが1、2、3キーを押した時、THE Quiz_System SHALL 対応する選択肢を選択する
2. WHEN ユーザーがEnterキーを押した時、THE Quiz_System SHALL 次の問題に進む
3. THE Quiz_System SHALL キーボード操作時に視覚的フィードバックを提供する
4. THE Quiz_System SHALL WCAG AA相当のカラーコントラストを維持する
5. WHERE OSの「動きを減らす」設定が有効な場合、THE Quiz_System SHALL 演出強度を自動的に「控えめ」に設定する

### 要件6

**ユーザーストーリー:** ユーザーとして、オフライン環境でもゲームをプレイしたい。そうすることで、ネットワーク環境に依存せずに楽しむことができる。

#### 受け入れ基準

1. THE Quiz_System SHALL サーバー通信なしで完全に動作する
2. THE Quiz_System SHALL 静的ホスティングで配信可能な構成で実装される
3. THE Quiz_System SHALL 初回ロード時のファイルサイズを2MB未満に抑える
4. THE Quiz_System SHALL 最新の主要ブラウザ（Chrome、Edge、Firefox、Safari）で動作する
5. THE Quiz_System SHALL 60fpsを維持してスムーズな動作を提供する

### 要件7

**ユーザーストーリー:** ユーザーとして、問題データが適切に管理されたクイズを受けたい。そうすることで、公平で一貫性のあるゲーム体験を得ることができる。

#### 受け入れ基準

1. THE Quiz_System SHALL 実在するLinuxシステムコール（open、fork、mount、clone等）を正解選択肢として使用する
2. THE Quiz_System SHALL それらしいが実在しない英単語（create、move、view、break等）をダミー選択肢として使用する
3. THE Quiz_System SHALL 同一Game_Session内で同じ問題の重複を避ける
4. THE Quiz_System SHALL 難易度に応じて適切なシステムコールとダミーを選択する
5. THE Quiz_System SHALL 問題データを埋め込みJSONとして管理する