import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PlainLog from './PlainLog.vue'
import PlanReview from './PlanReview.vue'
import ReversibilityLabel from './ReversibilityLabel.vue'

describe('PlainLog', () => {
  test('ログ中の HTML を要素にせず文字として出す', () => {
    const line = '<img src=x onerror=alert(1)>'
    const wrapper = mount(PlainLog, { props: { lines: [line] } })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain(line)
  })
})

describe('ReversibilityLabel', () => {
  test('irreversible だけが人間のゲートを示す', () => {
    expect(mount(ReversibilityLabel, { props: { value: 'irreversible' } }).text()).toContain('人間のゲート')
    expect(mount(ReversibilityLabel, { props: { value: 'restart' } }).text()).not.toContain('人間のゲート')
  })
})

describe('PlanReview', () => {
  const base = {
    title: 't',
    plan: ['a'],
    blastRadius: ['b'],
    command: 'koma apply --expect-rev r1',
  }

  test('戻す経路がないときはそう書く', () => {
    const wrapper = mount(PlanReview, { props: { ...base, reversibility: 'irreversible', rollback: { kind: 'none' } } })
    expect(wrapper.text()).toContain('戻す経路なし')
  })

  test('戻す手順を順に出す', () => {
    const wrapper = mount(PlanReview, {
      props: { ...base, reversibility: 'pointer-swap', rollback: { kind: 'steps', steps: ['前の版に戻す'] } },
    })
    expect(wrapper.text()).toContain('前の版に戻す')
    expect(wrapper.text()).not.toContain('戻す経路なし')
  })
})
