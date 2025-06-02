import SignInContainer from "../components/Auth/SignInContainer";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Auth = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNum: '',
    zipcode: ''
  });

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  })

  return (
    <AuthContext.Provider value={{
      signInForm: signInForm,
      setSignInForm: setSignInForm,
      signUpForm: signUpForm,
      setSignUpForm: setSignUpForm
    }}>
      <SignInContainer/>
    </AuthContext.Provider>
  );
}

export default Auth;