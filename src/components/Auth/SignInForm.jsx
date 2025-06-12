import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContext } from "./contexts/FormContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from "../../utils/jwtExpirationTime";

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

  const navigate = useNavigate();

  const fromFormToRequest = (form) => {
    const requestObject = {
      email: form.email,
      password: form.password
    }
    
    return requestObject;
  }

  const handleClickSubmitButton = () => {
    // Validation
    // API call
    const requestObject = fromFormToRequest(signInForm);
    axios.post('http://localhost:8080/api/v1/login', requestObject)
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
      axios.get('http://localhost:8080/api/v1/users', {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(
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
        }
      )
      .catch(err => console.error(err));
      navigate('/');
    })
    .catch(err => console.error(err));
  }

  return (
    <>
      <h2>Sign In</h2>
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
      <button className="w-full bg-[#FE7800] text-white py-3 rounded hover:bg-[#e9750f] cursor-pointer mt-[50px]" onClick={handleClickSubmitButton}>
        Sign In
      </button>
      <p className="m-2">Don't have an account? <a className="underline cursor-pointer text-[#FE7800]" onClick={handleClickSignUp}>Sign up</a></p>
    </>
  );
}

export default SignInForm;