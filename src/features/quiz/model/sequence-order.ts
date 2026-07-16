export interface SequenceOrderRules {
  acceptedOrders?: readonly (readonly string[])[]
  correctOrder: readonly string[]
  requiredOrderPairs?: readonly (readonly [beforeItemId: string, afterItemId: string])[]
}

function containsEachExpectedItemOnce(
  candidateOrder: readonly string[],
  correctOrder: readonly string[],
): boolean {
  return (
    candidateOrder.length === correctOrder.length &&
    new Set(candidateOrder).size === candidateOrder.length &&
    candidateOrder.every((itemId) => correctOrder.includes(itemId))
  )
}

export function isValidSequenceOrder(
  candidateOrder: readonly string[],
  { acceptedOrders = [], correctOrder, requiredOrderPairs = [] }: SequenceOrderRules,
): boolean {
  if (!containsEachExpectedItemOnce(candidateOrder, correctOrder)) return false

  if (requiredOrderPairs.length > 0) {
    const positions = new Map(candidateOrder.map((itemId, index) => [itemId, index]))
    return requiredOrderPairs.every(([beforeItemId, afterItemId]) => {
      const beforeIndex = positions.get(beforeItemId)
      const afterIndex = positions.get(afterItemId)
      return beforeIndex !== undefined && afterIndex !== undefined && beforeIndex < afterIndex
    })
  }

  return [correctOrder, ...acceptedOrders].some((order) =>
    candidateOrder.every((itemId, index) => itemId === order[index]),
  )
}
