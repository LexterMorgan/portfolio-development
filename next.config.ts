import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // File-based content under /content is read at build time.
  // Keep the site statically deployable on Vercel.
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
