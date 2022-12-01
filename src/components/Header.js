import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName }) {
  const [searchInput, setSearchInput] = useState(false);
  const [searchButton, setSearchButton] = useState(true);
  const [header, setHeader] = useState(false);
  // const [title, setTitle] = useState('');
  // const [route, setRoute] = useState('');
  const [searchbar, setSearchbar] = useState('');
  const history = useHistory();

  const handleClickPerfil = () => {
    history.push('/profile');
  };

  const handleClickSearch = () => {
    if (searchInput) {
      setSearchInput(false);
    } else {
      setSearchInput(true);
    }
  };

  // const handleTitle = () => {
  //   const { location: { pathname } } = history;
  //   if (pathname === '/') {
  //     setTitle('');
  //   } else {
  //     const pages = pathname.slice(1);
  //     const newPage = pages.split('-');
  //     const newTitle = newPage.map((e) => e[0].toUpperCase() + e.substring(1)).join(' ');
  //     setTitle(newTitle);
  //   }
  // };

  const handleButton = () => {
    const { location: { pathname } } = history;
    if (pathname === '/profile'
      || pathname === '/done-recipes' || pathname === '/favorite-recipes') {
      setSearchButton(false);
    }
  };

  const handleHeader = () => {
    const { location: { pathname } } = history;
    if (pathname === '/meals' || pathname === '/drinks' || pathname === '/profile'
      || pathname === '/favorite-recipes' || pathname === '/done-recipes') {
      setHeader(true);
    }
  };

  useEffect(() => {
    // const { location: { pathname } } = history;
    // setRoute(pathname);
    handleButton();
    // handleTitle();
    handleHeader();
  });

  // useEffect(() => {
  //   const { location: { pathname } } = history;
  //   if (pathname !== route) {
  //     handleButton();
  //     handleTitle();
  //     setRoute(pathname);
  //   }
  // }, [route]);

  // const { location: { pathname } } = history;

  return (
    <>
      { header ? (
        <header>
          <button type="button" onClick={ handleClickPerfil }>
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
          </button>
          <h1 data-testid="page-title">{ pageName }</h1>
          { searchInput ? (
            <label htmlFor="search">
              <input
                id="search"
                data-testid="search-input"
                type="text"
                onChange={ (({ target }) => setSearchbar(target.value)) }
              />
            </label>)
            : <span />}
          { searchButton ? (
            <>
              <SearchBar search={ searchbar } />
              <button type="button" onClick={ handleClickSearch }>
                <img data-testid="search-top-btn" src={ searchIcon } alt="Profile" />
              </button>
            </>)
            : <span />}
        </header>)
        : <h1 data-testid="page-title"> </h1>}
      <span />
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.node.isRequired,
};

export default Header;
