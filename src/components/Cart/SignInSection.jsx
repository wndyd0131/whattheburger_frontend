import React, { useContext, useState } from 'react'
import api from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import Cookies from "js-cookie";
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from '../../utils/cookieExpirationTime';
import { useNavigate } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
import { ORDER_ACTIONS } from '../../reducers/Order/actions';
import { ORDER_SESSION_ACTIONS } from '../../reducers/OrderSession/action';

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

  const fromFormToRequest = (form) => {
    const requestObject = {
      email: form.email,
      password: form.password
    }
    
    return requestObject;
  }
  const handleClickGuestSignIn = () => {
    api.post("/order")
      .then(response => {
        console.log("ORDER SESSION", response.data);
        dispatchRoot({
          type: ORDER_SESSION_ACTIONS.LOAD_SESSION,
          payload: {
            orderSessionResponse: response.data
          }
        });
        nav('/order');
        setCartOpened(false);
        setSignInModalOpened(false);
      })
      .catch(err => console.error(err));
  }

  const handleClickSubmitButton = () => {
    // Validation
    // API call
    const requestObject = fromFormToRequest(signInForm);
    console.log(requestObject);
    api.post('/login', requestObject)
    .then(response => {
      console.log(response);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      Cookies.set('accessToken', accessToken, { expires: ACCESS_TOKEN_EXPIRATION_TIME});
      Cookies.set('refreshToken', refreshToken, { expires: REFRESH_TOKEN_EXPIRATION_TIME});
      setSignInForm((prev) => (
        { ...prev,
          email: '',
          password: ''
        })
      );
      api.get('/users')
        .then(
        response => {
          setUserDetails((prev) => ({
            ...prev,
            userId: response.data.userId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNum: response.data.phoneNum,
            zipcode: response.data.zipcode,
            isAuthenticated: true
          }));
          api.post('/order')
            .then(response => {
              console.log("RESPONSE", response);
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
    .catch(err => console.error(err));
  }

  return (
    <>
      <div className="flex justify-center">
        <h3 className="font-[sans-serif]">Check out with your Account</h3>
      </div>
      <div className="flex flex-col space-y-5">
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={signInForm.email}
            onChange={(e) => setSignInForm((prev) => ({...prev, email: e.target.value}))}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={signInForm.password}
            onChange={(e) => setSignInForm((prev) => ({...prev, password: e.target.value}))}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col items-center">
          <button className="w-full bg-[#FE7800] text-white py-3 rounded hover:bg-[#e9750f] cursor-pointer" onClick={() => handleClickSubmitButton()}>
            Sign In
          </button>
          <p className="m-2">Don't have an account? <a className="underline cursor-pointer text-[#FE7800]" onClick="">Sign up</a></p>
        </div>
        <button className="w-full bg-[#FE7800] text-white py-3 rounded hover:bg-[#e9750f] cursor-pointer" onClick={() => handleClickGuestSignIn()}>
          Continue as Guest
        </button>
      </div>
    </>
  )
}

export default SignInSection;