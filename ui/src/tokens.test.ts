// @vitest-environment node
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

// WCAG 2.1 の相対輝度とコントラスト比
function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

function colors(block: string): Map<string, string> {
  return new Map([...block.matchAll(/--(color-[\w-]+):\s*(#[0-9a-f]{6});/g)].map((m) => [m[1] ?? '', m[2] ?? '']))
}

const css = readFileSync(fileURLToPath(new URL('./styles/tokens.css', import.meta.url)), 'utf8')
const [lightBlock = '', darkBlock = ''] = css.split('@media (prefers-color-scheme: dark)')
const light = colors(lightBlock)
const themes = { light, dark: new Map([...light, ...colors(darkBlock)]) }

const pairs: [string, string][] = [
  ['color-text', 'color-bg'],
  ['color-text', 'color-surface'],
  ['color-text-muted', 'color-bg'],
  ['color-text-muted', 'color-surface'],
  ['color-accent', 'color-bg'],
  ...['ok', 'info', 'warn', 'danger', 'neutral'].map((t): [string, string] => [`color-${t}-fg`, `color-${t}-bg`]),
  ['color-danger-fg', 'color-bg'],
]

describe.each(Object.entries(themes))('%s', (_, theme) => {
  test.each(pairs)('%s / %s は 4.5:1 以上', (fg, bg) => {
    const f = theme.get(fg)
    const b = theme.get(bg)
    expect(f, fg).toBeDefined()
    expect(b, bg).toBeDefined()
    expect(contrast(f ?? '', b ?? '')).toBeGreaterThanOrEqual(4.5)
  })

  test('ダークモードはライトと同じトークンをすべて上書きする', () => {
    expect([...colors(darkBlock).keys()].sort()).toEqual([...light.keys()].sort())
  })
})
