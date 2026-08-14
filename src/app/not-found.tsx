import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Container width="narrow">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.body}>
          That route is not in this portfolio. The content map may have moved, or
          the slug does not exist yet.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary" arrow>
            Home
          </Button>
          <Button href="/projects" variant="secondary">
            Work
          </Button>
          <Button href="/articles" variant="ghost">
            Articles
          </Button>
        </div>
      </Container>
    </main>
  );
}
