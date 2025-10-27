import { TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import OrderFormContext from '../../contexts/OrderFormContext';
import api from '../../utils/api';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const DeliveryForm = () => {

  const {
    formData,
    setFormData,
    formError,
    setFormError
  } = useContext(OrderFormContext);

  const {sessionId} = useParams();
  const [loading, setLoading] = useState(false);
  const [displayedPhoneNum, setDisplayedPhoneNum] = useState("");

  const shapePayload = (f) => {
    return  {
      firstName: f.firstName,
      lastName: f.lastName,
      email: f.email,
      phoneNum: f.phoneNum,
      streetAddr: f.streetAddr,
      streetAddrDetail: f.streetAddrDetail,
      zipCode: f.zipCode,
      cityState: f.cityState,
      type: 'delivery'
    }
  }

  const isFormValid = () => {
    const isValid = 
      formError.firstName.isTouched && formError.firstName.message.length === 0 &&
      formError.lastName.isTouched && formError.lastName.message.length === 0 &&
      formError.streetAddr.isTouched && formError.streetAddr.message.length === 0 &&
      formError.zipCode.isTouched && formError.zipCode.message.length === 0 &&
      formError.cityState.isTouched && formError.cityState.message.length === 0 &&
      formError.email.isTouched && formError.email.message.length === 0 &&
      formError.phoneNum.isTouched && formError.phoneNum.message.length === 0;
    return isValid;
  }

  const handleClickPayButton = () => {
    if (isFormValid()) {
      setLoading(true);
      const payload = shapePayload(formData);
      api.post(`/checkout/${sessionId}`, payload)
        .then(res => {
          const data = res.data;
          window.location.href = data.successUrl;
        })
        .catch(err => console.error(err))
        .finally(() => {
          setLoading(false);
        })
    } else {
      toast.error("Fields must be properly filled in to continue order")
    }
  }

  // const setField = (k, v) => setFormData(prev => ({...prev, [k]: v}));

  const setTouched = (key) => {
    setFormError(prev => ({
      ...prev,
      [key]: {...prev[key], isTouched: true}
    }));
  }

  const setMessage = (key, message) => {
    setFormError(prev => ({
      ...prev,
      [key]: {...prev[key], message: message}
    }))
  }

  const handleChangeFirstNameInput = (firstName) => {
    if (!formError.firstName.isTouched)
      setTouched("firstName");
    const isAlphabetical = /^[a-zA-Z]+$/.test(firstName);
    const isNotEmpty = firstName.length > 0;

    if (!isNotEmpty) {
      setMessage("firstName", "First name must be filled in");
    }
    else if (!isAlphabetical) {
      setMessage("firstName", "First name must be alphabetical characters [a-z, A-Z]");
    } else {
      setMessage("firstName", "");
    }

    setFormData(prev => ({...prev, firstName: firstName}))
  }

  const handleChangeLastNameInput = (lastName) => {
    if (!formError.lastName.isTouched)
        setTouched("lastName");
      const isAlphabetical = /^[a-zA-Z]+$/.test(lastName);
      const isNotEmpty = lastName.length > 0;

      if (!isNotEmpty) {
        setMessage("lastName", "Last name must be filled in");
      }
      else if (!isAlphabetical) {
        setMessage("lastName", "Last name must be alphabetical characters [a-z, A-Z]");
      } else {
        setMessage("lastName", "");
      }

      setFormData(prev => ({...prev, lastName: lastName}))
  }

  const handleChangeStreetAddrInput = (streetAddr) => {
    if (!formError.streetAddr.isTouched)
        setTouched("streetAddr");

      const isNotEmpty = streetAddr.length > 0;

      if (!isNotEmpty) {
        setMessage("streetAddr", "Street address must be filled in");
      } else {
        setMessage("streetAddr", "");
      }
    setFormData(prev => ({...prev, streetAddr: streetAddr}))
  }

  const handleChangeStreetAddrDetailInput = (streetAddrDetail) => {
    setFormData(prev => ({...prev, streetAddrDetail: streetAddrDetail}))
  }

  const handleChangeZipCodeInput = (zipCode) => {
    const input = zipCode.replace(/\D/g, "").substring(0, 5);
    if (!formError.zipCode.isTouched)
        setTouched("zipCode");

      const isNotEmpty = input.length > 0;
      const isCorrectFormat = input.length === 5;

      if (!isNotEmpty) {
        setMessage("zipCode", "Zip code must be filled in");
      } else if (!isCorrectFormat) {
        setMessage("zipCode", "Invalid zip code");
      } else {
        setMessage("zipCode", "");
      }
    setFormData(prev => ({...prev, zipCode: input}))
  }
  const handleChangeCityStateInput = (cityState) => {
    if (!formError.cityState.isTouched)
        setTouched("cityState");

      const isNotEmpty = cityState.length > 0;

      if (!isNotEmpty) {
        setMessage("cityState", "City, State must be filled in");
      } else {
        setMessage("cityState", "");
      }
    setFormData(prev => ({...prev, cityState: cityState}))
  }

  const handleChangeEmailInput = (email) => {
    if (!formError.email.isTouched)
        setTouched("email");
    const isCorrectFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isNotEmpty = email.length > 0;

      if (!isNotEmpty) {
        setMessage("email", "This field must be filled in");
      }
      else if (!isCorrectFormat) {
        setMessage("email", "Email must be email format");
      } else {
        setMessage("email", "");
      }

      setFormData(prev => ({...prev, email: email}))
  }

  const handleChangePhoneNumInput = (phoneNum) => {
    if (!formError.phoneNum.isTouched)
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
    const isNotEmpty = input.length > 0;

      if (!isNotEmpty) {
        setMessage("phoneNum", "This field must be filled in");
      }
      else if (!isComplete) {
        setMessage("phoneNum", "Phone number must be complete phone number");
      } else {
        setMessage("phoneNum", "");
      }

      setFormData(prev => ({...prev, phoneNum: phoneNum}))
  }

  return (
    <>
      <h2 className="my-3">Where should we send your order?</h2>
      <h3 className="my-3 font-[sans-serif]">Enter your name and address:</h3>
      <div className="flex flex-col gap-y-5">
        <TextField
          required
          id="firstName-input"
          label="First Name"
          variant='filled'
          value={formData.firstName}
          color="warning"
          inputProps={{ maxLength: 30 }}
          helperText={`${formError.firstName.message.length > 0 ? formError.firstName.message : `${formData.firstName.length}/30`} `}
          error={formError.firstName.message.length > 0}
          onChange={(e) => handleChangeFirstNameInput(e.target.value)}
        />
        <TextField
          required
          id="lastName-input"
          label="Last Name"
          variant='filled'
          inputProps={{ maxLength: 30 }}
          color="warning"
          error={formError.lastName.message.length > 0}
          helperText={`${formData.lastName.length}/30`}
          value={formData.lastName}
          onChange={(e) => handleChangeLastNameInput(e.target.value)}
        />
        <TextField
          required
          id="streetAddr-input"
          color="warning"
          label="Street Address"
          error={formError.streetAddr.message.length > 0}
          helperText={`${formError.streetAddr.message.length > 0 ? formError.streetAddr.message : ""}`}
          variant='filled'
          value={formData.streetAddr}
          onChange={(e) => handleChangeStreetAddrInput(e.target.value)}
        />
        <TextField
          id="streetAddrDetail-input"
          color="warning"
          label="Apt, Suite, Building (Optional)"
          helperText={`${formData.lastName.length}/40`}
          value={formData.streetAddrDetail}
          variant='filled'
          onChange={(e) => handleChangeStreetAddrDetailInput(e.target.value)}
        />
        <TextField
          required
          id="zipCode-input"
          label="Zip Code"
          color="warning"
          variant='filled'
          inputProps={{ maxLength: 5 }}
          error={formError.zipCode.message.length > 0}
          helperText={`${formError.zipCode.message.length > 0 ? formError.zipCode.message : ""}`}
          value={formData.zipCode}
          onChange={(e) => handleChangeZipCodeInput(e.target.value)}
        />
        <TextField
          required
          id="cityState-input"
          label="City, State"
          color="warning"
          variant='filled'
          error={formError.cityState.message.length > 0}
          helperText={`${formError.cityState.message.length > 0 ? formError.cityState.message : ""}`}
          value={formData.cityState}
          onChange={(e) => handleChangeCityStateInput(e.target.value)}
        />
        <TextField
          required
          id="email-input"
          error={formError.email.message.length > 0}
          color="warning"
          variant='filled'
          inputProps={{ maxLength: 100 }}
          helperText={`${formError.email.message.length > 0 ? formError.email.message : `${formData.email.length}/30`} `}
          label="Email Address"
          value={formData.email}
          onChange={(e) => handleChangeEmailInput(e.target.value)}
        />
        <TextField
          required
          variant='filled'
          inputProps={{maxLength: 14}}
          id="phoneNum-input"
          color="warning"
          label="Phone Number"
          value={displayedPhoneNum}
          error={formError.phoneNum.message.length > 0}
          helperText={`${formError.phoneNum.message.length > 0 ? formError.phoneNum.message : ""}`}
          onChange={(e) => handleChangePhoneNumInput(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-5">
        <motion.button
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          color="warning"
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickPayButton()}
          className="flex h-15 w-25 justify-center items-center bg-gradient-to-r from-[#FE7800] to-orange-500 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1"
        >
          {loading ? <LoadingSpinner spinnerColor='#FFFFFF' circleColor='#FFFFFF'/> : <p>Pay</p>}
        </motion.button>
      </div>
    </>
  )
}

export default DeliveryForm;