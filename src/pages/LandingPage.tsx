import { useMemo, useRef, useState } from 'react'
import { topicCatalog } from '../content/registry'
import type { TopicCategory, TopicMetadata } from '../content/types'
import { BestScoreBadge } from '../components/score/BestScoreBadge'
import { ButtonLink } from '../components/button/ButtonLink'
import { estimateQuizMinutes } from '../features/quiz/model/duration'
import { useDocumentTitle } from '../lib/use-document-title'
import styles from './LandingPage.module.css'

const categoryFilters = [
  { value: 'all', label: 'All' },
  { value: 'programming', label: 'Programming' },
  { value: 'test-automation', label: 'Test automation' },
  { value: 'quality', label: 'Quality' },
  { value: 'data', label: 'Data' },
] as const satisfies readonly { value: TopicCategory | 'all'; label: string }[]

type ActiveCategory = (typeof categoryFilters)[number]['value']

const catalogEntries: readonly { topic: TopicMetadata; catalogIndex: number }[] = topicCatalog.map(
  (topic, catalogIndex) => ({ topic, catalogIndex }),
)

function getSearchableText(topic: TopicMetadata) {
  return [topic.title, topic.eyebrow, topic.summary, topic.description].join(' ').toLowerCase()
}

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useDocumentTitle('Quiz Smarts')

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredEntries = useMemo(
    () =>
      catalogEntries.filter(({ topic }) => {
        const matchesSearch =
          normalizedQuery.length === 0 || getSearchableText(topic).includes(normalizedQuery)
        const matchesCategory =
          activeCategory === 'all' || topic.categories.includes(activeCategory)

        return matchesSearch && matchesCategory
      }),
    [activeCategory, normalizedQuery],
  )
  const hasActiveFilters = normalizedQuery.length > 0 || activeCategory !== 'all'
  const resultSummary = hasActiveFilters
    ? `${filteredEntries.length} of ${topicCatalog.length} topics`
    : `${topicCatalog.length} topics`

  function clearSearch() {
    setSearchQuery('')
    searchInputRef.current?.focus()
  }

  function resetFilters() {
    setSearchQuery('')
    setActiveCategory('all')
    searchInputRef.current?.focus()
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Interactive tech practice</span>
          <h1 tabIndex={-1}>
            Make knowledge
            <span> click.</span>
          </h1>
          <p>
            Short, focused quizzes that turn documentation into something you can actually use.
            Learn the patterns, test your recall, and come back sharper.
          </p>
          <a className={styles.jumpLink} href="#topics">
            Explore topics <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div
          className={styles.terminal}
          role="img"
          aria-label="Quiz interaction preview: read documentation, try it, remember it, and unlock feedback"
        >
          <div className={styles.terminalBar}>
            <span />
            <span />
            <span />
            <code>knowledge-check.quiz</code>
          </div>
          <div className={styles.terminalBody}>
            <code>
              <span className={styles.comment}># one useful concept at a time</span>
              <span>
                <strong>*** Quiz ***</strong>
              </span>
              <span>Read docs → Try it → Remember it</span>
              <span className={styles.success}>✓ feedback unlocked</span>
              <span className={styles.cursor}>ready&gt; ▋</span>
            </code>
          </div>
          <span className={styles.orbit} aria-hidden="true">
            01
          </span>
        </div>
      </section>

      <section id="topics" className={styles.topics} aria-labelledby="topics-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>Choose your track</span>
            <h2 id="topics-title">Available topics</h2>
          </div>
          <span className={styles.topicCount} role="status" aria-live="polite" aria-atomic="true">
            {resultSummary}
          </span>
        </div>

        <div className={styles.topicTools}>
          <div className={styles.searchControl}>
            <label htmlFor="topic-search">Search topics</label>
            <div className={styles.searchField}>
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                ref={searchInputRef}
                id="topic-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by topic or skill"
                autoComplete="off"
                aria-controls="topic-results"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  className={styles.clearSearch}
                  aria-label="Clear topic search"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className={styles.filterControl}>
            <span id="topic-filter-label" className={styles.filterLabel}>
              Quick filters
            </span>
            <div className={styles.filterList} role="group" aria-labelledby="topic-filter-label">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={styles.filterButton}
                  aria-pressed={activeCategory === filter.value}
                  aria-controls="topic-results"
                  onClick={() => setActiveCategory(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div id="topic-results" className={styles.emptyState}>
            <span className={styles.kicker}>No matches</span>
            <h3>No topics found</h3>
            <p>Try another search, choose a different filter, or start fresh.</p>
            <button type="button" className={styles.resetButton} onClick={resetFilters}>
              Clear search and filters
            </button>
          </div>
        ) : (
          <div id="topic-results" className={styles.topicList}>
            {filteredEntries.map(({ topic, catalogIndex }) => {
              const subsetMinutes = estimateQuizMinutes(topic, topic.subsetQuestionCount)
              const topicNumber = String(catalogIndex + 1).padStart(2, '0')
              const initials = topic.title
                .split(/\s+/)
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()

              return (
                <article
                  key={topic.id}
                  className={styles.topicCard}
                  aria-labelledby={`${topic.id}-title`}
                >
                  <div
                    className={styles.topicNumber}
                    aria-hidden="true"
                    data-a11y-decorative="watermark"
                  >
                    {topicNumber}
                  </div>
                  <div className={styles.topicIcon} aria-hidden="true">
                    <span>{initials}</span>
                    <i />
                  </div>
                  <div className={styles.topicCopy}>
                    <span className={styles.topicEyebrow}>{topic.eyebrow}</span>
                    <h3 id={`${topic.id}-title`}>{topic.title}</h3>
                    <p>{topic.description}</p>
                    <div className={styles.metadata}>
                      <span>{topic.questionCount} questions</span>
                      <span>Quick ~{subsetMinutes} min</span>
                      <span>Full ~{topic.estimatedMinutes} min</span>
                      <span>{topic.difficulty}</span>
                    </div>
                    <BestScoreBadge topic={topic} />
                  </div>
                  <div className={styles.actions}>
                    <ButtonLink
                      to="/topics/$topicId"
                      params={{ topicId: topic.slug }}
                      ariaLabel={`Open ${topic.title} topic`}
                    >
                      Open topic <span aria-hidden="true">→</span>
                    </ButtonLink>
                    <ButtonLink
                      to="/topics/$topicId/quiz"
                      params={{ topicId: topic.slug }}
                      variant="secondary"
                      search={{ mode: 'subset' }}
                      ariaLabel={`Start ${topic.title} quick quiz, ${topic.subsetQuestionCount} questions`}
                    >
                      Quick quiz · {topic.subsetQuestionCount}
                    </ButtonLink>
                    <ButtonLink
                      to="/topics/$topicId/quiz"
                      params={{ topicId: topic.slug }}
                      variant="secondary"
                      search={{ mode: 'all' }}
                      ariaLabel={`Start ${topic.title} full quiz, ${topic.questionCount} questions`}
                    >
                      All questions · {topic.questionCount}
                    </ButtonLink>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
