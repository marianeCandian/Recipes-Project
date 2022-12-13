import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  // const history = useHistory();
  const [copied, setCopied] = useState(true);
  const [favoriteBtn, setFavoriteBtn] = useState(false);
  const [favorites, setFavorites] = useState();

  const buttonShareIcon = (id, type) => {
    if (copied) {
      setCopied(false);
    }
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  const buttonDisfavor = (index) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const remove = storage.filter((_e, i) => i !== index);
    localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
    setFavorites(remove);
    setFavoriteBtn(true);
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(storage);
  }, []);

  useEffect(() => {
    if (favoriteBtn) {
      buttonDisfavor();
    }
  }, [favorites]);

  return (
    <>
      <Header pageName="Favorite Recipes" />
      { favorites?.map((e, i) => (
        e.type === 'meal'
          ? (
            <div key={ i }>
              <img
                data-testid={ `${i}-horizontal-image` }
                src={ e.image }
                alt={ e.name }
              />
              <h3 data-testid={ `${i}-horizontal-name` }>{ e.name }</h3>
              <p
                data-testid={ `${i}-horizontal-top-text` }
              >
                { `${e.nationality} - ${e.category}` }
              </p>
              <button type="button" onClick={ () => buttonShareIcon(e.id, e.type) }>
                <img
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Share"
                />
              </button>
              { copied ? <span /> : <p>Link copied!</p>}
              <button type="button" onClick={ () => buttonDisfavor(i) }>
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite"
                />
              </button>
            </div>)
          : (
            <div key={ i }>
              <img
                data-testid={ `${i}-horizontal-image` }
                src={ e.image }
                alt={ e.name }
              />
              <h3 data-testid={ `${i}-horizontal-name` }>{ e.name }</h3>
              <p data-testid={ `${i}-horizontal-top-text` }>{ e.alcoholicOrNot }</p>
              <button type="button" onClick={ () => buttonShareIcon(e.id, e.type) }>
                <img
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Share"
                />
              </button>
              { copied ? <span /> : <p>Link copied!</p>}
              <button type="button" onClick={ () => buttonDisfavor(i) }>
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite"
                />
              </button>
            </div>)
      ))}
    </>
  );
}

export default FavoriteRecipes;
