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
    };
  }

  handleClickPerfil = () => {
    const { history } = this.props;
    console.log(history);
    history.push('/perfil');
  };

  handleClickSearch = () => {
    const { searchInput } = this.state;
    if (searchInput) {
      this.setState({ searchInput: false });
    } else {
      this.setState({ searchInput: true });
    }
  };

  render() {
    const { searchInput } = this.state;
    return (
      <>
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ this.handleClickPerfil }
        >
          <object
            type="image/svg+xml"
            data={ profileIcon }
          >
            Profile
          </object>
        </button>
        <h1 data-testid="page-title">{}</h1>
        { searchInput ? (
          <label htmlFor="search">
            <input id="search" data-testid="search-input" type="text" />
          </label>)
          : <p />}
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ this.handleClickSearch }
        >
          <object
            type="image/svg+xml"
            data={ searchIcon }
          >
            Search
          </object>
        </button>
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
