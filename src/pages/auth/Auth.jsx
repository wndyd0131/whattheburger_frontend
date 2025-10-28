import { useState } from "react";

const Auth = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNum: '',
    zipCode: ''
  });

  const [signUpError, setSignUpError] = useState({
    email: {
      message: '',
      isTouched: false
    },
    password: {
      message: '',
      isTouched: false
    },
    confirmPassword: {
      message: '',
      isTouched: false
    },
    firstName: {
      message: '',
      isTouched: false
    },
    lastName: {
      message: '',
      isTouched: false
    },
    phoneNum: {
      message: '',
      isTouched: false
    },
    zipCode: {
      message: '',
      isTouched: false
    }
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
      setSignUpForm: setSignUpForm,
      signUpError: signUpError,
      setSignUpError: setSignUpError
    }}>
      <SignInContainer/>
    </AuthContext.Provider>
  );
}

export default Auth;