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
import constants from "../../api/constants";

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
          <TextHeader underlined text={"Most sold items"} />
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
                  <TableRow key={idx}>
                    <CustomTableCell>{getPlace(idx)}</CustomTableCell>
                    <CustomTableCell>{product.product._id}</CustomTableCell>
                    <CustomTableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          alt="product"
                          src={product.product.images[0]}
                          style={{
                            height: "48px",
                            aspectRatio: "1 / 1",
                            border: "1px solid " + constants.colors.border,
                            marginRight: "8px",
                            borderRadius: "4px",
                          }}
                        />
                        {product.product.name}
                      </div>
                    </CustomTableCell>
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
