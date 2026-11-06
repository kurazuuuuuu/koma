# 分かっていないこと

決定ではない。**調査項目**。

ここに書いてある間は、設計の該当部分は仮置きである。
分かったら数値と条件を [`design.md`](design.md) に書き、ここから消す。
消すときは `docs/` 内の参照（`unknowns #N`）も直す。番号は再利用しない。

| # | 不明なこと | なぜ効くか | どう分かるか |
|---|---|---|---|
| 1 | tick の実測予算 | 薄いシムに何を許せるかが変わる | spark で 1 週間計測。プラグイン構成を固定して |
| 2 | 外部プラグイン更新の実際の停止時間 | ゼロダウンタイム設計が必要かどうか | 単一ワールドで実測 |
| 3 | Paper 追従の実コスト | フォーク却下の根拠 | 1 回アップデートして工数を記録 |
| 4 | 子クラスローダでの自前プラグイン再読込の成否 | ゼロダウンタイムの中核 | 最小プラグインで実験 |
| 5 | MockBukkit で書けるテストの範囲 | 検証戦略の前提 | 対象 API を列挙して実際に試す |
| 6 | プレイヤー離脱を変更前に検出できるか | 「面白さ」の代理指標 | 指標候補を取り、変更前後の継続率を見る |
| 7 | ルーター（Tier1）の実精度 | 閉集合設計が成立するか | 過去の issue 100 件で混同行列を取る |
| 8 | バイトコード差分で実際に何が検出できるか | サプライチェーン統制の実効性 | 既知のプラグイン 20 個で差分を取る |
| 9 | ワールド blue/green の成立条件 | ワールド更新のゼロダウンタイム | コピー時間とプレイヤー状態の移行を試す |
| 10 | 1 サーバーあたりの運用コスト | 自律度を上げる価値の計算 | 実際に回して計測 |
| 11 | Paper や Velocity を同梱した配布物に GPL-3 がどこまで及ぶか。`paper-api` にリンクするプラグインの法的地位 | 自前プラグインのライセンス選択、配布物の組み立て | 専門家に確認。コミュニティ慣行だけでは根拠にならない。[GPLv3 §5](https://www.gnu.org/licenses/gpl-3.0.txt) の aggregate は「性質上 extension でない」ことが条件で、プラグインが当たるかは条文だけでは決まらない |
| 12 | ARR プラグインの EULA がどこまで解析を許すか。ロックファイルに識別子（`provides` など）を記録することの著作権上の扱い | クラス索引を作れるかの判断、ロックファイルの項目 | 主要プラグインの EULA を読み、解析禁止条項の有無を確認。識別子の扱いは専門家に確認。[Google v. Oracle](https://www.law.cornell.edu/supremecourt/text/18-956) は著作権の有無を判断しておらず、「no more than is necessary to resolve this case」と述べているので、この判決だけでは決まらない |
| 13 | Tier0 に Jev を使えるか | 毎イベント判定の精度・費用・注入耐性で成立が決まる | 正解ラベル付きイベントで混同行列を取り、チャットに注入文を混ぜて判定が動くか試す |
| 14 | ゲームサーバーから外への通信をどこまで止められるか | サプライチェーンの前提。[online-mode ではサーバーが Mojang のセッションサーバーに問い合わせる](https://minecraft.wiki/w/Java_Edition_protocol/Encryption) | プロキシ構成と直結構成で、ゲームサーバーから外に出る通信を観測する。Docker の [`--internal`](https://docs.docker.com/reference/cli/docker/network/create/) は外部通信を一律に止める機能で、宛先ごとの許可は説明されていない |
| 15 | 実状態をファイル + RCON + プラグインのレジストリ + ロックファイルで列挙しきれるか | state file を持たない判断の前提 | 実サーバーに手で変更を加え、列挙で全部検出できるか試す |
| 16 | 棋譜のリプレイで未実施の変更の影響を答えられるか | UI の影響シミュレーションの前提 | 過去の変更を 1 件選び、変更前までの棋譜から結果を予測して実際と比べる |
| 17 | ローカルの Claude Code / Codex をワーカーにしたとき、版・モデル・権限をどこまで固定できるか | モデルの版固定と「能力はポリシーから」の前提。[参考にする OpenBot は全権限で動かしている](https://github.com/nightly-labs/openbot#readme) | 両 CLI の非対話実行で、版指定・モデル指定・権限制限を試す |
| 18 | サブスクリプションのサインインでワーカーを常時動かしてよいか | 作業エージェントの既定。[Anthropic は Pro / Max / Ultra の上限を「ordinary, individual usage」前提と説明している](https://code.claude.com/docs/en/legal-and-compliance) | Anthropic と OpenAI の規約を読み、判断できなければ問い合わせる |
| 19 | Docker が tick とワールド I/O に与える影響 | macOS を V1 の動作目標にできるか。[Docker Desktop のコンテナは Linux VM 上で動く](https://docs.docker.com/desktop/features/vmm/) | 同じプラグイン構成で直接起動とコンテナを比べ、tick の p99（spark）とワールド保存の所要時間を測る。macOS は OrbStack と Docker Desktop の両方で測る |
| 20 | `koma.local` と `[alias].mc.koma.local` を macOS / Linux でどう解決するか | ホスト名でアクセスする決定の前提。`.local` は [mDNS 用の特別なドメイン](https://www.rfc-editor.org/rfc/rfc6762.txt)で、リンクローカルでしか意味を持たない。Linux の [nss-mdns は `/etc/mdns.allow` がないと 3 段以上の名前を拒否する](https://github.com/avahi/nss-mdns/blob/master/README.md) | OrbStack は[カスタムドメインのラベル](https://docs.orbstack.dev/docker/domains)でワイルドカードも割り当てられる。[Docker Desktop のネットワークの説明](https://docs.docker.com/desktop/features/networking/)には `.local` の自動割り当ての記載がないので、Docker Desktop と Linux では koma 側で mDNS の公開か hosts への登録を用意して試す。同じ LAN の別マシンと Minecraft クライアントから接続できるかも試す |
| 21 | 同じ IP で複数サーバーを動かすとき、`[alias]` からサーバーへどう振り分けるか | ポートなしの `[alias].mc.koma.local` で接続できるかが決まる。[クライアントは handshake で接続先の名前を送る](https://minecraft.wiki/w/Java_Edition_protocol/Packets) | 第一候補は gateway の [Velocity の forced-hosts](https://docs.papermc.io/velocity/configuration/)。実機で試し、足りなければコンテナごとの IP（OrbStack）と alias ごとのポート分けと比べる |
| 22 | 同じベンダーの別セッションのレビューは、別ベンダーと比べてどれだけ見逃すか | マシンの CLI が 1 つのときのレビューの独立性 | 既知の欠陥を入れた変更を両方にレビューさせ、検出率を比べる |
| 23 | 転送サービスの PROXY protocol を Velocity が受けられるか。受け付ける送信元をどこで限定するか | 外部公開でプレイヤーの実 IP を保てるか。[`haproxy-protocol`](https://docs.papermc.io/velocity/configuration/) は有効 / 無効だけで、送信元の限定は説明されていない。[Cloudflare Spectrum の PROXY protocol は Enterprise プランが必要](https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/) | PROXY protocol を送れる転送サービスと Velocity をつなぎ、ログの接続元 IP を見る。許可していない送信元から偽のヘッダを送って拒否されるか試す |
| 24 | 26.3 のボット E2E に何を使うか | 移動や操作を含む L4 の前提。mineflayer は `unsupported protocol version: 26.3` で接続できない `[計測: mineflayer 4.39.0, Paper 26.3-243, 2026-11-06]` | 26.3 に対応したボットを探す。なければ、ログインから play 状態まで動いた最小クライアントを広げる費用を見積もる |
| 25 | 同じマシンで動く作業エージェントから Docker デーモンへのアクセスをどう止めるか | コンテナでサインイン情報を隔離する前提。デーモンを操作できれば、マウント経由でマシンのファイルを読める。権限の固定（#17）とも関わる | koma 本体と CLI を別ユーザーで動かす構成と CLI の権限制限を試し、CLI から `docker` を実行できないことを確かめる |

## 未着手の設計

- 任意コード実行のサンドボックス化
- コスト暴走に対する予算設計
- 無限リトライのエスカレーション設計
- EULA のガードレール
- UI の言語とビルドツール
- 本体（Rust）とプラグイン（Java）でスキーマをどう共有するか（候補は JSON Schema）
- 別ホストのノードとの通信・認証・隔離
- UI / API を外に出すときの認証
- 新機能の依頼を扱う定跡（機能開発）
- プラグインのロールバックでプレイヤーデータの形式を戻せないときの可逆性クラス
- オンボーディングで登録した環境変数の保管場所
- curl で取得するインストールスクリプト自体の検証
- 外部モデル API が止まったときの Tier0 の挙動
- プレイヤーの発言を外部 API に送るときのデータの扱い
- インストーラーが macOS で Docker Desktop と OrbStack のどちらを案内するか（Docker Desktop は[従業員 250 人超または年間収益 1,000 万ドル超の企業の商用利用で有償](https://docs.docker.com/desktop/setup/install/mac-install/)。OrbStack は[個人の非商用利用が無料で、商用利用は有償](https://orbstack.dev/pricing)）
- MariaDB / Postgres と gateway をコンテナにするか
