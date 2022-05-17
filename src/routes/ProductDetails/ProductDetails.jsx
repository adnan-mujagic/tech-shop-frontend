import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/api";
import Header from "./../../components/Header";
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
        {loading ? <CircularProgress /> : <div>{JSON.stringify(product)}</div>}
      </div>
    </div>
  );
}

export default ProductDetails;
