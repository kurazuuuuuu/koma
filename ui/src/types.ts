// docs/design.md の「盤」と docs/glossary.md の「可逆性クラス」に対応する。API のスキーマができたら、そこから生成した型に置き換える予定。

export type Freshness = 'active' | 'stale' | 'expired' | 'unknown'

export type Reversibility = 'config' | 'policy' | 'pointer-swap' | 'restart' | 'irreversible'

// 値がない状態は列挙で表す（docs/design.md の「形式」）
export type Rollback = { kind: 'steps'; steps: string[] } | { kind: 'none' }

export type Tone = 'ok' | 'info' | 'warn' | 'danger' | 'neutral'
