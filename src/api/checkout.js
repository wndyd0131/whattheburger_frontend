import api from "../utils/api";

export const checkout = (body) =>
  api.post(`/checkout`, body)
    .then(res => res.data);
