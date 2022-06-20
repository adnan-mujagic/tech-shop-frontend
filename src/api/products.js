import Api from "./api";

export const getProducts = ({ page, pageSize, search = null }) => {
  let query = `products?page=${page}&pageSize=${pageSize}`;
  if (search !== null) {
    query += `&search=${search}`;
  }
  return Api.get(query).then((res) => res);
};

export const getProduct = ({ productId }) => {
  return Api.get(`products/${productId}`).then((res) => res);
};

export const addProduct = (payload) => {
  return Api.post(`products`, payload).then((res) => res);
};

export const getProductReviews = ({ productId }) => {
  return Api.get(`reviews/${productId}`).then((res) => res);
};

export const addProductReview = (payload) => {
  return Api.post(`reviews`, payload).then((res) => res);
};

export const canAddReview = ({ productId }) => {
  return Api.get(`orders/canReview/${productId}`).then((res) => res);
};
