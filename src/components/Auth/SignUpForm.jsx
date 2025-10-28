import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContext } from "./contexts/FormContext";
import { TextField } from "@mui/material";
import { LoadingSpinner } from "../../svg/Utils";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {

  const {
    signUpForm,
    setSignUpForm,
    signUpError,
    setSignUpError
  } = useContext(AuthContext);

  const {
    setIsSignIn,
    setIsSignUp,
    handleClickSignIn
  } = useContext(FormContext);

  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [displayedPhoneNum, setDisplayedPhoneNum] = useState("");
  
  const fromFormToRequest = (form) => {
    // Validation
    // API call
    const requestObject = {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNum: form.phoneNum,
      zipCode: form.zipCode
    }
    
    return requestObject;
  }

  const handleChangeEmailInput = (email) => {
    if (!signUpError.email.isTouched)
        setTouched("email");
    const isCorrectFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isCorrectFormat) {
        setMessage("email", "Email must be email format");
      } else {
        setMessage("email", "");
      }

      setSignUpForm(prev => ({...prev, email: email}))
  }

  const handleChangePhoneNumInput = (phoneNum) => {
    if (!signUpError.phoneNum.isTouched)
        setTouched("phoneNum");

    const input = phoneNum.replace(/\D/g, "").substring(0, 10);

    if (input.length < 4)
      setDisplayedPhoneNum(input);
    else if (input.length < 7)
      setDisplayedPhoneNum(`(${input.slice(0,3)})-${input.slice(3)}`);
    else if (input.length < 11)
      setDisplayedPhoneNum(`(${input.slice(0,3)})-${input.slice(3,6)}-${input.slice(6)}`);
    else
      return;

    const isComplete = input.length === 10;
    
    if (!isComplete) {
        setMessage("phoneNum", "Phone number must be complete phone number");
      } else {
        setMessage("phoneNum", "");
      }

      setSignUpForm(prev => ({...prev, phoneNum: phoneNum}))
  }

  const handleChangeZipCodeInput = (zipCode) => {
    const input = zipCode.replace(/\D/g, "").substring(0, 5);
    if (!signUpError.zipCode.isTouched)
        setTouched("zipCode");

      const isCorrectFormat = input.length === 5;

      if (!isCorrectFormat) {
        setMessage("zipCode", "Invalid zip code");
      } else {
        setMessage("zipCode", "");
      }
    setSignUpForm(prev => ({...prev, zipCode: input}))
  }

  const setTouched = (key) => {
    setSignUpError(prev => ({
      ...prev,
      [key]: {...prev[key], isTouched: true}
    }));
  }

  const setMessage = (key, message) => {
    setSignUpError(prev => ({
      ...prev,
      [key]: {...prev[key], message: message}
    }))
  }

  const handleChangeConfirmPassword = (confirmPassword) => {
    if (!signUpError.confirmPassword.isTouched)
      setTouched("confirmPassword");
    const password = signUpForm.password;
    const isSamePassword = confirmPassword.length > 0 && password === confirmPassword;
    if (!isSamePassword) {
      setMessage("confirmPassword", "Password does not match the previous field");
    } else {
      setMessage("confirmPassword", "");
    }

    setSignUpForm(prev => ({...prev, confirmPassword: confirmPassword}))
  }

  const handleChangePassword = (password) => {
    if (!signUpError.password.isTouched)
      setTouched("password");
    const confirmPassword = signUpForm.confirmPassword;

    const isSamePassword = password === confirmPassword;
    if (!isSamePassword) {
      setMessage("confirmPassword", "Password does not match the previous field");
    } else {
      setMessage("confirmPassword", "");
    }
    setMessage("password", "");

    setSignUpForm(prev => ({...prev, password: password}))
  }

  const handleChangeFirstNameInput = (firstName) => {
    if (!signUpError.firstName.isTouched)
      setTouched("firstName");
    const isAlphabetical = /^[a-zA-Z]+$/.test(firstName);

    if (!isAlphabetical) {
      setMessage("firstName", "First name must be alphabetical characters [a-z, A-Z]");
    } else {
      setMessage("firstName", "");
    }

    setSignUpForm(prev => ({...prev, firstName: firstName}))
  }

  const handleChangeLastNameInput = (lastName) => {
    if (!signUpError.lastName.isTouched)
        setTouched("lastName");
      const isAlphabetical = /^[a-zA-Z]+$/.test(lastName);

      if (!isAlphabetical) {
        setMessage("lastName", "Last name must be alphabetical characters [a-z, A-Z]");
      } else {
        setMessage("lastName", "");
      }

      setSignUpForm(prev => ({...prev, lastName: lastName}))
  }

  const isFormValid = (formError) => {
    const isValid = 
      formError.email.isTouched && formError.email.message.length === 0 &&
      formError.password.isTouched && formError.password.message.length === 0 &&
      formError.confirmPassword.isTouched && formError.confirmPassword.message.length === 0 &&
      formError.firstName.isTouched && formError.firstName.message.length === 0 &&
      formError.lastName.isTouched && formError.lastName.message.length === 0 &&
      formError.phoneNum.isTouched && formError.phoneNum.message.length === 0 &&
      formError.zipCode.isTouched && formError.zipCode.message.length === 0;
    return isValid;
  }

  const handleClickSignUpButton = () => {
    if (isFormValid(signUpError)) {
      const requestObject = fromFormToRequest(signUpForm);
      setLoading(true);
      api.post('/signup', requestObject)
      .then(response => {
        toast.success("You've successfully created your account");
        setIsSignIn(true);
        setIsSignUp(false);
        setSignUpForm((prev) => (
          { ...prev,
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phoneNum: '',
            zipCode: ''
          })
        )
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false);
      })
    } else {
        toast.error("You must fill in all required fields to sign up");
    }

  }

  return (
      <>
        <h2>Sign Up</h2>
        <div className="flex font-[sans-serif] flex-col w-full gap-5 mt-5">
          <TextField
            required
            type="email"
            label="email"
            color="warning"
            value={signUpForm.email}
            error={signUpError.email.message.length > 0}
            helperText={signUpForm.email.length > 0 ? signUpError.email.message : ""}
            onChange={(e) => handleChangeEmailInput(e.target.value)}
          />
          <TextField
            required
            type="password"
            label="password"
            color="warning"
            error={signUpError.password.message.length > 0}
            helperText={signUpForm.password.length > 0 ? signUpError.password.message : ""}
            value={signUpForm.password}
            onChange={(e) => handleChangePassword(e.target.value)}
          />
          <TextField
            required
            type="password"
            label="confirm password"
            color="warning"
            value={signUpForm.confirmPassword}
            error={signUpError.confirmPassword.message.length > 0}
            helperText={signUpForm.confirmPassword.length > 0 ? signUpError.confirmPassword.message : ""}
            onChange={(e) => handleChangeConfirmPassword(e.target.value)}
          />
          <TextField
            required
            label="first name"
            color="warning"
            value={signUpForm.firstName}
            error={signUpError.firstName.message.length > 0}
            helperText={signUpForm.firstName.length > 0 ? signUpError.firstName.message : ""}
            onChange={(e) => handleChangeFirstNameInput(e.target.value)}
          />
          <TextField
            required
            label="last name"
            color="warning"
            value={signUpForm.lastName}
            error={signUpError.lastName.message.length > 0}
            helperText={signUpForm.lastName.length > 0 ? signUpError.lastName.message : ""}
            onChange={(e) => handleChangeLastNameInput(e.target.value)}
          />
          <TextField
            required
            label="phone number"
            color="warning"
            error={signUpError.phoneNum.message.length > 0}
            value={displayedPhoneNum}
            helperText={signUpForm.phoneNum.length > 0 ? signUpError.phoneNum.message : ""}
            onChange={(e) => handleChangePhoneNumInput(e.target.value)}
          />
          <TextField
            required
            label="zip code"
            color="warning"
            error={signUpError.zipCode.message.length > 0}
            value={signUpForm.zipCode}
            helperText={signUpForm.zipCode.length > 0 ? signUpError.zipCode.message : ""}
            onChange={(e) => handleChangeZipCodeInput(e.target.value)}
          />
        </div>
        
      <div className="flex py-5 justify-center items-center">
        <motion.button
          className="flex justify-center items-center px-8 py-4 text-xl text-white rounded-full shadow-lg hover:shadow-xl font-['Whatthefont'] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform"
          onClick={handleClickSignUpButton}>
          {loading ? <LoadingSpinner spinnerColor='#FFFFFF' circleColor='#FFFFFF'/> : <p>Sign Up</p>}
        </motion.button>
      </div>
        <p className="m-2">Already have an account? <a className="underline cursor-pointer text-[#FE7800]" onClick={handleClickSignIn}>Sign in</a></p>
      </>
  );
}

export default SignUpForm;