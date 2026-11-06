<script setup lang="ts">
// ログ・チャットはプレーンテキストで描画する（docs/design.md の「UI」）。HTML として解釈しない。
defineProps<{ lines: string[] }>()
</script>

<template>
  <pre class="log"><template
    v-for="(line, i) in lines"
    :key="i"
  >{{ line }}
</template></pre>
</template>

<style scoped>
.log {
  margin: 0;
  padding: var(--space-3);
  max-height: 20rem;
  overflow: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
