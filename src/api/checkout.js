import api from "../utils/api";

export const checkout = (sessionId, body) =>
  api.post(`/checkout/${sessionId}`, body)
    .then(res => res.data);
