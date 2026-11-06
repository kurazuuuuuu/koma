# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 現状

実装は `ui/`（UI の部品とトークン）だけ。本体とプラグインのビルド・lint・テストのコマンドはまだない。実装が入ったら、実際に動かしたコマンドをここに書く。

`ui/` で実際に動かしたコマンド（Node 22、pnpm 10）:

```sh
cd ui
pnpm install --frozen-lockfile
pnpm test       # vitest
pnpm typecheck  # vue-tsc
pnpm lint       # eslint、警告も失敗
pnpm build
pnpm dev        # 部品の見本ページ
```

- 文書中の `koma` で始まる名前は現在形で書かれていても未実装。実行しない
- koma の開発ではコンテナランタイムに OrbStack を使う
- 本体・プラグイン・UI の言語は `docs/design.md` の「確定事項」。UI の部品を足すときは同じ文書の「デザインシステム」に従う

## 作業別の参照先

- 全体像を掴む: `docs/design.md` の「提供形態」「層構成」「中核の判断」
- 決定を足す・変える: `docs/design.md` の「確定事項」か「中核の判断」に書き、「反証条件」に行を足す
- 分からないことを書く・計測結果を反映する: `docs/unknowns.md` の冒頭
- 文書・スキル・CLI の語を選ぶ: `docs/glossary.md`（「使わない語」を含む）
- ファイルを追加する: `docs/design.md` の「リポジトリに入れないもの」、`docs/licensing.md` の「jar からの抽出」
- 実装に着手する: `docs/design.md` の「作る順」
