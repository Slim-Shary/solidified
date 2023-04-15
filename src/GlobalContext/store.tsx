import {
  Accessor,
  Setter,
  createContext,
  useContext,
  createSignal,
} from 'solid-js';
import { Repo } from '../components/RepoCard';

interface ContextProps {
  username: Accessor<string>;
  setUsername: Setter<string>;
  savedRepos: Accessor<Repo[]>;
  setSavedRepos: Setter<Repo[]>;
}

const GlobalContext = createContext<ContextProps>();

export function GlobalContextProvider(props: any) {
  const storedRepos = JSON.parse(localStorage.getItem('savedRepos') || '[]');

  const [username, setUsername] = createSignal('solidjs');
  const [savedRepos, setSavedRepos] = createSignal<Repo[]>(storedRepos);

  return (
    <GlobalContext.Provider
      value={{ username, setUsername, savedRepos, setSavedRepos }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext)!;
