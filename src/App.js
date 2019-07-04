import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import AccountPage from '../src/pages/account/AccountPage.component';
import HomePage from '../src/pages/homepage/HomePage.component';
import ShopPage from '../src/pages/shop/ShopPage.component';
import Header from '../src/components/header/Header.component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/account' component={AccountPage}/>
      </Switch>
    </div>
  );
}

export default App;
