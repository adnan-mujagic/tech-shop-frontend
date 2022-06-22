import Api from "./api";

export const admin = async () => {
  return Api.get("admin").then((res) => res);
};

export const lowestInStock = async () => {
  return Api.get("admin/lowInStock").then((res) => res);
};

export const mostSold = async () => {
  return Api.get("admin/mostSold").then((res) => res);
};

export const favorites = async () => {
  return Api.get("admin/favorites").then((res) => res);
};
