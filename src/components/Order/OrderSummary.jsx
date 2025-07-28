import React from 'react'
import ImageContainer from './ImageContainer';
import ContentContainer from './ContentContainer';

const OrderSummary = () => {
  return (
    <div className="flex flex-col basis-10/12 overflow-auto">
      {cartState.cartList.map((cart, cartIdx) => {
        const cartQuantity = cart.quantity;
        const cartPrice = cart.product.productPrice * cartQuantity;
        const productId = cart.product.productId;
        return (
          <div key={cartIdx} className="flex h-full w-full outline-1 outline-gray-200">
            <ImageContainer/>
            <ContentContainer/>
          </div>
        );
      })}
    </div>
  )
}

export default OrderSummary;