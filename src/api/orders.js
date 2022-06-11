import Api from "./api";

export const getOrders = () => {
  return Api.get("orders").then((results) => results);
};
