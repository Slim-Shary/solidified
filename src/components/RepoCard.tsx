import { Component } from 'solid-js';
import { useGlobalContext } from '../GlobalContext/store';

export type Repo = {
  id: string;
  html_url: string;
  name: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
  };
};

interface Props {
  repo: Repo;
}

const RepoCard: Component<Props> = ({ repo }) => {
  const { savedRepos, setSavedRepos } = useGlobalContext();

  const handleSave = (repo: Repo) => {
    setSavedRepos([repo, ...savedRepos()]);
    localStorage.setItem('savedRepos', JSON.stringify(savedRepos()));
  };

  const handleUnsave = (repoId: string) => {
    setSavedRepos(savedRepos()?.filter((repo) => repo.id !== repoId));
    localStorage.setItem('savedRepos', JSON.stringify(savedRepos()));
  };

  const isRepoSaved = (repoId: string) => {
    return savedRepos()?.find((repo) => repo.id == repoId) ? true : false;
  };

  return (
    <div class='card'>
      <div class='card-header'>&#11088; stars: {repo.stargazers_count}</div>
      <div class='card-body crd-container'>
        <a
          href={repo.html_url}
          class='h4 card-title text-decoration-none'
          target='_blank'
          rel='noreferrer'
        >
          <strong>
            {repo.owner?.login}/{repo.name}
          </strong>
        </a>
        <p class='card-subtitle mb-4 text-muted'>{repo.description}</p>
        {isRepoSaved(repo.id) ? (
          <button class='btn btn-danger' onClick={() => handleUnsave(repo.id)}>
            Unsave
          </button>
        ) : (
          <button class='btn btn-success' onClick={() => handleSave(repo)}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
