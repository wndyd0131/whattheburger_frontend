import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { LayoutContext } from '../../contexts/LayoutContext';
import api from '../../utils/api';
import { motion } from 'framer-motion';
import OrderForm from '../../components/Order/OrderForm';
import { ORDER_SESSION_ACTIONS } from '../../reducers/OrderSession/action';
import OrderSessionSummary from '../../components/Order/OrderSessionSummary';
import { OrderFormProvider } from '../../contexts/OrderFormContext';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderSession } from '../../api/order';
const Order = () => {
  const {
    setUserDetails
  } = useContext(UserContext);

  const nav = useNavigate();
  const {sessionId, storeId} = useParams();

  const {
    reducer: {
      rootState,
      dispatchRoot
    },
    setCartOpened
  } = useContext(LayoutContext);

  const orderSessionState = rootState.orderSessionState;

  const [step, setStep] = useState(1);

  const handleClickNextButton = () => {
    setStep(prev => prev + 1);
  }

  useEffect(() => {
    if (!sessionId || !storeId) return;
    fetchOrderSession(sessionId, storeId)
      .then(data => {
        dispatchRoot({
          type: ORDER_SESSION_ACTIONS.LOAD_SESSION,
          payload: {
            orderSessionResponse: data
          }
        });
      })
      .catch(err => {
        console.error(err);
        if (err.status === 404) {
          nav("/404");
        }
      });
  }, [sessionId, storeId])
  
  return (
    <OrderFormProvider>
    <div className="flex font-[sans-serif] flex-col max-w-[80%] w-full m-auto p-5 border rounded-2xl border-gray-300">
      {step === 1 &&
      <>
        <div className="flex basis-1/6 justify-center">
          <h1>Order Summary</h1>
        </div>
        <div className="flex basis-2/6">
          <OrderSessionSummary/>
        </div>
        <div className="flex justify-end border-t border-[rgb(225,225,225)] p-3">
          <div className="grid items-center grid-cols-2 gap-x-10 gap-y-3 font-[sans-serif] text-gray-500">
            <p className="">Subtotal</p>
            <p>${orderSessionState.totalPrice}</p>
            <p>Tax*</p>
            <p>$0</p>
            <p className="text-2xl text-black font-semibold">Total</p>
            <p className="text-2xl text-black font-semibold">${orderSessionState.totalPrice}</p>
          </div>
        </div>
      </>
      }
      {step === 2 &&
        <OrderForm
          orderType={orderSessionState.orderType}
        />
      }
    </div>
    {step < 2 &&
      <div className="flex justify-center basis-3/6 py-5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickNextButton()}
          className="flex py-4 px-10 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1"
        >
          Next
        </motion.button>
      </div>
    }
    </OrderFormProvider>
  )
}

export default Order;