import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Header pageName="Meals" />
      <p>Meals</p>
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
