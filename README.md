# Beau Cosmetics — Lipstick Shop

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
