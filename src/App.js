import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import AccountPage from '../src/pages/account/AccountPage.component';
import HomePage from '../src/pages/homepage/HomePage.component';
import ShopPage from '../src/pages/shop/ShopPage.component';
import Header from '../src/components/header/Header.component';
import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth })
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/account' component={AccountPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
