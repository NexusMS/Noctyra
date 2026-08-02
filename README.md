# Noctyra

Official website for **Noctyra** — a premium gaming organization.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step.

---

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Markup      | HTML5 (semantic)                    |
| Styles      | CSS3 (custom properties, mobile-first) |
| Scripts     | Vanilla JavaScript (ES6 modules)    |
| Fonts       | Poppins (headings), Inter (body)    |

---

## Project Structure

```
/
├── index.html              # Entry HTML document
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   ├── reset.css           # Cross-browser CSS reset
│   ├── global.css          # Base typography, layout utilities
│   ├── animations.css      # Keyframes and animation utilities
│   ├── components.css      # Shared UI components (buttons, nav, cards)
│   └── home.css            # Homepage-specific styles
├── js/
│   ├── main.js             # Application entry point
│   ├── navbar.js           # Navigation and mobile menu logic
│   ├── animations.js       # Scroll-triggered reveal animations
│   └── loading.js          # Initial page load screen
├── assets/
│   ├── logo/               # Brand logo files
│   ├── images/             # General images
│   ├── icons/              # Icon assets
│   └── screenshots/        # Screenshots and media captures
├── favicon/                # Favicon and app icons
└── README.md
```

---

## CSS Architecture

Styles load in a strict order defined in `index.html`:

1. **variables.css** — Design tokens. Never contains selectors beyond `:root`.
2. **reset.css** — Normalizes browser defaults.
3. **global.css** — Document-level typography, containers, utilities.
4. **animations.css** — Keyframes and `[data-animate]` reveal system.
5. **components.css** — Reusable UI patterns shared across pages.
6. **home.css** — Page-specific styles (one file per page as the site grows).

### Adding a New Page

1. Create `about.html` (or any page) using `index.html` as a template.
2. Add a new CSS file: `css/about.css`.
3. Link it in the new HTML file after `components.css`.
4. Add navigation links in the header and mobile nav.

---

## JavaScript Architecture

All scripts use **ES6 modules** loaded via `<script type="module">`.

| Module          | Responsibility                                      |
| --------------- | --------------------------------------------------- |
| `main.js`       | Bootstraps the app, imports and initializes modules |
| `navbar.js`     | Mobile menu toggle, active link state, keyboard nav |
| `animations.js` | Intersection Observer scroll reveals                |
| `loading.js`    | Initial load screen with minimum display time       |

### Adding a New Module

1. Create `js/my-module.js` and export an `initMyModule()` function.
2. Import and call it from `main.js`.

---

## Design Tokens

All colors, spacing, typography, and breakpoints live in `css/variables.css`.

| Token              | Value     |
| ------------------ | --------- |
| Background         | `#09090B` |
| Surface            | `#111827` |
| Primary            | `#7C3AED` |
| Secondary          | `#A78BFA` |
| Text               | `#F8FAFC` |
| Muted Text         | `#9CA3AF` |
| Border             | `#27272A` |

---

## Responsive Breakpoints

| Name    | Min Width |
| ------- | --------- |
| Mobile  | default   |
| Tablet  | 768px     |
| Desktop | 1024px    |

All layouts are mobile-first. Media queries use `min-width`.

---

## Development

No build tools required. Open `index.html` in a browser or serve locally:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

> ES6 modules require a local server — opening `index.html` directly via `file://` will not work.

---

## Accessibility

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`)
- Skip-to-content link
- ARIA labels on interactive elements
- Keyboard navigation (Escape closes mobile menu)
- `prefers-reduced-motion` respected globally
- Focus-visible outlines on all interactive elements

---

## Performance

- Minimal JavaScript — only what is needed
- CSS split by concern for maintainability
- Google Fonts loaded with `display=swap`
- Images should use `loading="lazy"` when added
- No unnecessary animations or effects

---

## License

All rights reserved. Noctyra © 2026.
