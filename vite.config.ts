import { defineConfig, type Plugin } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import seo from "./src/seo.json";

const escapeAttr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Swaps the content of one head tag, matched by its identifying attribute. */
function setTag(html: string, match: string, attribute: "content" | "href", value: string) {
  const pattern = new RegExp(`(<(?:meta|link) ${match} ${attribute}=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function pageHtml(template: string, path: string, meta: { title: string, description: string }, robots?: string) {
  const url = `${seo.site.url}${path}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  html = setTag(html, 'name="description"', "content", meta.description);
  html = setTag(html, 'rel="canonical"', "href", url);
  html = setTag(html, 'property="og:url"', "content", url);
  html = setTag(html, 'property="og:title"', "content", meta.title);
  html = setTag(html, 'property="og:description"', "content", meta.description);
  html = setTag(html, 'name="twitter:url"', "content", url);
  html = setTag(html, 'name="twitter:title"', "content", meta.title);
  html = setTag(html, 'name="twitter:description"', "content", meta.description);
  if (robots) html = setTag(html, 'name="robots"', "content", robots);
  return html;
}

/**
 * GitHub Pages has no SPA routing, so after the build each route gets its own HTML file
 * (shop.html etc., served with HTTP 200 and the right title, description and canonical), unknown paths fall back to a
 * noindex 404.html that still loads the app, and sitemap.xml / robots.txt are generated from src/seo.json.
 */
function staticSeo(): Plugin {
  let outDir = "dist";
  return {
    name: "beau-static-seo",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const template = readFileSync(join(outDir, "index.html"), "utf8");
      const today = new Date().toISOString().slice(0, 10);
      const sitemap: string[] = [];

      for (const [path, meta] of Object.entries(seo.routes) as Array<[string, { title: string, description: string, noindex?: boolean, priority?: number }]>) {
        const html = pageHtml(template, path === "/" ? "/" : path, meta, meta.noindex ? "noindex, follow" : undefined);
        // shop.html rather than shop/index.html: GitHub Pages serves /shop from it directly, without a redirect to /shop/.
        const file = path === "/" ? join(outDir, "index.html") : join(outDir, `${path}.html`);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
        if (!meta.noindex) {
          sitemap.push(`  <url>\n    <loc>${seo.site.url}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${(meta.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`);
        }
      }

      const notFound = pageHtml(template, "/", seo.notFound, "noindex, follow").replace(/\s*<link rel="canonical"[^>]*>/, "");
      writeFileSync(join(outDir, "404.html"), notFound);
      writeFileSync(join(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.join("\n")}\n</urlset>\n`);
      writeFileSync(join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /checkout\n\nSitemap: ${seo.site.url}/sitemap.xml\n`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    staticSeo(),
  ],
})
