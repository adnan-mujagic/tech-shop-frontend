import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";
import PurchaseDialog from "../PurchaseDialog";
import SidebarCartItem from "../SidebarCartItem";
import styles from "./SidebarCart.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SidebarCart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className={styles["sidebar-cart"]}>
      <Snackbar
        open={alertShown}
        autoHideDuration={message.length * 100}
        onClose={() => setAlertShown(false)}
      >
        <Alert
          onClose={() => setAlertShown(false)}
          severity={"success"}
          sx={{
            width: "100%",
            background: "#78cece",
          }}
        >
          {message}
        </Alert>
      </Snackbar>

      {cart != null && Object.keys(cart).length >= 1 ? (
        <>
          <PurchaseDialog
            open={purchaseDialogOpen}
            setOpen={setPurchaseDialogOpen}
            cart={cart}
            setCart={setCart}
            setMessage={setMessage}
            setAlertShown={setAlertShown}
          />
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
          <Button
            styles={{
              width: "100%",
              textAlign: "left",
              marginTop: "24px",
            }}
            variant="outlined"
            onClick={() => setPurchaseDialogOpen(true)}
          >
            Purchase
          </Button>
        </>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}

export default SidebarCart;
