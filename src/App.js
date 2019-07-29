import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AccountPage from '../src/pages/account/AccountPage.component';
import HomePage from '../src/pages/homepage/HomePage.component';
import ShopPage from '../src/pages/shop/ShopPage.component';
import CheckoutPage from '../src/pages/checkout/CheckoutPage.component';
import Header from '../src/components/header/Header.component';

import { GlobalStyle } from '../src/Global.styles';

import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils';

import { setCurrentUser } from '../src/redux/user/user.action';
import { selectCurrentUser } from '../src/redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
          console.log(this.state);
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
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
              this.props.currentUser ? (
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
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
