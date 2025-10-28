import React, { useContext, useEffect, useState, useRef } from 'react'
import { CopyIcon } from '../../svg/Utils';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { LayoutContext } from '../../contexts/LayoutContext';
import { ORDER_ACTIONS } from '../../reducers/Order/actions';
import { normalizeProduct } from '../../utils/normalizer';
import OrderSummary from '../../components/Order/OrderSummary';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const OrderComplete = () => {

  const {
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const nav = useNavigate()
  const [loading, setLoading] = useState(false);
  
  const [orderNumber, setOrderNumber] = useState("");
  const [orderSummary, setOrderSummary] = useState({});
  const [productList, setProductList] = useState([]);
  const [orderStage, setOrderStage] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const wsRef = useRef(null);
  const orderNumberRef = useRef(null);

  const orderState = rootState.orderState;
  const fullAddress = orderState.addressInfo.streetAddr + ", " + orderState.addressInfo.cityState + ", " + orderState.addressInfo.zipCode;
  const recipientName = orderState.contactInfo.firstName + " " + orderState.contactInfo.lastName;


  const handleCopy = () => {
    if (orderNumberRef.current) {
      const text = orderNumberRef.current.textContent;
      navigator.clipboard.writeText(text);
      toast.success("Copied to the clipboard")
    }
  }

  const handleClickOrderMoreButton = () => {
    nav("/menu");
  }

  const truncate = (phoneNum) => {
    if (phoneNum) {
      return `(${phoneNum.slice(0, 3)})-${phoneNum.slice(3, 6)}-${phoneNum.slice(6, 10)}`
    }
    return "";
  }

  const displayPaymentMethod = (paymentMethod) => {
    switch(paymentMethod) {
      case "CREDIT_CARD":
        return "Credit Card";
      case "CASH":
        return "Cash";
      case "GIFT_CARD":
        return "Gift Card";
      default:
        return "";
    }
  }

  const displayFullAddress = (streetAddr, cityState, zipCode) => {
    if (streetAddr && cityState && zipCode)
      return streetAddr + ", " + cityState + ", " + zipCode;
    return "";
  }

  const displayFullName = (firstName, lastName) => {
    if (firstName && lastName)
      return firstName + " " + lastName;
    return "";
  }

  const displayCardBrand = (cardBrand) => {
    switch (cardBrand) {
      case "visa": {
        return "Visa";
      }
      default:
        return "";
    }
  }

  const displayCardExpireDate = (month, year) => {
    if (month && year) {
      return month + "/" + year;
    }
    return "";
  }

  const infoData = [
    {
      label: 'Recipient Name',
      value: displayFullName(orderState.contactInfo.firstName, orderState.contactInfo.lastName)
    },
    {
      label: 'Contact',
      value: truncate(orderState.contactInfo.phoneNum)
    },
    {
      label: 'Email',
      value: orderState.contactInfo.email
    },
    {
      label: 'Payment Method',
      value: displayPaymentMethod(orderState.paymentMethod)
    },
    {
      label: 'Card Brand',
      value: displayCardBrand(orderState.cardInfo?.brand)
    },
    {
      label: 'Last 4 Digits of Card',
      value: orderState.cardInfo?.last4
    },
    {
      label: 'Card Exp. (MM/YYYY)',
      value: displayCardExpireDate(orderState.cardInfo?.expireMonth, orderState.cardInfo?.expireYear)
    },
    {
      label: 'Store #',
      value: orderState.storeId
    },
    {
      label: 'Order Type',
      value: orderState.orderType
    },
    {
      label: 'Address',
      value: displayFullAddress(orderState.addressInfo.streetAddr, orderState.addressInfo.cityState, orderState.addressInfo.zipCode)
    },
    {
      label: 'Address Detail',
      value: orderState.addressInfo.streetAddrDetail
    }
  ]

  useEffect(() => {
    const onMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.payload.status === 'PREP_COMPLETE' && orderStage === 1) {
        setOrderStage(2);
      }
    }
    if (wsRef.current == null) {
      const ws = new WebSocket(`ws://${BACKEND_URL}/ws/track`);
      wsRef.current = ws;
      ws.addEventListener("open", () => console.log("[ws] open"), {once: true}); // auto-remove
      ws.addEventListener("message", onMessage);
    }

    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    // const orderNumber = params.get("orderNumber");
    const sessionId = params.get("session_id");
    
    api.get(`/order/checkoutSession/${sessionId}`)
      .then(response => {
        const data = response.data;
        dispatchRoot({
          type: ORDER_ACTIONS.LOAD_ORDER,
          payload: {
            orderResponse: data
          }
        });
        const productResponses = data.productResponses;
        const productList = productResponses.map(productResponse => normalizeProduct(productResponse));
        setProductList(productList);
        setOrderNumber(data.orderNumber);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));



      return () => { // #@
        const ws = wsRef.current;
        if (ws) {
          ws.removeEventListener("message", onMessage);
          wsRef.current = null;
        }
      };
  }, []);


  const InfoRow = ({ label, value }) => (
    <div className='flex py-4 px-6 border-b border-gray-200 last:border-b-0'>
      <dt className='w-1/4 flex-shrink-0 text-gray-600 font-medium'>{label}</dt>
      <dd className='w-3/4 text-gray-900'>{value}</dd>
    </div>
  );

  

  return (
    <div className="font-[sans-serif]">
      <div className="flex py-10 text-white shadow-2xl gap-y-5 flex-col justify-center items-center bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 cursor-default">
        <p className="flex justify-center items-center text-4xl font-['Whatthefont'] font-semibold">
          Your payment was successful,
          <br></br>
          Thank you for your order!
        </p>
        <span className='flex gap-x-1 font-semibold'>Order Number:<span className='underline'>#<span ref={orderNumberRef}>{orderNumber}</span></span> <span className="cursor-pointer" onClick={handleCopy}><CopyIcon/></span></span>
      </div>
      <div className="flex font-[sans-serif] flex-col p-10">
        <div className="flex min-h-[500px] max-h-[550px] h-screen gap-x-10">
          <div className="flex flex-col items-center basis-4/7">
            <h2 className='mb-5'>Order Progress</h2>
                <div className='flex w-full h-full max-w-300 p-5 border justify-center items-center border-gray-300 rounded-lg'>
                {orderStage === 1 &&
                  <div className='flex flex-col justify-center items-center'>
                    <img src="/public/icons/utils/gif/prep_loading.gif" width={200}></img>
                    <div className='text-center text-xl font-["sans-serif"]'>
                      <p>We are preparing your food right now,</p>
                      <p>it may costs around <span className='font-bold text-[#FE7800]'>5</span> minutes.</p>
                    </div>
                  </div>
                } {orderStage === 2 &&
                  <div className='flex flex-col justify-center items-center'>
                    <div className='flex border-1 border-gray-200 rounded-lg'>
                    </div>
                    <img src="/public/icons/utils/gif/delivery_loading.gif" width={200}></img>
                  </div>
                }
                </div>
          </div>
          <div className="flex flex-col h-full items-center basis-3/7">
            <h2 className='mb-5'>Order Summary</h2>
            <div className="flex flex-col justify-center py-2 px-2 h-full w-full border border-gray-300 rounded-lg overflow-y-auto">
              <OrderSummary/>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-4xl my-8'>
            <dl className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
              {infoData.map((item, itemIdx) => (
                <InfoRow key={itemIdx} label={item.label} value={item.value}></InfoRow>
              ))}
            </dl>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClickOrderMoreButton()}
            className="flex py-4 px-10 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1"
          >
            Order More
          </motion.button>
        </div>


          
        {/* <p>See other menus</p>
        <p>Others also ordered</p> */}
      </div>
    </div>
  )
}

export default OrderComplete;