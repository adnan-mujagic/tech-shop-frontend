import Api from "./api";

export const getOrders = () => {
  return Api.get("orders").then((results) => results);
};

export const order = async (body) => {
  return Api.post("orders", body).then((res) => res);
};
