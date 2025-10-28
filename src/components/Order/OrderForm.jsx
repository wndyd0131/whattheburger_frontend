
const OrderForm = ({orderType}) => {
  if (orderType === 'DELIVERY') {
    return <DeliveryForm/>
  } else if (orderType === 'PICKUP') {
    return <PickupForm/>
  }
}

export default OrderForm;