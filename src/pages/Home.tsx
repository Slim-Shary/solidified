import { Component, For } from 'solid-js';
import { repos, setUsername, username } from '../App';
import RepoCard, { Repo } from '../components/RepoCard';
import '../App.css';

const Home: Component = () => {
  const handleClick = (e: Event) => {
    e.preventDefault();
    const userInput = document.querySelector(
      '#usernameInput'
    ) as HTMLInputElement;
    setUsername(userInput.value);
  };

  return (
    <>
      <div class='fetch-container mb-3'>
        <input
          type='text'
          class='form-control search-control'
          id='usernameInput'
          value={username()}
          required
          placeholder='GitHub username'
        />
        <button onClick={handleClick} class='btn btn-dark ms-3 w-auto'>
          Fetch
        </button>
      </div>
      <h3>Github repos for {username()}</h3>
      <For each={repos()} fallback={<div>Loading...</div>}>
        {(repo: Repo) => <RepoCard repo={repo} />}
      </For>
    </>
  );
};

export default Home;
