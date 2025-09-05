import React, { useContext, useEffect, useState } from 'react'
import OrderSummary from '../components/Order/OrderSummary';
import { UserContext } from '../contexts/UserContext';
import { LayoutContext } from '../contexts/LayoutContext';
import api from '../utils/api';
import { ORDER_ACTIONS } from '../reducers/Order/actions';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../svg/Utils';
import OrderForm from '../components/Order/OrderForm';

const Order = () => {
  const {
    setUserDetails
  } = useContext(UserContext);

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

  const {
    reducer: {
      rootState,
      dispatchRoot
    },
    setCartOpened
  } = useContext(LayoutContext);

  const orderSessionState = rootState.orderSessionState;
  console.log("ROOT STATE", rootState);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleClickNextButton = () => {
    setStep(prev => prev + 1);
  }

  const shapePayload = (f) => {
    const base = {
      firstName: f.firstName,
      lastName: f.lastName,
      email: f.email?.trim().toLowerCase(),
      phoneNum: f.phoneNum,
    }
    switch(orderSessionState.orderType) {
      case 'DELIVERY': {
        return {
          ...base,
          streetAddr: f.streetAddr,
          streetAddrDetail: f.streetAddrDetail,
          zipCode: f.zipCode,
          cityState: f.cityState,
          type: 'delivery'
        }
      }
      case 'PICKUP': {
        return {
          ...base,
          eta: f.eta,
          type: 'pickup'
        }
      }
    }
  };

  const handleClickPayButton = () => {
    setLoading(true);
    const payload = shapePayload(formData);
    api.post("/checkout", payload)
      .then(response => {
        const data = response.data;
        window.location.href = data.successUrl;
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false);
      })
  }
  useEffect(() => {
    api.get("/order")
      .then(response => {
        dispatchRoot({
          type: ORDER_ACTIONS.LOAD_ORDER,
          payload: {
            orderResponse: response.data
          }
        });
      })
      .catch(err => console.error(err));
  }, [])
  return (
    <>
    <div className="flex flex-col max-w-[80%] w-full m-auto p-5 border-1 border-black">
      {step === 1 &&
      <>
        <div className="flex basis-1/6 justify-center">
          <h1>Order Summary</h1>
        </div>
        <div className="flex basis-2/6">
          <OrderSummary/>
        </div>
        <div className="flex justify-end border-t border-[rgb(225,225,225)] p-3">
          <div className="grid items-center grid-cols-2 gap-x-10 gap-y-3 font-[sans-serif] text-gray-500">
            <p className="">Subtotal</p>
            <p>${orderSessionState.totalPrice}</p>
            <p className>Tax*</p>
            <p>$0</p>
            <p className="text-2xl text-black font-semibold">Total</p>
            <p className="text-2xl text-black font-semibold">${orderSessionState.totalPrice}</p>
          </div>
        </div>
      </>
      }
      {step === 2 &&
        <OrderForm orderType={orderSessionState.orderType} formData={formData} setFormData={setFormData}/>
      }
    </div>
    {step < 2 &&
      <div className="flex justify-center basis-3/6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickNextButton()}
          className="flex py-4 px-10 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1"
        >
          Next
        </motion.button>
      </div>
    } {
      step === 2 &&
      <div className="flex justify-center basis-3/6">
        <motion.button
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickPayButton()}
          className="flex h-15 w-25 justify-center items-center bg-gradient-to-r from-[#FE7800] to-orange-500 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1"
        >
          {loading ? <LoadingSpinner spinnerColor='#FFFFFF' circleColor='#FFFFFF'/> : <p>Pay</p>}
        </motion.button>
      </div>
    }
    </>
  )
}

export default Order;