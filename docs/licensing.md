# ライセンス

| 層 | 中身 | 選べるか | ライセンス |
|---|---|---|---|
| リポジトリ | ツール、スキル定義、定跡、設定雛形、設計文書 | 選べる | Apache-2.0（[LICENSE](../LICENSE)） |
| 配布物 | Paper + Velocity + プラグイン束 + datapack | 選べない | Paper と Velocity は GPL-3.0。束ねた全体にどこまで及ぶかは未確定 |
| 第三者プラグイン | 個々の jar | 選べない | 個別 |

Apache-2.0 を選んだのは特許条項があるため（MIT にはない）。
貢献のない商用サービス化が問題になったら AGPL-3.0 を検討する。

この文書には koma が何をするかだけを書く。法的な判断は [`unknowns.md`](unknowns.md) の #11 と #12 に置く。

## リポジトリに GPL のものを置かない

Paper は GPL-3.0 で、Spigot → Bukkit → CraftBukkit から継承している（[Paper の LICENSE.md](https://github.com/PaperMC/Paper/blob/main/LICENSE.md)）。
Paper の jar、パッチ、GPL 由来の設定をコミットすると、GPL-3.0 のファイルがリポジトリに入る。全体への影響は unknowns #11 が解けるまで判断できないので、入れない。

- 成果物はインストール時に取得する。コミットしない
- 配布物の組み立てはデプロイ時に行う
- リポジトリには自前のコードと文書だけを置く

gateway に使う Velocity も [GPL-3.0](https://github.com/PaperMC/Velocity/blob/dev/4.0.0/LICENSE) なので、同じ扱いにする。

## Paper との関係

フォークせず、NMS を使わず、`paper-api` にリンクするだけ。Paper は改変しない。

## 配布するときに行うこと

Paper か Velocity を同梱して配るときは、[GPLv3](https://www.gnu.org/licenses/gpl-3.0.txt) の §4 と §6 に従って次を行う。

- 対応するソースの提供（または入手方法の明示）
- ライセンス文と著作権表示の同梱

## 再配布を許可していないプラグイン

再配布を許可していないプラグイン（All Rights Reserved など）は配布物に入れない。
ロックファイルは `license` と `redistributable` を持つ。

```json
{
  "id": "some-plugin",
  "version": "3.2.1",
  "sha256": "sha256:...",
  "license": "ARR",
  "redistributable": false
}
```

`koma install` は、`redistributable: false` の成果物を含む配布物を組み立てようとしたら失敗する。
自分用にインストールすることはできるが、配布物には入らない。

## ロックファイルに書くもの

`sha256`、`id` / `version`、`provides`（コマンド名・権限名）、`shaded`（同梱ライブラリ名・版）。jar の中身は書かない。

`koma audit --notices` で `shaded` から THIRD-PARTY-NOTICES を生成する。

### jar からの抽出

| 行為 | 扱い |
|---|---|
| `plugin.yml` / `paper-plugin.yml` を読む | 行う |
| jar のクラス名を抜いて索引にする | リポジトリに入れず、ストア側に置く。作ってよいかは未確定 |
| バイトコード差分を保存する | リポジトリに入れず、監査ログ側に置く |

`redistributable: false` のものは `provides` を手書きできる（jar を解析せず公開ドキュメントから）。
