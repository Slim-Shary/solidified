import { Route, Routes } from '@solidjs/router';
import { Component, lazy } from 'solid-js';
import Nav from './components/Nav';

/* 
import Home from './pages/Home';
import SavedRepos from './pages/SavedRepos';

importing components like above preloads your components when someone hits your app.
instead you can lazy load it like below
(one benefit of lazy loading is SEO)
*/
const Home = lazy(() => import('./pages/Home'));
const SavedRepos = lazy(() => import('./pages/SavedRepos'));

const App: Component = () => {
  return (
    <div class='container'>
      <Nav />
      <Routes>
        {/* have 'component' attr on one route and 'element' on the other to show the different ways of passing components */}
        <Route path='/' component={Home} />
        <Route path='/savedrepos' element={<SavedRepos />} />
      </Routes>
    </div>
  );
};

export default App;
