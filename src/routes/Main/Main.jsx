import React from "react";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import styles from "./Main.module.scss";

function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <ProductList />
    </div>
  );
}

export default Main;
