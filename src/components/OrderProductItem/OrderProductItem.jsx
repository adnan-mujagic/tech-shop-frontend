import React from "react";
import TextHeader from "../TextHeader";

import styles from "./OrderProductItem.module.scss";

function OrderProductItem({ image, name, amount }) {
  return (
    <div className={styles["order-product-item"]}>
      <div className={styles["order-product-item-left"]}>
        <img src={image} className={styles["order-product-item-image"]} />
        <TextHeader text={name} />
      </div>
      <div className={styles["order-product-item-right"]}>
        <TextHeader text={"x" + amount} />
      </div>
    </div>
  );
}

export default OrderProductItem;
