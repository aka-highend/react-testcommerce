import React from "react";

import SignIn from "../../components/sign-in/SignIn.component";
import SignUp from "../../components/sign-up/SignUp.component";

import { SignInAndSignUpContainer } from "../account/AccountPage.styles";

const AccountPage = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);

export default AccountPage;
