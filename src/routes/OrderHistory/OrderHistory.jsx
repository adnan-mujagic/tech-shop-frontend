import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/orders";
import Header from "../../components/Header";
import Order from "../../components/Order";
import TextHeader from "../../components/TextHeader";
import styles from "./OrderHistory.module.scss";

function OrderHistory() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((results) => {
        console.log(results);
        setOrders(results.data);
      })
      .then(setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header />
      <div className={styles["order-history"]}>
        <TextHeader text={"These are your orders"} padding />
        {!loading && orders?.length > 0 ? (
          <>
            {orders.map((order) => (
              <Order status={order.status} products={order.products} />
            ))}
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
