import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Footer.css';

function Footer() {
  const history = useHistory();

  const handleClickDrinks = () => {
    history.push('/drinks');
  };

  const handleClickMeals = () => {
    history.push('/meals');
  };

  return (
    <footer data-testid="footer">
      <button type="button" onClick={ handleClickDrinks }>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink" />
      </button>
      <button type="button" onClick={ handleClickMeals }>
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Meals" />
      </button>
    </footer>
  );
}

export default Footer;
