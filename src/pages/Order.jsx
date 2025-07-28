import React from 'react'
import OrderSummary from '../components/Order/OrderSummary';

const Order = () => {
  return (
    <div className="flex justify-center items-center flex-col max-w-[80%] w-full m-auto p-5 border-1 border-black">
      <h1 className="flex basis-1/6">Header</h1>
      <div className="flex basis-2/6">
        <OrderSummary/>
      </div>
      <div className="flex basis-3/6">Footer</div>
    </div>
  )
}

export default Order;