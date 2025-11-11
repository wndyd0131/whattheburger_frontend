import api from "../utils/api";

export const fetchCart = (storeId) =>
  api.get(`/store/${storeId}/cart`)
    .then(res => res.data);
export const fetchCartItem = (storeId, cartIdx) =>
  api.get(`/store/${storeId}/cart/${cartIdx}`)
    .then(res => res.data);

export const postCartItem = (storeId, body) =>
  api.post(`/store/${storeId}/cart`, body)
    .then(res => res.data);

export const patchCartItem = (storeId, cartIdx, body) =>
  api.patch(`/store/${storeId}/cart/${cartIdx}/option`, body)
    .then(res => res.data);

export const deleteCartItem = (storeId, cartIdx) => 
  api.delete(`/store/${storeId}/cart/${cartIdx}`)
    .then(res => res.data);

export const deleteCart = (storeId) => 
  api.delete(`/store/${storeId}/cart`)
    .then(res => res.data);

export const modifyCartItemQuantity = (storeId, cartIdx, requestBody) =>
  api.patch(`/store/${storeId}/cart/${cartIdx}/product`, requestBody)
    .then(res => res.data);

export const mergeCart = (storeId) =>
  api.patch(`/store/${storeId}/cart`)
    .then(res => res.data);
