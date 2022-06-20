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
      <TextHeader text={"Lowest in stock"} underlined type="h1" />
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
                    <CustomTableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={product.images[0]}
                          style={{
                            height: "48px",
                            aspectRatio: "1 / 1",
                            border: "1px solid " + constants.colors.border,
                            marginRight: "8px",
                            borderRadius: "4px",
                          }}
                        />
                        {product.name}
                      </div>
                    </CustomTableCell>
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
