import { TextField } from '@mui/material';
import React, { useState } from 'react'

const DeliveryForm = ({formData, setFormData}) => {

  const setField = (k, v) => setFormData(prev => ({...prev, [k]: v}));
  const handleChangeFirstNameInput = (firstName) => {
    setFormData(prev => ({...prev, firstName: firstName}))
  }

  const handleChangeLastNameInput = (lastName) => {
    setFormData(prev => ({...prev, lastName: lastName}))
  }

  const handleChangeStreetAddrInput = (streetAddr) => {
    setFormData(prev => ({...prev, streetAddr: streetAddr}))
  }

  const handleChangeStreetAddrDetailInput = (streetAddrDetail) => {
    setFormData(prev => ({...prev, streetAddrDetail: streetAddrDetail}))
  }

  const handleChangeZipCodeInput = (zipCode) => {
    setFormData(prev => ({...prev, zipCode: zipCode}))
  }
  const handleChangeCityStateInput = (cityState) => {
    setFormData(prev => ({...prev, cityState: cityState}))
  }

  const handleChangeEmailInput = (email) => {
    setFormData(prev => ({...prev, email: email}))
  }

  const handleChangePhoneNumInput = (phoneNum) => {
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
          value={formData.firstName}
          onChange={(e) => handleChangeFirstNameInput(e.target.value)}
        />
        <TextField
          required
          id="lastName-input"
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChangeLastNameInput(e.target.value)}
        />
        <TextField
          required
          id="streetAddr-input"
          label="Street Address"
          value={formData.streetAddr}
          onChange={(e) => handleChangeStreetAddrInput(e.target.value)}
        />
        <TextField
          id="streetAddrDetail-input"
          label="Apt, Suuite, Building (Optional)"
          value={formData.streetAddrDetail}
          onChange={(e) => handleChangeStreetAddrDetailInput(e.target.value)}
        />
        <TextField
          required
          id="zipCode-input"
          label="Zip Code"
          value={formData.zipCode}
          onChange={(e) => handleChangeZipCodeInput(e.target.value)}
        />
        <TextField
          required
          id="cityState-input"
          label="City, State"
          value={formData.cityState}
          onChange={(e) => handleChangeCityStateInput(e.target.value)}
        />
        <TextField
          required
          id="email-input"
          label="Email Address"
          value={formData.email}
          onChange={(e) => handleChangeEmailInput(e.target.value)}
        />
        <TextField
          required
          id="phoneNum-input"
          label="Phone Number"
          value={formData.phoneNum}
          onChange={(e) => handleChangePhoneNumInput(e.target.value)}
        />
      </div>
    </>
  )
}

export default DeliveryForm;