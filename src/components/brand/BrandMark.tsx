import styles from './BrandMark.module.css'

export function BrandMark() {
  return (
    <span className={styles.brand} aria-label="Quiz Smarts">
      <span className={styles.mark} aria-hidden="true">
        <span>&gt;_</span>
      </span>
      <span>quiz smarts</span>
    </span>
  )
}
