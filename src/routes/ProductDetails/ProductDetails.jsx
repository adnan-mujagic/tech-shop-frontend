import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/api";
import Header from "./../../components/Header";
import { Carousel } from "react-responsive-carousel";
import TextHeader from "./../../components/TextHeader";
import constants from "./../../api/constants";
import ArticleIcon from "@mui/icons-material/Article";
import date from "../../api/date";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./ProductDetails.module.scss";

function ProductDetails() {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getProduct() {
      console.log(productId);
      setLoading(true);
      Api.get(`products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch((err) => console.log(err))
        .finally(setLoading(false));
    }
    getProduct();
  }, [productId]);
  return (
    <div className={styles["product-details"]}>
      <Header />
      <div className={styles["product-details-content-wrapper"]}>
        {loading || !product.images ? (
          <CircularProgress />
        ) : (
          <div className={styles["narrow"]}>
            <div className={styles["product-content"]}>
              <div className={styles["carousel-wrapper"]}>
                <Carousel
                  emulateTouch
                  swipeable
                  useKeyboardArrows
                  stopOnHover
                  showStatus={false}
                  showArrows={false}
                  showThumbs={false}
                  interval={2000}
                  infiniteLoop={product.images.size > 2}
                >
                  {product.images.map((source) => (
                    <div className={styles["image-container"]}>
                      <img src={source} />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className={styles["product-information"]}>
                <TextHeader text={product.name} type="title" />
                <TextHeader
                  text={"$ " + product.price}
                  type="h1"
                  color={constants.colors.success}
                />
                <TextHeader
                  text={product.description}
                  type="h2"
                  icon={<ArticleIcon />}
                />
                <TextHeader
                  text={"Date added: " + date(product.date_added)}
                  type="h2"
                />
                <TextHeader
                  text={"Last restocked: " + date(product.last_restocked)}
                  type="h2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
