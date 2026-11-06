<script setup lang="ts">
// 盤の鮮度。状態と確認時刻を必ず一緒に出す（docs/design.md の「盤」）。
import StatusLabel from './StatusLabel.vue'
import type { Freshness, Tone } from '../types'

defineProps<{ state: Freshness; checkedAt: string }>()

const tones: Record<Freshness, Tone> = {
  active: 'ok',
  stale: 'warn',
  expired: 'danger',
  unknown: 'neutral',
}
</script>

<template>
  <StatusLabel :tone="tones[state]">
    <code>{{ state }}</code>
    <time :datetime="checkedAt">{{ checkedAt }}</time>
  </StatusLabel>
</template>
