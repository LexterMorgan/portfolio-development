#!/usr/bin/env tsx
/**
 * Validates all content files. Exit 1 on failure.
 */
import { validateAllContent } from "../src/content/loader";

try {
  const result = validateAllContent();
  console.log("Content validation passed.");
  console.log(
    `projects=${result.projects} articles=${result.articles} updates=${result.updates}`,
  );
  process.exit(0);
} catch (error) {
  console.error("Content validation failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
