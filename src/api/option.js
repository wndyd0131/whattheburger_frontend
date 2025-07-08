import api from "../utils/api";

export const fetchOptions = () =>
  api.get("/options")
    .then(res => res.data);