<script setup lang="ts">
// 状態を色と文字の両方で示す。色だけで区別させない。
import type { Tone } from '../types'

defineProps<{ tone: Tone }>()
</script>

<template>
  <span
    class="status-label"
    :class="`tone-${tone}`"
  ><slot /></span>
</template>

<style scoped>
.status-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0 var(--space-2);
  border: 1px solid currentColor;
  border-radius: var(--radius);
  font-size: var(--text-sm);
  white-space: nowrap;
}
.tone-ok { color: var(--color-ok-fg); background: var(--color-ok-bg); }
.tone-info { color: var(--color-info-fg); background: var(--color-info-bg); }
.tone-warn { color: var(--color-warn-fg); background: var(--color-warn-bg); }
.tone-danger { color: var(--color-danger-fg); background: var(--color-danger-bg); }
.tone-neutral { color: var(--color-neutral-fg); background: var(--color-neutral-bg); }
</style>
