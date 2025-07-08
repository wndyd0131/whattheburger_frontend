import api from "../utils/api";

export const fetchOptionTraits = () =>
  api.get("/optionTraits")
    .then(res => res.data);