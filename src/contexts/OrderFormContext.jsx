import { createContext, useState } from 'react'

export const OrderFormContext = createContext();

export const OrderFormProvider = ({children}) => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    firstName: '',
    lastName: '',
    streetAddr: '',
    streetAddrDetail: '',
    zipCode: '',
    cityState: '',
    email: '',
    phoneNum: '',
    eta: '',
    type: ''
  });

  const [formError, setFormError] = useState({
    firstName: {
      message: '',
      isTouched: false
    },
    lastName: {
      message: '',
      isTouched: false
    },
    streetAddr: {
      message: '',
      isTouched: false
    },
    streetAddrDetail: {
      message: '',
      isTouched: false
    },
    zipCode: {
      message: '',
      isTouched: false
    },
    cityState: {
      message: '',
      isTouched: false
    },
    email: {
      message: '',
      isTouched: false
    },
    phoneNum: {
      message: '',
      isTouched: false
    },
  });

  return (
    <OrderFormContext.Provider value={{
      formData,
      setFormData,
      formError,
      setFormError
    }}>
      {children}
    </OrderFormContext.Provider>
  )
}

export default OrderFormContext