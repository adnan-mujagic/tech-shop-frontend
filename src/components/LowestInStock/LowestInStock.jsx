import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { lowestInStock } from "../../api/admin";
import constants from "../../api/constants";
import TextHeader from "../TextHeader";
import styles from "./LowestInStock.module.scss";

export const CustomTableCell = styled(TableCell)({
  color: constants.colors.mainText,
});

export const CustomTable = styled(Table)({
  backgroundColor: constants.colors.secondaryBackground,
  padding: "16px",
  border: "1px solid " + constants.colors.border,
});

function LowestInStock() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    lowestInStock().then((res) => {
      setProducts(res?.data);
    });
  }, []);

  return (
    <div className={styles["lowest-in-stock"]}>
      <TextHeader text={"Lowest in stock"} underlined type="h2" />
      {products ? (
        <div>
          <CustomTable>
            <TableHead>
              <CustomTableCell>ID</CustomTableCell>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Amount in stock</CustomTableCell>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow>
                    <CustomTableCell>{product._id}</CustomTableCell>
                    <CustomTableCell>{product.name}</CustomTableCell>
                    <CustomTableCell>{product.quantity}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </CustomTable>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default LowestInStock;
