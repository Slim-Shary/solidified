import { Component, For } from 'solid-js';
import RepoCard, { Repo } from '../components/RepoCard';
import { useGlobalContext } from '../GlobalContext/store';

const SavedRepos: Component = () => {
  const { savedRepos } = useGlobalContext();

  return (
    <div>
      <h2>Your saved repos</h2>
      <For each={savedRepos()}>{(repo: Repo) => <RepoCard repo={repo} />}</For>
    </div>
  );
};

export default SavedRepos;
