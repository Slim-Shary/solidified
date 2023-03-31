import { Component, createSignal, For } from 'solid-js';
import RepoCard, { Repo } from '../components/RepoCard';

const storedRepos = JSON.parse(localStorage.getItem('savedRepos') || '[]');
const [savedRepos, setSavedRepos] = createSignal<Repo[]>(storedRepos);

const SavedRepos: Component = () => {
  return (
    <div>
      <h2>Your saved repos</h2>
      <For each={savedRepos()}>{(repo: Repo) => <RepoCard repo={repo} />}</For>
    </div>
  );
};

export { savedRepos, setSavedRepos };
export default SavedRepos;
