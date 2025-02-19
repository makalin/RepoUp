# RepoUp

A modern, feature-rich GitHub repository dashboard that automatically updates daily. Built with React and Tailwind CSS, this project provides an elegant way to showcase your GitHub repositories with advanced filtering, searching, and viewing capabilities.

![RepoUp](https://raw.githubusercontent.com/makalin/repoup/main/preview.png)

## ✨ Features

- 🌓 **Dark/Light Theme** - Toggle between dark and light modes for comfortable viewing
- 🔍 **Smart Search** - Search through repositories by name and description
- 🏷️ **Language Filtering** - Filter repositories by programming language
- 📊 **Detailed Views** - Click any repository to see detailed statistics and information
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Auto-Updates** - Automatically updates repository data daily
- 📄 **Pagination** - Easily navigate through your repositories
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds

## 🚀 Live Demo

Visit the live demo: [https://makalin.github.io/repoup](https://makalin.github.io/repoup)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/makalin/repoup.git
cd repoup
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure the application**
- Open `src/components/GitHubReposViewer.jsx`
- Change the `username` constant to your GitHub username:
```javascript
const username = 'your-username';
```

4. **Start the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🔧 Technologies Used

- ⚛️ React
- 🎨 Tailwind CSS
- 💅 shadcn/ui Components
- 📦 Vite
- 🔄 GitHub Actions
- 🌐 GitHub Pages

## 📖 Usage

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Customization

#### Changing Theme Colors
Edit the `tailwind.config.js` file to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...}
    }
  }
}
```

#### Modifying Repository Display
Adjust the repositories per page in `GitHubReposViewer.jsx`:

```javascript
const reposPerPage = 6; // Change this number
```

## 🔄 Automatic Updates

The repository data automatically updates daily at midnight UTC through GitHub Actions. To modify the update schedule, edit `.github/workflows/deploy.yml`:

```yaml
schedule:
  - cron: '0 0 * * *' # Runs at 00:00 UTC every day
```

### GitHub Pages Deployment

1. In your repository settings, enable GitHub Pages
2. Set the build and deployment source to "GitHub Actions"
3. The site will be available at `https://[username].github.io/repoup`

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints at:
- Mobile: 640px
- Tablet: 768px
- Desktop: 1024px

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [GitHub API](https://docs.github.com/en/rest)
- [Lucide Icons](https://lucide.dev/)

## 📞 Support

For support, please open an issue in the GitHub repository or contact me directly at:
- GitHub: [@makalin](https://github.com/makalin)

## 🚀 Roadmap

- [ ] Add repository statistics charts
- [ ] Implement repository README preview
- [ ] Add commit history visualization
- [ ] Include contributor statistics
- [ ] Add repository activity timeline
- [ ] Implement repository comparison feature

---

Made with ❤️ by [makalin](https://github.com/makalin)