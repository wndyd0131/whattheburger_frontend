import React from 'react'

const ChargeSummary = ({product}) => {
  return (
    <div>
      <div className='flex justify-between'>
      <p>Base Price</p>
      <p>{product.basePrice.toFixed(2)}</p>
      </div>
      <div className='flex justify-between'>
      <p>Extra Price</p>
      <p>{product.extraPrice.toFixed(2)}</p>
      </div>
      <div className='flex justify-between'>
      <p>Total Price</p>
      <p>{product.calculatedPrice.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ChargeSummary;