import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: false,
      searchButton: true,
      header: false,
      title: '',
      route: '',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    this.setState({
      route: pathname,
    });
    this.handleTitle();
    this.handleButton();
    this.handleHeader();
  }

  componentDidUpdate() {
    const { history } = this.props;
    const { route } = this.state;
    const { location: { pathname } } = history;
    if (pathname !== route) {
      this.handleTitle();
      this.handleButton();
      this.setState({ route: pathname });
    }
  }

  handleClickPerfil = () => {
    const { history } = this.props;
    history.push('/profile');
  };

  handleClickSearch = () => {
    const { searchInput } = this.state;
    if (searchInput) {
      this.setState({ searchInput: false });
    } else {
      this.setState({ searchInput: true });
    }
  };

  handleTitle = () => {
    const { history } = this.props;
    const { location: { pathname } } = history;
    if (pathname === '/') {
      this.setState({ title: '' });
    } else {
      const pages = pathname.slice(1);
      const title = pages.split('-');
      const newTitle = title.map((e) => e[0].toUpperCase() + e.substring(1)).join(' ');
      this.setState({ title: newTitle });
    }
  };

  handleButton = () => {
    const { history } = this.props;
    const { location: { pathname } } = history;
    if (pathname === '/profile'
      || pathname === '/done-recipes' || pathname === '/favorite-recipes') {
      this.setState({ searchButton: false });
    }
  };

  handleHeader = () => {
    const { history } = this.props;
    const { location: { pathname } } = history;
    if (pathname === '/meals' || pathname === '/drinks' || pathname === '/profile'
      || pathname === '/favorite-recipes' || pathname === '/done-recipes') {
      this.setState({ header: true });
    }
  };

  render() {
    const { searchInput, title, searchButton, header } = this.state;
    return (
      <>
        { header ? (
          <header>
            <button type="button" onClick={ this.handleClickPerfil }>
              <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
            </button>
            <h1 data-testid="page-title">{ title }</h1>
            { searchInput ? (
              <label htmlFor="search">
                <input id="search" data-testid="search-input" type="text" />
              </label>)
              : <span />}
            { searchButton ? (
              <button type="button" onClick={ this.handleClickSearch }>
                <img data-testid="search-top-btn" src={ searchIcon } alt="Profile" />
              </button>)
              : <span />}
          </header>)
          : <h1 data-testid="page-title"> </h1>}
        <span />
      </>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(Header);
