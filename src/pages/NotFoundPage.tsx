import { ButtonLink } from '../components/button/ButtonLink'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.notFound}>
      <span>404 / route_not_found</span>
      <h1>This path drew a blank.</h1>
      <p>The page may have moved, or the topic has not been added yet.</p>
      <ButtonLink to="/">Back to topics</ButtonLink>
    </section>
  )
}
