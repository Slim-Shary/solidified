import { NavLink } from '@solidjs/router';
import { Component } from 'solid-js';
import { savedRepos } from '../pages/SavedRepos';

const Nav: Component = () => {
  return (
    <>
      <ul class='nav nav-tabs mt-5 mb-3'>
        <li class='nav-item'>
          <NavLink class='nav-link active' href='/' activeClass='active' end>
            Home
          </NavLink>
        </li>

        <li class='nav-item'>
          <NavLink class='nav-link' href='savedrepos'>
            Saved ~ {savedRepos().length}
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
