# Vedant Singh — Personal Portfolio & Engineering Showcase

A clean, responsive, dependency-free static portfolio and production engineering showcase hosted at [sshconnect.space](https://sshconnect.space).

## Features
- **Design System**: Brutalist, high-contrast aesthetic with off-white canvas, stark typography (`Syne` & `Plus Jakarta Sans`), and electric blue accents (`#0038ff`).
- **Live Projects Section**: Responsive Bento Grid showcasing active deployments like **Word to HTML 1.0** ([wordtohtml1.0.sshconnect.space](https://wordtohtml1.0.sshconnect.space)) with full-card hover color inversion.
- **Delayed Slide-in Notification**: Fixed bottom-right brutalist toast notification triggering at 3.5s with audio alert and `sessionStorage` single-session persistence.
- **Responsive Architecture**: Fluid layouts, responsive typography (`clamp()`), and touch-optimized navigation (mobile hamburger drawer) tested across all standard viewport breakpoints (320px to 1440px+).
- **Zero Build Dependencies**: Pure HTML5, CSS3, and modern vanilla JavaScript.

## Preview Locally
Run Python's built-in static server inside this directory:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Cloudflare Pages Deployment
This project is pre-configured for direct deployment on **Cloudflare Pages**:
1. Connect this repository (`https://github.com/vineetvedant/my-portfolio.git`).
2. Set **Framework preset**: `None`.
3. Set **Build command**: Leave blank.
4. Set **Build output directory**: `/` (root directory).
5. Deploy! Cloudflare Pages will automatically serve `index.html`, handle custom headers from `_headers`, and route error pages to `404.html`.

## Project Structure
- `index.html`: Semantic markup and section structure.
- `styles.css`: Complete design system, Bento grid, and responsive rules.
- `script.js`: Interactive carousel, floating nav scroll-spy, time-loop reel, and delayed toast notification.
- `assets/`: Optimized images, background video loops, resume PDF, and audio assets.
- `_headers`: Cloudflare Pages security headers and asset caching policies.
- `404.html`: Custom brutalist 404 error page.
