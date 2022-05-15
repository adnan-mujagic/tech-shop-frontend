import React, { useEffect, useState } from "react";
import Api from "../../api/api";
import Product from "../Product/Product";
import styles from "./ProductList.module.scss";

function ProductList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function getProducts() {
    setLoading(true);
    const result = await Api.get(`products?page=${page}&pageSize=${pageSize}`);
    if (result?.data) {
      setProducts(result.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <div className={styles["product-list"]}>
      {loading ? (
        <div>Loading...</div>
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
