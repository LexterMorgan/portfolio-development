import { getAllProjects, getCurrently, getSite } from "@/content";

/**
 * Phase 1 foundation page only — not the final homepage UI.
 * Confirms content loading works at build/runtime.
 */
export default function HomePage() {
  const site = getSite();
  const projects = getAllProjects();
  const currently = getCurrently();

  return (
    <main>
      <h1>{site.data.title}</h1>
      <p>{site.data.description}</p>
      <p>
        Phase 1 foundation: content architecture is active. Visual design begins
        in Phase 2.
      </p>

      <section>
        <h2>Projects (content inventory)</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.data.slug}>
              {project.data.title} — {project.data.status}
              {project.data.featured ? " (featured)" : ""}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Currently (editable via content/currently.md)</h2>
        <p>
          building: {currently.data.building.length} · exploring:{" "}
          {currently.data.exploring.length} · learning:{" "}
          {currently.data.learning.length} · next: {currently.data.next.length}
        </p>
      </section>
    </main>
  );
}
