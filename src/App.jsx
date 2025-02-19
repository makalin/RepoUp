import React from 'react';
import GitHubReposViewer from './components/GitHubReposViewer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">RepoUp</h1>
        <GitHubReposViewer />
      </main>
    </div>
  );
}

export default App; 