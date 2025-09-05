import api from "../utils/api";

export const fetchOrderByEmailAndOrderNumber = (email, orderNumber) => {
  const body = {
    email: email
  };
  return api.get(`/order/${orderNumber}`, body)
    .then(res => res.data);
}