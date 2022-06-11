import Api from "./api";

export const getProducts = ({ page, pageSize }) => {
  return Api.get(`products?page=${page}&pageSize=${pageSize}`).then(
    (res) => res
  );
};

export const getProduct = ({ productId }) => {
  return Api.get(`products/${productId}`).then((res) => res);
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
