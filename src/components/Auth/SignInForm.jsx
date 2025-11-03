import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContext } from "./contexts/FormContext";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from "../../utils/cookieExpirationTime";
import api from "../../utils/api";
import { CART_ACTIONS } from "../../reducers/Cart/actions";
import { LayoutContext } from "../../contexts/LayoutContext";
import { motion } from "framer-motion";
import { LoadingSpinner } from "../../svg/Utils";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { login } from "../../api/auth";
import { fetchUser } from "../../api/user";
import { fetchCart } from "../../api/cart";

const SignInForm = () => {
  const {
    signInForm,
    setSignInForm
  } = useContext(AuthContext);

  const {
    handleClickSignUp,
  } = useContext(FormContext);

  const {
    setUserDetails
  } = useContext(UserContext);

  const {
    reducer: {
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState(null);

  const fromFormToRequest = (form) => {
    const requestObject = {
      email: form.email,
      password: form.password
    }
    
    return requestObject;
  }

  const isFormValid = (form) => {
    const isValid = form.email.length > 0 && form.password.length > 0;
    return isValid;
  }

  const passwordRef = useRef(null);

  const handleClickSignInButton = () => {
    // Validation
    // API call
    if (isFormValid(signInForm)) {
      const requestBody = fromFormToRequest(signInForm);
      setLoading(true);
      login(requestBody)
      .then(data => {
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        Cookie.set('accessToken', accessToken, { expires: ACCESS_TOKEN_EXPIRATION_TIME});
        Cookie.set('refreshToken', refreshToken, { expires: REFRESH_TOKEN_EXPIRATION_TIME});
        setSignInForm((prev) => (
          { ...prev,
            email: '',
            password: ''
          })
        );
        fetchUser()
          .then(data => {
            setUserDetails((prev) => ({
              ...prev,
              userId: data.userId,
              firstName: data.firstName,
              lastName: data.lastName,
              phoneNum: data.phoneNum,
              zipcode: data.zipcode,
              isAuthenticated: true
            }));
            setLoginErrorText(null);
          }
          )
          .catch(
            err => console.error(err)
          );
        const storeId = Cookie.get("storeId");
        if (storeId) {
          fetchCart(storeId)
            .then(data => {
              dispatchRoot({
                type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
                payload: {
                  cartData: data
                }
              });
            })
            .catch(
              err => console.error(err)
            );
        }
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        if (err.status === 401) {
          setLoginErrorText("Invalid ID or Password");
        }
        setSignInForm(prev => ({...prev, password: ""}));
        passwordRef.current.focus();
      })
      .finally(() => {
        setLoading(false);
      })
    } else {
      toast.error("You must type in both email and password to sign in")
    }
  }

  return (
    <>
      <h2>Sign In</h2>
      <div className="flex font-[sans-serif] flex-col w-full gap-5 mt-5">
        <TextField
          required
          id="email"
          label="email"
          color="warning"
          value={signInForm.email}
          onChange={(e) => setSignInForm((prev) => ({...prev, email: e.target.value}))}
        />
        <TextField
          required
          id="password"
          type="password"
          label="password"
          color="warning"
          inputRef={passwordRef}
          value={signInForm.password}
          onChange={(e) => setSignInForm((prev) => ({...prev, password: e.target.value}))}
        />
        {
          loginErrorText
          ? <div className="text-red-500 text-center">{loginErrorText}</div>
          : null
        }
      </div>
      <div className="flex py-5 justify-center items-center">
        <motion.button
          className="flex justify-center items-center px-8 py-4 text-xl text-white rounded-full shadow-lg hover:shadow-xl font-['Whatthefont'] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform"
          onClick={handleClickSignInButton}>
          {loading ? <LoadingSpinner spinnerColor='#FFFFFF' circleColor='#FFFFFF'/> : <p>Sign In</p>}
        </motion.button>
      </div>
      <p className="m-2">Don't have an account? <a className="underline cursor-pointer text-[#FE7800]" onClick={() => handleClickSignUp()}>Sign up</a></p>
    </>
  );
}

export default SignInForm;