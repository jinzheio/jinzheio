import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_BASE_URL = 'https://jinzhe.io';

type Args = {
  baseUrl: string;
  from: string;
  to: string;
  outFile: string;
};

const ALL_PUBLIC_ROUTES = [
  '/',
  '/ludic-systems/',
  '/philosophy/',
  '/projects/',
  '/projects/clawsimple/',
  '/projects/commanddeck/',
];

const DIRECT_ROUTE_MAP = new Map<string, string[]>([
  ['src/pages/index.astro', ['/']],
  ['src/pages/ludic-systems.astro', ['/ludic-systems/']],
  ['src/pages/philosophy.astro', ['/philosophy/']],
  ['src/pages/projects/index.astro', ['/projects/']],
  ['src/pages/projects/commanddeck.astro', ['/projects/commanddeck/']],
  ['src/views/HomePage.tsx', ['/']],
  ['src/views/LudicSystemsPage.tsx', ['/ludic-systems/']],
  ['src/views/PhilosophyPage.tsx', ['/philosophy/']],
  ['src/views/ProjectsPage.tsx', ['/projects/']],
  ['src/views/ProjectPage.tsx', ['/projects/clawsimple/', '/projects/commanddeck/']],
  ['src/views/CommandDeckPage.tsx', ['/projects/commanddeck/']],
  ['src/components/philosophy-accordion.tsx', ['/philosophy/']],
]);

const GLOBAL_PATTERNS = [
  /^astro\.config\.mjs$/,
  /^messages\/en\.json$/,
  /^public\/_redirects$/,
  /^src\/components\/site-/,
  /^src\/content\/site-copy\.ts$/,
  /^src\/layouts\//,
  /^src\/styles\//,
  /^src\/pages\/projects\/\[slug\]\.astro$/,
];

const BLOG_CONTENT_RE = /^src\/content\/blog\/(.+)\.(md|mdx)$/;
const CONTENT_CONFIG_RE = /^src\/content\.config\.ts$/;

function parseArgs(argv: string[]): Args {
  let baseUrl = DEFAULT_BASE_URL;
  let from = '';
  let to = 'HEAD';
  let outFile = '';

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--base-url') {
      baseUrl = argv[i + 1] ?? baseUrl;
      i += 1;
      continue;
    }

    if (arg === '--from') {
      from = argv[i + 1] ?? '';
      i += 1;
      continue;
    }

    if (arg === '--to') {
      to = argv[i + 1] ?? to;
      i += 1;
      continue;
    }

    if (arg === '--out-file') {
      outFile = argv[i + 1] ?? '';
      i += 1;
    }
  }

  if (!from) {
    throw new Error('Missing required arg: --from <git-ref>');
  }

  if (!outFile) {
    throw new Error('Missing required arg: --out-file <path>');
  }

  return { baseUrl, from, to, outFile };
}

function listChangedFiles(from: string, to: string): string[] {
  const output = execFileSync('git', ['diff', '--name-only', `${from}..${to}`], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function addUrl(urls: Set<string>, baseUrl: string, route: string) {
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  urls.add(route === '/' ? `${normalizedBase}/` : `${normalizedBase}${route.replace(/^\/?/, '/')}`);
}

function collectUrls(baseUrl: string, changedFiles: string[]): string[] {
  const urls = new Set<string>();

  for (const filePath of changedFiles) {
    if (filePath.startsWith('scripts/')) continue;
    if (filePath.startsWith('docs/')) continue;
    if (filePath.startsWith('.github/')) continue;
    if (filePath.startsWith('src/pages/api/')) continue;

    const directRoutes = DIRECT_ROUTE_MAP.get(filePath);
    if (directRoutes) {
      for (const route of directRoutes) addUrl(urls, baseUrl, route);
      continue;
    }

    const blogMatch = filePath.match(BLOG_CONTENT_RE);
    if (blogMatch) {
      addUrl(urls, baseUrl, `/blog/${blogMatch[1]}/`);
      addUrl(urls, baseUrl, '/blog/');
      continue;
    }

    if (CONTENT_CONFIG_RE.test(filePath)) {
      addUrl(urls, baseUrl, '/blog/');
      continue;
    }

    if (GLOBAL_PATTERNS.some((pattern) => pattern.test(filePath))) {
      for (const route of ALL_PUBLIC_ROUTES) addUrl(urls, baseUrl, route);
    }
  }

  return Array.from(urls).sort();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const changedFiles = listChangedFiles(args.from, args.to);
  const urls = collectUrls(args.baseUrl, changedFiles);
  const outPath = path.resolve(args.outFile);

  await writeFile(outPath, urls.join('\n') + (urls.length > 0 ? '\n' : ''), 'utf8');

  console.log(
    JSON.stringify(
      {
        ok: true,
        from: args.from,
        to: args.to,
        changedFiles: changedFiles.length,
        urls: urls.length,
        outFile: outPath,
      },
      null,
      2,
    ),
  );
}

void main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
