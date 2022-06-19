import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { admin } from "../../api/admin";
import AddProductForm from "../../components/AddProductForm";
import Header from "../../components/Header";
import styles from "./AdminDashboard.module.scss";

function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    admin()
      .then((res) => {
        setIsAdmin(!!res?.admin);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles["admin-dashboard"]}>
      <Header />
      {isAdmin && !loading && (
        <div className={styles["admin-dashboard-content"]}>
          <AddProductForm />
        </div>
      )}
      {loading && <CircularProgress />}
      {!loading && !isAdmin && <div>Unauthorized access</div>}
    </div>
  );
}

export default AdminDashboard;
