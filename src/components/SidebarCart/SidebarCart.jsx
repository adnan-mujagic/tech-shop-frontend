import React, { useState } from "react";
import SidebarCartItem from "../SidebarCartItem";
import styles from "./SidebarCart.module.scss";

function SidebarCart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  console.log(cart);
  return (
    <div className={styles["sidebar-cart"]}>
      {cart != null && Object.keys(cart).length >= 1 ? (
        <>
          Your cart:
          {Object.values(cart).map((cartItem, idx) => {
            const { name, amount, price, image } = cartItem;
            return (
              <SidebarCartItem
                key={Object.keys(cart)[idx]}
                name={name}
                amount={amount}
                price={price}
                image={image}
                setCart={setCart}
                id={Object.keys(cart)[idx]}
              />
            );
          })}
          <div className={styles["sidebar-cart-total-container"]}>
            {"Total: " +
              Object.values(cart).reduce((current, next) => {
                return current + next.amount * next.price;
              }, 0)}
          </div>
        </>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}

export default SidebarCart;
