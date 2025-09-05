import React, { useContext, useEffect, useState } from 'react'
import { LoadingSpinner } from '../svg/Utils';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { LayoutContext } from '../contexts/LayoutContext';
import { ORDER_ACTIONS } from '../reducers/Order/actions';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, List, ListItem, Typography } from '@mui/material';
import { normalizeProduct } from '../utils/normalizer';
import ImageContainer from '../components/Order/ImageContainer';
import OptionSummary from '../components/Order/OptionSummary';
import OrderSummary from '../components/Order/OrderSummary';

const OrderComplete = () => {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false);
  
  const [orderNumber, setOrderNumber] = useState("");
  const [orderSummary, setOrderSummary] = useState({});
  const [productList, setProductList] = useState([]);
  const {
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const orderState = rootState.orderState;

  const infoData = [
    {
      label: 'Contact',
      value: orderState.phoneNum
    },
    {
      label: 'Billing Address',
      value: 'Cedar Park'
    },
    {
      label: 'Payment Method',
      value: orderState.paymentMethod
    },
    {
      label: 'Order Type',
      value: orderState.orderType
    },
  ]

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    // const orderNumber = params.get("orderNumber");
    const sessionId = params.get("session_id");
    console.log("SESSION ID", sessionId);
    api.get(`/order/checkoutSession/${sessionId}`)
      .then(response => {
        const data = response.data;
        console.log("Order Response", response);
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
      .finally(() => setLoading(false))
  }, []);

  console.log("PRODUCT LIST", orderState.productList);

  const InfoRow = ({ label, value }) => (
    <div className='flex py-4 px-6 border-b border-gray-200 last:border-b-0'>
      <dt className='w-1/4 flex-shrink-0 text-gray-600 font-medium'>{label}</dt>
      <dd className='w-3/4 text-gray-900'>{value}</dd>
    </div>
  );

  return (
    <>
      <div className="flex py-10 shadow-2xl gap-y-5 flex-col justify-center items-center">
        <p className="flex justify-center items-center text-4xl text-[#FE7800] font-semibold">
          Your payment was successful,
          <br></br>
          Thank you for your order!
        </p>
        <p>Order #{orderNumber} [copy]</p>
      </div>
      <div className="flex flex-col h-screen p-10">
        <div className="flex gap-x-10">
          <div className="flex flex-col items-center basis-4/7 max-w-[1]">
            <h2 className='mb-5'>Order Progress</h2>
            <div className='flex w-[100%] border border-gray-300 rounded-lg'>
              d
            </div>
          </div>
          <div className="flex flex-col items-center basis-3/7 max-w-lvw">
            <h2 className='mb-5'>Order Summary</h2>
            <div className="flex flex-col py-5 px-3 w-[100%] border border-gray-300 rounded-lg overflow-y-auto">
              <OrderSummary/>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-2xl my-8'>
            <dl className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
              {infoData.map((item, itemIdx) => (
                <InfoRow key={itemIdx} label={item.label} value={item.value}></InfoRow>
              ))}
            </dl>
          </div>
        </div>

          
        <p>See other menus</p>
        <p>Others also ordered</p>
      </div>
    </>
  )
}

export default OrderComplete;