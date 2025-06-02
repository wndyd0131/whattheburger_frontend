import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContext } from "./contexts/FormContext";
import axios from "axios";

const SignUpForm = () => {

  const {
    signUpForm,
    setSignUpForm
  } = useContext(AuthContext);

  const {
    setIsSignIn,
    setIsSignUp,
    handleClickSignIn
  } = useContext(FormContext);
  
  const fromFormToRequest = (form) => {
    // Validation
    // API call
    const requestObject = {
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNum: form.phoneNum,
      zipcode: form.zipcode
    }
    
    return requestObject;
  }

  const handleClickSubmitButton = async () => {
    const requestObject = fromFormToRequest(signUpForm);
    await axios.post('http://localhost:8080/api/v1/signup', requestObject)
    .then(response => {
      console.log(response);
      setIsSignIn(true);
      setIsSignUp(false);
      setSignUpForm((prev) => (
        { ...prev,
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNum: '',
          zipcode: ''
        })
      )
    })
    .catch(err => console.error(err));
  }

  return (
      <>
        <legend className="flex" htmlFor="email">email</legend>
        <input
          type="email"
          name="email"
          id="email"
          value={signUpForm.email}
          onChange={(e) => setSignUpForm((prev) => ({...prev, email: e.target.value}))}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={signUpForm.password}
          onChange={(e) => setSignUpForm((prev) => ({...prev, password: e.target.value}))}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <label htmlFor="firstName">first name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={signUpForm.firstName}
          onChange={(e) => setSignUpForm((prev) => ({...prev, firstName: e.target.value}))}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <label htmlFor="lastName">last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={signUpForm.lastName}
          onChange={(e) => setSignUpForm((prev) => ({...prev, lastName: e.target.value}))}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <label htmlFor="phoneNum">phone number</label>
        <input
          type="text"
          name="phoneNum"
          id="phoneNum"
          value={signUpForm.phoneNum}
          onChange={(e) => setSignUpForm((prev) => ({...prev, phoneNum: e.target.value}))}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <label htmlFor="zipcode">zip code</label>
        <input
          type="text"
          name="zipcode"
          id="zipcode"
          value={signUpForm.zipcode}
          onChange={(e) => setSignUpForm((prev) => ({...prev, zipcode: e.target.value}))}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button className="w-full bg-[#FE7800] text-white py-3 rounded hover:bg-[#e9750f] cursor-pointer mt-[50px]" onClick={handleClickSubmitButton}>
          Sign Up
        </button>
        <p className="m-2">Already have an account? <a className="underline cursor-pointer text-[#FE7800]" onClick={handleClickSignIn}>Sign in</a></p>
      </>
  );
}

export default SignUpForm;