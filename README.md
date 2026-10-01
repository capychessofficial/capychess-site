# CapyChess website

A static, five-page site with one shared layout. It uses Node.js for local preview and page generation, with no package dependencies.

## Structure

- `src/layout.html` — shared document, header, navigation, and footer
- `src/pages/` — page content for Home, Services, Curriculum, Teachers, and About Us
- `assets/styles.css` — shared styling
- `assets/main.js` — page interactions
- `assets/` — named images and fonts
- `build.cjs` — generates the finished site in `dist/`
- `preview.cjs` — serves the site, rebuilds templates on edit, and refreshes the browser

## Run

From this folder, run `npm run dev`, then open <http://127.0.0.1:4173>.

Edit `src/layout.html` for changes shared across pages. Edit `src/pages/*.html` for page content. Changes to templates and assets refresh automatically. Run `npm run build` before uploading to any static host. The `dist/` folder is generated and ignored by Git. Publish the contents of `dist/`; no server-side runtime is needed after build.

## GitHub Pages

Pushes to `main` build and deploy `dist/` through `.github/workflows/deploy-pages.yml`. In **Settings → Pages**, set the build and deployment source to **GitHub Actions**.

## URLs

The build writes each page to a folder with an `index.html`, so GitHub Pages serves `/services/`, `/teachers/`, `/curriculum/`, and `/about/`. Legacy `.html` URLs redirect to the new paths.
