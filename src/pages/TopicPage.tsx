import { ButtonLink } from '../components/button/ButtonLink'
import { BestScoreBadge } from '../components/score/BestScoreBadge'
import type { TopicDefinition } from '../content/types'
import { estimateQuizMinutes } from '../features/quiz/model/duration'
import styles from './TopicPage.module.css'

interface TopicPageProps {
  topic: TopicDefinition
}

export function TopicPage({ topic }: TopicPageProps) {
  const subsetMinutes = estimateQuizMinutes(topic, topic.subsetQuestionCount)

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.breadcrumb}>
          <span>topics</span>
          <span aria-hidden="true">/</span>
          <strong>{topic.slug}</strong>
        </div>
        <div className={styles.introGrid}>
          <div>
            <span className={styles.kicker}>{topic.eyebrow}</span>
            <h1>{topic.title}</h1>
            <p>{topic.description}</p>
          </div>
          <aside className={styles.launchCard} aria-label="Quiz overview">
            <span className={styles.launchLabel}>knowledge check</span>
            <strong>{topic.questionCount} questions total</strong>
            <div className={styles.stats}>
              <span>Quick ~{subsetMinutes} min</span>
              <span>Full ~{topic.estimatedMinutes} min</span>
              <span>{topic.difficulty}</span>
            </div>
            <BestScoreBadge topic={topic} />
            <div className={styles.quizActions}>
              <ButtonLink
                to="/topics/$topicId/quiz"
                params={{ topicId: topic.slug }}
                search={{ mode: 'subset' }}
              >
                Quick quiz · {topic.subsetQuestionCount}
              </ButtonLink>
              <ButtonLink
                to="/topics/$topicId/quiz"
                params={{ topicId: topic.slug }}
                search={{ mode: 'all' }}
                variant="secondary"
              >
                All questions · {topic.questionCount}
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.cheatsheet} aria-labelledby="cheatsheet-title">
        <div className={styles.sheetHeading}>
          <div>
            <span className={styles.kicker}>Quick reference</span>
            <h2 id="cheatsheet-title">{topic.title} cheatsheet</h2>
          </div>
          <div className={styles.reviewed}>
            <span>Last reviewed</span>
            <strong>{topic.lastReviewed}</strong>
          </div>
        </div>

        <div className={styles.sheetGrid}>
          {topic.cheatsheet.map((section, sectionIndex) => (
            <article key={section.id} className={styles.sheetCard} id={section.id}>
              <span className={styles.sectionNumber} aria-hidden="true">
                {String(sectionIndex + 1).padStart(2, '0')}
              </span>
              <h3>{section.title}</h3>
              <p className={styles.summary}>{section.summary}</p>
              <dl>
                {section.items.map((item) => (
                  <div key={item.term} className={styles.sheetItem}>
                    <dt>{item.term}</dt>
                    <dd>{item.detail}</dd>
                    {item.code && <pre>{item.code}</pre>}
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className={styles.sourceNote}>
          Source:{' '}
          <a href={topic.reference.url} target="_blank" rel="noreferrer">
            {topic.reference.label} <span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>
    </div>
  )
}
