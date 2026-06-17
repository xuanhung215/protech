import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { buildCategoryList, mapProductFromApi } from "../utils/productHelpers";

axios.defaults.baseURL = API_BASE_URL

export const getProductsFromApi = async (params = {}) => {
  const response = await axios.get(`/products`, { params });
  const page = response.data || {};
  const content = Array.isArray(page.content) ? page.content : [];

  return {
    ...page,
    content,
    mappedProducts: content.map(mapProductFromApi),
  };
};

export const getCategoriesFromApi = async () => {
  const response = await axios.get(`/categories`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getProductUiData = async (size = 200) => {
  const [productsPage, categories] = await Promise.all([
    getProductsFromApi({ page: 0, size }),
    getCategoriesFromApi(),
  ]);

  return {
    products: productsPage.mappedProducts,
    categories: buildCategoryList(categories, productsPage.mappedProducts),
  };
};
