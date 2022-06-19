import {
  CircularProgress,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { mostSold } from "../../api/admin";
import { CustomTable, CustomTableCell } from "../LowestInStock/LowestInStock";
import TextHeader from "../TextHeader";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import styles from "./MostSold.module.scss";

function MostSold() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    mostSold().then((res) => {
      setProducts(res?.data);
    });
  }, []);

  const getPlace = (idx) => {
    let place = idx + 1;
    if (place === 1) {
      return <StarIcon style={{ color: "#FFD700" }} />;
    } else if (place === 2) {
      return <StarIcon style={{ color: "#C0C0C0" }} />;
    } else if (place === 3) {
      return <StarIcon style={{ color: "#CD7F32" }} />;
    } else return place + "th";
  };

  return (
    <div>
      {products != null ? (
        <div className={styles["most-sold"]}>
          <TextHeader type="h2" underlined text={"Most sold items"} />
          <CustomTable>
            <TableHead>
              <CustomTableCell>Place</CustomTableCell>
              <CustomTableCell>ID</CustomTableCell>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Amount sold</CustomTableCell>
            </TableHead>
            <TableBody>
              {products.map((product, idx) => {
                return (
                  <TableRow>
                    <CustomTableCell>{getPlace(idx)}</CustomTableCell>
                    <CustomTableCell>{product.product._id}</CustomTableCell>
                    <CustomTableCell>{product.product.name}</CustomTableCell>
                    <CustomTableCell>{product.amount}</CustomTableCell>
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

export default MostSold;
