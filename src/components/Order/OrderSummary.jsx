import { useContext } from 'react'
import { LayoutContext } from '../../contexts/LayoutContext';

const OrderSummary = () => {

  const {
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const orderState = rootState.orderState;
  const productList = orderState.productList;

  return (
    <>
      <OrderSummaryList productList={productList}/>
      <div className="flex justify-end border-t border-[rgb(225,225,225)] p-3">
        <div className="grid items-center grid-cols-2 gap-x-10 gap-y-3 font-[sans-serif] text-gray-500">
          <p className="">Subtotal</p>
          <p>${orderState.totalPrice}</p>
          <p className>Tax*</p>
          <p>$0</p>
          <p className="text-2xl text-black font-semibold">Total</p>
          <p className="text-2xl text-black font-semibold">${orderState.totalPrice}</p>
        </div>
      </div>
    </>
  )
}

export default OrderSummary;