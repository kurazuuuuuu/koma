<script setup lang="ts">
// 破壊的操作の前に plan / blast radius / 可逆性 / ロールバック経路を見せる（docs/design.md の「UI」）。
import ReversibilityLabel from './ReversibilityLabel.vue'
import CliEquivalent from './CliEquivalent.vue'
import type { Reversibility, Rollback } from '../types'

defineProps<{
  title: string
  plan: string[]
  blastRadius: string[]
  reversibility: Reversibility
  rollback: Rollback
  command: string
}>()
</script>

<template>
  <section class="plan-review">
    <header>
      <h3>{{ title }}</h3>
      <ReversibilityLabel :value="reversibility" />
    </header>
    <dl>
      <dt>plan</dt>
      <dd>
        <ol>
          <li
            v-for="(step, i) in plan"
            :key="i"
          >
            {{ step }}
          </li>
        </ol>
      </dd>
      <dt>blast radius</dt>
      <dd>
        <ul>
          <li
            v-for="(target, i) in blastRadius"
            :key="i"
          >
            {{ target }}
          </li>
        </ul>
      </dd>
      <dt>ロールバック経路</dt>
      <dd>
        <ol v-if="rollback.kind === 'steps'">
          <li
            v-for="(step, i) in rollback.steps"
            :key="i"
          >
            {{ step }}
          </li>
        </ol>
        <p
          v-else
          class="none"
        >
          戻す経路なし
        </p>
      </dd>
    </dl>
    <CliEquivalent :command="command" />
  </section>
</template>

<style scoped>
.plan-review {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}
h3 {
  margin: 0;
  font-size: var(--text-lg);
}
dl {
  display: grid;
  gap: var(--space-2);
  margin: 0;
}
dt {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
dd {
  margin: 0;
}
ol,
ul {
  margin: 0;
  padding-left: var(--space-6);
}
.none {
  margin: 0;
  color: var(--color-danger-fg);
}
</style>
