import React, { useContext, useRef, useState } from 'react'
import api from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';

import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from '../../utils/cookieExpirationTime';
import { useNavigate } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
import { ORDER_SESSION_ACTIONS } from '../../reducers/OrderSession/action';
import Cookie from "js-cookie";
import { createOrderSession } from '../../api/order';
import { login } from '../../api/auth';
import { fetchUser } from '../../api/user';
import { CloseButton, LoadingSpinner } from '../../svg/Utils';
import { TextField } from '@mui/material';
import { motion } from "framer-motion";

const SignInSection = ({signInModalOpened, setSignInModalOpened}) => {
  const {
    setUserDetails
  } = useContext(UserContext);

  const {
    reducer: {
      rootState,
      dispatchRoot
    },
    setCartOpened
  } = useContext(LayoutContext);

  const nav = useNavigate();

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState(null);

  const fromFormToRequest = (form) => {
    const requestObject = {
      email: form.email,
      password: form.password
    }
    
    return requestObject;
  }
  
  const handleClickGuestSignIn = () => {
    const storeId = Cookie.get("storeId");
    const orderType = Cookie.get("orderType");
    const requestBody = {
      orderType: orderType
    }
    if (storeId) {
      createOrderSession(storeId, requestBody)
      .then(data => {
        dispatchRoot({
          type: ORDER_SESSION_ACTIONS.LOAD_SESSION,
          payload: {
            orderSessionResponse: data
          }
        });
        const orderSessionId = data.sessionId;
        nav(`/order-session/${orderSessionId}/store/${storeId}`);
        setCartOpened(false);
        setSignInModalOpened(false);
      })
      .catch(err => console.error(err));
    }

  }

  const handleClickSignUp = () => {
    nav("/auth");
    setSignInModalOpened(false);
    setCartOpened(false);
  }

  const handleClickSignInButton = () => {
    // Validation
    // API call
    const requestBody = fromFormToRequest(signInForm);
    login(requestBody)
    .then(data => {
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      Cookies.set('accessToken', accessToken, { expires: ACCESS_TOKEN_EXPIRATION_TIME});
      Cookies.set('refreshToken', refreshToken, { expires: REFRESH_TOKEN_EXPIRATION_TIME});
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
          const storeId = Cookie.get("storeId");
          const requestBody = {
            orderType: orderType
          }
          createOrderSession(storeId, requestBody)
            .then(data => {
              dispatchRoot({
                type: ORDER_SESSION_ACTIONS.LOAD_SESSION,
                payload: {
                  orderSessionResponse: data
                }
              });
            })
            .catch(
              err => console.error(err)
            );
        })
        .catch(
          err => console.error(err)
        );
      setSignInModalOpened(false);
      setCartOpened(false);
      nav('/order');
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
    ;
  }

  return (
    <>
      <div className="flex justify-center">
        <h3 className="text-lg font-[whatthefont]">Check out with your account</h3>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col gap-5 w-full py-2">
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
        <div className="flex flex-col items-center">
          <motion.button
            className="flex justify-center items-center px-8 py-4 text-xl text-white rounded-full shadow-lg hover:shadow-xl font-['Whatthefont'] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform"
            onClick={() => handleClickSignInButton()}>
            {loading ? <LoadingSpinner spinnerColor='#FFFFFF' circleColor='#FFFFFF'/> : <p>Sign In</p>}
          </motion.button>
          <p className="m-2">Don't have an account? <a className="underline cursor-pointer text-orange-500 hover:text-orange-400" onClick={() => handleClickSignUp()}>Sign up</a></p>
        </div>
        <button className="flex justify-center items-center py-2 text-xl text-white rounded-full shadow-lg hover:shadow-xl font-['Whatthefont'] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform" onClick={() => handleClickGuestSignIn()}>
          Continue As Guest
        </button>
      </div>
    </>
  )
}

export default SignInSection;