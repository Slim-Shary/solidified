/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';
import { Router, hashIntegration } from '@solidjs/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalContextProvider } from './GlobalContext/store';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
  );
}

render(
  () => (
    <Router source={hashIntegration()}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Router>
  ),
  root!
);
