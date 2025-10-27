import { useState, useContext } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { FormContext } from "./contexts/FormContext";

const SignInContainer = () => {

  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleClickSignUp = () => {
    setIsSignUp(true);
    setIsSignIn(false);
  }

  const handleClickSignIn = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  }

  return (
    <FormContext.Provider value={{
      setIsSignUp,
      setIsSignIn,
      handleClickSignIn,
      handleClickSignUp
    }}>
      <div className="flex flex-col items-center justify-self-center self-center h-full w-full min-w-[400px] max-w-[500px] rounded-2xl border-1 border-gray-200 shadow-md m-[70px] p-[50px]">
        {isSignIn &&
          <SignInForm/>
        }
        {isSignUp &&
          <SignUpForm/>
        }
      </div>
    </FormContext.Provider>

  );
}

export default SignInContainer;