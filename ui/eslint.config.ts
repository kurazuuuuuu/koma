import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  { ignores: ['dist/**'] },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.strictTypeChecked,
  {
    rules: {
      // ログ・チャットはプレーンテキストで描画する（docs/design.md の「UI」）
      'vue/no-v-html': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "MemberExpression[property.name=/^(innerHTML|outerHTML)$/]",
          message: 'HTML として描画しない。テキストとして描画する。',
        },
        {
          selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
          message: 'HTML として描画しない。テキストとして描画する。',
        },
      ],
    },
  },
)
