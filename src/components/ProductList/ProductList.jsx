import React, { useEffect, useState } from "react";
import Api from "../../api/api";
import Product from "../Product/Product";
import { CircularProgress } from "@mui/material";
import styles from "./ProductList.module.scss";
import constants from "../../api/constants";

function ProductList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const result = await Api.get(
        `products?page=${page}&pageSize=${pageSize}`
      );
      if (result?.data) {
        setProducts(result.data);
      }
      setLoading(false);
    }
    getProducts();
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
