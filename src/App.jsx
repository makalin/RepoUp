import React from 'react';
import GitHubReposViewer from './components/GitHubReposViewer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">RepoUp</span>
            <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Pro
            </span>
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <GitHubReposViewer />
      </main>
    </div>
  );
}

export default App; 