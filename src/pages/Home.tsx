import {
  Component,
  createResource,
  createSignal,
  For,
  Show,
  createEffect,
} from 'solid-js';
import RepoCard, { Repo } from '../components/RepoCard';
import axios from 'axios';
import '../App.css';
import { setSavedRepos } from './SavedRepos';

const Home: Component = () => {
  const fetchRepos = async (username: string) => {
    return (
      await axios.get(
        `https://api.github.com/users/${username}/repos?sort=created`
      )
    ).data;
  };

  const [username, setUsername] = createSignal('');
  const [repos] = createResource(username, fetchRepos);

  // TODO: this is temporary. should find a solution to share the searched value between home and saved repos pages
  createEffect(() => {
    setSavedRepos([]);
  });

  return (
    <>
      <div class='fetch-container mb-3'>
        <input
          type='text'
          class='form-control search-control'
          id='usernameInput'
          value={username()}
          onInput={(e) => setUsername(e.currentTarget.value)}
          required
          placeholder='GitHub username'
        />
      </div>
      <h3>Github repos for {username}</h3>
      <Show when={!repos.error} fallback={<div>{repos.error.message}</div>}>
        <For each={repos()} fallback={<div>Loading...</div>}>
          {(repo: Repo) => <RepoCard repo={repo} />}
        </For>
      </Show>
    </>
  );
};

export default Home;
