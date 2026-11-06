<script setup lang="ts">
// 全操作に等価な CLI コマンドを併記する（docs/design.md の「UI」）。
import { ref } from 'vue'

const props = defineProps<{ command: string }>()
const copied = ref(false)

async function copy(): Promise<void> {
  await navigator.clipboard.writeText(props.command)
  copied.value = true
}
</script>

<template>
  <div class="cli">
    <code><span aria-hidden="true">$ </span>{{ command }}</code>
    <button
      type="button"
      @click="copy"
    >
      {{ copied ? 'コピーした' : 'コピー' }}
    </button>
  </div>
</template>

<style scoped>
.cli {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
code {
  flex: 1;
  overflow-x: auto;
  white-space: pre;
}
button {
  font: inherit;
  font-size: var(--text-sm);
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0 var(--space-2);
  cursor: pointer;
}
</style>
