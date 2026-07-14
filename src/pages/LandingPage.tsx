import { topicCatalog } from '../content/registry'
import { BestScoreBadge } from '../components/score/BestScoreBadge'
import { ButtonLink } from '../components/button/ButtonLink'
import { estimateQuizMinutes } from '../features/quiz/model/duration'
import styles from './LandingPage.module.css'

export function LandingPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Interactive tech practice</span>
          <h1>
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
        <div className={styles.terminal} aria-label="Quiz interaction preview">
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
          <span className={styles.topicCount}>
            {String(topicCatalog.length).padStart(2, '0')} topics
          </span>
        </div>

        <div className={styles.topicList}>
          {topicCatalog.map((topic, index) => {
            const subsetMinutes = estimateQuizMinutes(topic, topic.subsetQuestionCount)
            const topicNumber = String(index + 1).padStart(2, '0')
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
                <div className={styles.topicNumber} aria-hidden="true">
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
      </section>
    </>
  )
}
