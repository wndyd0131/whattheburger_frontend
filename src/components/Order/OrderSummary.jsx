import React, { useContext } from 'react'
import ImageContainer from './ImageContainer';
import ContentContainer from './ContentContainer';
import { LayoutContext } from '../../contexts/LayoutContext';

const OrderSummary = () => {

  const {
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  console.log("ROOTSTATE", rootState);

  const orderState = rootState.orderState;
  return (
    <div className="flex flex-col basis-10/12 overflow-auto">
      {orderState.productList.map((product, productIdx) => {
        return (
          <div key={productIdx} className="flex outline-1 outline-gray-200">
            <ImageContainer image={product.imageSource}/>
            <ContentContainer product={product}/>
          </div>
        );
      })}
    </div>
  )
}

export default OrderSummary;