import { useContext } from 'react'
import { LayoutContext } from '../../contexts/LayoutContext';

const PriceSummary = () => {

  const {
    reducer: {
      rootState
    }
  } = useContext(LayoutContext);

  const cartState = rootState.cartState;

  return (
    <div className="flex justify-end border-t border-[rgb(225,225,225)] p-3">
      <div className="grid items-center grid-cols-2 gap-x-10 gap-y-3 font-[sans-serif] text-gray-500">
        <p>Subtotal</p>
        <p>${cartState.totalPrice}</p>
        <p>Tax*</p>
        <p>$0</p>
        <p className="text-2xl text-black font-semibold">Total</p>
        <p className="text-2xl text-black font-semibold">${cartState.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default PriceSummary;