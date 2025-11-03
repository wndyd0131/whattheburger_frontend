import api from "../utils/api"

export const login = (body) =>
  api.post('/login', body)
    .then(res => res.data);