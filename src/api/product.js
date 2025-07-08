import api from "../utils/api";

export const fetchProductsByCategoryId = (categoryId) =>
  api.get(`/products/category/${categoryId}`)
    .then(res => res.data);