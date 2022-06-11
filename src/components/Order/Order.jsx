import { TextField } from "@mui/material";
import React from "react";
import constants from "../../api/constants";
import OrderProductItem from "../OrderProductItem";
import TextHeader from "../TextHeader";
import styles from "./Order.module.scss";

function Order({ status, products }) {
  const calculateTotal = () => {
    return products.reduce(
      (current, next) => current + next.product_id.price * next.quantity,
      0
    );
  };
  return (
    <div className={styles["order"]}>
      {products.map((product) => {
        return (
          <OrderProductItem
            image={product.product_id.images[0]}
            name={product.product_id.name}
            amount={product.quantity}
            key={product.product_id._id}
          />
        );
      })}
      <TextHeader type="h3" text={"Status: " + status} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextHeader text={"Total:"} type={"h3"} />
        <div> &nbsp;</div>
        <TextHeader
          type={"h3"}
          text={"$ " + calculateTotal()}
          color={constants.colors.success}
        />
      </div>
    </div>
  );
}

export default Order;
