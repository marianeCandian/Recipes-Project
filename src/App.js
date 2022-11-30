import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/meals" />
        <Route exact path="/drinks" />
        <Route exact path="/done-recipes" />
        <Route exact path="/favorite-recipes" />
      </Switch>
    </>
  );
}

export default App;
