import api from "../utils/api";

export const fetchOrderByEmailAndOrderNumber = (email, orderNumber) => {
  const body = {
    email: email
  };
  return api.get(`/order/${orderNumber}`, body)
    .then(res => res.data);
}

export const createOrderSession = (storeId, body) =>
  api.post(`/orderSession/store/${storeId}`, body)
    .then(res => res.data);

export const fetchOrderSession = (sessionId, storeId) =>
  api.get(`/orderSession/${sessionId}/store/${storeId}`)
    .then(res => res.data);

export const fetchOrderByCheckoutSessionId = (sessionId) =>
  api.get(`/order/checkoutSession/${sessionId}`)
    .then(res => res.data);