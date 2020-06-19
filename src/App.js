import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `${Date.now()} new repository`,
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: ['node.js', 'react'],
    };

    const result = await api.post('repositories', newRepository);
    setRepositories([...repositories, result.data])
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`repositories/${id}`);
    if (result.status !== 204) {
      return;
    }
    const newRepositories = [...repositories];
    const repositoryIndex = repositories.findIndex((repo) => repo.id === id);
    newRepositories.splice(repositoryIndex, 1);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
