import { Button, Dialog, DialogActions } from "@mui/material";
import React from "react";
import constants from "../../api/constants";
import TextHeader from "../TextHeader";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import styles from "./PurchaseDialog.module.scss";
import PurchaseItem from "../PurchaseItem";
import { order } from "../../api/orders";

function PurchaseDialog({
  open,
  setOpen,
  cart,
  setCart,
  setAlertShown,
  setMessage,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const CustomDialog = styled(Dialog)({
    "& .MuiPaper-root": {
      backgroundColor: constants.colors.mainBackground,
    },

    "& .MuiDialogPaper": {
      backgroundColor: constants.colors.mainBackground,
    },
  });

  const handlePurchase = async () => {
    console.log("Purchased...");
    let products = Object.values(cart).map((item, idx) => {
      return { product_id: Object.keys(cart)[idx], amount: item.amount };
    });
    let orderBody = { status: "INITIATED", products };
    console.log(orderBody);
    const result = await order(orderBody);
    setMessage(result?.message);
    setAlertShown(true);
    localStorage.removeItem("cart");
    setCart(null);
    setOpen(false);
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce((current, next) => {
      return current + next.amount * next.price;
    }, 0);
  };

  return (
    <CustomDialog open={open} fullWidth>
      <div className={styles["dialog-modal"]}>
        <TextHeader text={"Make an order"} />
        <div style={{ marginTop: "24px" }}>
          {Object.values(cart).map((item, idx) => (
            <PurchaseItem
              name={item.name}
              image={item.image}
              amount={item.amount}
              setCart={setCart}
              id={Object.keys(cart)[idx]}
              setOpen={setOpen}
            />
          ))}
        </div>
        <TextHeader margin text={"Total: $" + calculateTotal()} />
        <DialogActions>
          <Button variant={"outlined"} onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant={"outlined"} onClick={() => handlePurchase()}>
            Purchase
          </Button>
        </DialogActions>
      </div>
    </CustomDialog>
  );
}

PurchaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  cart: PropTypes.object,
  setCart: PropTypes.func,
  setAlertShown: PropTypes.func,
  setMessage: PropTypes.func,
};

export default PurchaseDialog;
