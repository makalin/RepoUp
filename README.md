# RepoUp Pro

A modern, feature-rich GitHub repository dashboard for showcasing and managing your repos. Built with React and Tailwind CSS, with list/grid views, sorting, filtering, export tools, and full dark mode support.

![RepoUp](https://raw.githubusercontent.com/makalin/repoup/main/preview.png)

## ✨ Features

### Views & layout
- **Grid view** – Card layout with repo name, description, language, stars, and forks
- **List view** – Compact table with sortable columns (repository, language, stars, forks, updated)
- **Sort options** – Name A–Z, Name Z–A, Stars (popularity), Forks, Last updated
- **Pagination** – Navigate through filtered results (6 repos per page)

### Search & filters
- **Search** – By repository name or description
- **Language filter** – Dropdown of all languages used in your repos
- **Show archived** – Toggle to include or hide archived repositories

### Data & export
- **Load all repos** – Fetches every page from the GitHub API (when you have 100+ repos)
- **Copy URLs** – Copy all filtered repo URLs to the clipboard
- **Export CSV** – Download name, description, language, stars, forks, URL, updated date
- **Export JSON** – Download the same data as structured JSON
- **Refresh** – Re-fetch repositories from the API

### Design & UX
- **Dark / light theme** – Toggle with correct contrast for inputs, buttons, and text in both modes
- **Sticky header** – RepoUp Pro branding stays visible while scrolling
- **Responsive** – Works on desktop, tablet, and mobile; list view columns adapt to screen size
- **Indigo accent** – Consistent primary color and hover states

### Performance
- **Vite** – Fast dev server and optimized production builds
- **GitHub API** – Fetches up to 100 repos per request; “Load all” paginates automatically

## 🚀 Live Demo

[https://makalin.github.io/RepoUp](https://makalin.github.io/RepoUp)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/makalin/RepoUp.git
   cd RepoUp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your username**
   - Open `src/components/GitHubReposViewer.jsx`
   - Set the `username` constant to your GitHub username:
   ```javascript
   const username = 'your-username';
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open the URL shown (e.g. `http://localhost:5173`). Use a hard refresh (Cmd+Shift+R / Ctrl+Shift+R) if you don’t see the latest UI.

5. **Build for production**
   ```bash
   npm run build
   ```
   Output is in the `dist/` folder.

## 🔧 Technologies Used

- **React** – UI components and state
- **Tailwind CSS** – Styling and dark mode (class-based)
- **Vite** – Build tool and dev server
- **Lucide React** – Icons
- **GitHub REST API** – Repository data
- **GitHub Actions** – Optional daily deploy / cache refresh
- **GitHub Pages** – Optional hosting

## 📖 Usage

### Local development
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run preview # Preview production build locally
```

### Customization

**Repos per page**  
In `src/components/GitHubReposViewer.jsx`:
```javascript
const reposPerPage = 6; // Change as needed
```

**Theme colors**  
Edit `src/index.css` for light/dark backgrounds and primary accent:
- `:root` – light mode (`--background`, `--foreground`, `--primary`, `--primary-foreground` use RGB values)
- `.dark` – dark mode overrides

`tailwind.config.js` maps these to Tailwind utilities (`bg-background`, `text-foreground`, `bg-primary`, etc.).

## 🔄 Automatic updates (optional)

If you use GitHub Actions for deployment, repository data can be refreshed on a schedule. Example in `.github/workflows/deploy.yml`:

```yaml
schedule:
  - cron: '0 0 * * *' # 00:00 UTC daily
```

### GitHub Pages deployment

The workflow builds the app and pushes the **built** files (from `dist/`) to the `gh-pages` branch. For the site to load correctly:

1. In the repo: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to **gh-pages** and **Folder** to **/ (root)**. Save.
4. Push to `main` (or run the “Deploy to GitHub Pages” workflow from the Actions tab). The workflow will build and update `gh-pages`.
5. The site will be at `https://[username].github.io/RepoUp/`.

**Important:** The branch **must** be **gh-pages**, not `main`. If you use `main`, the server will serve the raw source. The browser will then request `/src/main.jsx`, get a 404 HTML page, and show *“Loading module was blocked because of a disallowed MIME type (text/html)”* — the app won’t run. After switching to the `gh-pages` branch, do a hard refresh (Cmd+Shift+R or Ctrl+Shift+R) on the live URL.

## 📱 Responsiveness

- **Mobile** – Single column grid; list view shows key columns; toolbar stacks.
- **Tablet / desktop** – Multi-column grid; full list table; inline filters and export buttons.

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## 📜 License

MIT – see [LICENSE](LICENSE).

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)
- [GitHub API](https://docs.github.com/en/rest)

## 📞 Support

- Open an issue in this repository
- GitHub: [@makalin](https://github.com/makalin)

## 🚀 Roadmap

- [ ] Repository statistics charts
- [ ] README preview in modal or panel
- [ ] Commit history or activity timeline
- [ ] Contributor stats
- [ ] Compare two repositories

---

Made with ❤️ by [makalin](https://github.com/makalin)
