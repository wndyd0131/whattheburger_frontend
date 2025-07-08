import React from 'react'

const PriceSummary = () => {
  return (
    <div className="flex justify-end border-t border-[rgb(225,225,225)] p-3">
      <div className="grid items-center grid-cols-2 gap-x-10 gap-y-3 font-[sans-serif] text-gray-500">
        <p className="">Subtotal</p>
        <p>$20.31</p>
        <p className>Tax*</p>
        <p>$20.31</p>
        <p className="text-2xl text-black font-semibold">Total</p>
        <p className="text-2xl text-black font-semibold">$20.31</p>
      </div>
    </div>
  )
}

export default PriceSummary;