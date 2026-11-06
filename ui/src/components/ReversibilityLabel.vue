<script setup lang="ts">
// 可逆性クラス（docs/glossary.md）。irreversible だけを人間のゲートとして目立たせる。
import StatusLabel from './StatusLabel.vue'
import type { Reversibility, Tone } from '../types'

defineProps<{ value: Reversibility }>()

const tones: Record<Reversibility, Tone> = {
  config: 'info',
  policy: 'info',
  'pointer-swap': 'info',
  restart: 'warn',
  irreversible: 'danger',
}
</script>

<template>
  <StatusLabel :tone="tones[value]">
    <code>{{ value }}</code>
    <span v-if="value === 'irreversible'">人間のゲート</span>
  </StatusLabel>
</template>
