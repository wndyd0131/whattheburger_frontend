import React from 'react'
import DeliveryForm from './DeliveryForm';
import PickupForm from './PickupForm';

const OrderForm = ({orderType, formData, setFormData}) => {
  if (orderType === 'DELIVERY') {
    return <DeliveryForm formData={formData} setFormData={setFormData}/>
  } else if (orderType === 'PICKUP') {
    return <PickupForm formData={formData} setFormData={setFormData}/>
  }
}

export default OrderForm;