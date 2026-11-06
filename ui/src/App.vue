<script setup lang="ts">
// 部品の見本。表示している値はすべて見本で、実データではない。
import FreshnessLabel from './components/FreshnessLabel.vue'
import ReversibilityLabel from './components/ReversibilityLabel.vue'
import CliEquivalent from './components/CliEquivalent.vue'
import PlainLog from './components/PlainLog.vue'
import PlanReview from './components/PlanReview.vue'
import type { Freshness, Reversibility } from './types'

const freshness: Freshness[] = ['active', 'stale', 'expired', 'unknown']
const reversibility: Reversibility[] = ['config', 'policy', 'pointer-swap', 'restart', 'irreversible']
const log = [
  '[07:12:03] <player1> こんにちは',
  '[07:12:09] <player2> <img src=x onerror=alert(1)> これは文字として表示される',
]
</script>

<template>
  <main>
    <h1>koma UI 部品見本</h1>
    <p class="note">
      値はすべて見本。トークンは <code>src/styles/tokens.css</code>。
    </p>

    <section>
      <h2>FreshnessLabel</h2>
      <div class="row">
        <FreshnessLabel
          v-for="s in freshness"
          :key="s"
          :state="s"
          checked-at="2026-11-06T07:12:00Z"
        />
      </div>
    </section>

    <section>
      <h2>ReversibilityLabel</h2>
      <div class="row">
        <ReversibilityLabel
          v-for="r in reversibility"
          :key="r"
          :value="r"
        />
      </div>
    </section>

    <section>
      <h2>CliEquivalent</h2>
      <CliEquivalent command="koma now --json" />
    </section>

    <section>
      <h2>PlainLog</h2>
      <PlainLog :lines="log" />
    </section>

    <section>
      <h2>PlanReview</h2>
      <div class="stack">
        <PlanReview
          title="プラグイン版の差し替え（見本）"
          :plan="['蔵から新しい版を取得', 'カナリア 1 台に適用', 'soak 後に全台へ']"
          :blast-radius="['サーバー survival-1', 'サーバー survival-2']"
          reversibility="pointer-swap"
          :rollback="{ kind: 'steps', steps: ['ポインタを前の版に戻す'] }"
          command="koma apply --expect-rev r41"
        />
        <PlanReview
          title="ワールドの巻き戻し（見本）"
          :plan="['ワールドを停止', '前のスナップショットに戻す', '起動']"
          :blast-radius="['ワールド main', '巻き戻し以降のプレイヤーの進行']"
          reversibility="irreversible"
          :rollback="{ kind: 'none' }"
          command="koma apply --expect-rev r42"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 56rem;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
}
section {
  margin-top: var(--space-8);
}
h2 {
  font-size: var(--text-lg);
  font-family: var(--font-mono);
}
.note {
  color: var(--color-text-muted);
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.stack {
  display: grid;
  gap: var(--space-4);
}
</style>
