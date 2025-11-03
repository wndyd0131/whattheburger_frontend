import { recordStats } from "framer-motion";
import api from "../utils/api";

export const createProduct = (body) =>
  api.post("/products", body)
    .then(res => res.data);
    
export const fetchProducts = () =>
  api.get("/products")
    .then(res => res.data);

export const fetchProductsByCategoryId = (categoryId) =>
  api.get(`/products/category/${categoryId}`)
    .then(res => res.data);

export const registerStoreProduct = (body) =>
  api.post("/store/product", body)
    .then(res => res.data);

export const fetchStoreProduct = (storeId, storeProductId) =>
  api.get(`/store/${storeId}/product/${storeProductId}`)
    .then(res => res.data);

export const fetchStoreProductsByCategories = (storeId) =>
  api.get(`/store/${storeId}/category/product`)
    .then(res => res.data);