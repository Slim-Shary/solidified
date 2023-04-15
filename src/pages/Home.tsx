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
  const {
    username,
    setUsername,
    searchedUser,
    setSearchedUser,
    repos,
    setRepos,
  } = useGlobalContext();
  const [error, setError] = createSignal<Error>();
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (username()) {
      setSearchedUser(username());
      setLoading(true);
      try {
        const res = await fetchRepos(username());
        setRepos(res);
        setError(undefined);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    } else {
      setSearchedUser('');
      setRepos([]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class='fetch-container mb-3'>
          <input
            type='text'
            class='form-control search-control'
            id='usernameInput'
            value={username()}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder='GitHub username'
          />
          <button type='submit' class='btn btn-primary'>
            Search
          </button>
        </div>
      </form>
      <Show when={!loading()} fallback={<div>Loading...</div>}>
        <Show
          when={!error()}
          fallback={<p class='text-danger'>{error()?.message}</p>}
        >
          <Show when={searchedUser()}>
            <h3>Github repos for {searchedUser()}</h3>
            <For
              each={repos()}
              fallback={
                <span>No repos have been created yet by this user</span>
              }
            >
              {(repo: Repo) => <RepoCard repo={repo} />}
            </For>
          </Show>
        </Show>
      </Show>
    </>
  );
};

export default Home;
