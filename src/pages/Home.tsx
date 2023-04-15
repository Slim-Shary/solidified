import { Component, For, Show, createResource, createSignal } from 'solid-js';
import RepoCard, { Repo } from '../components/RepoCard';
import { useGlobalContext } from '../GlobalContext/store';
import '../App.css';
import axios from 'axios';

const fetchRepos = async (username: string) => {
  return (
    await axios.get(
      `https://api.github.com/users/${username}/repos?sort=created`
    )
  ).data;
};

const Home: Component = () => {
  const { username, setUsername } = useGlobalContext();
  const [repos] = createResource(username, fetchRepos);

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
      <Show when={!repos.loading} fallback={<div>Loading...</div>}>
        <Show when={!repos.error} fallback={<div>{repos.error.message}</div>}>
          <For
            each={repos()}
            fallback={<span>No repos have been created yet by this user</span>}
          >
            {(repo: Repo) => <RepoCard repo={repo} />}
          </For>
        </Show>
      </Show>
    </>
  );
};

export default Home;
