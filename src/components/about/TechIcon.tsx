import {
  siGit,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siR,
  siReact,
  siScikitlearn,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from "simple-icons";

/**
 * Official Simple Icons brand marks, keyed by content tech id.
 * Hex values come verbatim from simple-icons@16.36.0.
 */
const BRAND: Record<string, SimpleIcon> = {
  python: siPython,
  r: siR,
  typescript: siTypescript,
  pandas: siPandas,
  numpy: siNumpy,
  scikitlearn: siScikitlearn,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  react: siReact,
  nextjs: siNextdotjs,
  vite: siVite,
  git: siGit,
  vercel: siVercel,
};

/**
 * simple-icons 16.36.0 has no mark for these ids. Neutral glyphs only —
 * never a stand-in from another brand.
 */
const FALLBACKS: Record<string, "database" | "bars" | "table" | "line"> = {
  sql: "database",
  powerbi: "bars",
  tableau: "bars",
  excel: "table",
  matplotlib: "line",
  lookerstudio: "bars",
  recharts: "bars",
};

function Glyph({ kind }: { kind: "database" | "bars" | "table" | "line" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  if (kind === "database") {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" />
        <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
        <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
      </svg>
    );
  }
  if (kind === "table") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="14" rx="1.6" />
        <path d="M4 10h16M4 14.5h16M10 5v14M15 5v14" />
      </svg>
    );
  }
  if (kind === "line") {
    return (
      <svg {...common}>
        <path d="M4 19h16" />
        <path d="M6 16l4-5 3 3 5-7" />
        <path d="M15 7h3v3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20v-10M17 20v-4" />
    </svg>
  );
}

export function TechIcon({ id }: { id: string }) {
  const icon = BRAND[id];
  if (icon) {
    return (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable={false}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={icon.path} fill={`#${icon.hex}`} />
      </svg>
    );
  }
  const kind = FALLBACKS[id];
  return kind ? <Glyph kind={kind} /> : null;
}
