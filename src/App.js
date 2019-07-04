import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import AccountPage from '../src/pages/account/AccountPage.component';
import HomePage from '../src/pages/homepage/HomePage.component';
import ShopPage from '../src/pages/shop/ShopPage.component';
import Header from '../src/components/header/Header.component';
import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils';
import { setCurrentUser } from '../src/redux/user/user.action';

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
          })
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
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
