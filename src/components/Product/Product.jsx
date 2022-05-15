import { Button, ButtonGroup, Divider } from "@mui/material";
import React from "react";
import TextHeader from "../TextHeader";
import styles from "./Product.module.scss";
import ArticleIcon from "@mui/icons-material/Article";
import date from "../../api/date";
import shortenText from "../../api/shortenText";
import { useNavigate } from "react-router-dom";

function Product(product) {
  const navigate = useNavigate();
  const {
    _id,
    name,
    description,
    date_added,
    last_restocked,
    price,
    properties = undefined,
    quantity,
    images = ["https://cdn-icons-png.flaticon.com/512/1524/1524855.png"],
  } = product.product;

  const handleClick = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div className={styles["product"]}>
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
          <Button onClick={() => handleClick()}>Show more</Button>
          <Button>Purchase</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Product;
