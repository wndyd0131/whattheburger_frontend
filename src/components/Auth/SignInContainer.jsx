import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
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
      <div className="flex flex-col items-center justify-self-center self-center h-[700px] w-[500px] rounded-2xl border-1 border-gray-200 shadow-md m-[70px] p-[40px]">
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