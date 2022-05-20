import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { CircularProgress } from "@mui/material";
import constants from "../../api/constants";
import { getProducts } from "../../api/products";
import styles from "./ProductList.module.scss";

function ProductList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getProducts({ page, pageSize })
      .then((res) => {
        console.log(res);
        if (res?.data) {
          setProducts(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [page, pageSize]);

  return (
    <div className={styles["product-list"]}>
      {loading ? (
        <CircularProgress
          sx={{
            color: constants.colors.error,
            marginTop: "24px",
            marginLeft: "24px",
          }}
        />
      ) : (
        <div className={styles["product-container"]}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
