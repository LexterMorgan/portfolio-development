import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Tests run against the real content/ tree for happy-path validation,
 * and against temporary fixtures for malformed / relationship failures.
 */

describe("content loader (repository content)", () => {
  it("loads site, profile, and currently", async () => {
    const { getSite, getProfile, getCurrently } = await import("@/content/loader");
    expect(getSite().data.title).toBeTruthy();
    expect(getProfile().data.headline).toContain("Data Science");
    expect(getCurrently().data.building).toEqual([]);
  });

  it("loads all scaffolded projects with stable slugs", async () => {
    const { getAllProjects } = await import("@/content/loader");
    const projects = getAllProjects();
    const slugs = projects.map((p) => p.data.slug).sort();
    expect(slugs).toEqual([
      "customer-retention",
      "ecommerce-power-shift",
      "folu-executive-intelligence",
      "retailiq",
    ]);
    for (const project of projects) {
      expect(project.data.status).toBe("planned");
      expect(project.data.featured).toBe(false);
      expect(project.articleSlugs).toEqual([]);
    }
  });

  it("loads updates", async () => {
    const { getAllUpdates } = await import("@/content/loader");
    const updates = getAllUpdates();
    expect(updates.length).toBeGreaterThanOrEqual(1);
    expect(updates[0]?.data.slug).toBeTruthy();
  });

  it("validateAllContent succeeds on repository content", async () => {
    const { validateAllContent } = await import("@/content/loader");
    const result = validateAllContent();
    expect(result.projects).toBe(4);
    expect(result.articles).toBe(0);
  });
});

describe("tech registry", () => {
  it("resolves known IDs and rejects unknown IDs", async () => {
    const { getTech, requireTech, assertTechStackRegistered } = await import(
      "@/content/tech-registry"
    );
    expect(getTech("python")?.name).toBe("Python");
    expect(() => requireTech("not-a-real-tech")).toThrow(/Unknown technology/);
    expect(() =>
      assertTechStackRegistered(
        { data: ["not-a-real-tech"] },
        "test",
      ),
    ).toThrow(/not-a-real-tech/);
  });
});

describe("malformed content and article relationships", () => {
  let tempRoot: string;
  const originalCwd = process.cwd();

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-content-"));
    fs.mkdirSync(path.join(tempRoot, "content", "projects"), { recursive: true });
    // Minimal required root files for validateAllContent when we point CONTENT_ROOT
    // Tests that need isolation re-import after mocking cwd + writing fixtures.
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tempRoot, { recursive: true, force: true });
    vi.resetModules();
  });

  it("fails clearly when project frontmatter is invalid", async () => {
    const projectDir = path.join(
      tempRoot,
      "content",
      "projects",
      "bad-project",
    );
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(
      path.join(projectDir, "project.md"),
      `---
slug: bad-project
title: Bad
status: not-a-valid-status
---
`,
    );

    // Write minimal other required files so only project parse fails when loading project
    writeMinimalSiteFiles(tempRoot);

    process.chdir(tempRoot);
    vi.resetModules();
    const { getProject } = await import("@/content/loader");
    expect(() => getProject("bad-project")).toThrow(/Invalid content frontmatter/);
  });

  it("fails when article project slug does not match folder", async () => {
    writeMinimalSiteFiles(tempRoot);
    const projectDir = path.join(
      tempRoot,
      "content",
      "projects",
      "good-project",
    );
    fs.mkdirSync(path.join(projectDir, "articles"), { recursive: true });
    fs.writeFileSync(
      path.join(projectDir, "project.md"),
      `---
slug: good-project
title: Good
status: planned
featured: false
---
`,
    );
    fs.writeFileSync(
      path.join(projectDir, "articles", "insight.md"),
      `---
slug: insight
title: Insight
project: other-project
status: draft
---
Body
`,
    );

    process.chdir(tempRoot);
    vi.resetModules();
    const { getArticle } = await import("@/content/loader");
    expect(() => getArticle("good-project", "insight")).toThrow(
      /Article project mismatch/,
    );
  });

  it("discovers articles and enforces slug consistency", async () => {
    writeMinimalSiteFiles(tempRoot);
    const projectDir = path.join(
      tempRoot,
      "content",
      "projects",
      "linked-project",
    );
    fs.mkdirSync(path.join(projectDir, "articles"), { recursive: true });
    fs.writeFileSync(
      path.join(projectDir, "project.md"),
      `---
slug: linked-project
title: Linked
status: completed
featured: true
---
`,
    );
    fs.writeFileSync(
      path.join(projectDir, "articles", "notes.md"),
      `---
slug: notes
title: Notes
project: linked-project
status: published
date: "2026-01-01"
---
Observed notes only.
`,
    );

    process.chdir(tempRoot);
    vi.resetModules();
    const { getProject, getArticlesForProject } = await import("@/content/loader");
    const project = getProject("linked-project");
    expect(project.articleSlugs).toEqual(["notes"]);
    expect(project.data.featured).toBe(true);
    const articles = getArticlesForProject("linked-project");
    expect(articles).toHaveLength(1);
    expect(articles[0]?.data.project).toBe("linked-project");
  });
});

function writeMinimalSiteFiles(root: string) {
  const content = path.join(root, "content");
  fs.mkdirSync(path.join(content, "updates"), { recursive: true });
  const stubs: Record<string, string> = {
    "profile.md": "---\nheadline: Test\n---\n",
    "experience.md": "---\nentries: []\n---\n",
    "education.md": "---\nentries: []\n---\n",
    "skills.md": "---\ngroups: []\n---\n",
    "site.md": '---\ntitle: Test Site\nlanguage: en\n---\n',
    "currently.md":
      "---\nbuilding: []\nexploring: []\nlearning: []\nnext: []\n---\n",
  };
  for (const [name, body] of Object.entries(stubs)) {
    fs.writeFileSync(path.join(content, name), body);
  }
}
