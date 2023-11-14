import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Repository {
  id: number;
  name: string;
  html_url: string;
}

const GitHubRepoTable: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchUsername, setSearchUsername] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Repository[]>(`https://api.github.com/users/${searchUsername}/repos`);
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching data from GitHub:', error);
        setRepositories([]);
      }
    };

    if (searchUsername) {
      fetchData();
    }
  }, [searchUsername]);

  return (
    <div>
      <h2>GitHub Repositories</h2>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={searchUsername}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchUsername(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>URL</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((repo) => (
            <tr key={repo.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.html_url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GitHubRepoTable;
