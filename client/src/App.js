import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AccountPage from '../src/pages/account/AccountPage.component';
import HomePage from '../src/pages/homepage/HomePage.component';
import ShopPage from '../src/pages/shop/ShopPage.component';
import CheckoutPage from '../src/pages/checkout/CheckoutPage.component';
import Header from '../src/components/header/Header.component';

import { GlobalStyle } from '../src/Global.styles';

import { selectCurrentUser } from '../src/redux/user/user.selectors';
import { checkUserSession } from '../src/redux/user/user.action';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle/>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
        <Route 
          exact path='/account' 
          render={() => 
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <AccountPage />
              )
            }
          />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
