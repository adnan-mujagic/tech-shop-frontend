import { Close } from "@mui/icons-material";
import React from "react";
import PropTypes from "prop-types";
import styles from "./PurchaseItem.module.scss";

function PurchaseItem({ id, name, image, amount, setCart, setOpen }) {
  const handleRemove = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (amount > 1) {
      cart[id].amount = amount - 1;
    } else {
      delete cart[id];
    }
    if (Object.keys(cart).length < 1) {
      setOpen(false);
    }
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className={styles["purchase-item"]}>
      <div className={styles["purchase-item-left"]}>
        <img className={styles["purchase-item-image"]} src={image} alt={name} />
        {name + " x" + amount}
      </div>
      <div className={styles["purchase-item-right"]}>
        <Close style={{ cursor: "pointer" }} onClick={() => handleRemove()} />
      </div>
    </div>
  );
}

PurchaseItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  amount: PropTypes.number,
  setCart: PropTypes.func,
  setOpen: PropTypes.func,
};

export default PurchaseItem;
