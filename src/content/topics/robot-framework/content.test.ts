import { describe, expect, it } from 'vitest'
import robotFrameworkTopic from '.'

describe('Robot Framework topic content', () => {
  it('links every cheat-sheet section to focused guide material', () => {
    for (const section of robotFrameworkTopic.cheatsheet) {
      expect(section.references).toHaveLength(1)
      expect(section.references?.[0]?.url).toContain('#')
    }
    for (const question of robotFrameworkTopic.questions) {
      expect(question.reference.url).toContain('#')
    }
  })
})
