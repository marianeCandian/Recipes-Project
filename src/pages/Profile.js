import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const getEmail = () => {
    const local = JSON.parse(localStorage.getItem('user'));
    setEmail(local.email);
  };

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <>
      <Header pageName="Profile" />
      <p data-testid="profile-email">{email}</p>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
