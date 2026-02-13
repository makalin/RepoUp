import React, { useState, useEffect, useMemo } from 'react';
import {
  Moon,
  Sun,
  Search,
  LayoutGrid,
  List,
  Download,
  Copy,
  RefreshCw,
  Star,
  GitFork,
  Check,
  ExternalLink,
} from 'lucide-react';

const username = 'makalin'; // Change this to your GitHub username
const reposPerPage = 6;
const GITHUB_PER_PAGE = 100;

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'stars', label: 'Stars (popularity)' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Last updated' },
];

function GitHubReposViewer() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [showArchived, setShowArchived] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('stars');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [copySuccess, setCopySuccess] = useState(null);
  const [exportSuccess, setExportSuccess] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const fetchRepos = async (loadAll = false) => {
    try {
      setLoading(true);
      setError(null);
      if (loadAll) setLoadingAll(true);

      const allRepos = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${GITHUB_PER_PAGE}&page=${page}`
        );
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        allRepos.push(...data);
        hasMore = data.length === GITHUB_PER_PAGE;
        page++;
        if (!loadAll) break; // first page only when not loading all
      }

      setRepos(allRepos);
    } catch (err) {
      console.error('Error fetching repos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const languages = useMemo(
    () => ['All', ...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos]
  );

  const filteredRepos = useMemo(() => {
    let list = repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
      const matchesArchived = showArchived || !repo.archived;
      return matchesSearch && matchesLanguage && matchesArchived;
    });

    const order = sortBy;
    list = [...list].sort((a, b) => {
      if (order === 'name-asc') return (a.name || '').localeCompare(b.name || '');
      if (order === 'name-desc') return (b.name || '').localeCompare(a.name || '');
      if (order === 'stars') return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      if (order === 'forks') return (b.forks_count || 0) - (a.forks_count || 0);
      if (order === 'updated')
        return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
      return 0;
    });
    return list;
  }, [repos, searchTerm, selectedLanguage, showArchived, sortBy]);

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);
  const currentRepos = filteredRepos.slice(
    (currentPage - 1) * reposPerPage,
    currentPage * reposPerPage
  );

  const copyAllUrls = () => {
    const urls = filteredRepos.map((r) => r.html_url).join('\n');
    navigator.clipboard.writeText(urls).then(() => {
      setCopySuccess('URLs copied!');
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  const exportCSV = () => {
    const headers = 'Name,Description,Language,Stars,Forks,URL,Updated\n';
    const rows = filteredRepos.map(
      (r) =>
        `"${(r.name || '').replace(/"/g, '""')}","${(r.description || '').replace(/"/g, '""')}",${r.language || ''},${r.stargazers_count || 0},${r.forks_count || 0},${r.html_url || ''},${r.updated_at || ''}`
    );
    const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${username}-repos.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportSuccess('CSV downloaded!');
    setTimeout(() => setExportSuccess(null), 2000);
  };

  const exportJSON = () => {
    const data = filteredRepos.map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      html_url: r.html_url,
      updated_at: r.updated_at,
      archived: r.archived,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${username}-repos.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportSuccess('JSON downloaded!');
    setTimeout(() => setExportSuccess(null), 2000);
  };

  const inputBase =
    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent';
  const buttonBase =
    'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600';
  const buttonPrimary = 'bg-primary text-primary-foreground hover:opacity-90';

  if (loading && repos.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-primary" size={40} />
          <p className="text-foreground">Loading repositories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200" data-repoup-version="2">
      <div className="space-y-6">
        {/* Top bar: theme + refresh */}
        <div className="flex justify-end gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl ${buttonBase} transition shadow-sm`}
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <button
            onClick={() => fetchRepos(false)}
            disabled={loading}
            className={`p-2.5 rounded-xl ${buttonBase} disabled:opacity-50 transition shadow-sm`}
            title="Refresh"
          >
            <RefreshCw size={22} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 text-foreground">
          <span className="text-sm font-medium">
            Total <strong className="text-primary">{repos.length}</strong> repos
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing <strong>{filteredRepos.length}</strong> after filters
          </span>
          {repos.length >= GITHUB_PER_PAGE && (
            <button
              onClick={() => fetchRepos(true)}
              disabled={loadingAll}
              className={`text-sm px-4 py-2 rounded-lg font-medium ${buttonPrimary} disabled:opacity-50`}
            >
              {loadingAll ? 'Loading all…' : 'Load all repos'}
            </button>
          )}
        </div>

        {/* Toolbar: search, filters, view */}
        <section className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Search & filters
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl ${inputBase}`}
                />
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`p-2.5 rounded-xl min-w-[140px] ${inputBase}`}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang || 'None'}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`p-2.5 rounded-xl min-w-[180px] ${inputBase}`}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? buttonPrimary : buttonBase}`}
                  title="Grid view"
                >
                  <LayoutGrid size={22} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? buttonPrimary : buttonBase}`}
                  title="List view"
                >
                  <List size={22} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-600">
              <label className="flex items-center gap-2 cursor-pointer text-foreground">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={(e) => setShowArchived(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600 text-primary bg-white dark:bg-gray-800"
                />
                <span className="text-sm">Show archived</span>
              </label>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Export</span>
              <button
                onClick={copyAllUrls}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${buttonBase}`}
              >
                <Copy size={16} />
                Copy URLs
              </button>
              <button
                onClick={exportCSV}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${buttonBase}`}
              >
                <Download size={16} />
                CSV
              </button>
              <button
                onClick={exportJSON}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${buttonBase}`}
              >
                <Download size={16} />
                JSON
              </button>
              {(copySuccess || exportSuccess) && (
                <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Check size={16} />
                  {copySuccess || exportSuccess}
                </span>
              )}
            </div>
          </div>
        </section>

        {error ? (
          <div className="text-center text-red-600 dark:text-red-400 py-8">Error: {error}</div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800/60 shadow-sm">
                <table className="w-full text-left text-foreground">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Repository</th>
                      <th className="px-4 py-3 font-semibold hidden sm:table-cell">Language</th>
                      <th className="px-4 py-3 font-semibold">Stars</th>
                      <th className="px-4 py-3 font-semibold hidden md:table-cell">Forks</th>
                      <th className="px-4 py-3 font-semibold hidden lg:table-cell">Updated</th>
                      <th className="px-4 py-3 font-semibold w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentRepos.map((repo) => (
                      <RepoRow key={repo.id} repo={repo} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium ${buttonBase} disabled:opacity-50`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`min-w-[2.75rem] px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentPage === i + 1 ? buttonPrimary : buttonBase
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium ${buttonBase} disabled:opacity-50`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <div className="group border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-200 bg-white dark:bg-gray-800/60 text-foreground">
      <h2 className="text-xl font-semibold mb-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary inline-flex items-center gap-1.5"
        >
          {repo.name}
          <ExternalLink size={14} className="opacity-60 group-hover:opacity-100" />
        </a>
      </h2>
      {repo.archived && (
        <span className="text-xs px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 mb-2 inline-block">
          Archived
        </span>
      )}
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">{repo.description}</p>
      <div className="flex items-center gap-4 text-sm text-foreground">
        {repo.language && (
          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{repo.language}</span>
        )}
        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <Star size={14} />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <GitFork size={14} />
          {repo.forks_count}
        </span>
      </div>
    </div>
  );
}

function RepoRow({ repo }) {
  const updated = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          {repo.name}
          <ExternalLink size={14} />
        </a>
        {repo.archived && (
          <span className="text-xs ml-2 text-amber-600 dark:text-amber-400">Archived</span>
        )}
        {repo.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs mt-0.5">
            {repo.description}
          </p>
        )}
      </td>
      <td className="px-4 py-3 text-foreground hidden sm:table-cell">{repo.language || '—'}</td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1 text-foreground">
          <Star size={14} />
          {repo.stargazers_count}
        </span>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="flex items-center gap-1 text-foreground">
          <GitFork size={14} />
          {repo.forks_count}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm hidden lg:table-cell">
        {updated}
      </td>
      <td className="px-4 py-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded inline-flex bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600`}
          title="Open"
        >
          <ExternalLink size={16} />
        </a>
      </td>
    </tr>
  );
}

export default GitHubReposViewer;
