import { Route, Routes } from '@solidjs/router';
import { Component } from 'solid-js';
import Nav from './components/Nav';
import Home from './pages/Home';
import SavedRepos from './pages/SavedRepos';

const App: Component = () => {
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

export default App;
