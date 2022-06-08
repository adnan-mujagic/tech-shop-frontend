import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Snackbar } from "@mui/material";
import TextHeader from "../TextHeader";
import ArticleIcon from "@mui/icons-material/Article";
import MuiAlert from "@mui/material/Alert";
import date from "../../api/date";
import shortenText from "../../api/shortenText";
import styles from "./Product.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Product(product) {
  const [message, setMessage] = useState("");
  const [alertShown, setAlertShown] = useState(false);
  const navigate = useNavigate();
  const {
    _id,
    name,
    description,
    date_added,
    last_restocked,
    price,
    quantity,
    images = ["https://cdn-icons-png.flaticon.com/512/1524/1524855.png"],
  } = product.product;

  const handleShowMore = () => {
    navigate(`/products/${_id}`);
  };

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[_id]) {
      cart[_id] = { ...cart[_id], amount: cart[_id].amount + 1 };
    } else {
      cart[_id] = {
        name,
        price,
        image: images[0],
        amount: 1,
      };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage(cart[_id].name + " has been added to your cart");
    setAlertShown(true);
  };

  return (
    <div className={styles["product"]}>
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
      <div
        className={styles["image-container"]}
        style={{
          background: `url(${images[0]}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className={styles["details"]}>
        <TextHeader text={name} />
        <TextHeader type="h2" text={`$ ${price}`} color="#78cece" />
        <TextHeader
          type="h3"
          text={shortenText(description)}
          icon={<ArticleIcon />}
        />
        <TextHeader type="h3" text={`In stock: ${quantity}`} />
        <TextHeader type="h3" text={`Date added: ${date(date_added)}`} />
        <TextHeader type="h3" text={`Last updated: ${date(last_restocked)}`} />
        <ButtonGroup
          className={styles["product-button-group"]}
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button onClick={() => handleShowMore()}>Show more</Button>
          <Button onClick={() => handleAddToCart()}>Add to cart</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Product;
