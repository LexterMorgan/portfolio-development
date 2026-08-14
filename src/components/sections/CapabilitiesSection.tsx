import styles from "./CapabilitiesSection.module.css";

const CAPABILITIES = [
  {
    title: "Analytical framing",
    body: "Clarify the business question, constraints, and what evidence can actually support.",
  },
  {
    title: "Data & SQL workflows",
    body: "Structure queries, validate assumptions, and keep structural breaks visible.",
  },
  {
    title: "BI & dashboards",
    body: "Translate analysis into decision-ready views — without overstating certainty.",
  },
  {
    title: "Product implementation",
    body: "Ship usable interfaces around analytical work when the problem needs a product surface.",
  },
];

export function CapabilitiesSection() {
  return (
    <div className={styles.grid}>
      {CAPABILITIES.map((item, index) => (
        <article key={item.title} className={styles.item}>
          <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.body}>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
