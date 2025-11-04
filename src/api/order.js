import api from "../utils/api";

export const fetchOrderByEmailAndOrderNumber = (email, orderNumber) => {
  const body = {
    email: email
  };
  return api.get(`/order/${orderNumber}`, body)
    .then(res => res.data);
}

export const createOrderSession = (storeId, body) =>
  api.post(`/order-session/store/${storeId}`, body)
    .then(res => res.data);

export const fetchOrderSession = (sessionId, storeId) =>
  api.get(`/order-session/${sessionId}/store/${storeId}`)
    .then(res => res.data);

export const fetchOrderByCheckoutSessionId = (checkoutSessionId) =>
  api.get(`/order/checkout-session/${checkoutSessionId}`)
    .then(res => res.data);

export const fetchOrderSessionByCheckoutSessionId = (checkoutSessionId) =>
  api.get(`/order-session/checkout-session/${checkoutSessionId}`)
    .then(res => res.data);