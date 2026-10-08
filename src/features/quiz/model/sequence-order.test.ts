import { describe, expect, it } from 'vitest'
import { isValidSequenceOrder, type SequenceOrderRules } from './sequence-order'

const exactRules: SequenceOrderRules = {
  correctOrder: ['a', 'b', 'c'],
  acceptedOrders: [['b', 'a', 'c']],
}

const partialOrderRules: SequenceOrderRules = {
  correctOrder: ['a', 'b', 'c'],
  acceptedOrders: [['c', 'b', 'a']],
  requiredOrderPairs: [['a', 'c']],
}

describe('sequence order validation', () => {
  it.each([
    { name: 'the correct order', order: ['a', 'b', 'c'], valid: true },
    { name: 'a declared alternative order', order: ['b', 'a', 'c'], valid: true },
    { name: 'an undeclared order', order: ['c', 'b', 'a'], valid: false },
    { name: 'a missing item', order: ['a', 'b'], valid: false },
    { name: 'an extra item', order: ['a', 'b', 'c', 'd'], valid: false },
    { name: 'a duplicated item', order: ['a', 'a', 'c'], valid: false },
    { name: 'an unknown item', order: ['a', 'b', 'x'], valid: false },
  ])('matches exact orders: $name', ({ order, valid }) => {
    expect(isValidSequenceOrder(order, exactRules)).toBe(valid)
  })

  it.each([
    { name: 'the correct order', order: ['a', 'b', 'c'], valid: true },
    { name: 'any order that keeps the pairs', order: ['b', 'a', 'c'], valid: true },
    { name: 'an order that breaks a pair', order: ['c', 'a', 'b'], valid: false },
    {
      name: 'an accepted order that breaks a pair',
      order: ['c', 'b', 'a'],
      valid: false,
    },
    { name: 'a duplicated item', order: ['a', 'c', 'c'], valid: false },
  ])('uses required pairs instead of exact orders: $name', ({ order, valid }) => {
    expect(isValidSequenceOrder(order, partialOrderRules)).toBe(valid)
  })
})
