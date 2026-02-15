import React from 'react'

const OrderStatusLabel = ({status}) => {
  switch(status) {
    case 'CONFIRMING':
      return(
        <div className="flex justify-center items-center px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
          Confirming
        </div>
      )
    case 'PREPARING':
      return(
        <div className="flex justify-center items-center px-2 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
          Preparing
        </div>
      )
    case 'CANCELLED':
      return(
        <div className="flex justify-center items-center px-2 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
          Cancelled
        </div>
      )
    case 'DELIVERING':
      return(
        <div className="flex justify-center items-center px-2 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
          Delivering
        </div>
      )
    case 'COMPLETED':
      return(
        <div className="flex justify-center items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          Completed
        </div>
      )
    default:
      return null;
  }
}

export default OrderStatusLabel;