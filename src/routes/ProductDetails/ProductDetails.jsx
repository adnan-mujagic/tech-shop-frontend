import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/api";
import Header from "./../../components/Header";
import { Carousel } from "react-responsive-carousel";

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
          <div className={styles["product-content"]}>
            <div className={styles["carousel-wrapper"]}>
              <Carousel
                emulateTouch
                swipeable
                autoPlay
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
            <div className={styles["product-information"]}>KME</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
