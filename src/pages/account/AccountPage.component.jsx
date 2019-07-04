import React from 'react';

import SignIn from '../../components/sign-in/SignIn.component';
import SignUp from '../../components/sign-up/SignUp.component';

import '../account/accountpage.styles.scss';

const AccountPage = () => (
  <div className='sign-in-and-sign-up'>
    <SignIn/>
    <SignUp/>
  </div>
);

export default AccountPage;