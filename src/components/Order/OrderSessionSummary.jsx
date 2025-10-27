import React, { useContext } from 'react'
import { LayoutContext } from '../../contexts/LayoutContext';
import OrderSummaryList from './OrderSummaryList';

const OrderSessionSummary = () => {

  const {
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const productList = rootState.orderSessionState.productList;

  return (
    <OrderSummaryList productList={productList}/>
  )
}

export default OrderSessionSummary;