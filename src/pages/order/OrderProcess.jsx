import React, { useContext, useEffect, useState } from 'react'
import { fetchOrderSession, fetchOrderSessionByCheckoutSessionId } from '../../api/order';
import { LayoutContext } from '../../contexts/LayoutContext';
import { ORDER_SESSION_ACTIONS } from '../../reducers/OrderSession/action';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingSquares } from '../../svg/Utils';

const OrderProcess = () => {

  const {
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const [searchParams] = useSearchParams();
  const [timeOut, setTimeOut] = useState(false);
  const checkoutSessionId = searchParams.get("session_id");

  const nav = useNavigate();

  const orderSessionState = rootState.orderSessionState;

  useEffect(() => {
    if (!checkoutSessionId)
      return;
    // handling
    let attempts = 0;
    const maxAttempts = 15;

    const interval = setInterval(() => {
      attempts++;
      fetchOrderSessionByCheckoutSessionId(checkoutSessionId)
        .then(data => {
          if (data.paymentStatus === "PAID") {
            dispatchRoot({
              type: ORDER_SESSION_ACTIONS.UPDATE_PAYMENT_STATUS,
              payload: {
                orderSessionResponse: data
              }
            });
            nav(`/order/complete?session_id=${checkoutSessionId}`);
            clearInterval(interval);
          } else if (attempts >= maxAttempts) {
            clearInterval(interval);
            setTimeOut(true);
          }
        })
        .catch(err => {
          console.error(err);
          clearInterval(interval);
        })
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, []);
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h2 className="text-6xl text-[#FE7800] font-[whatthefont]">Payment Processing... Please wait</h2>
      <div className="w-[80px]">
        <LoadingSquares/>
      </div>
    </div>
  )
}

export default OrderProcess;