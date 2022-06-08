import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./SidebarCartItem.module.scss";

function SidebarCartItem({ name, amount, price, image, setCart, id }) {
  const handleRemove = (event) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let itemAmount = cart[id].amount;
    if (itemAmount > 1) {
      cart[id].amount = itemAmount - 1;
    } else {
      delete cart[id];
    }
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };
  return (
    <div className={styles["sidebar-cart-item"]}>
      <div className={styles["sidebar-cart-item-left"]}>
        <img className={styles["sidebar-cart-item-image"]} src={image} />
        <p>{name + " x" + amount}</p>
      </div>
      <div className={styles["sidebar-cart-item-right"]}>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={(event) => handleRemove(event)}
        />
      </div>
    </div>
  );
}

SidebarCartItem.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  setCart: PropTypes.func,
  id: PropTypes.string,
};

export default SidebarCartItem;
