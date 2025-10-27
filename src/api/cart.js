import api from "../utils/api";

export const postCartItem = (body) =>
  api.post("/cart", body)
    .then(res => res.data);

export const patchCartItem = (cartIdx, body) =>
  api.patch(`/cart/${cartIdx}/option`, body)
    .then(res => res.data);