import api from "../utils/api";

export const fetchCategories = () =>
  api.get("/category")
    .then(res => res.data);