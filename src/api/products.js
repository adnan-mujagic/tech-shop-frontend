import Api from "./api";

export const getProducts = ({ page, pageSize }) => {
  return Api.get(`products?page=${page}&pageSize=${pageSize}`).then(
    (res) => res
  );
};

export const getProduct = ({ productId }) => {
  return Api.get(`products/${productId}`).then((res) => res);
};
