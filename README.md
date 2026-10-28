# beau

beau (written be•au) is a lipstick shop website for a fictional cosmetics brand based in Manukau, Auckland. It was built as a UI/UX project, so there is no real backend: products, orders and affiliates come from local JSON files, and checkout is a demo.

Live site: **https://beau.dustindwayn.ee**

By Diaz, D D N. and Sanglap, L D D.

## Pages

| Page | Path | What it does |
|---|---|---|
| Home | `/` | Carousel, featured collection, shop by finish, Shade Finder and Jinny promos |
| Shop | `/shop` | Every product, filtered and sorted through the URL |
| Collections | `/collections` | The five collections and what is in each |
| Shade Finder | `/shade-finder` | Four-question quiz that recommends a shade |
| Sale | `/sale` | Products grouped by price |
| About | `/about` | Story, mission, values and studio |
| Affiliate | `/affiliate` | The affiliate programme and current affiliates |
| Apply | `/affiliate/apply` | Three-step affiliate application form |
| Store Locator | `/store-locator` | Boutique list with opening hours and a map |
| Customer Service | `/customer-service` | Searchable FAQs |
| Order Status | `/order-status` | Order tracking by order number and email |
| Contact | `/contact` | Contact form |
| Checkout | `/checkout` | Bag review and demo payment |
| Policies | `/refund-policy`, `/privacy-policy`, `/terms-and-conditions` | Legal pages |

## Shop URLs

The Shop keeps its state in the address bar, so any view can be shared or bookmarked:

```
/shop?collections=sun-goddess&finish=matte&sort=price-desc&page=2
```

- `collections`: a collection slug, such as `winter-garden` or `thorns-and-roses`
- `finish`: `matte`, `satin` or `glossy`
- `sort`: `featured`, `name`, `name-desc`, `price`, `price-desc`, `newest` or `oldest`
- `page`: the page number

## Data

All data lives in `src/`:

- `productList.json`: products grouped by collection
- `orderList.json`: sample orders for Order Status and Jinny. Try `BEAU-1024` with `ava@dustindwayn.ee`.
- `affiliateList.json`: affiliates shown on the Affiliate page
- `seo.json`: the title and description for every page, used for meta tags, the sitemap and robots.txt

The cart is saved in the browser's local storage.

## Jinny, the shopping assistant

Jinny is the chat button in the bottom-right corner. She can search products, add them to the cart, open pages, track sample orders and answer store questions.

She runs on [Groq](https://groq.com), with Google Gemini as a fallback, through a Cloudflare Worker in `jinny-worker/`. The Worker holds the API keys, so they never reach the browser. If the Worker can't be reached, Jinny switches to an offline mode that uses keyword search and set answers.

### Deploying the Worker

```bash
cd jinny-worker
npx wrangler login
npx wrangler secret put GROQ_API_KEY     # from console.groq.com
npx wrangler secret put GEMINI_API_KEY   # from aistudio.google.com
npx wrangler deploy                      # prints the Worker URL
```

Either key works on its own. The models and allowed origins are set in `jinny-worker/wrangler.toml`.

### Connecting the site to the Worker

- **GitHub Pages:** add a repository variable named `JINNY_API_URL` with the Worker URL (Settings, then Secrets and variables, then Actions, then Variables).
- **Local development:** create `.env.local` with `VITE_JINNY_API_URL=<your Worker URL>`. The file is git-ignored.

Never commit API keys. The Worker URL is public; the keys only exist as Worker secrets.

## Running locally

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev       # development server at http://localhost:5173
bun run build     # type-check and build to dist/
bun run preview   # serve the build at http://localhost:4173
bun run lint
```

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yaml`), served at `beau.dustindwayn.ee`.

GitHub Pages has no routing for single-page apps, so the build step in `vite.config.ts` also writes:

- an HTML file for each page (such as `shop.html`), so every URL loads directly with its own title and description
- `404.html` for unknown URLs
- `sitemap.xml` and `robots.txt`

## Tech stack

- React 19 with the React Compiler, and React Router 7
- TypeScript
- Vite 8 and Bun
- Tailwind CSS 4
- Splide for carousels
- Cloudflare Workers for Jinny

## Project structure

```
public/
  assets/          images: brand, hero banners, products, sections, finishes, icons
  CNAME            custom domain for GitHub Pages
  site.webmanifest
src/
  components/      shared UI: navbar, footer, cart, product card, Jinny chat
  pages/           one file per page
  fonts/
  *.json           products, orders, affiliates and page metadata
  cartData.tsx     cart state and local storage
  jinny.ts         Jinny's tools, offline mode and API calls
  hooks.ts         shared hooks, including scroll reveal
  routes.ts        lazy-loaded pages
  style.css        theme colours, fonts and animations
jinny-worker/      Cloudflare Worker for Jinny
index.html         page shell, meta tags and structured data
vite.config.ts     build config, including the SEO build step
```
