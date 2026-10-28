# Beau Cosmetics

Welcome to the official repository for **Beau**, a premium lipstick cosmetic shop based in Manukau City, Auckland. This platform is a modern, blazing-fast web application designed to showcase and manage lipstick products seamlessly. 

Built using **React** and **TypeScript**, the project leverages **Bun** as its primary runtime and package manager for high-performance development and bundling.

---

## 🚀 Features

* **Localized Experience:** Designed specifically for the Beau's storefront in Manukau City, Auckland.
* **Dynamic Product Feed:** Products are dynamically loaded and structured via a local `productlist.json` data matrix.
* **Interactive Cart Sidebar:** A state-driven sliding sidebar equipped with native fluid entry/exit micro-animations (shrink and fade on product removal).
* **Advanced Sorting System:** Features a custom, multi-criteria array sorting utility (`sortArray`) supporting:
    * `alphabet`: A-Z sorting based on product names.
    * `amount`: Prioritizes items by quantity.
    * `latest`: Reverses insertion order to show new items first.
    * `random`: A deterministic "scrambled" state utilizing custom string-hashing algorithms to prevent unwanted reshuffling during re-renders.

---

## 🛠️ Technological Stack & Architecture

### Core Runtime & Tooling
* **Bun:** Used as a faster, all-in-one replacement for Node.js, npm, and traditional bundlers. Handles dependency resolution, execution, and final production compilation.
* **TypeScript:** Strict static typing ensuring component interface safety, clear domain models (`ProductData`, `CartList`), and robust error checking.
* **React:** Functional component architecture leveraging specialized React Hooks (`useState`, `useEffect`, Custom Hooks) to maintain decentralized, synchronized cart states.

### Styling & Animation
* **Tailwind CSS:** A utility-first styling workflow using modern layout attributes (`w-dvw`, `flex-nowrap`) coupled with transition triggers (`transition-all duration-300`) to execute native-feeling UI animations entirely within class declarations.

---

## 📦 Package Dependencies

The project relies on a minimal, highly optimized dependency tree managed cleanly inside `package.json`:

### Dependencies
* `react`: Core UI rendering engine.
* `react-dom`: Entry point for browser DOM rendering.

### Dev Dependencies
* `typescript`: Type checking and language services.
* `tailwindcss`: Utility-first CSS processing.
* `postcss` / `autoprefixer`: Stylesheet optimization pipelines.
* `@types/react` / `@types/react-dom`: Explicit Type Definitions.

---

## Jinny: AI Shopping Assistant

Jinny is the chat assistant behind the chat button in the bottom-right corner. She can search the catalogue (`productList.json`), add products to the cart, open pages, and answer store FAQs. She runs on [Groq](https://groq.com), with Google Gemini (AI Studio) as a fallback, through a small Cloudflare Worker (`jinny-worker/`), so the API keys never reach the browser.

Without a configured Worker, Jinny runs in **offline mode**: she uses simple keyword search and canned FAQ answers, all in the browser.

### 1. Deploy the Worker (one-time)

```bash
cd jinny-worker
npx wrangler login
npx wrangler secret put GROQ_API_KEY     # primary: Groq key (console.groq.com)
npx wrangler secret put GEMINI_API_KEY   # fallback: Google AI Studio key (aistudio.google.com)
npx wrangler deploy                      # prints the Worker URL
```

If Groq fails for any reason (rate limit, outage, bad key, retired model), the Worker retries the same request on Gemini. Either key also works on its own. Models (`GROQ_MODEL`, `GEMINI_MODEL`) and allowed origins are set in `jinny-worker/wrangler.toml`.

### 2. Point the site at the Worker

* **GitHub Pages:** in the repo, go to *Settings → Secrets and variables → Actions → Variables* and add `JINNY_API_URL` = your Worker URL. The deploy workflow passes it to the build.
* **Local dev:** create `.env.local` (git-ignored) containing `VITE_JINNY_API_URL=https://jinny-proxy.<your-subdomain>.workers.dev`.

> Never commit API keys. The Worker URL is public and safe to share; the API keys exist only as Worker secrets.

---

## ⚙️ Installation & Setup

├── public/

├── src/

│   ├── assets/

│   ├── components/

│   ├── fonts/

│   ├── pages/

│   └── cartData.tsx

│   └── constants.tsx

│   └── main.tsx

│   └── routes.ts

│   └── style.css

│   └── types.ts

├── .gitignore

├── package.json

├── tsconfig.app.json

├── tsconfig.json

└── index.html
