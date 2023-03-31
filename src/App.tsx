import axios from 'axios';
import { Route, Routes } from '@solidjs/router';
import { Component, createEffect, createSignal } from 'solid-js';
import Nav from './components/Nav';
import Home from './pages/Home';
import SavedRepos from './pages/SavedRepos';

const [username, setUsername] = createSignal('');
const [repos, setRepos] = createSignal([]);

const App: Component = () => {
  createEffect(async () => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username()}/repos?sort=created`
      );
      setRepos(res.data);
    } catch (error: any) {
      console.log(error.code);
    }
  });

  return (
    <div class='container'>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/savedrepos' element={<SavedRepos />} />
      </Routes>
    </div>
  );
};

export { username, setUsername, repos };
export default App;
